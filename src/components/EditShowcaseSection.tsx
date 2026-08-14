"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import {
  EDIT_SHOWCASE_BOTTOM_ROW,
  EDIT_SHOWCASE_PHOTO_ASPECT,
  EDIT_SHOWCASE_PHOTO_FRAME,
  EDIT_SHOWCASE_TOP_ROW,
  type EditShowcasePhoto,
} from "@/src/components/edit-showcase/edit-showcase-data";
import { blueprintBorderB } from "@/lib/blueprint-grid";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const EDIT_SHOWCASE_SECTION_LABEL =
  "text-[13px] font-semibold uppercase tracking-wide text-[#888888]";

type PhotoMarqueeRowProps = {
  photos: readonly EditShowcasePhoto[];
  direction: "left" | "right";
  trackKey: string;
};

function PhotoCard({ photo }: { photo: EditShowcasePhoto }) {
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
        unoptimized
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
  "aria-hidden": ariaHidden,
}: {
  photos: readonly EditShowcasePhoto[];
  trackKey: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
      aria-hidden={ariaHidden}
    >
      {photos.map((photo) => (
        <PhotoCard key={`${trackKey}-${photo.id}`} photo={photo} />
      ))}
    </div>
  );
}

function PhotoMarqueeRow({ photos, direction, trackKey }: PhotoMarqueeRowProps) {
  const prefersReducedMotion = useReducedMotion();
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className={cn("flex w-max items-center", animationClass)}>
        <PhotoMarqueeTrack photos={photos} trackKey={`${trackKey}-a`} />
        <PhotoMarqueeTrack
          photos={photos}
          trackKey={`${trackKey}-b`}
          aria-hidden
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-brand-bg to-transparent sm:w-14 lg:w-16"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-brand-bg to-transparent sm:w-14 lg:w-16"
      />
    </div>
  );
}

function EditShowcaseSectionIntro() {
  return (
    <ScrollReveal
      variant="fadeIn"
      className={cn(
        blueprintBorderB,
        "px-4 py-5 sm:px-8 sm:py-6 lg:px-10",
      )}
    >
      <p className={cn("m-0", EDIT_SHOWCASE_SECTION_LABEL)}>
        See how Redux can edit
      </p>
    </ScrollReveal>
  );
}

export default function EditShowcaseSection() {
  return (
    <div className="flex flex-col">
      <EditShowcaseSectionIntro />
      <ScrollRevealGroup
        className="flex flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-8 sm:py-12 lg:px-10"
        stagger={0.1}
      >
      <ScrollRevealItem variant="fadeIn">
        <PhotoMarqueeRow
          photos={EDIT_SHOWCASE_TOP_ROW}
          direction="left"
          trackKey="edit-top"
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
