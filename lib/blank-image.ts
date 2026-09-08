/** Marker src for data files — render with BlankImagePlaceholder, not next/image. */
export const BLANK_IMAGE_SRC = "/placeholder-blank.svg" as const;

export function isBlankImageSrc(src: string | null | undefined): boolean {
  return !src || src === BLANK_IMAGE_SRC;
}
