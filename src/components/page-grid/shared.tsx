"use client";

import type { CSSProperties } from "react";

import { PAGE_GRID_OFFSET_PX } from "@/lib/section-styles";

export const GRID_LINE_COLOR = "rgba(255, 255, 255, 0.08)";
/** Fully opaque crop-mark color (corners + plus intersections). */
export const GRID_MARK_COLOR = "#8a8a8a";
export const GRID_LINE_WIDTH_PX = 1;
export const GRID_MARK_WIDTH_PX = 2;
export const GRID_MARK_ARM_PX = 10;
export const GRID_PLUS_ARM_PX = 5;

export const PAGE_GRID_LEFT_VAR = "--page-grid-left";
export const PAGE_GRID_WIDTH_VAR = "--page-grid-width";

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

function getCornerBarStyles(
  corner: GridCorner,
  arm: number,
  stroke: number,
): { horizontal: CSSProperties; vertical: CSSProperties } {
  const fill: CSSProperties = {
    backgroundColor: GRID_MARK_COLOR,
    opacity: 1,
  };

  switch (corner) {
    case "top-left":
      return {
        horizontal: { ...fill, top: 0, left: 0, width: arm, height: stroke },
        vertical: { ...fill, top: 0, left: 0, width: stroke, height: arm },
      };
    case "top-right":
      return {
        horizontal: { ...fill, top: 0, right: 0, width: arm, height: stroke },
        vertical: { ...fill, top: 0, right: 0, width: stroke, height: arm },
      };
    case "bottom-left":
      return {
        horizontal: {
          ...fill,
          bottom: 0,
          left: 0,
          width: arm,
          height: stroke,
        },
        vertical: { ...fill, bottom: 0, left: 0, width: stroke, height: arm },
      };
    case "bottom-right":
      return {
        horizontal: {
          ...fill,
          bottom: 0,
          right: 0,
          width: arm,
          height: stroke,
        },
        vertical: {
          ...fill,
          bottom: 0,
          right: 0,
          width: stroke,
          height: arm,
        },
      };
  }
}

/** Inward-facing L crop mark at a grid corner. */
export function GridCornerMark(props: GridCornerMarkProps) {
  const arm = GRID_MARK_ARM_PX;
  const stroke = GRID_MARK_WIDTH_PX;
  const { corner } = props;
  const bars = getCornerBarStyles(corner, arm, stroke);

  return (
    <div
      className="pointer-events-none absolute z-10 block opacity-100"
      style={{
        ...getCornerPositionStyle(props),
        width: arm,
        height: arm,
      }}
      aria-hidden
    >
      <span className="absolute block" style={bars.horizontal} />
      <span className="absolute block" style={bars.vertical} />
    </div>
  );
}

type GridPlusMarkProps = {
  leftPercent: number;
  edge: "top" | "bottom";
};

/** Small plus at an internal grid line intersection (horizontal × vertical). */
export function GridPlusMark({ leftPercent, edge }: GridPlusMarkProps) {
  const arm = GRID_PLUS_ARM_PX;
  const stroke = GRID_MARK_WIDTH_PX;
  const size = arm * 2;

  return (
    <div
      className="pointer-events-none absolute z-10 opacity-100"
      style={{
        left: `${leftPercent}%`,
        top: edge === "top" ? 0 : undefined,
        bottom: edge === "bottom" ? 0 : undefined,
        transform:
          edge === "top" ? "translate(-50%, -50%)" : "translate(-50%, 50%)",
        width: size,
        height: size,
      }}
      aria-hidden
    >
      <span
        className="absolute left-1/2 top-0 block"
        style={{
          width: stroke,
          height: size,
          marginLeft: -stroke / 2,
          backgroundColor: GRID_MARK_COLOR,
          opacity: 1,
        }}
      />
      <span
        className="absolute left-0 top-1/2 block"
        style={{
          height: stroke,
          width: size,
          marginTop: -stroke / 2,
          backgroundColor: GRID_MARK_COLOR,
          opacity: 1,
        }}
      />
    </div>
  );
}

export function getColumnBoundaryPercents(columnCount: number): number[] {
  return Array.from(
    { length: columnCount + 1 },
    (_, index) => (index / columnCount) * 100,
  );
}

function getBandEdges(boundaryYs: number[], boundsHeight: number): number[] {
  const edges = [0, ...boundaryYs, boundsHeight];
  return edges.filter(
    (y, index) => index === 0 || y > edges[index - 1]!,
  );
}

type GridOverlayLinesProps = {
  geometry: GridGeometry;
  showVerticals?: boolean;
  /** Omit top-left/right marks on the first band (e.g. below the navbar). */
  hideTopBandCorners?: boolean;
};

export function GridOverlayLines({
  geometry,
  showVerticals = true,
  hideTopBandCorners = false,
}: GridOverlayLinesProps) {
  const bandEdges = getBandEdges(geometry.boundaryYs, geometry.boundsHeight);

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
          className="absolute"
          style={{
            top: y,
            left: geometry.leftX,
            width: geometry.rightX - geometry.leftX,
            height: GRID_LINE_WIDTH_PX,
            backgroundColor: GRID_LINE_COLOR,
          }}
        />
      ))}

      {bandEdges.slice(0, -1).map((yTop, index) => {
        const yBottom = bandEdges[index + 1]!;

        if (yBottom <= yTop) {
          return null;
        }

        const isFirstBand = yTop === 0;
        const showTopCorners = !(hideTopBandCorners && isFirstBand);

        return (
          <div key={`band-corners-${yTop}-${yBottom}`}>
            {showTopCorners ? (
              <>
                <GridCornerMark corner="top-left" x={geometry.leftX} y={yTop} />
                <GridCornerMark
                  corner="top-right"
                  x={geometry.rightX}
                  y={yTop}
                />
              </>
            ) : null}
            <GridCornerMark corner="bottom-left" x={geometry.leftX} y={yBottom} />
            <GridCornerMark
              corner="bottom-right"
              x={geometry.rightX}
              y={yBottom}
            />
          </div>
        );
      })}
    </>
  );
}
