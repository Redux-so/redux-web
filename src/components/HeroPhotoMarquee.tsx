"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import MarqueeEdgeFade from "@/src/components/MarqueeEdgeFade";
import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/utils";

const DEFAULT_PLACEHOLDER_COUNT = 10;

const CARD_INNER =
  "hero-photo-card__inner overflow-hidden rounded-[1.75rem] bg-brand-surface-card sm:rounded-[2rem]";

const CARD_SIZE =
  "aspect-[3/4] w-[10rem] sm:w-[12.5rem] lg:w-[14rem]";

type HeroPhotoCardProps = {
  src: string | null;
  alt: string;
  offset: "up" | "down";
};

function HeroPhotoCard({ src, alt, offset }: HeroPhotoCardProps) {
  return (
    <div
      className={cn(
        "hero-photo-card",
        offset === "up" ? "-translate-y-3 sm:-translate-y-4" : "translate-y-3 sm:translate-y-4",
      )}
    >
      <div className={cn(CARD_INNER, CARD_SIZE)}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 224px"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon
              name="Image01"
              size={24}
              strokeWidth={1.5}
              className="text-white/25"
              aria-hidden
            />
          </div>
        )}
      </div>
    </div>
  );
}

type HeroPhotoMarqueeTrackProps = {
  items: readonly (string | null)[];
  trackKey: string;
  placeholderAlt: string;
  "aria-hidden"?: boolean;
};

function HeroPhotoMarqueeTrack({
  items,
  trackKey,
  placeholderAlt,
  "aria-hidden": ariaHidden,
}: HeroPhotoMarqueeTrackProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 py-3 pr-3 sm:gap-4 sm:py-4 sm:pr-4"
      aria-hidden={ariaHidden}
    >
      {items.map((src, index) => (
        <HeroPhotoCard
          key={`${trackKey}-${index}`}
          src={src}
          alt={placeholderAlt}
          offset={index % 2 === 0 ? "up" : "down"}
        />
      ))}
    </div>
  );
}

export type HeroPhotoMarqueeProps = {
  /** Image URLs : pass `null` entries for placeholders until real photos are ready. */
  images?: readonly (string | null)[];
  placeholderAlt?: string;
  className?: string;
};

export default function HeroPhotoMarquee({
  images = Array.from({ length: DEFAULT_PLACEHOLDER_COUNT }, () => null),
  placeholderAlt = "Photo placeholder",
  className,
}: HeroPhotoMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn("group/hero-photo-marquee w-full", className)}
      aria-label="Sample photo edits"
    >
      <MarqueeEdgeFade className="py-5 sm:py-6">
        {prefersReducedMotion ? (
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-3 py-2 sm:gap-4">
            {images.map((src, index) => (
              <li key={`static-${index}`}>
                <HeroPhotoCard
                  src={src}
                  alt={placeholderAlt}
                  offset={index % 2 === 0 ? "up" : "down"}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="animate-hero-photo-marquee flex w-max items-center">
            <HeroPhotoMarqueeTrack
              items={images}
              trackKey="a"
              placeholderAlt={placeholderAlt}
            />
            <HeroPhotoMarqueeTrack
              items={images}
              trackKey="b"
              placeholderAlt={placeholderAlt}
              aria-hidden
            />
          </div>
        )}
      </MarqueeEdgeFade>
    </div>
  );
}
