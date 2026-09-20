"use client";

import InfiniteScrollMarquee from "@/src/components/InfiniteScrollMarquee";
import MarqueeEdgeFade from "@/src/components/MarqueeEdgeFade";
import ToolkitItemCard from "@/src/components/features/ToolkitItemCard";
import { TOOLKIT_ITEMS } from "@/lib/toolkit-data";
import {
  PAGE_CONTAINER,
  SECTION_BLEED,
  SECTION_HEADLINE,
} from "@/lib/section-styles";
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
        <div className="w-full shrink-0 text-left lg:max-w-fit">
          <h2
            id="toolkit-marquee-heading"
            className={cn("m-0 whitespace-nowrap", SECTION_HEADLINE)}
          >
            The Full Toolkit
          </h2>
          <p className="mt-3 m-0 text-sm leading-relaxed text-marketing-muted sm:text-[15px]">
            Everything a full editor needs, plus AI when you want it.
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <MarqueeEdgeFade
            className={cn(
              SECTION_BLEED,
              "lg:relative lg:left-auto lg:w-auto lg:max-w-none lg:translate-x-0",
            )}
          >
            <InfiniteScrollMarquee
              durationSec={140}
              trackClassName="items-start"
              renderTrack={(instance) => (
                <ToolkitMarqueeTrack
                  trackKey={instance}
                  aria-hidden
                />
              )}
            />
          </MarqueeEdgeFade>
        </div>
      </div>

      {/* Screen-reader-only static list : marquee duplicate tracks are aria-hidden */}
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
