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
import SectionShell from "@/src/components/SectionShell";
import { SECTION_BLEED, SECTION_INNER_STACK } from "@/lib/section-styles";
import { ScrollRevealGroup, ScrollRevealItem } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

/** Full-bleed wrapper for photo marquees while the section label stays in PAGE_CONTAINER. */
const MARQUEE_BLEED = SECTION_BLEED;

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
}: {
  photo: EditShowcasePhoto;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        EDIT_SHOWCASE_PHOTO_FRAME,
        EDIT_SHOWCASE_PHOTO_ASPECT,
        "relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-brand-bg",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        loading="eager"
        priority={priority}
        sizes="(max-width: 640px) 240px, (max-width: 1920px) 360px, 480px"
        className="object-cover"
        draggable={false}
      />
    </div>
  );
}

type PhotoMarqueeTrackProps = {
  photos: readonly EditShowcasePhoto[];
  trackKey: string;
  priorityCount?: number;
  repeats?: number;
  "aria-hidden"?: boolean;
};

function PhotoMarqueeTrack({
  photos,
  trackKey,
  priorityCount = 0,
  repeats = 2,
  "aria-hidden": ariaHidden,
}: PhotoMarqueeTrackProps) {
  const items = Array.from({ length: repeats }, () => photos).flat();

  return (
    <div
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
      aria-hidden={ariaHidden}
    >
      {items.map((photo, index) => (
        <PhotoCard
          key={`${trackKey}-${photo.id}-${index}`}
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
      <div
        className={cn(
          MARQUEE_BLEED,
          "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-6",
        )}
      >
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            priority={index < priorityCount}
            className="!w-full"
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
    <SectionShell intro={<SectionIntro>See how Redux can edit</SectionIntro>}>
      <ScrollRevealGroup className={SECTION_INNER_STACK} stagger={0.1}>
        <ScrollRevealItem variant="fadeIn" className="w-full min-w-0">
          <div className={MARQUEE_BLEED}>
            <PhotoMarqueeRow
              photos={EDIT_SHOWCASE_TOP_ROW}
              direction="left"
              trackKey="edit-top"
              priorityCount={EDIT_SHOWCASE_PRIORITY_COUNT}
            />
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem variant="fadeIn" className="w-full min-w-0">
          <div className={MARQUEE_BLEED}>
            <PhotoMarqueeRow
              photos={EDIT_SHOWCASE_BOTTOM_ROW}
              direction="right"
              trackKey="edit-bottom"
            />
          </div>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionShell>
  );
}
