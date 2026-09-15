"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const SHIMMER_CYCLE_MS = 6000;
const SHIMMER_SWEEP_FRACTION = 0.42;
const SHIMMER_TRAVEL_MULTIPLIER = 2.2;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

function getShimmerTranslateX(
  elapsedMs: number,
  travelPx: number,
): number {
  const cycleProgress = (elapsedMs % SHIMMER_CYCLE_MS) / SHIMMER_CYCLE_MS;

  if (cycleProgress >= SHIMMER_SWEEP_FRACTION) {
    return travelPx;
  }

  const sweepProgress = easeOutCubic(cycleProgress / SHIMMER_SWEEP_FRACTION);
  return -travelPx + sweepProgress * (travelPx * SHIMMER_TRAVEL_MULTIPLIER);
}

type HeroShimmerTextProps = {
  children: string;
  className?: string;
};

export default function HeroShimmerText({
  children,
  className,
}: HeroShimmerTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const shine = shineRef.current;
    if (!(root instanceof HTMLElement) || !(shine instanceof HTMLElement)) {
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const travelPx = root.getBoundingClientRect().width;
      const translateX = getShimmerTranslateX(now - startedAt, travelPx);
      shine.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <span ref={rootRef} className={cn("hero-shimmer-text", className)}>
      <span className="hero-shimmer-text__base">{children}</span>
      <span className="hero-shimmer-text__shine" aria-hidden>
        <span ref={shineRef} className="hero-shimmer-text__shine-inner">
          {children}
        </span>
      </span>
    </span>
  );
}
