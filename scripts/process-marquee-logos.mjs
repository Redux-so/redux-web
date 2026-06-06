import fs from "node:fs/promises";
import path from "node:path";

const ASSETS_DIR =
  "/Users/levipurkey/.cursor/projects/Users-levipurkey-redux-web/assets";
const OUTPUT_DIR = "public/marquee";

const logos = [
  {
    src: "4-removebg-preview-45699210-7b35-47a6-b2e3-feda76b40662.png",
    dest: "photoshop.png",
    name: "Adobe Photoshop",
  },
  {
    src: "5-removebg-preview-700e9109-e9d0-496e-9d98-16d0e5d91380.png",
    dest: "lightroom.png",
    name: "Adobe Lightroom",
  },
  {
    src: "1-removebg-preview-81e9cebb-3c0f-4ed7-a734-a6c16146d7a9.png",
    dest: "luminar-neo.png",
    name: "Luminar Neo",
  },
  {
    src: "3-removebg-preview-7bd3dfc5-4ccb-4d59-8c36-6990c920eb79.png",
    dest: "canva.png",
    name: "Canva",
  },
  {
    src: "2-removebg-preview-614475fe-249b-44bb-8c64-cbc44a9a5c82.png",
    dest: "figma.png",
    name: "Figma",
  },
];

await fs.mkdir(OUTPUT_DIR, { recursive: true });

for (const { src, dest, name } of logos) {
  const inputPath = path.join(ASSETS_DIR, src);
  const outputPath = path.join(OUTPUT_DIR, dest);
  await fs.copyFile(inputPath, outputPath);
  console.log(`Copied ${outputPath} (${name})`);
}
