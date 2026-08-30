"use client";

import { Instrument_Serif } from "next/font/google";
import { useReducedMotion } from "framer-motion";

import ToolkitItemCard from "@/src/components/features/ToolkitItemCard";
import { TOOLKIT_ITEMS } from "@/lib/toolkit-data";
import { cn } from "@/lib/utils";

const toolkitHeadline = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type ToolkitMarqueeTrackProps = {
  trackKey: string;
  "aria-hidden"?: boolean;
};

function ToolkitMarqueeTrack({
  trackKey,
  "aria-hidden": ariaHidden,
}: ToolkitMarqueeTrackProps) {
  return (
    <div
      className="flex shrink-0 items-start gap-6 pr-6 sm:gap-8 sm:pr-8 lg:gap-10 lg:pr-10"
      aria-hidden={ariaHidden}
    >
      {TOOLKIT_ITEMS.map((item) => (
        <ToolkitItemCard key={`${trackKey}-${item.name}`} item={item} />
      ))}
    </div>
  );
}

type ToolkitMarqueeProps = {
  className?: string;
};

export default function ToolkitMarquee({ className }: ToolkitMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden",
        className,
      )}
      aria-labelledby="toolkit-marquee-heading"
    >
      <div className="flex flex-col gap-10 px-8 sm:gap-12 sm:px-12 md:px-16 lg:flex-row lg:items-center lg:gap-16 lg:px-20 xl:gap-20 xl:px-28 2xl:px-32">
        <div className="w-[16rem] shrink-0 text-left xl:w-[18rem]">
          <h2
            id="toolkit-marquee-heading"
            className={cn(
              toolkitHeadline.className,
              "m-0 text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]",
            )}
          >
            The Full
            <br />
            Toolkit
          </h2>
          <p className="mt-3 m-0 text-sm leading-relaxed text-white/55 sm:text-[15px]">
            Everything a full editor needs, plus AI when you want it.
          </p>
        </div>

        <div className="group/toolkit-marquee min-w-0 flex-1 overflow-hidden">
          {prefersReducedMotion ? (
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-6 p-0 sm:gap-x-8 lg:gap-x-10">
              {TOOLKIT_ITEMS.map((item) => (
                <li key={item.name}>
                  <ToolkitItemCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="relative w-full overflow-hidden">
              <div className="animate-toolkit-marquee flex w-max items-start">
                <ToolkitMarqueeTrack trackKey="a" />
                <ToolkitMarqueeTrack trackKey="b" aria-hidden />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen-reader-only static list — marquee duplicate tracks are aria-hidden */}
      <div className="sr-only">
        <h3>Editing toolkit</h3>
        <ul>
          {TOOLKIT_ITEMS.map((item) => (
            <li key={item.name}>
              {item.name}: {item.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
