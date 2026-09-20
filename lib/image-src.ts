import type { StaticImageData } from "next/image";

/** Local asset passed to `next/image` (static import or legacy public path). */
export type AppImageSrc = string | StaticImageData;

export function resolveImageUrl(src: AppImageSrc): string {
  return typeof src === "string" ? src : src.src;
}
