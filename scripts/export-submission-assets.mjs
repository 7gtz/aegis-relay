/** Export editable brand artwork to PNG. Run with: pnpm submission:assets. */
import { chromium } from '../apps/console/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = {
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
};
const server = createServer(async (req, res) => {
  try {
    const path = resolve(
      root,
      '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
    );
    if (!path.startsWith(root + sep) || !(await stat(path)).isFile()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      'Content-Type': types[extname(path)] ?? 'application/octet-stream',
    });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
let browser;
try {
  const { port } = server.address();
  browser = await chromium.launch();
  const out = resolve(root, 'docs/submission/assets');
  await mkdir(out, { recursive: true });
  for (const [file, width, height, route] of [
    ['thumbnail.png', 1200, 800, 'artwork.html'],
    ['cover.png', 1920, 1080, 'artwork.html?variant=cover'],
    ['social-card.png', 1200, 630, 'artwork.html?variant=social'],
    ['mark.png', 1024, 1024, 'mark.html'],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    await page.goto(`http://127.0.0.1:${port}/docs/submission/${route}`, {
      waitUntil: 'networkidle',
    });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: resolve(out, file),
      omitBackground: file === 'mark.png',
    });
    await page.close();
    process.stdout.write(`${file}: ${width} × ${height}\n`);
  }
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
