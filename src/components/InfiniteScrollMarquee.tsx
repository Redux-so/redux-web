"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useMarqueeInView } from "@/lib/use-marquee-in-view";
import { cn } from "@/lib/utils";

type MarqueeTrackInstance = "primary" | "clone";

type InfiniteScrollMarqueeProps = {
  renderTrack: (instance: MarqueeTrackInstance) => ReactNode;
  direction?: "left" | "right";
  /** Seconds to scroll one full track width. */
  durationSec?: number;
  paused?: boolean;
  /** When set, visibility is controlled by the parent (e.g. shared observer for multiple rows). */
  inView?: boolean;
  className?: string;
  trackClassName?: string;
};

type MarqueeTimingState = {
  startedAt: number;
  pausedAt: number;
  totalPausedMs: number;
};

export default function InfiniteScrollMarquee({
  renderTrack,
  direction = "left",
  durationSec = 100,
  paused = false,
  inView: inViewProp,
  className,
  trackClassName,
}: InfiniteScrollMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const timingRef = useRef<MarqueeTimingState>({
    startedAt: 0,
    pausedAt: 0,
    totalPausedMs: 0,
  });
  const [trackWidth, setTrackWidth] = useState(0);
  const observeSelf = inViewProp === undefined;
  const { rootRef, inView: selfInView } = useMarqueeInView(false, observeSelf);
  const inView = inViewProp ?? selfInView;

  const isPaused = paused || !inView;

  pausedRef.current = isPaused;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const measure = () => {
      setTrackWidth(track.getBoundingClientRect().width);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
    };
  }, [renderTrack]);

  useEffect(() => {
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    if (!(track instanceof HTMLElement) || !(scroller instanceof HTMLElement)) {
      return;
    }

    if (trackWidth <= 0 || durationSec <= 0) {
      return;
    }

    const speedPxPerMs = trackWidth / (durationSec * 1000);
    timingRef.current = {
      startedAt: performance.now(),
      pausedAt: 0,
      totalPausedMs: 0,
    };

    let frameId = 0;
    let pauseActive = false;

    const tick = (now: number) => {
      const timing = timingRef.current;

      if (pausedRef.current) {
        if (!pauseActive) {
          timing.pausedAt = now;
          pauseActive = true;
        }
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (pauseActive) {
        timing.totalPausedMs += now - timing.pausedAt;
        pauseActive = false;
      }

      const elapsed = now - timing.startedAt - timing.totalPausedMs;
      const distance = (elapsed * speedPxPerMs) % trackWidth;

      const translateX =
        direction === "left" ? -distance : distance - trackWidth;

      scroller.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [direction, durationSec, trackWidth]);

  return (
    <div ref={observeSelf ? rootRef : undefined} className={cn("min-w-0", className)}>
      <div
        ref={scrollerRef}
        className="marquee-track flex w-max"
        data-marquee-scroll=""
        data-paused={isPaused ? "true" : "false"}
      >
        <div ref={trackRef} className={cn("flex shrink-0", trackClassName)}>
          {renderTrack("primary")}
        </div>
        <div
          className={cn("flex shrink-0", trackClassName)}
          aria-hidden
          inert
        >
          {renderTrack("clone")}
        </div>
      </div>
    </div>
  );
}
