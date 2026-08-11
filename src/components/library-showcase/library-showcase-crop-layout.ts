import {
  LIBRARY_SEARCH_CROP_LEFT,
  LIBRARY_SEARCH_CROP_WIDTH,
  LIBRARY_SHOWCASE_DESIGN_HEIGHT,
  LIBRARY_SHOWCASE_DESIGN_WIDTH,
} from "./library-showcase-layout";

export type LibraryCropLayout = {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
  offsetX: number;
  offsetY: number;
};

export function computeLibrarySearchCropLayout(
  containerWidth: number,
  containerHeight: number,
): LibraryCropLayout {
  if (containerWidth === 0 || containerHeight === 0) {
    return {
      scale: 1,
      scaledWidth: LIBRARY_SHOWCASE_DESIGN_WIDTH,
      scaledHeight: LIBRARY_SHOWCASE_DESIGN_HEIGHT,
      offsetX: 0,
      offsetY: 0,
    };
  }

  const scale = containerWidth / LIBRARY_SEARCH_CROP_WIDTH;
  const scaledWidth = LIBRARY_SHOWCASE_DESIGN_WIDTH * scale;
  const scaledHeight = LIBRARY_SHOWCASE_DESIGN_HEIGHT * scale;
  const offsetX = -LIBRARY_SEARCH_CROP_LEFT * scale;

  return { scale, scaledWidth, scaledHeight, offsetX, offsetY: 0 };
}
