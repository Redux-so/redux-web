export type HeroOrbitPhoto = {
  src: string;
  alt: string;
};

/** Sample photos for the hero orbit background tiles. */
export const HERO_ORBIT_PHOTOS = [
  { src: "/hero-orbit/mountain-lake.jpg", alt: "Mountain lake with turquoise water" },
  { src: "/hero-orbit/japanese-lanterns.jpg", alt: "Rows of Japanese paper lanterns" },
  { src: "/hero-orbit/hand-sanitizer.jpg", alt: "Amber glass hand sanitizer bottles" },
  { src: "/hero-orbit/living-room.jpg", alt: "Bright modern living room interior" },
  { src: "/hero-orbit/tokyo-neon.jpg", alt: "Tokyo street at night with neon signs" },
  { src: "/hero-orbit/dubai-architecture.jpg", alt: "Dubai skyline framed by white architecture" },
  { src: "/hero-orbit/green-leaves.jpg", alt: "Green leaves covered in water droplets" },
  { src: "/hero-orbit/luxury-watch.jpg", alt: "Luxury wristwatch close-up" },
  { src: "/hero-orbit/cn-tower.jpg", alt: "CN Tower against a clear blue sky" },
  { src: "/hero-orbit/sports-car.jpg", alt: "Silver Porsche on an open road" },
] as const satisfies readonly HeroOrbitPhoto[];

export function getHeroOrbitPhoto(index: number): HeroOrbitPhoto {
  return HERO_ORBIT_PHOTOS[index % HERO_ORBIT_PHOTOS.length];
}
