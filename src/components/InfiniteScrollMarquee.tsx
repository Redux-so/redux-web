"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type MarqueeTrackInstance = "primary" | "clone";

type InfiniteScrollMarqueeProps = {
  renderTrack: (instance: MarqueeTrackInstance) => ReactNode;
  direction?: "left" | "right";
  /** Seconds to scroll one full track width. */
  durationSec?: number;
  paused?: boolean;
  className?: string;
  trackClassName?: string;
};

export default function InfiniteScrollMarquee({
  renderTrack,
  direction = "left",
  durationSec = 100,
  paused = false,
  className,
  trackClassName,
}: InfiniteScrollMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

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
    const scroller = track?.parentElement;
    if (!(track instanceof HTMLElement) || !(scroller instanceof HTMLElement)) {
      return;
    }

    if (trackWidth <= 0 || durationSec <= 0) {
      scroller.style.transform = "";
      return;
    }

    const speedPxPerMs = trackWidth / (durationSec * 1000);
    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      if (paused) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startedAt;
      const distance = (elapsed * speedPxPerMs) % trackWidth;

      const translateX =
        direction === "left" ? -distance : distance - trackWidth;

      scroller.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      scroller.style.transform = "";
    };
  }, [direction, durationSec, paused, trackWidth]);

  return (
    <div
      className={cn("flex w-max will-change-transform", className)}
      data-marquee-scroll=""
    >
      <div ref={trackRef} className={cn("flex shrink-0", trackClassName)}>
        {renderTrack("primary")}
      </div>
      <div className={cn("flex shrink-0", trackClassName)} aria-hidden>
        {renderTrack("clone")}
      </div>
    </div>
  );
}
