"use client";

import { useLayoutEffect, useRef, useState } from "react";

import EditorShowcase from "./EditorShowcase";
import {
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
  SHOWCASE_INNER_CLIP,
  SHOWCASE_OUTER_FRAME,
} from "./showcase-layout";

/** Fill the page column at full reveal — matches feature bento card width. */
const SHOWCASE_WIDTH_RATIO = 1;

function computeScale(containerWidth: number) {
  if (containerWidth === 0) return 1;
  return (containerWidth / SHOWCASE_DESIGN_WIDTH) * SHOWCASE_WIDTH_RATIO;
}

function readContainerScale(container: HTMLElement): number {
  return computeScale(container.getBoundingClientRect().width);
}

export default function EditorShowcaseScaler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const updateScale = () => {
      setScale(readContainerScale(container));
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScale);
    });

    observer.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const scaledWidth = SHOWCASE_DESIGN_WIDTH * scale;
  const scaledHeight = SHOWCASE_DESIGN_HEIGHT * scale;

  return (
    <div ref={containerRef} className="min-w-0 w-full py-2">
      <div
        data-showcase-scaler-frame
        className={`relative mx-auto ${SHOWCASE_OUTER_FRAME}`}
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <div className={SHOWCASE_INNER_CLIP}>
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
    </div>
  );
}
