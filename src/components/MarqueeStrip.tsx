import { Fragment } from "react";

const marqueeItems = [
  "Adobe Photoshop",
  "Adobe Lightroom",
  "Luminar Neo",
  "Canva",
  "Figma",
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
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={ariaHidden}
    >
      {items.map((item, index) => (
        <Fragment key={`${trackKey}-${index}`}>
          {index > 0 ? (
            <span className="text-white/30" aria-hidden="true">
              ·
            </span>
          ) : null}
          <span className="text-sm text-white/90 sm:text-base">{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <section className="border-y border-white/[0.08] bg-brand-surface py-9 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm text-white/70 sm:mb-10 sm:text-base">
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
