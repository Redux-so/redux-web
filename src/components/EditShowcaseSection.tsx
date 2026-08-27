"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import {
  EDIT_SHOWCASE_BOTTOM_ROW,
  EDIT_SHOWCASE_PHOTO_ASPECT,
  EDIT_SHOWCASE_PHOTO_FRAME,
  EDIT_SHOWCASE_PRIORITY_COUNT,
  EDIT_SHOWCASE_TOP_ROW,
  type EditShowcasePhoto,
} from "@/src/components/edit-showcase/edit-showcase-data";
import SectionIntro from "@/src/components/SectionIntro";
import {
  PAGE_CONTAINER,
  SECTION_PADDING_Y,
  SECTION_STACK_GAP,
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
}: {
  photo: EditShowcasePhoto;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        EDIT_SHOWCASE_PHOTO_FRAME,
        EDIT_SHOWCASE_PHOTO_ASPECT,
        "relative overflow-hidden rounded-2xl border border-[#2e2e2e] bg-brand-bg",
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        loading="eager"
        priority={priority}
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}

function PhotoMarqueeTrack({
  photos,
  trackKey,
  priorityCount = 0,
  "aria-hidden": ariaHidden,
}: {
  photos: readonly EditShowcasePhoto[];
  trackKey: string;
  priorityCount?: number;
  "aria-hidden"?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
      aria-hidden={ariaHidden}
    >
      {photos.map((photo, index) => (
        <PhotoCard
          key={`${trackKey}-${photo.id}`}
          photo={photo}
          priority={!ariaHidden && index < priorityCount}
        />
      ))}
    </div>
  );
}

function PhotoMarqueeRow({
  photos,
  direction,
  trackKey,
  priorityCount = 0,
}: PhotoMarqueeRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            priority={index < priorityCount}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className={cn("flex w-max items-center", animationClass)}>
        <PhotoMarqueeTrack
          photos={photos}
          trackKey={`${trackKey}-a`}
          priorityCount={priorityCount}
        />
        <PhotoMarqueeTrack
          photos={photos}
          trackKey={`${trackKey}-b`}
          priorityCount={0}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function EditShowcaseSection() {
  return (
    <div className="flex flex-col">
      <div className={cn(PAGE_CONTAINER, SECTION_PADDING_Y, "pb-0")}>
        <SectionIntro>See how Redux can edit</SectionIntro>
      </div>

      <ScrollRevealGroup
        className={cn(
          "flex flex-col",
          SECTION_STACK_GAP,
          SECTION_PADDING_Y,
          "pt-0",
        )}
        stagger={0.1}
      >
        <ScrollRevealItem variant="fadeIn">
          <PhotoMarqueeRow
            photos={EDIT_SHOWCASE_TOP_ROW}
            direction="left"
            trackKey="edit-top"
            priorityCount={EDIT_SHOWCASE_PRIORITY_COUNT}
          />
        </ScrollRevealItem>

        <ScrollRevealItem variant="fadeIn">
          <PhotoMarqueeRow
            photos={EDIT_SHOWCASE_BOTTOM_ROW}
            direction="right"
            trackKey="edit-bottom"
          />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </div>
  );
}
