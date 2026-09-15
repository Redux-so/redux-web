"use client";

import { useGridOverlay } from "@/src/components/page-grid/useGridOverlay";
import { PAGE_CONTAINER_MAX_WIDTH_CLASS } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

/** Publishes --page-grid-left / --page-grid-width without rendering grid lines. */
export default function PageGridColumnPublisher() {
  const { overlayRef, sentinelRef } = useGridOverlay({
    publishColumnVars: true,
  });

  return (
    <div
      ref={overlayRef}
      data-page-grid-overlay="column-publisher"
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      <div
        ref={sentinelRef}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-full opacity-0",
          PAGE_CONTAINER_MAX_WIDTH_CLASS,
        )}
      />
    </div>
  );
}
