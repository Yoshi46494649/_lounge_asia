import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { chromium } from 'playwright';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SERVER_PORT = 5173;
const TARGET_PATH = process.env.CHECK_PATH ? String(process.env.CHECK_PATH) : '/';
const NORMALIZED_PATH = TARGET_PATH.startsWith('/') ? TARGET_PATH : `/${TARGET_PATH}`;
const SERVER_URL = `http://localhost:${SERVER_PORT}${NORMALIZED_PATH}`;
const SCREENSHOT_DIR = join(ROOT, 'screenshots');
const SCREENSHOT_BASENAME =
  NORMALIZED_PATH === '/' ? 'localhost-5173.png' : `localhost-5173${NORMALIZED_PATH.replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}.png`;
const SCREENSHOT_PATH = join(SCREENSHOT_DIR, SCREENSHOT_BASENAME);

/** Poll until the given predicate resolves true or timeout is exceeded. */
async function waitUntil(predicate, { timeout = 15_000, interval = 250 } = {}) {
  const start = Date.now();
  while (true) {
    if (await predicate()) return;
    if (Date.now() - start > timeout) {
      throw new Error(`Timeout of ${timeout}ms exceeded`);
    }
    await delay(interval);
  }
}

/** Start a python simple HTTP server that serves the repo root. */
function startServer() {
  const child = spawn('python', ['-m', 'http.server', `${SERVER_PORT}`], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, PYTHONUNBUFFERED: '1' },
  });
  child.once('error', (err) => {
    console.error('[server] failed to start', err);
  });
  return child;
}

async function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  child.kill();
  try {
    await once(child, 'exit');
  } catch {
    /* ignore */
  }
}

async function isServerReady() {
  try {
    const response = await fetch(SERVER_URL, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function run() {
  console.log('Starting local HTTP server…');
  const server = startServer();
  try {
    await waitUntil(isServerReady, { timeout: 20000, interval: 300 });
    console.log('Server is ready. Launching Playwright…');

    await ensureDir(SCREENSHOT_DIR);
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', (msg) => {
      const entry = `[console:${msg.type()}] ${msg.text()}`;
      console.log(entry);
      if (msg.type() === 'error') {
        consoleErrors.push(entry);
      }
    });
    page.on('pageerror', (error) => {
      const entry = `[pageerror] ${error.stack || error.message}`;
      console.log(entry);
      consoleErrors.push(entry);
    });

    const response = await page.goto(SERVER_URL, { waitUntil: 'networkidle', timeout: 15000 });
    if (!response || !response.ok()) {
      throw new Error(`Failed to load ${SERVER_URL}: ${response?.status()} ${response?.statusText()}`);
    }

    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
    console.log(`Screenshot saved to ${SCREENSHOT_PATH}`);

    await browser.close();

    if (consoleErrors.length > 0) {
      const message = consoleErrors.join('\n');
      await writeFile(join(SCREENSHOT_DIR, 'last-error.log'), message, 'utf8');
      throw new Error(`Console errors detected:\n${message}`);
    }

    console.log('No console errors detected. Page looks good.');
  } finally {
    await stopServer(server);
    console.log('Local HTTP server stopped.');
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
