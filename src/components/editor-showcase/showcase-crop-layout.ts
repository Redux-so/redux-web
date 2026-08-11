import {
  SHOWCASE_CHAT_CROP_HEIGHT,
  SHOWCASE_CHAT_CROP_LEFT,
  SHOWCASE_CHAT_CROP_WIDTH,
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
  SHOWCASE_TOOLBAR_HEIGHT,
} from "./showcase-layout";

export type ShowcaseCropLayout = {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
  offsetX: number;
  offsetY: number;
};

export type CropVerticalAnchor = "center" | "top" | "toolbar" | "bottom";

type ShowcaseCropOptions = {
  cropWidth: number;
  cropLeft: number;
  verticalAnchor?: CropVerticalAnchor;
};

function computeVerticalOffset(
  verticalAnchor: CropVerticalAnchor,
  containerHeight: number,
  scaledHeight: number,
  scaledCropHeight: number,
  scale: number,
): number {
  switch (verticalAnchor) {
    case "toolbar":
      return 0;
    case "top":
      return -SHOWCASE_TOOLBAR_HEIGHT * scale;
    case "bottom":
      return containerHeight - scaledHeight;
    default:
      return Math.min(
        0,
        (containerHeight - scaledCropHeight) / 2 -
          SHOWCASE_TOOLBAR_HEIGHT * scale,
      );
  }
}

export function computeShowcaseCropLayout(
  containerWidth: number,
  containerHeight: number,
  { cropWidth, cropLeft, verticalAnchor = "center" }: ShowcaseCropOptions,
): ShowcaseCropLayout {
  if (containerWidth === 0 || containerHeight === 0) {
    return {
      scale: 1,
      scaledWidth: SHOWCASE_DESIGN_WIDTH,
      scaledHeight: SHOWCASE_DESIGN_HEIGHT,
      offsetX: 0,
      offsetY: 0,
    };
  }

  const scale = containerWidth / cropWidth;
  const scaledWidth = SHOWCASE_DESIGN_WIDTH * scale;
  const scaledHeight = SHOWCASE_DESIGN_HEIGHT * scale;
  const scaledCropHeight = SHOWCASE_CHAT_CROP_HEIGHT * scale;
  const offsetX = -cropLeft * scale;
  const offsetY = computeVerticalOffset(
    verticalAnchor,
    containerHeight,
    scaledHeight,
    scaledCropHeight,
    scale,
  );

  return { scale, scaledWidth, scaledHeight, offsetX, offsetY };
}

export function computeChatCropLayout(
  containerWidth: number,
  containerHeight: number,
  options: { verticalAnchor?: CropVerticalAnchor } = {},
): ShowcaseCropLayout {
  return computeShowcaseCropLayout(containerWidth, containerHeight, {
    cropWidth: SHOWCASE_CHAT_CROP_WIDTH,
    cropLeft: SHOWCASE_CHAT_CROP_LEFT,
    verticalAnchor: options.verticalAnchor,
  });
}

/** @deprecated Use CropVerticalAnchor */
export type ChatCropVerticalAnchor = CropVerticalAnchor;
