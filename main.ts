// news-image-20261127: write the front-page image to the output directory.
//
// The image is shipped in this repository as entry.png; this program copies
// it byte-for-byte, so the output is fully deterministic: the same input
// bytes always produce the same output bytes.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

if (!existsSync(src)) {
  throw new Error(`entry.png not found next to main.ts (looked in ${here})`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

// Verify the copy: same byte count as the source, so the run is exact.
const srcBytes = statSync(src).size;
const destBytes = statSync(dest).size;
if (srcBytes !== destBytes) {
  throw new Error(`copy mismatch: wrote ${destBytes} bytes, expected ${srcBytes}`);
}
console.log(`wrote ${dest} (${destBytes} bytes)`);
