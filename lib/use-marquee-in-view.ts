"use client";

import { useEffect, useRef, useState } from "react";

type InViewListener = (inView: boolean) => void;

const MARQUEE_VIEWPORT_ROOT_MARGIN = "64px 0px";

let sharedMarqueeObserver: IntersectionObserver | null = null;
const marqueeInViewListeners = new WeakMap<Element, InViewListener>();

function getMarqueeIntersectionObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }

  if (!sharedMarqueeObserver) {
    sharedMarqueeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          marqueeInViewListeners.get(entry.target)?.(entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: MARQUEE_VIEWPORT_ROOT_MARGIN,
        threshold: 0,
      },
    );
  }

  return sharedMarqueeObserver;
}

/**
 * Shared IntersectionObserver for marquee lanes — pauses offscreen animation
 * without one observer per card/item.
 */
export function useMarqueeInView(defaultInView = false) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(defaultInView);

  useEffect(() => {
    const element = rootRef.current;
    const observer = getMarqueeIntersectionObserver();
    if (!element || !observer) {
      return;
    }

    const listener: InViewListener = (visible) => {
      setInView(visible);
    };

    marqueeInViewListeners.set(element, listener);
    observer.observe(element);

    return () => {
      marqueeInViewListeners.delete(element);
      observer.unobserve(element);
    };
  }, []);

  return { rootRef, inView };
}
