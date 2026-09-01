"use client";

import { useEffect, useRef, useState } from "react";

import LibraryShowcase from "@/src/components/library-showcase/LibraryShowcase";
import {
  computeLibrarySearchCropLayout,
  type LibraryCropLayout,
} from "@/src/components/library-showcase/library-showcase-crop-layout";
import {
  LIBRARY_SHOWCASE_DESIGN_HEIGHT,
  LIBRARY_SHOWCASE_DESIGN_WIDTH,
} from "@/src/components/library-showcase/library-showcase-layout";

type LibraryShowcaseCropFrameProps = {
  animationActive?: boolean;
  ariaLabel: string;
};

export default function LibraryShowcaseCropFrame({
  animationActive = false,
  ariaLabel,
}: LibraryShowcaseCropFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<LibraryCropLayout>(() =>
    computeLibrarySearchCropLayout(0, 0),
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const updateLayout = () => {
      const { width, height } = container.getBoundingClientRect();
      setLayout(computeLibrarySearchCropLayout(width, height));
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateLayout);
    });

    observer.observe(container);
    updateLayout();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#161616]"
      aria-label={ariaLabel}
    >
      <div className="pointer-events-none relative h-full w-full overflow-hidden">
        <div
          className="absolute overflow-hidden"
          style={{
            width: layout.scaledWidth,
            height: layout.scaledHeight,
            left: layout.offsetX,
            top: layout.offsetY,
          }}
        >
          <div
            className="origin-top-left will-change-transform"
            style={{
              width: LIBRARY_SHOWCASE_DESIGN_WIDTH,
              height: LIBRARY_SHOWCASE_DESIGN_HEIGHT,
              transform: `scale(${layout.scale})`,
            }}
          >
            <LibraryShowcase demoMode animationActive={animationActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
