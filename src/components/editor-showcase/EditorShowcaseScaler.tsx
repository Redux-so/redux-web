"use client";

import { useEffect, useRef, useState } from "react";

import EditorShowcase from "./EditorShowcase";

const DESIGN_WIDTH = 1400;
const DESIGN_HEIGHT = 820;

function computeScale(containerWidth: number) {
  if (containerWidth === 0) return 1;
  return containerWidth / DESIGN_WIDTH;
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

  const scaledWidth = DESIGN_WIDTH * scale;
  const scaledHeight = DESIGN_HEIGHT * scale;

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="relative overflow-hidden"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <div
          className="origin-top-left will-change-transform"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <EditorShowcase />
        </div>
      </div>
    </div>
  );
}
