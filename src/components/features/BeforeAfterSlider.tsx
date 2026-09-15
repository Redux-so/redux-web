"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/shared/Icon";
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
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(event.clientX);
    };

    const stopDragging = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [updatePosition]);

  const layerWidth = containerWidth > 0 ? containerWidth : undefined;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full cursor-ew-resize touch-none overflow-hidden rounded-lg select-none",
        className,
      )}
      onDragStart={(event) => event.preventDefault()}
      onMouseDown={(event) => {
        event.preventDefault();
        isDragging.current = true;
        updatePosition(event.clientX);
      }}
      onTouchStart={(event) => {
        isDragging.current = true;
        updatePosition(event.touches[0].clientX);
      }}
      onTouchMove={(event) => {
        if (!isDragging.current) return;
        event.preventDefault();
        updatePosition(event.touches[0].clientX);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
        {afterSrc ? (
          <img
            src={afterSrc}
            alt="Enhanced"
            draggable={false}
            className="pointer-events-none h-full w-full object-cover select-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-white/[0.08] bg-[#2a2a2a]">
            <Icon
              name="Image01"
              size={16}
              strokeWidth={1.5}
              className="text-white/35"
              aria-hidden
            />
          </div>
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
              draggable={false}
              className="pointer-events-none h-full w-full object-cover select-none"
              style={{ width: layerWidth }}
            />
          ) : (
            <div
              className="flex h-full items-center justify-center border border-white/[0.08] bg-[#2a2a2a] grayscale contrast-75 brightness-75"
              style={{ width: layerWidth }}
            >
              <Icon
                name="Image01"
                size={16}
                strokeWidth={1.5}
                className="text-white/35"
                aria-hidden
              />
            </div>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_4px_rgba(0,0,0,0.35),0_0_10px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%` }}
      />
    </div>
  );
}

export default BeforeAfterSlider;
