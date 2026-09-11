"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const WATERMARK_TEXT = "redux";

const WATERMARK_SIZE_CLASS =
  "text-[9rem] leading-none sm:text-[12rem] lg:text-[16rem] xl:text-[20rem]";

type FooterWatermarkProps = {
  fontClassName: string;
};

export default function FooterWatermark({ fontClassName }: FooterWatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const footer = container.closest("footer");
    if (!footer) return;

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointerQuery.matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      container.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      container.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
      container.style.setProperty("--mouse-x", "-9999px");
      container.style.setProperty("--mouse-y", "-9999px");
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none flex justify-center pb-6 sm:pb-8 lg:pb-10"
    >
      <div
        ref={containerRef}
        className={cn(
          "watermark-container pointer-events-none",
          fontClassName,
          WATERMARK_SIZE_CLASS,
        )}
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
