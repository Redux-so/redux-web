export type HeroOrbitPhoto = {
  src: string;
};

/** Sample photos for the hero orbit background tiles (optimized WebP). */
export const HERO_ORBIT_PHOTOS = [
  { src: "/hero-orbit/mountain-lake.webp" },
  { src: "/hero-orbit/japanese-lanterns.webp" },
  { src: "/hero-orbit/hand-sanitizer.webp" },
  { src: "/hero-orbit/living-room.webp" },
  { src: "/hero-orbit/tokyo-neon.webp" },
  { src: "/hero-orbit/dubai-architecture.webp" },
  { src: "/hero-orbit/green-leaves.webp" },
  { src: "/hero-orbit/luxury-watch.webp" },
  { src: "/hero-orbit/cn-tower.webp" },
  { src: "/hero-orbit/sports-car.webp" },
] as const satisfies readonly HeroOrbitPhoto[];

export function getHeroOrbitPhoto(index: number): HeroOrbitPhoto {
  return HERO_ORBIT_PHOTOS[index % HERO_ORBIT_PHOTOS.length];
}
