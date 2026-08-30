"use client";

import { GridOverlayLines } from "@/src/components/page-grid/shared";
import { useGridOverlay } from "@/src/components/page-grid/useGridOverlay";
import { PAGE_CONTAINER_MAX_WIDTH_CLASS } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FooterPageGridProps = {
  className?: string;
};

function getFooterBoundaryYs(_bounds: HTMLElement): number[] {
  return [0];
}

/** Crop-guide grid for the footer — vertical rails plus a top seam line. */
export default function FooterPageGrid({ className }: FooterPageGridProps) {
  const { overlayRef, sentinelRef, geometry } = useGridOverlay({
    getBoundaryYs: getFooterBoundaryYs,
  });

  return (
    <div
      ref={overlayRef}
      data-page-grid-overlay="footer"
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
        <div className="absolute inset-0">
          <GridOverlayLines geometry={geometry} />
        </div>
      ) : null}
    </div>
  );
}
