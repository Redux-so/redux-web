"use client";

import type { CSSProperties } from "react";

import { PAGE_GRID_OFFSET_PX } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

export const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.08)";
/** Fully opaque crop-mark color (corners + plus intersections). */
export const GRID_MARK_COLOR = "#8a8a8a";
export const GRID_LINE_WIDTH_PX = 1;
export const GRID_MARK_WIDTH_PX = 2;
export const GRID_MARK_ARM_PX = 10;
export const GRID_PLUS_ARM_PX = 5;

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

export type GridCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

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

type GridCornerMarkProps =
  | {
      corner: GridCorner;
      x: number;
      y: number;
    }
  | {
      corner: GridCorner;
      leftPercent: number;
      edge: "top" | "bottom";
    };

function lTopLeftPath(arm: number, stroke: number): string {
  return `M 0 0 H ${arm} V ${stroke} H ${stroke} V ${arm} H 0 Z`;
}

function lTopRightPath(arm: number, stroke: number): string {
  return `M ${arm} 0 H 0 V ${stroke} H ${arm - stroke} V ${arm} H ${arm} Z`;
}

function lBottomLeftPath(arm: number, stroke: number): string {
  return `M 0 ${arm} H ${arm} V ${arm - stroke} H ${stroke} V 0 H 0 Z`;
}

function lBottomRightPath(arm: number, stroke: number): string {
  return `M ${arm} ${arm} H 0 V ${arm - stroke} H ${arm - stroke} V 0 H ${arm} Z`;
}

function plusPath(size: number, stroke: number): string {
  const inset = (size - stroke) / 2;
  return [
    `M ${inset} 0 H ${inset + stroke} V ${size} H ${inset} Z`,
    `M 0 ${inset} H ${size} V ${inset + stroke} H 0 Z`,
  ].join(" ");
}

type GridMarkSvgProps = {
  path: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
};

function GridMarkSvg({ path, width, height, className, style }: GridMarkSvgProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute z-10 block opacity-100", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={GRID_MARK_COLOR}
      aria-hidden
      style={style}
    >
      <path d={path} />
    </svg>
  );
}

function getCornerPositionStyle(
  props: GridCornerMarkProps,
): CSSProperties {
  if ("x" in props) {
    const { corner, x, y } = props;

    switch (corner) {
      case "top-left":
        return { left: x, top: y, transform: "translate(-0.5px, -0.5px)" };
      case "top-right":
        return {
          left: x,
          top: y,
          transform: "translate(calc(-100% + 0.5px), -0.5px)",
        };
      case "bottom-left":
        return {
          left: x,
          top: y,
          transform: "translate(-0.5px, calc(-100% + 0.5px))",
        };
      case "bottom-right":
        return {
          left: x,
          top: y,
          transform: "translate(calc(-100% + 0.5px), calc(-100% + 0.5px))",
        };
    }
  }

  const { corner, leftPercent, edge } = props;

  if (edge === "top") {
    switch (corner) {
      case "top-left":
        return {
          left: `${leftPercent}%`,
          top: 0,
          transform: "translate(-0.5px, -0.5px)",
        };
      case "top-right":
        return {
          left: `${leftPercent}%`,
          top: 0,
          transform: "translate(calc(-100% + 0.5px), -0.5px)",
        };
      default:
        return {
          left: `${leftPercent}%`,
          top: 0,
          transform: "translate(-50%, -50%)",
        };
    }
  }

  switch (corner) {
    case "bottom-left":
      return {
        left: `${leftPercent}%`,
        bottom: 0,
        transform: "translate(-0.5px, 0.5px)",
      };
    case "bottom-right":
      return {
        left: `${leftPercent}%`,
        bottom: 0,
        transform: "translate(calc(-100% + 0.5px), 0.5px)",
      };
    default:
      return {
        left: `${leftPercent}%`,
        bottom: 0,
        transform: "translate(-50%, 50%)",
      };
  }
}

function getLMarkPath(corner: GridCorner, arm: number, stroke: number): string {
  switch (corner) {
    case "top-left":
      return lTopLeftPath(arm, stroke);
    case "top-right":
      return lTopRightPath(arm, stroke);
    case "bottom-left":
      return lBottomLeftPath(arm, stroke);
    case "bottom-right":
      return lBottomRightPath(arm, stroke);
  }
}

/** Inward-facing L crop mark at a grid corner (single-piece SVG). */
export function GridCornerMark(props: GridCornerMarkProps) {
  const arm = GRID_MARK_ARM_PX;
  const stroke = GRID_MARK_WIDTH_PX;
  const { corner } = props;

  return (
    <GridMarkSvg
      path={getLMarkPath(corner, arm, stroke)}
      width={arm}
      height={arm}
      style={getCornerPositionStyle(props)}
    />
  );
}

type GridPlusMarkProps = {
  leftPercent: number;
  edge: "top" | "bottom";
};

/** Small plus at an internal grid line intersection (single-piece SVG). */
export function GridPlusMark({ leftPercent, edge }: GridPlusMarkProps) {
  const arm = GRID_PLUS_ARM_PX;
  const stroke = GRID_MARK_WIDTH_PX;
  const size = arm * 2;

  return (
    <GridMarkSvg
      path={plusPath(size, stroke)}
      width={size}
      height={size}
      style={{
        left: `${leftPercent}%`,
        top: edge === "top" ? 0 : undefined,
        bottom: edge === "bottom" ? 0 : undefined,
        transform:
          edge === "top" ? "translate(-50%, -50%)" : "translate(-50%, 50%)",
      }}
    />
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
          <GridCornerMark corner="top-left" x={geometry.leftX} y={y} />
          <GridCornerMark corner="top-right" x={geometry.rightX} y={y} />
        </div>
      ))}
    </>
  );
}
