import type { StaticImageData } from "next/image";

import bottom1 from "@/public/edit-showcase/bottom/bottom-1.webp";
import bottom2 from "@/public/edit-showcase/bottom/bottom-2.webp";
import bottom3 from "@/public/edit-showcase/bottom/bottom-3.webp";
import bottom4 from "@/public/edit-showcase/bottom/bottom-4.webp";
import bottom5 from "@/public/edit-showcase/bottom/bottom-5.webp";
import shibuyaCrossing from "@/public/edit-showcase/top/shibuya-crossing.webp";
import snowyShrineLanterns from "@/public/edit-showcase/top/snowy-shrine-lanterns.webp";
import stadiumNight from "@/public/edit-showcase/top/stadium-night.webp";
import top2 from "@/public/edit-showcase/top/top-2.webp";
import top4 from "@/public/edit-showcase/top/top-4.webp";

export type EditShowcasePhoto = {
  id: string;
  src: StaticImageData;
  alt: string;
};

export const EDIT_SHOWCASE_TOP_ROW: EditShowcasePhoto[] = [
  {
    id: "top-1",
    src: shibuyaCrossing,
    alt: "Shibuya Crossing at dusk with neon billboards and pedestrians",
  },
  {
    id: "top-2",
    src: top2,
    alt: "Palm trees and beachfront hotels on a sunny day",
  },
  {
    id: "top-3",
    src: snowyShrineLanterns,
    alt: "Snow-covered shrine gate with glowing paper lanterns at night",
  },
  {
    id: "top-4",
    src: top4,
    alt: "Golden Gate Bridge above rolling fog",
  },
  {
    id: "top-5",
    src: stadiumNight,
    alt: "Soccer stadium at night during a match under floodlights",
  },
];

export const EDIT_SHOWCASE_BOTTOM_ROW: EditShowcasePhoto[] = [
  {
    id: "bottom-1",
    src: bottom1,
    alt: "Minimal product photo of hand sanitizer bottles on linen",
  },
  {
    id: "bottom-2",
    src: bottom2,
    alt: "Mercedes E-Class at sunset in the hills",
  },
  {
    id: "bottom-3",
    src: bottom3,
    alt: "Rolex Datejust watch close-up on a dark surface",
  },
  {
    id: "bottom-4",
    src: bottom4,
    alt: "Modern open-concept living and dining room",
  },
  {
    id: "bottom-5",
    src: bottom5,
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

/** Matches rendered card width (~16rem mobile, ~337px desktop). */
export const EDIT_SHOWCASE_PHOTO_SIZES =
  "(max-width: 640px) 256px, 337px";
