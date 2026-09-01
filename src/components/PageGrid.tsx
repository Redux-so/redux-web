"use client";

import { useCallback } from "react";

import { GridOverlayLines, PAGE_GRID_OVERLAY_FADE_CLASS } from "@/src/components/page-grid/shared";
import { useGridOverlay } from "@/src/components/page-grid/useGridOverlay";
import { PAGE_CONTAINER_MAX_WIDTH_CLASS } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type PageGridProps = {
  className?: string;
};

export default function PageGrid({ className }: PageGridProps) {
  const getBoundaryYs = useCallback((bounds: HTMLElement) => {
    const boundsRect = bounds.getBoundingClientRect();
    const sections = Array.from(
      bounds.querySelectorAll<HTMLElement>(":scope > section"),
    );

    const boundaryYs: number[] = [];

    for (let index = 0; index < sections.length - 1; index += 1) {
      const current = sections[index];
      const next = sections[index + 1];

      if (current?.hasAttribute("data-page-grid-skip-boundary-after")) {
        continue;
      }

      const currentRect = current?.getBoundingClientRect();
      const nextRect = next?.getBoundingClientRect();

      if (!currentRect || !nextRect) continue;

      boundaryYs.push((currentRect.bottom + nextRect.top) / 2 - boundsRect.top);
    }

    return boundaryYs;
  }, []);

  const { overlayRef, sentinelRef, geometry } = useGridOverlay({
    publishColumnVars: true,
    getBoundaryYs,
  });

  return (
    <div
      ref={overlayRef}
      data-page-grid-overlay
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        className,
      )}
      aria-hidden
    >
      <div
        ref={sentinelRef}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-full opacity-0",
          PAGE_CONTAINER_MAX_WIDTH_CLASS,
        )}
      />

      {geometry ? (
        <div className={cn("absolute inset-0", PAGE_GRID_OVERLAY_FADE_CLASS)}>
          <GridOverlayLines geometry={geometry} />
        </div>
      ) : null}
    </div>
  );
}
