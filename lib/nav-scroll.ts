import type { MouseEvent } from "react";

export type ScrollBehaviorOption = ScrollBehavior;

export function getFixedNavHeight(): number {
  const header = document.querySelector("header");
  if (!(header instanceof HTMLElement)) {
    return 60;
  }
  return Math.ceil(header.getBoundingClientRect().height);
}

export function scrollToDocumentTop(behavior: ScrollBehaviorOption = "auto") {
  window.scrollTo({ top: 0, left: 0, behavior });
}

/** Align the target section's top edge directly below the fixed nav. */
export function scrollToHash(
  hash: string,
  behavior: ScrollBehaviorOption = "auto",
) {
  const id = hash.replace(/^#/, "");
  if (!id || id === "home") {
    scrollToDocumentTop(behavior);
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    scrollToDocumentTop(behavior);
    return;
  }

  const navHeight = getFixedNavHeight();
  const top =
    target.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior,
  });
}

export function parseMarketingHref(href: string): {
  pathname: string;
  hash: string;
} | null {
  if (href.startsWith("#")) {
    return { pathname: window.location.pathname, hash: href };
  }

  if (!href.startsWith("/")) {
    return null;
  }

  try {
    const url = new URL(href, window.location.origin);
    return { pathname: url.pathname, hash: url.hash };
  } catch {
    return null;
  }
}

type MarketingNavClickOptions = {
  prefersReducedMotion?: boolean;
  onAfterScroll?: () => void;
};

export function handleMarketingNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  options: MarketingNavClickOptions = {},
) {
  const parsed = parseMarketingHref(href);
  if (!parsed) {
    return;
  }

  const behavior: ScrollBehaviorOption =
    options.prefersReducedMotion ? "auto" : "smooth";
  const { pathname, hash } = parsed;
  const onSamePage = pathname === window.location.pathname;

  if (onSamePage && hash) {
    event.preventDefault();
    scrollToHash(hash, behavior);
    window.history.pushState(null, "", `${pathname}${hash}`);
    options.onAfterScroll?.();
    return;
  }

  if (onSamePage && !hash) {
    event.preventDefault();
    scrollToDocumentTop(behavior);
    options.onAfterScroll?.();
  }
}
