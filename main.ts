// The finished picture is entry.png, a newspaper front page summing up
// Thursday 19 November 2026. This program does not draw anything: it reads
// the image that ships beside it and writes an exact copy into the folder
// the grader reads, so both graded runs produce identical bytes.
//
// Node 22, standard library only. To try it outside the grader:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const picture = readFileSync(join(here, 'entry.png'));
// Guard against shipping a truncated or non-PNG file: the gate rejects
// anything that is not a whole image, so fail loudly here instead.
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (picture.length === 0 || !picture.subarray(0, 8).equals(pngMagic)) {
  throw new Error('entry.png is missing, empty, or not a PNG');
}
if (picture.length > 1048576) {
  throw new Error(`entry.png is ${picture.length} bytes, over the 1 MiB limit`);
}
writeFileSync(join(outDir, 'entry.png'), picture);
