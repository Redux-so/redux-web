"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import {
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
} from "@/src/components/editor-showcase/showcase-layout";

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
/** Ignore raw layout reads below this until a fallback height is available. */
const MIN_MEASURE_HEIGHT_PX = 80;
/** Vertical padding on EditorShowcaseScaler wrapper (`py-2`). */
const SHOWCASE_SCALER_PADDING_Y_PX = 16;
/** Recheck progress after mount while the browser restores scroll position. */
const RESTORE_RECHECK_DELAYS_MS = [0, 16, 50, 100, 200, 400, 800] as const;
/** Matches Tailwind `max-w-7xl` — fallback column width before layout settles. */
const PAGE_COLUMN_MAX_WIDTH_PX = 1280;

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

/** Estimate settled showcase height from column width when layout is still settling. */
function estimateShowcaseHeight(contentWidth: number): number {
  if (contentWidth <= 0) {
    return 0;
  }

  const scale = contentWidth / SHOWCASE_DESIGN_WIDTH;
  return SHOWCASE_DESIGN_HEIGHT * scale + SHOWCASE_SCALER_PADDING_Y_PX;
}

function resolveMeasureWidth(
  measuredWidth: number,
  content: HTMLElement,
  lastValidWidth: number,
): number {
  if (measuredWidth > 0) {
    return measuredWidth;
  }

  if (lastValidWidth > 0) {
    return lastValidWidth;
  }

  const parentWidth = content.parentElement?.getBoundingClientRect().width ?? 0;
  if (parentWidth > 0) {
    return parentWidth;
  }

  return Math.min(window.innerWidth, PAGE_COLUMN_MAX_WIDTH_PX);
}

function resolveMeasureHeight(
  measuredHeight: number,
  contentWidth: number,
  lastValidHeight: number,
): number {
  const estimatedHeight = estimateShowcaseHeight(contentWidth);

  return Math.max(measuredHeight, lastValidHeight, estimatedHeight);
}

function computeRevealProgress(
  rectTop: number,
  rectHeight: number,
  viewportHeight: number,
): number {
  const navOffset = getNavOffsetPx();
  const revealStartTop = viewportHeight * REVEAL_ENTER_VIEWPORT_RATIO;
  const revealEndTop = Math.max(
    navOffset + REVEAL_REST_TOP_GAP_PX,
    viewportHeight - rectHeight - REVEAL_REST_TOP_GAP_PX,
  );

  // Rest state — showcase has reached its final scroll position.
  if (rectTop <= revealEndTop) {
    return 1;
  }

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
  const lastValidHeightRef = useRef(0);
  const lastValidWidthRef = useRef(0);
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
    const restoreTimeouts: number[] = [];

    const updateProgress = () => {
      const rect = content.getBoundingClientRect();
      const measureWidth = resolveMeasureWidth(
        rect.width,
        content,
        lastValidWidthRef.current,
      );

      if (measureWidth > 0) {
        lastValidWidthRef.current = measureWidth;
      }

      if (rect.height >= MIN_MEASURE_HEIGHT_PX) {
        lastValidHeightRef.current = rect.height;
      }

      const measureHeight = resolveMeasureHeight(
        rect.height,
        measureWidth,
        lastValidHeightRef.current,
      );

      if (measureHeight <= 0) {
        return;
      }

      const next = computeRevealProgress(
        rect.top,
        measureHeight,
        window.innerHeight,
      );

      progress.set(next);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    const scheduleRestoreRechecks = () => {
      for (const delay of RESTORE_RECHECK_DELAYS_MS) {
        restoreTimeouts.push(window.setTimeout(scheduleUpdate, delay));
      }
    };

    scheduleUpdate();
    scheduleRestoreRechecks();

    requestAnimationFrame(() => {
      requestAnimationFrame(updateProgress);
    });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(content);

    const observeScalerFrame = () => {
      const scalerFrame = content.querySelector("[data-showcase-scaler-frame]");
      if (scalerFrame instanceof Element) {
        resizeObserver.observe(scalerFrame);
      }
    };

    observeScalerFrame();
    requestAnimationFrame(observeScalerFrame);

    const onPageShow = () => {
      scheduleUpdate();
      scheduleRestoreRechecks();
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("scrollend", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      for (const timeoutId of restoreTimeouts) {
        window.clearTimeout(timeoutId);
      }
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("scrollend", scheduleUpdate);
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
        data-scroll-motion=""
        style={{ scale, y, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}
