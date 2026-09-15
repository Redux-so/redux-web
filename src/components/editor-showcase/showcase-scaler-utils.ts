import {
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
} from "./showcase-layout";

/** Matches Tailwind `max-w-7xl` — fallback column width before layout settles. */
export const PAGE_COLUMN_MAX_WIDTH_PX = 1280;

/** Vertical padding on EditorShowcaseScaler wrapper (`py-2`). */
export const SHOWCASE_SCALER_PADDING_Y_PX = 16;

function readHorizontalPadding(viewportWidth: number): number {
  if (viewportWidth >= 1024) return 96;
  if (viewportWidth >= 640) return 64;
  return 32;
}

/** Estimate the PAGE_CONTAINER content column — not the wider grid-rail span. */
export function readFallbackColumnWidth(): number {
  const viewportWidth =
    typeof window === "undefined" ? PAGE_COLUMN_MAX_WIDTH_PX : window.innerWidth;
  const horizontalPadding = readHorizontalPadding(viewportWidth);

  return Math.max(
    0,
    Math.min(viewportWidth, PAGE_COLUMN_MAX_WIDTH_PX) - horizontalPadding,
  );
}

export function computeShowcaseScale(containerWidth: number): number {
  if (containerWidth <= 0) {
    return 1;
  }

  return Math.min(1, containerWidth / SHOWCASE_DESIGN_WIDTH);
}

/** Estimate settled showcase height from column width when layout is still settling. */
export function estimateShowcaseHeight(contentWidth: number): number {
  if (contentWidth <= 0) {
    return 0;
  }

  const scale = computeShowcaseScale(contentWidth);
  return SHOWCASE_DESIGN_HEIGHT * scale + SHOWCASE_SCALER_PADDING_Y_PX;
}

/** Layout width — immune to ancestor CSS transforms (unlike getBoundingClientRect). */
export function readLayoutWidth(element: HTMLElement): number {
  const offsetWidth = element.offsetWidth;
  if (offsetWidth > 0) {
    return offsetWidth;
  }

  const clientWidth = element.clientWidth;
  if (clientWidth > 0) {
    return clientWidth;
  }

  return 0;
}

export function readContainerScale(container: HTMLElement): number {
  const width = readLayoutWidth(container);
  if (width > 0) {
    return computeShowcaseScale(width);
  }

  return computeShowcaseScale(readFallbackColumnWidth());
}
