import type { StaticImageData } from "next/image";

import cnTower from "@/public/hero-orbit/cn-tower.webp";
import dubaiArchitecture from "@/public/hero-orbit/dubai-architecture.webp";
import greenLeaves from "@/public/hero-orbit/green-leaves.webp";
import handSanitizer from "@/public/hero-orbit/hand-sanitizer.webp";
import japaneseLanterns from "@/public/hero-orbit/japanese-lanterns.webp";
import livingRoom from "@/public/hero-orbit/living-room.webp";
import luxuryWatch from "@/public/hero-orbit/luxury-watch.webp";
import mountainLake from "@/public/hero-orbit/mountain-lake.webp";
import sportsCar from "@/public/hero-orbit/sports-car.webp";
import tokyoNeon from "@/public/hero-orbit/tokyo-neon.webp";

export type HeroOrbitPhoto = {
  src: StaticImageData;
};

/** Sample photos for the hero orbit background tiles (optimized WebP, content-hashed at build). */
export const HERO_ORBIT_PHOTOS = [
  { src: mountainLake },
  { src: japaneseLanterns },
  { src: handSanitizer },
  { src: livingRoom },
  { src: tokyoNeon },
  { src: dubaiArchitecture },
  { src: greenLeaves },
  { src: luxuryWatch },
  { src: cnTower },
  { src: sportsCar },
] as const satisfies readonly HeroOrbitPhoto[];

export function getHeroOrbitPhoto(index: number): HeroOrbitPhoto {
  return HERO_ORBIT_PHOTOS[index % HERO_ORBIT_PHOTOS.length];
}
