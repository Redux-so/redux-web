"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { scrollToDocumentTop, scrollToHash } from "@/lib/nav-scroll";

function runAfterLayout(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

export default function MarketingScrollManager() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const behavior = prefersReducedMotion ? "auto" : "auto";

    const syncScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToHash(hash, behavior);
        return;
      }
      scrollToDocumentTop(behavior);
    };

    syncScroll();
    runAfterLayout(syncScroll);
  }, [pathname, prefersReducedMotion]);

  return null;
}
