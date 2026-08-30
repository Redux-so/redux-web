"use client";

import Image from "next/image";
import { Fragment } from "react";

import SectionShell from "@/src/components/SectionShell";
import { ScrollRevealGroup, ScrollRevealItem } from "@/lib/scroll-motion";

const marqueeItems = [
  { src: "/marquee/photoshop.png", alt: "Adobe Photoshop", width: 152, height: 126 },
  { src: "/marquee/lightroom.png", alt: "Adobe Lightroom", width: 157, height: 142 },
  { src: "/marquee/luminar-neo.png", alt: "Luminar Neo", width: 500, height: 88 },
  { src: "/marquee/canva.png", alt: "Canva", width: 354, height: 125 },
  { src: "/marquee/figma.png", alt: "Figma", width: 356, height: 106 },
] as const;

const TRACK_REPEATS = 1;

/** Muted treatment for marquee logos and separators — darker grey strip tone. */
const MARQUEE_LOGO_CLASS =
  "h-6 w-auto opacity-40 grayscale sm:h-7 lg:h-8";

const MARQUEE_DOT_CLASS = "text-[#727272]";

type MarqueeTrackProps = {
  trackKey: string;
  "aria-hidden"?: boolean;
};

function MarqueeTrack({ trackKey, "aria-hidden": ariaHidden }: MarqueeTrackProps) {
  const items = Array.from({ length: TRACK_REPEATS }, () => marqueeItems).flat();

  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden={ariaHidden}
    >
      {items.map((item, index) => (
        <Fragment key={`${trackKey}-${index}`}>
          {index > 0 ? (
            <span className={MARQUEE_DOT_CLASS} aria-hidden="true">
              ·
            </span>
          ) : null}
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            unoptimized
            className={MARQUEE_LOGO_CLASS}
            draggable={false}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <SectionShell>
      <ScrollRevealGroup
        className="flex w-full flex-col gap-6 sm:gap-8"
        stagger={0.1}
      >
        <ScrollRevealItem>
          <p className="text-center text-[11px] uppercase text-white/55 sm:text-xs">
            Inspired by workflows from
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem variant="fadeIn" className="w-full">
          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex w-max items-center">
              <MarqueeTrack trackKey="a" />
              <MarqueeTrack trackKey="b" aria-hidden />
            </div>
          </div>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionShell>
  );
}
