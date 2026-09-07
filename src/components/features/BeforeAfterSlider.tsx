"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc?: string;
  afterSrc?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(container);
    setContainerWidth(container.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stopDragging = () => {
      isDragging.current = false;
    };

    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  const layerWidth = containerWidth > 0 ? containerWidth : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full cursor-ew-resize overflow-hidden rounded-lg select-none",
        className,
      )}
      onMouseDown={(event) => {
        isDragging.current = true;
        updatePosition(event.clientX);
      }}
      onMouseMove={(event) => {
        if (isDragging.current) updatePosition(event.clientX);
      }}
      onMouseUp={() => {
        isDragging.current = false;
      }}
      onMouseLeave={() => {
        isDragging.current = false;
      }}
      onTouchStart={(event) => {
        isDragging.current = true;
        updatePosition(event.touches[0].clientX);
      }}
      onTouchMove={(event) => {
        if (isDragging.current) updatePosition(event.touches[0].clientX);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
        {afterSrc ? (
          <img src={afterSrc} alt="Enhanced" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
        )}
      </div>

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div
          className="flex h-full items-center justify-center bg-neutral-900"
          style={{ width: layerWidth }}
        >
          {beforeSrc ? (
            <img
              src={beforeSrc}
              alt="Original"
              className="h-full object-cover grayscale contrast-75 brightness-75"
              style={{ width: layerWidth }}
            />
          ) : (
            <div
              className="h-full bg-neutral-900 grayscale contrast-75 brightness-75"
              style={{ width: layerWidth }}
            />
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left: `${position}%` }}
      />
    </div>
  );
}

export default BeforeAfterSlider;
