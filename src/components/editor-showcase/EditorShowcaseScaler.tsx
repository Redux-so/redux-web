"use client";

import { useEffect, useRef, useState } from "react";

import EditorShowcase from "./EditorShowcase";
import {
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
  SHOWCASE_OUTER_FRAME,
} from "./showcase-layout";

function computeScale(containerWidth: number) {
  if (containerWidth === 0) return 1;
  return containerWidth / SHOWCASE_DESIGN_WIDTH;
}

export default function EditorShowcaseScaler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const updateScale = () => {
      const width = container.getBoundingClientRect().width;
      setScale(computeScale(width));
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScale);
    });

    observer.observe(container);
    updateScale();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const scaledWidth = SHOWCASE_DESIGN_WIDTH * scale;
  const scaledHeight = SHOWCASE_DESIGN_HEIGHT * scale;

  return (
    <div ref={containerRef} className="min-w-0 w-full">
      <div
        className={`relative mx-auto ${SHOWCASE_OUTER_FRAME}`}
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <div
          className="origin-top-left will-change-transform"
          style={{
            width: SHOWCASE_DESIGN_WIDTH,
            height: SHOWCASE_DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <EditorShowcase />
        </div>
      </div>
    </div>
  );
}
