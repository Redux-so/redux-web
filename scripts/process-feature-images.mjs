import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const ASSETS_DIR =
  "/Users/levipurkey/.cursor/projects/Users-levipurkey-redux-web/assets";
const OUTPUT_DIR = "public/features";

const EDITOR_SCREENSHOT =
  "Screenshot_2026-06-05_at_5.05.33_PM-16bea840-c7ae-464f-8937-186a873026bf.png";

const OUTPUT_WIDTH = 1200;
const OUTPUT_HEIGHT = 800;

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const editorPath = path.join(ASSETS_DIR, EDITOR_SCREENSHOT);
const mountFujiPath = "public/showcase/mount-fuji.jpg";
const demoPhotoPath = "public/showcase/demo-photo.jpg";

async function writePng(name, pipeline) {
  const outputPath = path.join(OUTPUT_DIR, name);
  await pipeline.png({ quality: 95 }).toFile(outputPath);
  console.log(`Wrote ${outputPath}`);
}

// Conversational editing — full editor UI mockup from the showcase screenshot.
await writePng(
  "conversational-editing.png",
  sharp(editorPath).resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, {
    fit: "cover",
    position: "centre",
  }),
);

// Style match — reference thumbnail + main canvas with a stylized grade.
const tokyoRef = await sharp(editorPath)
  .extract({ left: 280, top: 80, width: 420, height: 520 })
  .resize(280, 360, { fit: "cover" })
  .modulate({ saturation: 1.35, brightness: 1.05 })
  .toBuffer();

const fujiMain = await sharp(mountFujiPath)
  .resize(760, 640, { fit: "cover", position: "centre" })
  .modulate({ saturation: 0.75, brightness: 0.92, hue: 8 })
  .tint({ r: 104, g: 47, b: 191 })
  .toBuffer();

const styleMatchSvg = `
<svg width="${OUTPUT_WIDTH}" height="${OUTPUT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#080808"/>
  <rect x="40" y="40" width="1120" height="720" rx="16" fill="#111111" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="72" y="88" fill="#888888" font-family="-apple-system, system-ui, sans-serif" font-size="13" letter-spacing="0.08em">STYLE MATCH</text>
  <rect x="72" y="110" width="300" height="400" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="92" y="142" fill="#666666" font-family="-apple-system, system-ui, sans-serif" font-size="12">Reference</text>
  <rect x="420" y="110" width="700" height="580" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="440" y="142" fill="#666666" font-family="-apple-system, system-ui, sans-serif" font-size="12">Your photo</text>
  <rect x="72" y="540" width="300" height="48" rx="12" fill="rgba(104,47,191,0.2)" stroke="rgba(104,47,191,0.45)" stroke-width="1"/>
  <text x="122" y="570" fill="#B07EF0" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="500">✦ Match Style</text>
</svg>`;

const styleMatchBase = await sharp(Buffer.from(styleMatchSvg))
  .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT)
  .png()
  .toBuffer();

await writePng(
  "style-match.png",
  sharp(styleMatchBase)
    .composite([
      { input: tokyoRef, left: 92, top: 158 },
      { input: fujiMain, left: 440, top: 158 },
    ]),
);

// Smart search — library search UI with a photo result grid.
const gridPhotos = await Promise.all(
  [
    { src: demoPhotoPath, left: 72, top: 180 },
    { src: mountFujiPath, left: 412, top: 180 },
    { src: demoPhotoPath, left: 752, top: 180 },
    { src: mountFujiPath, left: 72, top: 430 },
    { src: demoPhotoPath, left: 412, top: 430 },
    { src: mountFujiPath, left: 752, top: 430 },
  ].map(async ({ src, left, top }) => ({
    input: await sharp(src)
      .resize(320, 230, { fit: "cover", position: "centre" })
      .toBuffer(),
    left,
    top,
  })),
);

const smartSearchSvg = `
<svg width="${OUTPUT_WIDTH}" height="${OUTPUT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#080808"/>
  <rect x="40" y="40" width="1120" height="720" rx="16" fill="#111111" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="72" y="88" fill="#888888" font-family="-apple-system, system-ui, sans-serif" font-size="13" letter-spacing="0.08em">LIBRARY</text>
  <rect x="72" y="108" width="1056" height="52" rx="12" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <circle cx="98" cy="134" r="10" fill="none" stroke="#666666" stroke-width="2"/>
  <line x1="106" y1="142" x2="114" y2="150" stroke="#666666" stroke-width="2" stroke-linecap="round"/>
  <text x="132" y="140" fill="#ededed" font-family="-apple-system, system-ui, sans-serif" font-size="15">Find any photo of a dog in a hat</text>
</svg>`;

const smartSearchBase = await sharp(Buffer.from(smartSearchSvg))
  .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT)
  .png()
  .toBuffer();

await writePng(
  "smart-search.png",
  sharp(smartSearchBase).composite(gridPhotos),
);

console.log("Feature images ready.");
