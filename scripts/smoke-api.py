#!/usr/bin/env python3
"""Real HTTP + SQLite migration tests. Uses only Python's standard library.
Run from the repo: python3 scripts/smoke-api.py (requires .NET 10 SDK).
Every database created by this test is temporary; webblog.db is never touched.
"""
import json
import os
from pathlib import Path
import shutil
import socket
import subprocess
import tempfile
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'backend/WebBlog.Api'
DOTNET = shutil.which('dotnet')
if not DOTNET:
    raise SystemExit('Install .NET 10 SDK and add dotnet to PATH first.')


def run(*args, env=None):
    subprocess.run([DOTNET, *args], cwd=ROOT, env=env, check=True)


run('tool', 'restore')
run('build', str(PROJECT))
run('ef', 'migrations', 'has-pending-model-changes', '--project', str(PROJECT), '--no-build')
with tempfile.TemporaryDirectory(prefix='web-blog-test-') as temporary:
    env = dict(os.environ, ConnectionStrings__BlogDatabase=f'Data Source={temporary}/test.db')
    run('ef', 'database', 'update', '--project', str(PROJECT), '--no-build', env=env)
    # Reapplying migrations must not duplicate seed records.
    run('ef', 'database', 'update', '--project', str(PROJECT), '--no-build', env=env)
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        port = sock.getsockname()[1]
    base = f'http://127.0.0.1:{port}'
    process = None
    checks = 0
    # Do not use workstation HTTP proxies for local test traffic.
    http = urllib.request.build_opener(urllib.request.ProxyHandler({}))

    def request(method, path, payload=None, headers=None, expected=200):
        global checks
        data = json.dumps(payload).encode() if payload is not None else None
        headers = {'Content-Type': 'application/json', **(headers or {})}
        req = urllib.request.Request(base + path, data=data, headers=headers, method=method)
        try:
            response = http.open(req, timeout=10)
        except urllib.error.HTTPError as error:
            response = error
        raw = response.read()
        assert response.status == expected, (method, path, response.status, raw)
        checks += 1
        return (json.loads(raw) if raw else None), response.headers

    def stop():
        if process and process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait()

    def start(environment):
        global process
        process = subprocess.Popen(
            [DOTNET, str(PROJECT / 'bin/Debug/net10.0/WebBlog.Api.dll')],
            cwd=PROJECT,
            env=dict(env, ASPNETCORE_ENVIRONMENT=environment, ASPNETCORE_URLS=base),
            stdout=log, stderr=subprocess.STDOUT,
        )
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            if process.poll() is not None:
                raise AssertionError('API exited early; see captured log.')
            try:
                with http.open(base + '/api/posts', timeout=1) as response:
                    if response.status == 200:
                        return
            except (OSError, urllib.error.URLError):
                time.sleep(.1)
        raise AssertionError('API startup timed out.')

    with open(Path(temporary) / 'api.log', 'w+') as log:
        try:
            start('Development')
            posts, _ = request('GET', '/api/posts')
            assert len(posts) == 8
            assert posts[0]['id'] == 8
            assert posts[0]['publishedAt'].endswith('Z')
            request('GET', '/api/posts/999999', expected=404)
            request('POST', '/api/posts', {}, expected=400)
            payload = dict(title=' HTTP smoke test ', author=' Tester ', excerpt=' Summary ',
                           content='<p>Stored in SQLite</p>', tags=[' Test ', 'test', 'SQLite'])
            for bad in ({'title': '   '}, {'tags': None}, {'tags': [None]},
                        {'tags': ['']}, {'tags': ['x' * 41]}, {'tags': ['x'] * 11},
                        {'title': 'x' * 201}, {'content': ''}):
                request('POST', '/api/posts', {**payload, **bad}, expected=400)
            created, headers = request('POST', '/api/posts', payload, expected=201)
            post_id = created['id']
            assert created['title'] == 'HTTP smoke test'
            assert created['tags'] == ['Test', 'SQLite']
            assert headers['Location'].endswith(f'/api/posts/{post_id}')
            loaded, _ = request('GET', f'/api/posts/{post_id}')
            assert loaded == created
            tags, _ = request('GET', '/api/tags')
            assert {'name': 'Test', 'count': 1} in tags
            updated, _ = request('PUT', f'/api/posts/{post_id}',
                                 {**payload, 'title': 'Updated', 'tags': ['Changed']})
            assert updated['publishedAt'] == created['publishedAt']
            request('PUT', f'/api/posts/{post_id}', {**payload, 'title': ''}, expected=400)
            request('PUT', '/api/posts/999999', payload, expected=404)
            _, headers = request('OPTIONS', '/api/posts', headers={
                'Origin': 'http://localhost:5173', 'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'content-type'}, expected=204)
            assert headers.get('Access-Control-Allow-Origin') == 'http://localhost:5173'
            _, headers = request('OPTIONS', '/api/posts', headers={
                'Origin': 'https://untrusted.example', 'Access-Control-Request-Method': 'POST'}, expected=204)
            assert headers.get('Access-Control-Allow-Origin') is None
            stop()
            start('Production')
            loaded, _ = request('GET', f'/api/posts/{post_id}')
            assert loaded['title'] == 'Updated' and loaded['tags'] == ['Changed']
            request('POST', '/api/posts', payload, expected=403)
            request('PUT', f'/api/posts/{post_id}', payload, expected=403)
            request('DELETE', f'/api/posts/{post_id}', expected=403)
            stop()
            start('Development')
            request('DELETE', f'/api/posts/{post_id}', expected=204)
            request('GET', f'/api/posts/{post_id}', expected=404)
            request('DELETE', f'/api/posts/{post_id}', expected=404)
            tags, _ = request('GET', '/api/tags')
            assert not any(tag['name'] == 'Changed' for tag in tags)
            posts, _ = request('GET', '/api/posts')
            assert len(posts) == 8
        except Exception:
            log.flush()
            log.seek(0)
            print(log.read())
            raise
        finally:
            stop()
    # Exercise Down and Up against this disposable database only.
    run('ef', 'database', 'update', '0', '--project', str(PROJECT), '--no-build', env=env)
    run('ef', 'database', 'update', '--project', str(PROJECT), '--no-build', env=env)
    print(f'PASS: {checks} HTTP checks; migration apply/reapply/rollback; restart persistence.')
