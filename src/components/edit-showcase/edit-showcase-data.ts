export type EditShowcasePhoto = {
  id: string;
  src: string;
  alt: string;
};

const EDIT_SHOWCASE_TOP_BASE = "/edit-showcase/top";
const EDIT_SHOWCASE_BOTTOM_BASE = "/edit-showcase/bottom";

export const EDIT_SHOWCASE_TOP_ROW: EditShowcasePhoto[] = [
  {
    id: "top-1",
    src: `${EDIT_SHOWCASE_TOP_BASE}/top-1.webp`,
    alt: "Cherry blossom street in Japan with cyclist and traffic",
  },
  {
    id: "top-2",
    src: `${EDIT_SHOWCASE_TOP_BASE}/top-2.webp`,
    alt: "Palm trees and beachfront hotels on a sunny day",
  },
  {
    id: "top-3",
    src: `${EDIT_SHOWCASE_TOP_BASE}/top-3.webp`,
    alt: "Snowy shrine with glowing orange lanterns at night",
  },
  {
    id: "top-4",
    src: `${EDIT_SHOWCASE_TOP_BASE}/top-4.webp`,
    alt: "Golden Gate Bridge above rolling fog",
  },
  {
    id: "top-5",
    src: `${EDIT_SHOWCASE_TOP_BASE}/top-5.webp`,
    alt: "Soccer stadium at night during a match",
  },
];

export const EDIT_SHOWCASE_BOTTOM_ROW: EditShowcasePhoto[] = [
  {
    id: "bottom-1",
    src: `${EDIT_SHOWCASE_BOTTOM_BASE}/bottom-1.webp`,
    alt: "Minimal product photo of hand sanitizer bottles on linen",
  },
  {
    id: "bottom-2",
    src: `${EDIT_SHOWCASE_BOTTOM_BASE}/bottom-2.webp`,
    alt: "Mercedes E-Class at sunset in the hills",
  },
  {
    id: "bottom-3",
    src: `${EDIT_SHOWCASE_BOTTOM_BASE}/bottom-3.webp`,
    alt: "Rolex Datejust watch close-up on a dark surface",
  },
  {
    id: "bottom-4",
    src: `${EDIT_SHOWCASE_BOTTOM_BASE}/bottom-4.webp`,
    alt: "Modern open-concept living and dining room",
  },
  {
    id: "bottom-5",
    src: `${EDIT_SHOWCASE_BOTTOM_BASE}/bottom-5.webp`,
    alt: "Close-up of monstera leaves with natural light",
  },
];

export const EDIT_SHOWCASE_PHOTO_ASPECT = "aspect-[16/9]";
/** Intrinsic size of optimized WebP assets (2x retina). */
export const EDIT_SHOWCASE_PHOTO_WIDTH = 720;
export const EDIT_SHOWCASE_PHOTO_HEIGHT = 450;

/** Size each marquee card : slightly larger than 5-across so strips feel more prominent. */
export const EDIT_SHOWCASE_PHOTO_FRAME =
  "w-[max(16rem,calc((var(--page-grid-width,100%)-3.75rem)/3.75))] shrink-0 sm:w-[max(19rem,calc((var(--page-grid-width,100%)-5rem)/3.75))]";

/** First visible row images : preload via next/image priority. */
export const EDIT_SHOWCASE_PRIORITY_COUNT = 3;
