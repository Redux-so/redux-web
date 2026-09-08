"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const REVEAL_START_SCALE = 0.42;
const REVEAL_START_Y_PX = 72;
const REVEAL_START_OPACITY = 0.75;
const REVEAL_START_SCALE_MOBILE = 0.48;
const REVEAL_START_Y_PX_MOBILE = 56;
/** Fully revealed scale — 1× fills the page column (same width as feature bentos). */
const REVEAL_END_SCALE = 1;
const REVEAL_END_SCALE_MOBILE = 1;
/** Viewport ratio where reveal begins (showcase rising from hero). */
const REVEAL_ENTER_VIEWPORT_RATIO = 0.92;
/** Extra space below nav when the window counts as fully revealed. */
const REVEAL_REST_TOP_GAP_PX = 24;
/** Ignore layout measurements until the showcase has a stable height. */
const MIN_MEASURE_HEIGHT_PX = 80;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getNavOffsetPx(): number {
  return window.matchMedia("(min-width: 640px)").matches ? 64 : 60;
}

function getRevealStartValues(): { endScale: number; scale: number; y: number } {
  if (typeof window === "undefined") {
    return {
      scale: REVEAL_START_SCALE,
      endScale: REVEAL_END_SCALE,
      y: REVEAL_START_Y_PX,
    };
  }

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return {
    scale: isMobile ? REVEAL_START_SCALE_MOBILE : REVEAL_START_SCALE,
    endScale: isMobile ? REVEAL_END_SCALE_MOBILE : REVEAL_END_SCALE,
    y: isMobile ? REVEAL_START_Y_PX_MOBILE : REVEAL_START_Y_PX,
  };
}

function computeRevealProgress(
  rectTop: number,
  rectHeight: number,
  viewportHeight: number,
): number | null {
  if (rectHeight < MIN_MEASURE_HEIGHT_PX) {
    return null;
  }

  const navOffset = getNavOffsetPx();
  const revealStartTop = viewportHeight * REVEAL_ENTER_VIEWPORT_RATIO;
  const revealEndTop = Math.max(
    navOffset + REVEAL_REST_TOP_GAP_PX,
    viewportHeight - rectHeight - REVEAL_REST_TOP_GAP_PX,
  );

  const range = Math.max(revealStartTop - revealEndTop, 1);
  const next = 1 - (rectTop - revealEndTop) / range;
  return clamp(next, 0, 1);
}

type ShowcaseScrollRevealProps = {
  children: ReactNode;
};

export default function ShowcaseScrollReveal({
  children,
}: ShowcaseScrollRevealProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const startScale = useMotionValue(REVEAL_START_SCALE);
  const endScale = useMotionValue(REVEAL_END_SCALE);
  const startY = useMotionValue(REVEAL_START_Y_PX);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const content = contentRef.current;
    if (!content) {
      return;
    }

    const { endScale: end, scale, y } = getRevealStartValues();
    startScale.set(scale);
    endScale.set(end);
    startY.set(y);

    let frame = 0;

    const updateProgress = () => {
      const rect = content.getBoundingClientRect();
      const next = computeRevealProgress(
        rect.top,
        rect.height,
        window.innerHeight,
      );

      if (next !== null) {
        progress.set(next);
      }
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    scheduleUpdate();
    requestAnimationFrame(() => {
      requestAnimationFrame(updateProgress);
    });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(content);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [prefersReducedMotion, progress, startScale, endScale, startY]);

  const scale = useTransform(
    [progress, startScale, endScale],
    ([p, start, end]: number[]) => start + (end - start) * p,
  );
  const y = useTransform(
    [progress, startY],
    ([p, start]: number[]) => start * (1 - p),
  );
  const opacity = useTransform(progress, [0, 1], [REVEAL_START_OPACITY, 1]);

  if (prefersReducedMotion) {
    return <div className="relative flex w-full min-w-0 justify-center">{children}</div>;
  }

  return (
    <div ref={contentRef} className="relative flex w-full min-w-0 justify-center">
      <motion.div
        className="relative w-full min-w-0 max-w-full origin-center will-change-transform"
        style={{ scale, y, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
