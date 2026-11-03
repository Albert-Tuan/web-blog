// Real-browser auth/CRUD integration test with disposable DB and two browser users.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.join(root, 'backend/WebBlog.Api');
const temporary = await mkdtemp(path.join(tmpdir(), 'web-blog-browser-'));
const environment = { ...process.env, ConnectionStrings__BlogDatabase: `Data Source=${path.join(temporary, 'test.db')}` };
let servers = [], browser, logs = '';

async function freePort() {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
function dotnet(...args) {
  const result = spawnSync('dotnet', args, { cwd: root, env: environment, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.error?.message || result.stdout + result.stderr);
}
function serve(command, args, cwd, env) {
  const process = spawn(command, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
  process.stdout.on('data', text => { logs += text; });
  process.stderr.on('data', text => { logs += text; });
  servers.push(process);
}
async function ready(url) {
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(url)).ok) return; } catch { /* Starting up. */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Server not ready: ${url}\n${logs}`);
}
async function stop(process) {
  if (process.exitCode !== null) return;
  await new Promise(resolve => {
    const timer = setTimeout(() => { process.kill('SIGKILL'); }, 5000);
    process.once('exit', () => { clearTimeout(timer); resolve(); });
    process.kill('SIGTERM');
  });
}

try {
  dotnet('tool', 'restore');
  dotnet('build', project);
  dotnet('ef', 'database', 'update', '--project', project, '--no-build');
  const apiPort = await freePort(), webPort = await freePort();
  const web = `http://127.0.0.1:${webPort}`, api = `http://127.0.0.1:${apiPort}`;
  serve('dotnet', [path.join(project, 'bin/Debug/net10.0/WebBlog.Api.dll')], project, {
    ...environment, ASPNETCORE_ENVIRONMENT: 'Development', ASPNETCORE_URLS: api,
    Cors__AllowedOrigins__0: web, Auth__RequestsPerMinute: '200', Logging__LogLevel__Default: 'Warning',
  });
  serve(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', `${webPort}`, '--strictPort'], root, {
    ...process.env, VITE_API_BASE_URL: `${api}/api`,
  });
  await ready(api + '/api/posts');
  await ready(web);
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
  const alice = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await alice.newPage();
  const exceptions = [], methods = new Set();
  page.on('pageerror', error => exceptions.push(error.message));
  page.on('request', request => { if (request.url().startsWith(api + '/api/posts')) methods.add(request.method()); });
  const password = 'Browser test passphrase 2026!';

  await page.goto(web + '/blog/new');
  await page.waitForURL(web + '/login');
  await page.locator('.auth-card').getByRole('link', { name: 'Đăng ký', exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill('alice@example.com');
  await page.getByLabel('Mật khẩu', { exact: true }).fill('short');
  assert.equal(await page.getByLabel('Mật khẩu', { exact: true }).evaluate(input => input.checkValidity()), false);
  await page.getByLabel('Mật khẩu', { exact: true }).fill(password);
  await page.getByLabel('Nhập lại mật khẩu').fill('does not match');
  await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
  await page.getByText('Mật khẩu nhập lại không khớp.', { exact: true }).waitFor();
  await page.getByLabel('Nhập lại mật khẩu').fill(password);
  await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();
  await page.waitForURL(web + '/blog/new');
  await page.getByLabel('Tiêu đề').fill('Bài viết của Alice');
  await page.getByLabel('Tóm tắt').fill('Context + Axios + cookie');
  await page.getByLabel('Nội dung (hỗ trợ HTML cơ bản)').fill('<h2>Nội dung an toàn</h2><img src="x" onerror="window.xssExecuted=true"><script>window.xssExecuted=true</script>');
  await page.getByLabel('Tags (phân cách bằng dấu phẩy; tối đa 10 tag, 40 ký tự/tag)').fill('BrowserTest, React');
  await page.getByRole('button', { name: 'Tạo bài viết', exact: true }).click();
  await page.waitForURL(/\/blog\/\d+$/);
  const article = page.url();
  await page.getByRole('heading', { name: 'Nội dung an toàn' }).waitFor();
  assert.equal(await page.evaluate(() => window.xssExecuted), undefined);
  assert.equal(await page.locator('.post-content script, .post-content [onerror]').count(), 0);
  const cached = await page.evaluate(() => JSON.parse(localStorage.getItem('webblog.user')));
  assert.deepEqual(Object.keys(cached).sort(), ['createdAt', 'email', 'id']);
  assert.equal(cached.email, 'alice@example.com');
  assert.ok((await alice.cookies()).find(cookie => cookie.name === 'WebBlog.Auth')?.httpOnly);
  assert.ok(!(await page.evaluate(() => document.cookie)).includes('WebBlog.Auth'));
  await page.reload();
  await page.getByRole('link', { name: 'Sửa bài viết', exact: true }).waitFor();
  await page.getByRole('link', { name: 'Sửa bài viết', exact: true }).click();
  await page.getByLabel('Tiêu đề').fill('Alice đã sửa');
  await page.getByRole('button', { name: 'Lưu thay đổi' }).click();
  await page.waitForURL(article);
  await page.getByRole('heading', { name: 'Alice đã sửa' }).waitFor();
  await page.goto(web + '/tags');
  await page.getByRole('link', { name: 'BrowserTest (1)', exact: true }).click();
  await page.locator('.post-card').first().waitFor();
  assert.equal(await page.locator('.post-card').count(), 1);

  const bob = await browser.newContext();
  const other = await bob.newPage();
  await other.goto(web + '/register');
  await other.getByLabel('Email', { exact: true }).fill('ALICE@EXAMPLE.COM');
  await other.getByLabel('Mật khẩu', { exact: true }).fill(password);
  await other.getByLabel('Nhập lại mật khẩu').fill(password);
  await other.getByRole('button', { name: 'Đăng ký', exact: true }).click();
  await other.getByText('Email đã được đăng ký.', { exact: true }).waitFor();
  await other.getByLabel('Email', { exact: true }).fill('bob@example.com');
  await other.getByRole('button', { name: 'Đăng ký', exact: true }).click();
  await other.waitForURL(web + '/account');
  await other.goto(article);
  await other.getByRole('heading', { name: 'Alice đã sửa' }).waitFor();
  assert.equal(await other.getByRole('link', { name: 'Sửa bài viết', exact: true }).count(), 0);
  await other.goto(article + '/edit');
  await other.getByRole('alert').waitFor();
  assert.match(await other.getByRole('alert').innerText(), /chỉ được sửa bài viết do mình tạo/);
  assert.equal(await other.locator('form').count(), 0);

  // Cross-tab logout invalidates Context in another tab, not just the visible account page.
  const secondTab = await alice.newPage();
  await secondTab.goto(web + '/account');
  await secondTab.getByRole('heading', { name: 'Tài khoản của bạn' }).waitFor();
  await page.goto(web + '/account');
  await page.getByRole('button', { name: 'Đăng xuất', exact: true }).click();
  await page.waitForURL(web + '/login');
  await secondTab.waitForURL(web + '/login');
  assert.equal(await page.evaluate(() => localStorage.getItem('webblog.user')), null);
  await page.getByLabel('Email', { exact: true }).fill('ALICE@example.com');
  await page.getByLabel('Mật khẩu', { exact: true }).fill('wrong password');
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.getByText('Email hoặc mật khẩu không đúng.', { exact: true }).waitFor();
  await page.getByLabel('Mật khẩu', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  await page.waitForURL(web + '/account');
  await page.getByRole('heading', { name: 'Tài khoản của bạn' }).waitFor();
  await page.evaluate(() => localStorage.setItem('webblog.user', '{broken-json'));
  await page.reload();
  await page.getByRole('heading', { name: 'Tài khoản của bạn' }).waitFor();
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('webblog.user')).email), 'alice@example.com');
  await secondTab.close();

  // Failure to reach /me must not grant access from cached user data.
  await page.route('**/api/auth/me', route => route.abort());
  await page.reload();
  await page.getByRole('alert').waitFor();
  assert.match(await page.getByRole('alert').innerText(), /Không kết nối được API/);
  assert.equal(await page.getByRole('heading', { name: 'Tài khoản của bạn' }).count(), 0);
  await page.unroute('**/api/auth/me');
  await page.getByRole('button', { name: 'Thử lại' }).click();
  await page.getByRole('heading', { name: 'Tài khoản của bạn' }).waitFor();
  await page.goto(article);
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Xóa bài viết', exact: true }).click();
  assert.equal(page.url(), article);
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Xóa bài viết', exact: true }).click();
  await page.waitForURL(web + '/blog');
  await page.goto(article);
  await page.getByRole('alert').waitFor();
  assert.match(await page.getByRole('alert').innerText(), /Không tìm thấy/);
  // A forged user cache after cookie removal cannot enter protected routes.
  await alice.clearCookies();
  await page.evaluate(() => localStorage.setItem('webblog.user', JSON.stringify({ id: 1, email: 'forged@example.com', createdAt: '2026-01-01' })));
  await page.goto(web + '/account');
  await page.waitForURL(web + '/login');
  assert.equal(await page.evaluate(() => localStorage.getItem('webblog.user')), null);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(web + '/register');
  await page.getByRole('heading', { name: 'Tạo tài khoản' }).waitFor();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  if (process.env.BROWSER_SCREENSHOT) await page.screenshot({ path: process.env.BROWSER_SCREENSHOT, fullPage: true });
  assert.deepEqual(exceptions, []);
  for (const method of ['GET', 'POST', 'PUT', 'DELETE']) assert.ok(methods.has(method), method);
  console.log('PASS: browser register/login/logout, validation, localStorage/reload/corrupt/forged cache, cross-tab sync, outage/retry, ownership, Axios CRUD, HTML sanitization and mobile layout.');
} catch (error) {
  await writeFile(path.join(temporary, 'servers.log'), logs);
  console.error(error);
  console.error(`Server logs: ${path.join(temporary, 'servers.log')}`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  await Promise.all(servers.map(stop));
  if (!process.exitCode) await rm(temporary, { recursive: true, force: true });
}
