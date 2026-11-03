#!/usr/bin/env python3
"""Integration tests against real HTTP and disposable SQLite. No third-party Python packages."""
import copy
from concurrent.futures import ThreadPoolExecutor
from http.cookiejar import CookieJar
import json
import os
from pathlib import Path
import shutil
import socket
import sqlite3
import subprocess
import tempfile
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / 'backend/WebBlog.Api'
DOTNET = shutil.which('dotnet')
if not DOTNET:
    raise SystemExit('Install .NET SDK 10 and add dotnet to PATH first.')


def run(*args, env=None):
    subprocess.run([DOTNET, *args], cwd=ROOT, env=env, check=True)


run('tool', 'restore')
run('build', str(PROJECT))
run('ef', 'migrations', 'has-pending-model-changes', '--project', str(PROJECT), '--no-build')
with tempfile.TemporaryDirectory(prefix='web-blog-auth-test-') as temporary:
    database = f'{temporary}/test.db'
    env = dict(os.environ, ConnectionStrings__BlogDatabase=f'Data Source={database}')
    run('ef', 'database', 'update', 'InitialCreate', '--project', str(PROJECT), '--no-build', env=env)
    # An existing user's article must survive upgrading the previous exercise's database.
    with sqlite3.connect(database) as db:
        db.execute('INSERT INTO Posts (Title,Excerpt,Content,Author,PublishedAt,Tags) VALUES (?,?,?,?,?,?)',
                   ('Legacy article', 'Keep me', '<p>Old data</p>', 'Legacy author', '2025-01-01 00:00:00', '["Legacy"]'))
    run('ef', 'database', 'update', '--project', str(PROJECT), '--no-build', env=env)
    run('ef', 'database', 'update', '--project', str(PROJECT), '--no-build', env=env)
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        port = sock.getsockname()[1]
    base = f'http://127.0.0.1:{port}'
    process = None
    checks = 0
    password = 'My long test passphrase 2026!'

    class Client:
        def __init__(self, jar=None):
            self.jar = jar if jar is not None else CookieJar()
            self.http = urllib.request.build_opener(urllib.request.ProxyHandler({}), urllib.request.HTTPCookieProcessor(self.jar))

        def request(self, method, path, payload=None, headers=None, expected=200, csrf=True):
            global checks
            headers = {'Content-Type': 'application/json', **(headers or {})}
            if csrf and method in ('POST', 'PUT', 'DELETE'):
                token, _ = self.request('GET', '/api/auth/csrf')
                headers['X-CSRF-TOKEN'] = token['token']
            data = json.dumps(payload).encode() if payload is not None else (b'' if method == 'POST' else None)
            req = urllib.request.Request(base + path, data=data, headers=headers, method=method)
            try:
                response = self.http.open(req, timeout=15)
            except urllib.error.HTTPError as error:
                response = error
            raw = response.read()
            expected = (expected,) if isinstance(expected, int) else expected
            assert response.status in expected, (method, path, response.status, raw)
            checks += 1
            result = json.loads(raw) if raw else None
            return result, response.headers

    def stop():
        if process and process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait()

    def start(limit=100):
        global process
        process = subprocess.Popen(
            [DOTNET, str(PROJECT / 'bin/Debug/net10.0/WebBlog.Api.dll')], cwd=PROJECT,
            env=dict(env, ASPNETCORE_ENVIRONMENT='Development', ASPNETCORE_URLS=base, Auth__RequestsPerMinute=str(limit)),
            stdout=log, stderr=subprocess.STDOUT,
        )
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            if process.poll() is not None:
                raise AssertionError('API exited early.')
            try:
                with Client().http.open(base + '/api/posts', timeout=1) as response:
                    if response.status == 200:
                        return
            except (OSError, urllib.error.URLError):
                time.sleep(.1)
        raise AssertionError('API startup timed out.')

    with open(Path(temporary) / 'api.log', 'w+') as log:
        try:
            start()
            guest = Client()
            posts, _ = guest.request('GET', '/api/posts')
            assert len(posts) == 9 and posts[0]['title'] == 'Legacy article'
            assert posts[0]['authorId'] is None and posts[0]['publishedAt'].endswith('Z')
            guest.request('GET', '/api/auth/me', expected=401)
            payload = dict(title='HTTP test', excerpt='Summary', content='<p>Content</p>', tags=[' Test ', 'test', 'SQLite'])
            guest.request('POST', '/api/posts', payload, expected=401)
            guest.request('POST', '/api/auth/register', {'email':'a@example.com','password':password}, expected=400, csrf=False)
            guest.request('POST', '/api/auth/login', {'email':'a@example.com','password':password}, expected=400, csrf=False)
            for bad in ({}, {'email':'bad','password':password}, {'email':'a@example.com','password':'short'},
                        {'email':'a@example.com','password':'x'*129}, {'email':'a@example.com','password':None}):
                guest.request('POST', '/api/auth/register', bad, expected=400)
            alice = Client()
            user, headers = alice.request('POST', '/api/auth/register', {'email':' Alice@example.com ', 'password':password}, expected=201)
            assert set(user) == {'id', 'email', 'createdAt'} and user['email'] == 'Alice@example.com'
            assert user['createdAt'].endswith('Z')
            assert 'no-store' in headers['Cache-Control']
            cookie = next(cookie for cookie in alice.jar if cookie.name == 'WebBlog.Auth')
            attributes = {key.lower(): value for key, value in cookie._rest.items()}
            assert 'httponly' in attributes and attributes['samesite'].lower() == 'strict'
            current, _ = alice.request('GET', '/api/auth/me')
            assert current == user
            guest.request('POST', '/api/auth/register', {'email':'ALICE@EXAMPLE.COM','password':password}, expected=409)
            wrong, _ = guest.request('POST', '/api/auth/login', {'email':'alice@example.com','password':'wrong password'}, expected=401)
            missing, _ = guest.request('POST', '/api/auth/login', {'email':'missing@example.com','password':'wrong password'}, expected=401)
            assert wrong['title'] == missing['title'] == 'Email hoặc mật khẩu không đúng.'
            with sqlite3.connect(database) as db:
                hashed, = db.execute('SELECT PasswordHash FROM Users WHERE Id=?', (user['id'],)).fetchone()
                assert hashed != password and len(hashed) > 60
            # Registration race: the DB unique index is the final arbiter.
            def race(_):
                client = Client()
                result, _ = client.request('POST', '/api/auth/register', {'email':'race@example.com','password':password}, expected=(201,409))
                return result.get('status', 201)
            with ThreadPoolExecutor(max_workers=2) as pool:
                assert sorted(pool.map(race, [0,1])) == [201,409]
            bob = Client()
            other, _ = bob.request('POST', '/api/auth/register', {'email':'bob@example.com','password':password}, expected=201)
            created, headers = alice.request('POST', '/api/posts', {**payload,'author':'forged','authorId':other['id']}, expected=201)
            post_id = created['id']
            assert created['authorId'] == user['id'] and created['author'] == user['email']
            assert created['tags'] == ['Test', 'SQLite'] and headers['Location'].endswith(f'/api/posts/{post_id}')
            loaded, _ = guest.request('GET', f'/api/posts/{post_id}')
            assert loaded == created
            bob.request('PUT', f'/api/posts/{post_id}', payload, expected=403)
            bob.request('DELETE', f'/api/posts/{post_id}', expected=403)
            alice.request('PUT', '/api/posts/1', payload, expected=403)  # Seed articles have no owner.
            alice.request('POST', '/api/posts', payload, expected=400, csrf=False)
            alice.request('PUT', f'/api/posts/{post_id}', payload, expected=400, csrf=False)
            alice.request('DELETE', f'/api/posts/{post_id}', expected=400, csrf=False)
            for bad in ({'title':' '}, {'title':'x'*201}, {'tags':None}, {'tags':[None]}, {'tags':['']}, {'tags':['x'*41]}, {'tags':['x']*11}):
                alice.request('POST', '/api/posts', {**payload, **bad}, expected=400)
            updated, _ = alice.request('PUT', f'/api/posts/{post_id}', {**payload, 'title':'Updated', 'tags':['Changed']})
            assert updated['publishedAt'] == created['publishedAt']
            tags, _ = guest.request('GET', '/api/tags')
            assert {'name':'Changed','count':1} in tags
            alice.request('PUT', '/api/posts/999999', payload, expected=404)
            _, headers = guest.request('OPTIONS', '/api/auth/login', headers={
                'Origin':'http://localhost:5173','Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type,x-csrf-token'}, expected=204)
            assert headers['Access-Control-Allow-Origin'] == 'http://localhost:5173'
            assert headers['Access-Control-Allow-Credentials'] == 'true'
            _, headers = guest.request('OPTIONS', '/api/auth/login', headers={
                'Origin':'https://untrusted.example','Access-Control-Request-Method':'POST'}, expected=204)
            assert headers.get('Access-Control-Allow-Origin') is None
            # Old anonymous CSRF tokens must not authenticate writes under a new identity.
            old = Client()
            old_token, _ = old.request('GET', '/api/auth/csrf')
            old.request('POST', '/api/auth/login', {'email':'alice@example.com','password':password})
            old.request('POST', '/api/posts', payload, headers={'X-CSRF-TOKEN':old_token['token']}, csrf=False, expected=400)
            replay = Client()
            for saved_cookie in old.jar:
                replay.jar.set_cookie(copy.copy(saved_cookie))
            old.request('POST', '/api/auth/logout', expected=204)
            old.request('GET', '/api/auth/me', expected=401)
            replay.request('GET', '/api/auth/me', expected=401)  # Cookie replay after logout is revoked in DB.
            old.request('POST', '/api/auth/logout', expected=204)
            # Other devices keep their independent session; reload/restart preserve valid cookies.
            alice.request('GET', '/api/auth/me')
            stop()
            start()
            alice.request('GET', '/api/auth/me')
            loaded, _ = guest.request('GET', f'/api/posts/{post_id}')
            assert loaded['title'] == 'Updated'
            with sqlite3.connect(database) as db:
                db.execute("UPDATE AuthSessions SET ExpiresAt='2000-01-01 00:00:00' WHERE UserId=?", (other['id'],))
            bob.request('GET', '/api/auth/me', expected=401)
            alice.request('DELETE', f'/api/posts/{post_id}', expected=204)
            guest.request('GET', f'/api/posts/{post_id}', expected=404)
            alice.request('DELETE', f'/api/posts/{post_id}', expected=404)
            tags, _ = guest.request('GET', '/api/tags')
            assert not any(tag['name']=='Changed' for tag in tags)
            # A fresh limiter instance with a small configured budget exercises 429 deterministically.
            stop()
            start(limit=3)
            for _ in range(3):
                guest.request('POST', '/api/auth/login', {'email':'missing@example.com','password':password}, expected=401)
            guest.request('POST', '/api/auth/login', {'email':'missing@example.com','password':password}, expected=429)
        except Exception:
            log.flush()
            log.seek(0)
            print(log.read())
            raise
        finally:
            stop()
    run('ef', 'database', 'update', 'InitialCreate', '--project', str(PROJECT), '--no-build', env=env)
    with sqlite3.connect(database) as db:
        assert db.execute('SELECT count(*) FROM Posts').fetchone()[0] == 9
    run('ef', 'database', 'update', '--project', str(PROJECT), '--no-build', env=env)
    print(f'PASS: {checks} HTTP requests checked; auth, hashing, duplicate/race, sessions, ownership, CSRF, CORS, rate limit, migration upgrade/rollback and old data preservation.')
