export type EditShowcasePhoto = {
  id: string;
  src: string;
  alt: string;
};

export const EDIT_SHOWCASE_TOP_ROW: EditShowcasePhoto[] = [
  {
    id: "top-1",
    src: "/edit-showcase/top/top-1.webp",
    alt: "Edited coastal cliff landscape at golden hour",
  },
  {
    id: "top-2",
    src: "/edit-showcase/top/top-2.webp",
    alt: "Edited mountain valley with moody sky",
  },
  {
    id: "top-3",
    src: "/edit-showcase/top/top-3.webp",
    alt: "Edited forest landscape with warm light",
  },
  {
    id: "top-4",
    src: "/edit-showcase/top/top-4.webp",
    alt: "Edited desert dunes at sunset",
  },
  {
    id: "top-5",
    src: "/edit-showcase/top/top-5.webp",
    alt: "Edited lake reflection with mountain backdrop",
  },
];

export const EDIT_SHOWCASE_BOTTOM_ROW: EditShowcasePhoto[] = [
  {
    id: "bottom-1",
    src: "/edit-showcase/bottom/bottom-1.webp",
    alt: "Edited urban skyline at dusk",
  },
  {
    id: "bottom-2",
    src: "/edit-showcase/bottom/bottom-2.webp",
    alt: "Edited rolling hills under dramatic clouds",
  },
  {
    id: "bottom-3",
    src: "/edit-showcase/bottom/bottom-3.webp",
    alt: "Edited tropical beach with turquoise water",
  },
  {
    id: "bottom-4",
    src: "/edit-showcase/bottom/bottom-4.webp",
    alt: "Edited canyon landscape with layered rock formations",
  },
  {
    id: "bottom-5",
    src: "/edit-showcase/bottom/bottom-5.webp",
    alt: "Edited snowy peak above cloud inversion",
  },
];

export const EDIT_SHOWCASE_PHOTO_ASPECT = "aspect-[16/10]";
/** Intrinsic size of optimized WebP assets (2x retina). */
export const EDIT_SHOWCASE_PHOTO_WIDTH = 720;
export const EDIT_SHOWCASE_PHOTO_HEIGHT = 450;

/** Size each card to fit five across the crop-guide column width. */
export const EDIT_SHOWCASE_PHOTO_FRAME =
  "w-[max(12rem,calc((var(--page-grid-width,100%)-5rem)/5))] shrink-0 sm:w-[max(15rem,calc((var(--page-grid-width,100%)-7.5rem)/5))]";

/** First visible row images — preload via next/image priority. */
export const EDIT_SHOWCASE_PRIORITY_COUNT = 3;
