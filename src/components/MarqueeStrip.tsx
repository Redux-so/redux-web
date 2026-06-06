import Image from "next/image";
import { Fragment } from "react";

const LOGO_SIZE = 500;

const marqueeItems = [
  { src: "/marquee/photoshop.png", alt: "Adobe Photoshop" },
  { src: "/marquee/lightroom.png", alt: "Adobe Lightroom" },
  { src: "/marquee/luminar-neo.png", alt: "Luminar Neo" },
  { src: "/marquee/canva.png", alt: "Canva" },
  { src: "/marquee/figma.png", alt: "Figma" },
] as const;

const TRACK_REPEATS = 4;

type MarqueeTrackProps = {
  trackKey: string;
  "aria-hidden"?: boolean;
};

function MarqueeTrack({ trackKey, "aria-hidden": ariaHidden }: MarqueeTrackProps) {
  const items = Array.from({ length: TRACK_REPEATS }, () => marqueeItems).flat();

  return (
    <div
      className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
      aria-hidden={ariaHidden}
    >
      {items.map((item, index) => (
        <Fragment key={`${trackKey}-${index}`}>
          {index > 0 ? (
            <span className="text-white/30" aria-hidden="true">
              ·
            </span>
          ) : null}
          <Image
            src={item.src}
            alt={item.alt}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            unoptimized
            className="h-20 w-auto sm:h-24 lg:h-28"
            draggable={false}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <section className="border-y border-white/[0.08] bg-marquee-gradient pb-3 pt-5 sm:pb-4 sm:pt-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-center text-sm text-white/70 sm:mb-3 sm:text-base">
          Inspired by workflows from
        </p>

        <div className="w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center">
            <MarqueeTrack trackKey="a" />
            <MarqueeTrack trackKey="b" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
