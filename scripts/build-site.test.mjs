import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
  access,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'aegis-site-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'scripts'));
  await copyFile(
    join(dirname(fileURLToPath(import.meta.url)), 'build-site.mjs'),
    join(root, 'scripts/build-site.mjs'),
  );
  return root;
}

function build(root) {
  return spawnSync(process.execPath, [join(root, 'scripts/build-site.mjs')], {
    encoding: 'utf8',
  });
}

test('a missing console build fails before touching the previous release', async (t) => {
  const root = await fixture(t);
  await mkdir(join(root, 'dist'));
  await writeFile(join(root, 'dist/index.html'), 'previous release');
  const result = build(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /console has not been built/);
  assert.equal(
    await readFile(join(root, 'dist/index.html'), 'utf8'),
    'previous release',
  );
});

test('assembly replaces stale output and preserves both apps and their relative assets', async (t) => {
  const root = await fixture(t);
  for (const dir of ['apps/site/assets', 'apps/console/dist/demo', 'dist'])
    await mkdir(join(root, dir), { recursive: true });
  await writeFile(
    join(root, 'apps/site/index.html'),
    '<img src="./assets/atlas.svg">',
  );
  await writeFile(join(root, 'apps/site/assets/atlas.svg'), '<svg/>');
  await writeFile(
    join(root, 'apps/console/dist/index.html'),
    '<a href="./demo/index.json">demo</a>',
  );
  await writeFile(
    join(root, 'apps/console/dist/demo/index.json'),
    '{"recorded":true}',
  );
  await writeFile(join(root, 'dist/stale.txt'), 'stale');
  const result = build(root);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    await readFile(join(root, 'dist/assets/atlas.svg'), 'utf8'),
    '<svg/>',
  );
  assert.equal(
    await readFile(join(root, 'dist/index.html'), 'utf8'),
    '<img src="./assets/atlas.svg">',
  );
  assert.equal(
    await readFile(join(root, 'dist/console/index.html'), 'utf8'),
    '<a href="./demo/index.json">demo</a>',
  );
  assert.deepEqual(
    JSON.parse(
      await readFile(join(root, 'dist/console/demo/index.json'), 'utf8'),
    ),
    { recorded: true },
  );
  await assert.rejects(access(join(root, 'dist/stale.txt')), {
    code: 'ENOENT',
  });
});
