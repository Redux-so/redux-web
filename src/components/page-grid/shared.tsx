"use client";

import { PAGE_GRID_OFFSET_PX } from "@/lib/section-styles";

export const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.08)";
export const GRID_MARK_COLOR = "rgba(255, 255, 255, 0.2)";
export const GRID_LINE_WIDTH_PX = 1;
export const GRID_MARK_WIDTH_PX = 1.5;
export const GRID_MARK_ARM_PX = 10;

export const PAGE_GRID_LEFT_VAR = "--page-grid-left";
export const PAGE_GRID_WIDTH_VAR = "--page-grid-width";

export type GridColumns = {
  leftX: number;
  rightX: number;
};

export type GridGeometry = GridColumns & {
  boundaryYs: number[];
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
  const leftX = sentinelRect.left - boundsRect.left - gridOffset;
  const rightX = sentinelRect.right - boundsRect.left + gridOffset;

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
    geometry.rightX > geometry.leftX
  );
}

type CropMarkProps = {
  x: number;
  y: number;
  side: "left" | "right";
};

export function CropMark({ x, y, side }: CropMarkProps) {
  const arm = GRID_MARK_ARM_PX;
  const stroke = GRID_MARK_WIDTH_PX;

  return (
    <div
      className="pointer-events-none absolute hidden md:block"
      style={{
        left: x,
        top: y,
        width: arm,
        height: arm,
        transform:
          side === "left"
            ? "translate(-0.5px, -0.5px)"
            : "translate(calc(-100% + 0.5px), -0.5px)",
      }}
      aria-hidden
    >
      <span
        className="absolute top-0 block"
        style={{
          height: stroke,
          width: arm,
          backgroundColor: GRID_MARK_COLOR,
          left: side === "left" ? 0 : undefined,
          right: side === "right" ? 0 : undefined,
        }}
      />
      <span
        className="absolute top-0 block"
        style={{
          width: stroke,
          height: arm,
          backgroundColor: GRID_MARK_COLOR,
          left: side === "left" ? 0 : undefined,
          right: side === "right" ? 0 : undefined,
        }}
      />
    </div>
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
        <div key={`boundary-${index}`}>
          <div
            className="absolute"
            style={{
              top: y,
              left: geometry.leftX,
              width: geometry.rightX - geometry.leftX,
              height: GRID_LINE_WIDTH_PX,
              backgroundColor: GRID_LINE_COLOR,
            }}
          />
          <CropMark x={geometry.leftX} y={y} side="left" />
          <CropMark x={geometry.rightX} y={y} side="right" />
        </div>
      ))}
    </>
  );
}
