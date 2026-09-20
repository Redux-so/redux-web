import type { StaticImageData } from "next/image";

import canvaLogo from "@/public/marquee/canva.png";
import figmaLogo from "@/public/marquee/figma.png";
import lightroomLogo from "@/public/marquee/lightroom.png";
import luminarNeoLogo from "@/public/marquee/luminar-neo.png";
import photoshopLogo from "@/public/marquee/photoshop.png";

export type MarqueeLogo = {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
  /** Wide logo treatment in the workflows strip. */
  wide?: boolean;
};

export const MARQUEE_LOGOS: readonly MarqueeLogo[] = [
  { src: photoshopLogo, alt: "Adobe Photoshop", width: 152, height: 126 },
  { src: lightroomLogo, alt: "Adobe Lightroom", width: 157, height: 142 },
  { src: canvaLogo, alt: "Canva", width: 354, height: 125 },
  { src: figmaLogo, alt: "Figma", width: 356, height: 106 },
  { src: luminarNeoLogo, alt: "Luminar Neo", width: 500, height: 88, wide: true },
] as const;
