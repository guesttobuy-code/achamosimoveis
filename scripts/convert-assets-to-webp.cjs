/**
 * Converte as 8 PNGs do home (~19MB total) pra WebP qualidade 82.
 * Redução esperada: 80-90% (de ~2.4MB cada pra ~250-400KB).
 *
 * Uso: node scripts/convert-assets-to-webp.cjs
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');
const QUALITY = 82; // ótimo balanço pra fotos

async function main() {
  const files = fs.readdirSync(ASSETS_DIR).filter((f) => f.endsWith('.png'));
  console.log(`Convertendo ${files.length} PNGs pra WebP...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputPath = path.join(ASSETS_DIR, file.replace(/\.png$/, '.webp'));

    const beforeSize = fs.statSync(inputPath).size;
    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
    const afterSize = fs.statSync(outputPath).size;

    totalBefore += beforeSize;
    totalAfter += afterSize;

    const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
    console.log(
      `  ${file.padEnd(34)} ${(beforeSize / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB  (-${reduction}%)`,
    );
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB  (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
