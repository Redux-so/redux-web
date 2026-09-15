"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  EDIT_SHOWCASE_BOTTOM_ROW,
  EDIT_SHOWCASE_PHOTO_ASPECT,
  EDIT_SHOWCASE_PHOTO_FRAME,
  EDIT_SHOWCASE_PRIORITY_COUNT,
  EDIT_SHOWCASE_TOP_ROW,
  type EditShowcasePhoto,
} from "@/src/components/edit-showcase/edit-showcase-data";
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
  PAGE_GRID_ALIGNED_FRAME,
  SECTION_LAYOUT,
} from "@/lib/section-styles";
import { ScrollRevealGroup, ScrollRevealItem } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type PhotoMarqueeRowProps = {
  photos: readonly EditShowcasePhoto[];
  direction: "left" | "right";
  trackKey: string;
  priorityCount?: number;
};

function PhotoCard({
  photo,
  priority = false,
  className,
  interactive = true,
  cardKey,
  isActive = false,
  isDimmed = false,
  onActivate,
}: {
  photo: EditShowcasePhoto;
  priority?: boolean;
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
      alt={photo.alt}
      fill
      loading="eager"
      priority={priority}
      sizes="(max-width: 640px) 260px, (max-width: 1920px) 480px, 600px"
      className="object-cover"
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
  priorityCount?: number;
  repeats?: number;
  activeCardKey?: string | null;
  onActivate?: (cardKey: string) => void;
  "aria-hidden"?: boolean;
};

function PhotoMarqueeTrack({
  photos,
  trackKey,
  priorityCount = 0,
  repeats = 2,
  activeCardKey = null,
  onActivate,
  "aria-hidden": ariaHidden,
}: PhotoMarqueeTrackProps) {
  const items = Array.from({ length: repeats }, () => photos).flat();

  return (
    <div
      className="flex shrink-0 items-center gap-3 py-3 pr-3 sm:gap-4 sm:py-4 sm:pr-4"
      aria-hidden={ariaHidden}
    >
      {items.map((photo, index) => {
        const cardKey = `${trackKey}-${photo.id}-${index}`;

        return (
          <PhotoCard
            key={cardKey}
            cardKey={cardKey}
            photo={photo}
            priority={!ariaHidden && index < priorityCount}
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
      className="pointer-events-none absolute inset-y-0 left-0 z-20"
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
  priorityCount = 0,
}: PhotoMarqueeRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const isSpotlightActive = activeCardKey !== null;

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            priority={index < priorityCount}
            interactive={false}
            className="!w-full !max-w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "edit-showcase-marquee-row w-full min-w-0",
        isSpotlightActive && "edit-showcase-marquee-row--active",
      )}
      onMouseLeave={() => setActiveCardKey(null)}
    >
      <MarqueeEdgeFade>
        <div className={cn("flex w-max items-center", animationClass)}>
          <PhotoMarqueeTrack
            photos={photos}
            trackKey={`${trackKey}-a`}
            priorityCount={priorityCount}
            activeCardKey={activeCardKey}
            onActivate={setActiveCardKey}
          />
          <PhotoMarqueeTrack
            photos={photos}
            trackKey={`${trackKey}-b`}
            priorityCount={0}
            activeCardKey={activeCardKey}
            onActivate={setActiveCardKey}
            aria-hidden
          />
        </div>
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

      <ScrollRevealGroup
        className="flex flex-col gap-3 sm:gap-4"
        stagger={0.1}
      >
        <ScrollRevealItem variant="fadeIn" className="w-full min-w-0">
          <div className={cn(PAGE_GRID_ALIGNED_FRAME, "overflow-x-visible")}>
            <PageGridLeftRail />
            <PhotoMarqueeRow
              photos={EDIT_SHOWCASE_TOP_ROW}
              direction="left"
              trackKey="edit-top"
              priorityCount={EDIT_SHOWCASE_PRIORITY_COUNT}
            />
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem variant="fadeIn" className="w-full min-w-0">
          <div className={cn(PAGE_GRID_ALIGNED_FRAME, "overflow-x-visible")}>
            <PageGridLeftRail />
            <PhotoMarqueeRow
              photos={EDIT_SHOWCASE_BOTTOM_ROW}
              direction="right"
              trackKey="edit-bottom"
            />
          </div>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </div>
  );
}
