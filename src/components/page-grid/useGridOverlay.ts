"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  type GridGeometry,
  type VerticalSkipRange,
  isValidGeometry,
  measureGridColumns,
  PAGE_GRID_LEFT_VAR,
  PAGE_GRID_WIDTH_VAR,
  publishGridColumnVars,
} from "@/src/components/page-grid/shared";

type UseGridOverlayOptions = {
  /** Publish --page-grid-left / --page-grid-width on the bounds element. */
  publishColumnVars?: boolean;
  /** Return horizontal guide Y positions relative to the bounds element. */
  getBoundaryYs?: (bounds: HTMLElement) => number[];
  /** Omit vertical grid rails within these Y ranges (relative to bounds). */
  getVerticalSkipRanges?: (bounds: HTMLElement) => VerticalSkipRange[];
};

function geometriesEqual(a: GridGeometry, b: GridGeometry): boolean {
  if (
    a.leftX !== b.leftX ||
    a.rightX !== b.rightX ||
    a.boundsHeight !== b.boundsHeight
  ) {
    return false;
  }

  if (a.boundaryYs.length !== b.boundaryYs.length) {
    return false;
  }

  if (!a.boundaryYs.every((y, index) => y === b.boundaryYs[index])) {
    return false;
  }

  const aSkips = a.verticalSkipRanges ?? [];
  const bSkips = b.verticalSkipRanges ?? [];

  if (aSkips.length !== bSkips.length) {
    return false;
  }

  return aSkips.every(
    (range, index) =>
      range.top === bSkips[index]?.top && range.bottom === bSkips[index]?.bottom,
  );
}

function columnsVarsChanged(
  bounds: HTMLElement,
  columns: { leftX: number; rightX: number },
): boolean {
  const nextLeft = `${columns.leftX}px`;
  const nextWidth = `${columns.rightX - columns.leftX}px`;

  return (
    bounds.style.getPropertyValue(PAGE_GRID_LEFT_VAR) !== nextLeft ||
    bounds.style.getPropertyValue(PAGE_GRID_WIDTH_VAR) !== nextWidth
  );
}

export function useGridOverlay({
  publishColumnVars = false,
  getBoundaryYs,
  getVerticalSkipRanges,
}: UseGridOverlayOptions = {}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<GridGeometry | null>(null);

  const publishColumnVarsRef = useRef(publishColumnVars);
  const getBoundaryYsRef = useRef(getBoundaryYs);
  const getVerticalSkipRangesRef = useRef(getVerticalSkipRanges);

  publishColumnVarsRef.current = publishColumnVars;
  getBoundaryYsRef.current = getBoundaryYs;
  getVerticalSkipRangesRef.current = getVerticalSkipRanges;

  const measure = useCallback(() => {
    const overlay = overlayRef.current;
    const sentinel = sentinelRef.current;

    if (!overlay || !sentinel) {
      return;
    }

    const bounds = overlay.parentElement;

    if (!(bounds instanceof HTMLElement)) {
      return;
    }

    const columns = measureGridColumns(bounds, sentinel);

    if (!columns) {
      return;
    }

    if (
      publishColumnVarsRef.current &&
      columnsVarsChanged(bounds, columns)
    ) {
      publishGridColumnVars(bounds, columns);

      const gridRoot = bounds.closest("[data-page-grid-root]");
      if (gridRoot instanceof HTMLElement && gridRoot !== bounds) {
        publishGridColumnVars(gridRoot, columns);
      }

      const shell = gridRoot?.parentElement;
      if (shell instanceof HTMLElement) {
        publishGridColumnVars(shell, columns);
      }
    }

    const boundaryYs = getBoundaryYsRef.current?.(bounds) ?? [];
    const verticalSkipRanges = getVerticalSkipRangesRef.current?.(bounds) ?? [];
    const boundsHeight = bounds.getBoundingClientRect().height;

    const nextGeometry: GridGeometry = {
      ...columns,
      boundaryYs,
      boundsHeight,
      verticalSkipRanges,
    };

    if (!isValidGeometry(nextGeometry)) {
      return;
    }

    setGeometry((previous) =>
      previous && geometriesEqual(previous, nextGeometry)
        ? previous
        : nextGeometry,
    );
  }, []);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const bounds = overlay?.parentElement;

    if (!(bounds instanceof HTMLElement)) {
      return;
    }

    let frame = 0;

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    scheduleMeasure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(bounds);
    resizeObserver.observe(document.documentElement);

    const sentinel = sentinelRef.current;
    if (sentinel) {
      resizeObserver.observe(sentinel);
    }

    bounds.querySelectorAll(":scope > section").forEach((section) => {
      resizeObserver.observe(section);
    });

    bounds
      .querySelectorAll("[data-footer-grid-divider], [data-page-grid-boundary]")
      .forEach((node) => {
        resizeObserver.observe(node);
      });

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure);
    };
  }, [measure]);

  return {
    overlayRef,
    sentinelRef,
    geometry,
    measure,
  };
}
