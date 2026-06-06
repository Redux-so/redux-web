"use client";

import { useEffect, useRef, useState } from "react";

import EditorShowcase from "./EditorShowcase";

const DESIGN_WIDTH = 1400;
const DESIGN_HEIGHT = 820;

function computeScale(containerWidth: number) {
  if (containerWidth === 0) return 1;

  const scaleByWidth = containerWidth / DESIGN_WIDTH;
  const scaleByHeight = (window.innerHeight * 0.75) / DESIGN_HEIGHT;

  return Math.min(scaleByWidth, scaleByHeight, 1);
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
    window.addEventListener("resize", updateScale);
    updateScale();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const scaledHeight = DESIGN_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: scaledHeight }}
    >
      <div
        className="absolute left-1/2 top-0 will-change-transform"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <EditorShowcase />
      </div>
    </div>
  );
}
