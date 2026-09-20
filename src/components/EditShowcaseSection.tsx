"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  EDIT_SHOWCASE_BOTTOM_ROW,
  EDIT_SHOWCASE_PHOTO_ASPECT,
  EDIT_SHOWCASE_PHOTO_FRAME,
  EDIT_SHOWCASE_PHOTO_HEIGHT,
  EDIT_SHOWCASE_PHOTO_SIZES,
  EDIT_SHOWCASE_PHOTO_WIDTH,
  EDIT_SHOWCASE_TOP_ROW,
  type EditShowcasePhoto,
} from "@/src/components/edit-showcase/edit-showcase-data";
import InfiniteScrollMarquee from "@/src/components/InfiniteScrollMarquee";
import MarqueeEdgeFade from "@/src/components/MarqueeEdgeFade";
import BlankImagePlaceholder from "@/components/shared/BlankImagePlaceholder";
import {
  GRID_LINE_COLOR,
  GRID_LINE_WIDTH_PX,
} from "@/src/components/page-grid/shared";
import { isBlankImageSrc } from "@/lib/blank-image";
import SectionIntro from "@/src/components/SectionIntro";
import { BRAND_HEADLINE_ACCENT_CLASS } from "@/lib/brand-colors";
import {
  PAGE_CONTAINER,
  PAGE_GRID_MARQUEE_LANE,
  SECTION_LAYOUT,
} from "@/lib/section-styles";
import { cn } from "@/lib/utils";

function useHoverSpotlightEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return enabled;
}

type PhotoMarqueeRowProps = {
  photos: readonly EditShowcasePhoto[];
  direction: "left" | "right";
  trackKey: string;
};

function PhotoCard({
  photo,
  alt,
  className,
  interactive = true,
  cardKey,
  isActive = false,
  isDimmed = false,
  onActivate,
}: {
  photo: EditShowcasePhoto;
  alt: string;
  className?: string;
  interactive?: boolean;
  cardKey?: string;
  isActive?: boolean;
  isDimmed?: boolean;
  onActivate?: (cardKey: string) => void;
}) {
  const image = isBlankImageSrc(photo.src) ? (
    <BlankImagePlaceholder className="absolute inset-0 rounded-2xl" iconSize={24} />
  ) : (
    <Image
      src={photo.src}
      alt={alt}
      width={EDIT_SHOWCASE_PHOTO_WIDTH}
      height={EDIT_SHOWCASE_PHOTO_HEIGHT}
      loading="lazy"
      sizes={EDIT_SHOWCASE_PHOTO_SIZES}
      className="size-full object-cover"
      draggable={false}
    />
  );

  if (!interactive) {
    return (
      <div
        className={cn(
          EDIT_SHOWCASE_PHOTO_FRAME,
          EDIT_SHOWCASE_PHOTO_ASPECT,
          "relative overflow-hidden rounded-2xl bg-brand-bg",
          className,
        )}
      >
        {image}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "edit-showcase-photo-card",
        EDIT_SHOWCASE_PHOTO_FRAME,
        isActive && "edit-showcase-photo-card--active",
        isDimmed && "edit-showcase-photo-card--dimmed",
      )}
      onMouseEnter={() => {
        if (cardKey) onActivate?.(cardKey);
      }}
    >
      <div
        className={cn(
          "edit-showcase-photo-card__inner",
          EDIT_SHOWCASE_PHOTO_ASPECT,
          "relative overflow-hidden rounded-2xl bg-brand-bg",
          className,
        )}
      >
        {image}
      </div>
    </div>
  );
}

type PhotoMarqueeTrackProps = {
  photos: readonly EditShowcasePhoto[];
  trackKey: string;
  activeCardKey?: string | null;
  onActivate?: (cardKey: string) => void;
  "aria-hidden"?: boolean;
};

function PhotoMarqueeTrack({
  photos,
  trackKey,
  activeCardKey = null,
  onActivate,
  "aria-hidden": ariaHidden,
}: PhotoMarqueeTrackProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 py-3 pr-3 sm:gap-4 sm:py-4 sm:pr-4"
      aria-hidden={ariaHidden ? true : undefined}
    >
      {photos.map((photo, index) => {
        const cardKey = `${trackKey}-${photo.id}-${index}`;

        return (
          <PhotoCard
            key={cardKey}
            cardKey={cardKey}
            photo={photo}
            alt={ariaHidden ? "" : photo.alt}
            isActive={activeCardKey === cardKey}
            isDimmed={activeCardKey !== null && activeCardKey !== cardKey}
            onActivate={onActivate}
          />
        );
      })}
    </div>
  );
}

function PageGridLeftRail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden md:block"
      style={{
        width: GRID_LINE_WIDTH_PX,
        backgroundColor: GRID_LINE_COLOR,
      }}
    />
  );
}

function PhotoMarqueeRow({
  photos,
  direction,
  trackKey,
}: PhotoMarqueeRowProps) {
  const hoverSpotlightEnabled = useHoverSpotlightEnabled();
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);
  const isSpotlightActive = hoverSpotlightEnabled && activeCardKey !== null;

  return (
    <div
      className={cn(
        "edit-showcase-marquee-row w-full min-w-0",
        isSpotlightActive && "edit-showcase-marquee-row--active",
      )}
      onMouseLeave={
        hoverSpotlightEnabled ? () => setActiveCardKey(null) : undefined
      }
    >
      <MarqueeEdgeFade>
        <InfiniteScrollMarquee
          direction={direction}
          durationSec={100}
          paused={isSpotlightActive}
          trackClassName="items-center"
          renderTrack={(instance) => (
            <PhotoMarqueeTrack
              photos={photos}
              trackKey={`${trackKey}-${instance}`}
              activeCardKey={hoverSpotlightEnabled ? activeCardKey : null}
              onActivate={hoverSpotlightEnabled ? setActiveCardKey : undefined}
              aria-hidden={instance === "clone"}
            />
          )}
        />
      </MarqueeEdgeFade>
    </div>
  );
}

export default function EditShowcaseSection() {
  return (
    <div className={SECTION_LAYOUT}>
      <div className={PAGE_CONTAINER}>
        <SectionIntro variant="headline">
          See how Redux can <span className={BRAND_HEADLINE_ACCENT_CLASS}>edit</span>
        </SectionIntro>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className={cn(PAGE_GRID_MARQUEE_LANE, "w-full")}>
          <PageGridLeftRail />
          <PhotoMarqueeRow
            photos={EDIT_SHOWCASE_TOP_ROW}
            direction="left"
            trackKey="edit-top"
          />
        </div>

        <div className={cn(PAGE_GRID_MARQUEE_LANE, "w-full")}>
          <PageGridLeftRail />
          <PhotoMarqueeRow
            photos={EDIT_SHOWCASE_BOTTOM_ROW}
            direction="right"
            trackKey="edit-bottom"
          />
        </div>
      </div>
    </div>
  );
}
