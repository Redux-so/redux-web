"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const SHIMMER_CYCLE_MS = 6000;
const SHIMMER_SWEEP_FRACTION = 0.42;
const SHIMMER_START_POSITION = 150;
const SHIMMER_END_POSITION = -50;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

function getShimmerBackgroundPosition(elapsedMs: number): string {
  const cycleProgress = (elapsedMs % SHIMMER_CYCLE_MS) / SHIMMER_CYCLE_MS;

  if (cycleProgress >= SHIMMER_SWEEP_FRACTION) {
    return `${SHIMMER_END_POSITION}% center`;
  }

  const sweepProgress = easeOutCubic(cycleProgress / SHIMMER_SWEEP_FRACTION);
  const position =
    SHIMMER_START_POSITION +
    sweepProgress * (SHIMMER_END_POSITION - SHIMMER_START_POSITION);

  return `${position.toFixed(2)}% center`;
}

type HeroShimmerTextProps = {
  children: string;
  className?: string;
};

export default function HeroShimmerText({
  children,
  className,
}: HeroShimmerTextProps) {
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shine = shineRef.current;
    if (!shine) {
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      shine.style.backgroundPosition = getShimmerBackgroundPosition(
        now - startedAt,
      );
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <span className={cn("hero-shimmer-text", className)}>
      <span className="hero-shimmer-text__base">{children}</span>
      <span ref={shineRef} className="hero-shimmer-text__shine" aria-hidden>
        {children}
      </span>
    </span>
  );
}
