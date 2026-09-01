"use client";

import Image from "next/image";

import {
  GRID_LINE_COLOR,
  GridCornerMark,
  GridPlusMark,
  getColumnBoundaryPercents,
} from "@/src/components/page-grid/shared";
import { PAGE_GRID_ALIGNED_FRAME } from "@/lib/section-styles";
import { ScrollRevealGroup, ScrollRevealItem } from "@/lib/scroll-motion";

const marqueeItems = [
  { src: "/marquee/photoshop.png", alt: "Adobe Photoshop", width: 152, height: 126 },
  { src: "/marquee/lightroom.png", alt: "Adobe Lightroom", width: 157, height: 142 },
  { src: "/marquee/luminar-neo.png", alt: "Luminar Neo", width: 500, height: 88 },
  { src: "/marquee/canva.png", alt: "Canva", width: 354, height: 125 },
  { src: "/marquee/figma.png", alt: "Figma", width: 356, height: 106 },
] as const;

const MARQUEE_LOGO_BOX_CLASS =
  "flex h-7 w-full min-w-0 items-center justify-center sm:h-8 lg:h-9";
const MARQUEE_LOGO_CLASS = "max-h-full max-w-full object-contain";

const columnBoundaries = getColumnBoundaryPercents(marqueeItems.length);

export default function MarqueeStrip() {
  return (
    <ScrollRevealGroup className="flex min-w-0 w-full flex-col" stagger={0.1}>
      <ScrollRevealItem variant="fadeIn" className="w-full min-w-0">
        <div className={PAGE_GRID_ALIGNED_FRAME}>
          <p className="m-0 py-6 text-center text-lg leading-relaxed text-white/40 sm:py-8">
            Inspired by workflows from
          </p>

          <div
            className="relative border-y"
            style={{ borderColor: GRID_LINE_COLOR }}
          >
            {columnBoundaries.map((leftPercent) => (
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

            {columnBoundaries.flatMap((leftPercent) => {
              const isOuterEdge = leftPercent === 0 || leftPercent === 100;

              if (isOuterEdge) {
                return [
                  <GridCornerMark
                    key={`corner-top-${leftPercent}`}
                    corner={leftPercent === 0 ? "top-left" : "top-right"}
                    leftPercent={leftPercent}
                    edge="top"
                  />,
                  <GridCornerMark
                    key={`corner-bottom-${leftPercent}`}
                    corner={leftPercent === 0 ? "bottom-left" : "bottom-right"}
                    leftPercent={leftPercent}
                    edge="bottom"
                  />,
                ];
              }

              return [
                <GridPlusMark
                  key={`plus-top-${leftPercent}`}
                  leftPercent={leftPercent}
                  edge="top"
                />,
                <GridPlusMark
                  key={`plus-bottom-${leftPercent}`}
                  leftPercent={leftPercent}
                  edge="bottom"
                />,
              ];
            })}

            <ul className="relative z-[1] m-0 grid min-w-0 list-none grid-cols-5 p-0">
              {marqueeItems.map((item) => (
                <li
                  key={item.src}
                  className="flex min-w-0 items-center justify-center px-1 py-6 sm:px-3 sm:py-10 lg:px-4 lg:py-12"
                >
                  <div className={MARQUEE_LOGO_BOX_CLASS}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      unoptimized
                      className={MARQUEE_LOGO_CLASS}
                      draggable={false}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollRevealItem>
    </ScrollRevealGroup>
  );
}
