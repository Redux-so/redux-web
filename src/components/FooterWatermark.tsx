"use client";

import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

const WATERMARK_TEXT = "redux";

const WATERMARK_SIZE_CLASS =
  "text-[9rem] leading-none sm:text-[12rem] lg:text-[16rem] xl:text-[20rem]";

type FooterWatermarkProps = {
  fontClassName: string;
};

export default function FooterWatermark({ fontClassName }: FooterWatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      container.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      container.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.setProperty("--mouse-x", "-9999px");
    container.style.setProperty("--mouse-y", "-9999px");
  }, []);

  return (
    <div
      aria-hidden
      className="flex justify-center pb-6 sm:pb-8 lg:pb-10"
    >
      <div
        ref={containerRef}
        className={cn("watermark-container", fontClassName, WATERMARK_SIZE_CLASS)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            "--mouse-x": "-9999px",
            "--mouse-y": "-9999px",
          } as React.CSSProperties
        }
      >
        <span className="watermark-text watermark-base">{WATERMARK_TEXT}</span>
        <span className="watermark-text watermark-glow" aria-hidden="true">
          {WATERMARK_TEXT}
        </span>
      </div>
    </div>
  );
}
