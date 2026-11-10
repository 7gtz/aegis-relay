/** Check committed documentation links and JSON syntax without extra dependencies. */
import { execFileSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = execFileSync('git', ['ls-files', '-z'], {
  cwd: root,
  encoding: 'utf8',
})
  .split('\0')
  .filter(Boolean);
const errors = [];
let links = 0;
let jsonFiles = 0;
for (const file of files) {
  if (file.endsWith('.json')) {
    try {
      JSON.parse(await readFile(resolve(root, file), 'utf8'));
      jsonFiles++;
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
    }
  }
  if (!file.endsWith('.md')) continue;
  const body = (await readFile(resolve(root, file), 'utf8')).replace(
    /```[\s\S]*?```/g,
    '',
  );
  for (const [, target] of body.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const path = target.split('#')[0];
    if (!path || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) continue;
    try {
      await access(resolve(root, dirname(file), decodeURIComponent(path)));
      links++;
    } catch {
      errors.push(`${file}: missing link target ${target}`);
    }
  }
}
if (errors.length) {
  process.stderr.write(errors.join('\n') + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Repository check: ${links} local documentation links and ${jsonFiles} JSON files valid.\n`,
  );
}
