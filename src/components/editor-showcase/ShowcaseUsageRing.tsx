"use client";

import { useEffect, useRef, useState } from "react";

const RING_RADIUS = 7.5;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Demo: 12 of 20 free messages remaining */
const SHOWCASE_USAGE_PROGRESS = 12 / 20;

function ringOffsetForProgress(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return RING_CIRCUMFERENCE * (1 - clamped);
}

export default function ShowcaseUsageRing() {
  const targetOffset = ringOffsetForProgress(SHOWCASE_USAGE_PROGRESS);
  const [displayOffset, setDisplayOffset] = useState<number | null>(null);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      setDisplayOffset(RING_CIRCUMFERENCE);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setDisplayOffset(targetOffset);
        });
      });
      return () => cancelAnimationFrame(frame);
    }

    setDisplayOffset(targetOffset);
  }, [targetOffset]);

  const strokeTransition = transitionEnabled
    ? "stroke-dashoffset 600ms ease-out"
    : "none";

  return (
    <button
      type="button"
      aria-label="12 free messages remaining"
      className="relative inline-flex shrink-0 cursor-default items-center justify-center rounded-md p-0.5 text-[#888888] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden>
        <g transform="rotate(-90 10 10)">
          <circle
            cx="10"
            cy="10"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#444444]"
          />
          <circle
            cx="10"
            cy="10"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={displayOffset ?? RING_CIRCUMFERENCE}
            style={{ transition: strokeTransition }}
            className="text-[#888888]"
          />
        </g>
      </svg>
    </button>
  );
}
