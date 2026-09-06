"use client";

import { PAGE_GRID_OFFSET_PX } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

export const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.08)";
export const GRID_LINE_WIDTH_PX = 1;

/** Full-viewport horizontal hairline (breaks out of max-width columns). */
export const GRID_HORIZONTAL_FULL_BLEED_CLASS =
  "pointer-events-none absolute left-1/2 w-screen max-w-[100vw] -translate-x-1/2";

export const PAGE_GRID_LEFT_VAR = "--page-grid-left";
export const PAGE_GRID_WIDTH_VAR = "--page-grid-width";
export const PAGE_GRID_OVERLAY_FADE_CLASS = "page-grid-overlay-fade";

export type GridColumns = {
  leftX: number;
  rightX: number;
};

export type GridGeometry = GridColumns & {
  boundaryYs: number[];
  boundsHeight: number;
};

export function getGridOffsetPx(): number {
  return window.matchMedia("(min-width: 768px)").matches
    ? PAGE_GRID_OFFSET_PX
    : 24;
}

export function measureGridColumns(
  bounds: HTMLElement,
  sentinel: HTMLElement,
): GridColumns | null {
  const boundsRect = bounds.getBoundingClientRect();
  const sentinelRect = sentinel.getBoundingClientRect();

  if (sentinelRect.width <= 0 || boundsRect.width <= 0) {
    return null;
  }

  const gridOffset = getGridOffsetPx();
  const insetLeft = sentinelRect.left - boundsRect.left;
  const insetRight = boundsRect.right - sentinelRect.right;

  /** Shrink offset on narrow viewports so rails stay inside overflow-hidden ancestors. */
  const effectiveOffset = Math.min(gridOffset, insetLeft, insetRight);

  const leftX = insetLeft - effectiveOffset;
  const rightX = boundsRect.width - insetRight + effectiveOffset;

  if (!Number.isFinite(leftX) || !Number.isFinite(rightX) || rightX <= leftX) {
    return null;
  }

  return { leftX, rightX };
}

export function publishGridColumnVars(
  bounds: HTMLElement,
  columns: GridColumns,
): void {
  bounds.style.setProperty(PAGE_GRID_LEFT_VAR, `${columns.leftX}px`);
  bounds.style.setProperty(
    PAGE_GRID_WIDTH_VAR,
    `${columns.rightX - columns.leftX}px`,
  );
}

export function isValidGeometry(geometry: GridGeometry): boolean {
  return (
    Number.isFinite(geometry.leftX) &&
    Number.isFinite(geometry.rightX) &&
    geometry.rightX > geometry.leftX &&
    Number.isFinite(geometry.boundsHeight) &&
    geometry.boundsHeight > 0
  );
}

export function getColumnBoundaryPercents(columnCount: number): number[] {
  return Array.from(
    { length: columnCount + 1 },
    (_, index) => (index / columnCount) * 100,
  );
}

type GridOverlayLinesProps = {
  geometry: GridGeometry;
  showVerticals?: boolean;
};

export function GridOverlayLines({
  geometry,
  showVerticals = true,
}: GridOverlayLinesProps) {
  return (
    <>
      {showVerticals ? (
        <>
          <div
            className="absolute inset-y-0"
            style={{
              left: geometry.leftX,
              width: GRID_LINE_WIDTH_PX,
              backgroundColor: GRID_LINE_COLOR,
            }}
          />
          <div
            className="absolute inset-y-0"
            style={{
              left: geometry.rightX,
              width: GRID_LINE_WIDTH_PX,
              backgroundColor: GRID_LINE_COLOR,
            }}
          />
        </>
      ) : null}

      {geometry.boundaryYs.map((y, index) => (
        <div
          key={`boundary-${index}`}
          className={cn(GRID_HORIZONTAL_FULL_BLEED_CLASS)}
          style={{
            top: y,
            height: GRID_LINE_WIDTH_PX,
            backgroundColor: GRID_LINE_COLOR,
          }}
        />
      ))}
    </>
  );
}
