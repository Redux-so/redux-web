"use client";

import { useEffect, useRef, useState } from "react";

import EditorShowcase from "./EditorShowcase";
import {
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
  SHOWCASE_INNER_CLIP,
  SHOWCASE_OUTER_FRAME,
} from "./showcase-layout";
import {
  computeShowcaseScale,
  readContainerScale,
  readLayoutWidth,
} from "./showcase-scaler-utils";

/** Fill PAGE_CONTAINER — same width as a full-row (md:col-span-2) feature bento card. */
const SHOWCASE_WIDTH_RATIO = 1;

function computeScale(containerWidth: number) {
  return computeShowcaseScale(containerWidth) * SHOWCASE_WIDTH_RATIO;
}

function readInitialLayout(containerWidth: number) {
  if (containerWidth <= 0) {
    return {
      scale: 1,
      scaledWidth: SHOWCASE_DESIGN_WIDTH,
      scaledHeight: SHOWCASE_DESIGN_HEIGHT,
    };
  }

  const scale = computeScale(containerWidth);
  return {
    scale,
    scaledWidth: SHOWCASE_DESIGN_WIDTH * scale,
    scaledHeight: SHOWCASE_DESIGN_HEIGHT * scale,
  };
}

export default function EditorShowcaseScaler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState(() => readInitialLayout(0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const updateLayout = () => {
      const width = readLayoutWidth(container);
      if (width > 0) {
        const scale = readContainerScale(container) * SHOWCASE_WIDTH_RATIO;
        setLayout({
          scale,
          scaledWidth: SHOWCASE_DESIGN_WIDTH * scale,
          scaledHeight: SHOWCASE_DESIGN_HEIGHT * scale,
        });
        return;
      }

      setLayout(readInitialLayout(0));
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
      data-showcase-scaler-container
      className="flex min-w-0 w-full justify-center"
    >
      <div
        data-showcase-scaler-frame
        className={`relative max-w-full ${SHOWCASE_OUTER_FRAME}`}
        style={{
          width: layout.scaledWidth,
          height: layout.scaledHeight,
        }}
      >
        <div className={SHOWCASE_INNER_CLIP}>
          <div
            className="showcase-resize-smooth-scale origin-top-left will-change-transform"
            style={{
              width: SHOWCASE_DESIGN_WIDTH,
              height: SHOWCASE_DESIGN_HEIGHT,
              transform: `scale(${layout.scale})`,
            }}
          >
            <EditorShowcase />
          </div>
        </div>
      </div>
    </div>
  );
}
