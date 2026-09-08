import { BLANK_IMAGE_SRC } from "@/lib/blank-image";

export type EditShowcasePhoto = {
  id: string;
  src: string;
  alt: string;
};

export const EDIT_SHOWCASE_TOP_ROW: EditShowcasePhoto[] = [
  {
    id: "top-1",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "top-2",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "top-3",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "top-4",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "top-5",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
];

export const EDIT_SHOWCASE_BOTTOM_ROW: EditShowcasePhoto[] = [
  {
    id: "bottom-1",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "bottom-2",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "bottom-3",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "bottom-4",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "bottom-5",
    src: BLANK_IMAGE_SRC,
    alt: "",
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
