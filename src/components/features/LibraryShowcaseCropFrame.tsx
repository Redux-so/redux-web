"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import LibraryShowcase from "@/src/components/library-showcase/LibraryShowcase";
import { fadeIn, SCROLL_VIEWPORT } from "@/lib/scroll-motion";
import {
  computeLibrarySearchCropLayout,
  type LibraryCropLayout,
} from "@/src/components/library-showcase/library-showcase-crop-layout";
import {
  LIBRARY_SHOWCASE_DESIGN_HEIGHT,
  LIBRARY_SHOWCASE_DESIGN_WIDTH,
} from "@/src/components/library-showcase/library-showcase-layout";
import { SHOWCASE_INNER_CLIP } from "@/src/components/editor-showcase/showcase-layout";
import { cn } from "@/lib/utils";

type LibraryShowcaseCropFrameProps = {
  ariaLabel: string;
};

export default function LibraryShowcaseCropFrame({
  ariaLabel,
}: LibraryShowcaseCropFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationActive, setAnimationActive] = useState(false);
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
    <motion.div
      ref={containerRef}
      className={cn("relative h-full w-full min-h-0", SHOWCASE_INNER_CLIP)}
      aria-label={ariaLabel}
      data-scroll-motion=""
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      onViewportEnter={() => setAnimationActive(true)}
      onViewportLeave={() => setAnimationActive(false)}
    >
      <div className="pointer-events-none relative h-full w-full overflow-hidden">
        <div
          className="showcase-crop-layout absolute overflow-hidden"
          style={{
            width: layout.scaledWidth,
            height: layout.scaledHeight,
            left: layout.offsetX,
            top: layout.offsetY,
          }}
        >
          <div
            className="showcase-resize-smooth-scale origin-top-left will-change-transform"
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
    </motion.div>
  );
}
