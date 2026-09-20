import type { StaticImageData } from "next/image";

/** Marker src for data files — render with BlankImagePlaceholder, not next/image. */
export const BLANK_IMAGE_SRC = "/placeholder-blank.svg" as const;

export function isBlankImageSrc(
  src: string | StaticImageData | null | undefined,
): boolean {
  if (!src) {
    return true;
  }
  if (typeof src === "object" && "src" in src) {
    return false;
  }
  return src === BLANK_IMAGE_SRC;
}
