"use client";

import { useReducedMotion } from "framer-motion";

import ToolkitItemCard from "@/src/components/features/ToolkitItemCard";
import { TOOLKIT_ITEMS } from "@/lib/toolkit-data";
import { PAGE_CONTAINER, SECTION_BLEED } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

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
    <div
      className={cn("w-full min-w-0", className)}
      aria-labelledby="toolkit-marquee-heading"
    >
      <div
        className={cn(
          PAGE_CONTAINER,
          "flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20",
        )}
      >
        <div className="w-full shrink-0 text-left lg:max-w-[16rem] xl:max-w-[18rem]">
          <h2
            id="toolkit-marquee-heading"
            className={cn(
              "font-display m-0 text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]",
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

        <div className="group/toolkit-marquee min-w-0 flex-1 lg:overflow-hidden">
          {prefersReducedMotion ? (
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-6 p-0 sm:gap-x-8 lg:gap-x-10">
              {TOOLKIT_ITEMS.map((item) => (
                <li key={item.name}>
                  <ToolkitItemCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={cn(SECTION_BLEED, "lg:relative lg:left-auto lg:w-auto lg:max-w-none lg:translate-x-0")}>
              <div className="relative w-full overflow-hidden">
                <div className="animate-toolkit-marquee flex w-max items-start">
                  <ToolkitMarqueeTrack trackKey="a" />
                  <ToolkitMarqueeTrack trackKey="b" aria-hidden />
                </div>
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
    </div>
  );
}
