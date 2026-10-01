/**
 * Resize a single squircle favicon tile for public/ and metadata.
 *
 * Usage:
 *   node scripts/process-favicons.mjs <favicon-tile.png>
 *
 * Writes:
 *   public/favicon.png            (32×32, tab icon)
 *   public/apple-touch-icon.png   (180×180, same artwork)
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const TAB_ICON_PX = 32;
const APPLE_TOUCH_PX = 180;

/** ~iOS app-icon corner radius relative to edge length. */
const SQUIRCLE_RADIUS_RATIO = 0.223;

function squircleMaskSvg(size) {
  const radius = size * SQUIRCLE_RADIUS_RATIO;
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`,
  );
}

async function writeResized(source, dest, size) {
  const mask = squircleMaskSvg(size);
  await sharp(source)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(dest);
}

async function main() {
  const source = process.argv[2];
  if (!source) {
    console.error("Usage: node scripts/process-favicons.mjs <favicon-tile.png>");
    process.exit(1);
  }

  await writeResized(source, join(publicDir, "favicon.png"), TAB_ICON_PX);
  await writeResized(
    source,
    join(publicDir, "apple-touch-icon.png"),
    APPLE_TOUCH_PX,
  );

  console.log("Wrote public/favicon.png, public/apple-touch-icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
