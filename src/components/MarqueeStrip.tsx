"use client";

import Image from "next/image";

import {
  GRID_LINE_COLOR,
  getColumnBoundaryPercents,
} from "@/src/components/page-grid/shared";
import { PAGE_GRID_ALIGNED_FRAME, SECTION_BLEED } from "@/lib/section-styles";
import { ScrollRevealGroup, ScrollRevealItem } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const marqueeItems = [
  { src: "/marquee/photoshop.png", alt: "Adobe Photoshop", width: 152, height: 126 },
  { src: "/marquee/lightroom.png", alt: "Adobe Lightroom", width: 157, height: 142 },
  { src: "/marquee/luminar-neo.png", alt: "Luminar Neo", width: 500, height: 88 },
  { src: "/marquee/canva.png", alt: "Canva", width: 354, height: 125 },
  { src: "/marquee/figma.png", alt: "Figma", width: 356, height: 106 },
] as const;

const MARQUEE_LOGO_CLASS = "marquee-logo-cell__image";
const MARQUEE_LOGO_CELL_CLASS =
  "marquee-logo-cell contained-accent-glow group/marquee-logo relative flex h-full w-full min-h-[3.75rem] items-center justify-center overflow-hidden px-0.5 sm:min-h-[5.5rem] lg:min-h-[6.5rem]";

/** Internal dividers only — outer edges come from PageGrid. */
const internalColumnBoundaries = getColumnBoundaryPercents(marqueeItems.length).filter(
  (leftPercent) => leftPercent > 0 && leftPercent < 100,
);

export default function MarqueeStrip() {
  return (
    <ScrollRevealGroup className="flex min-w-0 w-full flex-col" stagger={0.1}>
      <ScrollRevealItem variant="fadeIn" className="w-full min-w-0">
        <div className={cn(PAGE_GRID_ALIGNED_FRAME, "overflow-x-visible")}>
          <p className="m-0 py-6 text-center text-lg leading-relaxed text-white/55 sm:py-8">
            Inspired by workflows from
          </p>

          <div className="relative min-w-0">
            <div
              className={cn(SECTION_BLEED, "pointer-events-none absolute inset-y-0")}
              aria-hidden
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ backgroundColor: GRID_LINE_COLOR }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ backgroundColor: GRID_LINE_COLOR }}
              />
            </div>

            <div className="relative min-w-0">
              {internalColumnBoundaries.map((leftPercent) => (
                <div
                  key={`rail-${leftPercent}`}
                  className="pointer-events-none absolute inset-y-0 w-px"
                  style={{
                    left: `${leftPercent}%`,
                    transform: "translateX(-50%)",
                    backgroundColor: GRID_LINE_COLOR,
                  }}
                  aria-hidden
                />
              ))}

              <ul className="relative z-[1] m-0 grid min-w-0 list-none grid-cols-5 items-stretch p-0">
                {marqueeItems.map((item) => (
                  <li key={item.src} className="min-w-0">
                    <div className={MARQUEE_LOGO_CELL_CLASS} aria-label={item.alt}>
                      <Image
                        src={item.src}
                        alt=""
                        width={item.width}
                        height={item.height}
                        unoptimized
                        className={cn(
                          MARQUEE_LOGO_CLASS,
                          item.src.includes("luminar-neo") &&
                            "marquee-logo-cell__image--luminar",
                        )}
                        draggable={false}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollRevealItem>
    </ScrollRevealGroup>
  );
}
