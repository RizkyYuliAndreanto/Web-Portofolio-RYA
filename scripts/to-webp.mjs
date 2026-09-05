// ponytail: converts in-place next to originals; originals kept unless --replace.
// add quality presets / avif when needed.
import { readdir, stat, readFile, writeFile, unlink, rename } from 'node:fs/promises';
import { join, extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['src/assets', 'public/parallax', 'public/parallax-v2', 'public/foundry'];
const CODE_EXTS = ['.vue', '.js', '.ts', '.css', '.html'];
const WRITE = process.argv.includes('-w');
const REPLACE = process.argv.includes('--replace'); // delete originals + rewrite code refs

const walk = async dir => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
};

const fmt = n => (n / 1024 / 1024).toFixed(2) + ' MB';

let before = 0, after = 0, count = 0;
for (const dir of DIRS) {
  const files = (await walk(join(ROOT, dir))).filter(f =>
    ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()));
  for (const src of files) {
    const dest = src.replace(/\.(jpe?g|png)$/i, '.webp');
    const s = await stat(src);
    const img = sharp(src);
    const isPng = extname(src).toLowerCase() === '.png';
    // png: keep alpha, palette-ish sizes; jpg: q80 mozjpeg-ish effort
    await img[isPng ? 'png' : 'jpeg']().webp({ quality: 80, alphaQuality: 85 }).toFile(dest);
    const d = await stat(dest);
    before += s.size; after += d.size; count++;
    const saved = ((1 - d.size / s.size) * 100).toFixed(0);
    if (d.size < s.size) {
      console.log(`${WRITE ? 'OK ' : 'DRY'} ${saved.padStart(3)}%  ${src.replace(ROOT + '\\', '')}`);
      if (WRITE && REPLACE) await unlink(src);
    } else {
      console.log(`SKIP (bigger) ${src.replace(ROOT + '\\', '')}`);
      if (WRITE) await unlink(dest); // webp larger than source: pointless
    }
  }
}

if (WRITE && REPLACE) {
  const codeFiles = (await walk(join(ROOT, 'src'))).filter(f => CODE_EXTS.includes(extname(f)));
  for (const f of codeFiles) {
    let text = await readFile(f, 'utf8');
    const next = text.replace(/\.(jpe?g|png)(?=['")\s])/gi, '.webp');
    if (next !== text) { await writeFile(f, next); console.log(`REFS ${f.replace(ROOT + '\\', '')}`); }
  }
}

console.log(`\n${count} files: ${fmt(before)} → ${fmt(after)}  (saves ${fmt(before - after)})`);
if (!WRITE) console.log('dry run — run `node scripts/to-webp.mjs -w` to convert, add --replace to delete originals & update code refs');
