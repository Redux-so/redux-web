"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
import { EditShowcaseMarqueePlaceholder } from "@/src/components/marketing/MarketingSectionPlaceholders";
import MarqueeEdgeFade from "@/src/components/MarqueeEdgeFade";
import { useMarqueeInView } from "@/lib/use-marquee-in-view";
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

const MARQUEE_DURATION_SEC = 100;

function useHoverSpotlightEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return enabled;
}

type PhotoMarqueeRowProps = {
  photos: readonly EditShowcasePhoto[];
  trackKey: string;
  marqueeInView: boolean;
};

function PhotoCard({
  photo,
  alt,
  decorative,
  cardKey,
  isActive = false,
  isDimmed = false,
  onActivate,
  onImageReady,
}: {
  photo: EditShowcasePhoto;
  alt: string;
  decorative: boolean;
  cardKey?: string;
  isActive?: boolean;
  isDimmed?: boolean;
  onActivate?: (cardKey: string) => void;
  onImageReady?: (photoId: string) => void;
}) {
  const image = isBlankImageSrc(photo.src) ? (
    <BlankImagePlaceholder className="absolute inset-0 rounded-2xl" iconSize={24} />
  ) : (
    <Image
      src={photo.src}
      alt={alt}
      width={EDIT_SHOWCASE_PHOTO_WIDTH}
      height={EDIT_SHOWCASE_PHOTO_HEIGHT}
      loading="eager"
      sizes={EDIT_SHOWCASE_PHOTO_SIZES}
      className="size-full object-cover"
      draggable={false}
      onLoad={() => {
        onImageReady?.(photo.id);
      }}
    />
  );

  useEffect(() => {
    if (isBlankImageSrc(photo.src)) {
      onImageReady?.(photo.id);
    }
  }, [photo.id, photo.src, onImageReady]);

  return (
    <div
      className={cn(
        "edit-showcase-photo-card",
        EDIT_SHOWCASE_PHOTO_FRAME,
        decorative && "pointer-events-none",
        !decorative && isActive && "edit-showcase-photo-card--active",
        !decorative && isDimmed && "edit-showcase-photo-card--dimmed",
      )}
      onMouseEnter={
        decorative || !cardKey
          ? undefined
          : () => {
              onActivate?.(cardKey);
            }
      }
    >
      <div
        className={cn(
          "edit-showcase-photo-card__inner",
          EDIT_SHOWCASE_PHOTO_ASPECT,
          "relative overflow-hidden rounded-2xl bg-brand-bg",
        )}
      >
        {image}
      </div>
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

type MarqueeTimingState = {
  startedAt: number;
  pausedAt: number;
  totalPausedMs: number;
};

function PhotoMarqueeRow({
  photos,
  trackKey,
  marqueeInView,
}: PhotoMarqueeRowProps) {
  const hoverSpotlightEnabled = useHoverSpotlightEnabled();
  const hoverSpotlightEnabledRef = useRef(hoverSpotlightEnabled);
  hoverSpotlightEnabledRef.current = hoverSpotlightEnabled;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const timingRef = useRef<MarqueeTimingState>({
    startedAt: 0,
    pausedAt: 0,
    totalPausedMs: 0,
  });
  const [imagesReady, setImagesReady] = useState(false);
  const [segmentWidthPx, setSegmentWidthPx] = useState(0);
  const [loopWidthPx, setLoopWidthPx] = useState(0);

  const [activeCardKey, setActiveCardKey] = useState<string | null>(null);
  const isSpotlightActive = hoverSpotlightEnabled && activeCardKey !== null;

  const tryMarkImagesReady = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    const images = scroller.querySelectorAll("img");
    if (images.length < photos.length * 2) {
      return;
    }
    const allDecoded = Array.from(images).every(
      (img) => img.complete && img.naturalWidth > 0,
    );
    if (allDecoded) {
      setImagesReady(true);
    }
  }, [photos.length]);

  const handleImageReady = useCallback(() => {
    tryMarkImagesReady();
  }, [tryMarkImagesReady]);

  const measureLoopWidth = useCallback((): number => {
    const segment = segmentRef.current;
    const cloneSegment = segment?.nextElementSibling;
    if (!(segment instanceof HTMLElement) || !(cloneSegment instanceof HTMLElement)) {
      return 0;
    }
    const loopStart = segment.getBoundingClientRect().left;
    const loopEnd = cloneSegment.getBoundingClientRect().left;
    return Math.max(0, loopEnd - loopStart);
  }, []);

  const syncSegmentWidth = useCallback(() => {
    const nextWidth = measureLoopWidth();
    if (nextWidth > 0) {
      setSegmentWidthPx((prev) =>
        Math.abs(prev - nextWidth) > 0.5 ? nextWidth : prev,
      );
    }
  }, [measureLoopWidth]);

  useLayoutEffect(() => {
    tryMarkImagesReady();
  }, [tryMarkImagesReady, photos]);

  useEffect(() => {
    if (imagesReady) {
      return;
    }

    tryMarkImagesReady();
    let frameId = 0;
    const poll = () => {
      tryMarkImagesReady();
      frameId = requestAnimationFrame(poll);
    };
    frameId = requestAnimationFrame(poll);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [imagesReady, tryMarkImagesReady]);

  useLayoutEffect(() => {
    if (!imagesReady) {
      return;
    }
    syncSegmentWidth();
    const width = measureLoopWidth();
    if (width > 0) {
      setLoopWidthPx((prev) => (prev > 0 ? prev : width));
    }
  }, [imagesReady, measureLoopWidth, syncSegmentWidth]);

  useEffect(() => {
    if (!imagesReady) {
      return;
    }

    const segment = segmentRef.current;
    if (!segment) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      syncSegmentWidth();
    });
    resizeObserver.observe(segment);

    return () => {
      resizeObserver.disconnect();
    };
  }, [imagesReady, syncSegmentWidth]);

  const isPaused = !marqueeInView || isSpotlightActive;
  pausedRef.current = isPaused;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!(scroller instanceof HTMLElement) || !imagesReady || loopWidthPx <= 0) {
      return;
    }

    const speedPxPerMs = loopWidthPx / (MARQUEE_DURATION_SEC * 1000);
    timingRef.current = {
      startedAt: performance.now(),
      pausedAt: 0,
      totalPausedMs: 0,
    };

    let frameId = 0;
    let pauseActive = false;

    const tick = (now: number) => {
      const timing = timingRef.current;

      if (pausedRef.current) {
        if (!pauseActive) {
          timing.pausedAt = now;
          pauseActive = true;
        }
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (pauseActive) {
        timing.totalPausedMs += now - timing.pausedAt;
        pauseActive = false;
      }

      const elapsed = now - timing.startedAt - timing.totalPausedMs;
      const distance = (elapsed * speedPxPerMs) % loopWidthPx;
      scroller.style.transform = `translate3d(${(-distance).toFixed(2)}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [imagesReady, loopWidthPx]);

  const handleActivate = useCallback((cardKey: string) => {
    if (hoverSpotlightEnabledRef.current) {
      setActiveCardKey(cardKey);
    }
  }, []);

  const handleRowLeave = useCallback(() => {
    if (hoverSpotlightEnabledRef.current) {
      setActiveCardKey(null);
    }
  }, []);

  const renderSegment = (copy: 0 | 1) =>
    photos.map((photo, index) => {
      const decorative = copy === 1;
      const cardKey = `${trackKey}-${copy}-${photo.id}-${index}`;

      return (
        <PhotoCard
          key={cardKey}
          cardKey={decorative ? undefined : cardKey}
          photo={photo}
          alt={decorative ? "" : photo.alt}
          decorative={decorative}
          isActive={!decorative && activeCardKey === cardKey}
          isDimmed={
            !decorative &&
            activeCardKey !== null &&
            activeCardKey !== cardKey
          }
          onActivate={decorative ? undefined : handleActivate}
          onImageReady={handleImageReady}
        />
      );
    });

  return (
    <div
      className={cn(
        "edit-showcase-marquee-row w-full min-w-0",
        isSpotlightActive && "edit-showcase-marquee-row--active",
      )}
      onMouseLeave={handleRowLeave}
    >
      <MarqueeEdgeFade>
        <div
          ref={scrollerRef}
          className={cn(
            "edit-showcase-marquee-track flex w-max flex-nowrap items-center gap-3 py-3 sm:gap-4 sm:py-4",
            !marqueeInView && "edit-showcase-marquee-track--offscreen",
          )}
          data-marquee-scroll=""
          style={{ willChange: imagesReady ? "transform" : undefined }}
        >
          <div
            ref={segmentRef}
            className="flex flex-nowrap items-center gap-3 sm:gap-4"
          >
            {renderSegment(0)}
          </div>
          <div
            className="flex flex-nowrap items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
            aria-hidden
            inert
          >
            {renderSegment(1)}
          </div>
        </div>
      </MarqueeEdgeFade>
    </div>
  );
}

export default function EditShowcaseSection() {
  const [marqueesReady, setMarqueesReady] = useState(false);
  const { rootRef: marqueeInViewRef, inView: marqueeInView } =
    useMarqueeInView(true);

  useEffect(() => {
    setMarqueesReady(true);
  }, []);

  return (
    <div className={SECTION_LAYOUT}>
      <div className={PAGE_CONTAINER}>
        <SectionIntro variant="headline">
          See how Redux can <span className={BRAND_HEADLINE_ACCENT_CLASS}>edit</span>
        </SectionIntro>
      </div>

      <div
        ref={marqueeInViewRef}
        className="flex flex-col gap-3 sm:gap-4"
        data-edit-showcase-marquees=""
      >
        {marqueesReady ? (
          <>
            <div className={cn(PAGE_GRID_MARQUEE_LANE, "w-full")}>
              <PageGridLeftRail />
              <PhotoMarqueeRow
                photos={EDIT_SHOWCASE_TOP_ROW}
                trackKey="edit-top"
                marqueeInView={marqueeInView}
              />
            </div>

            <div className={cn(PAGE_GRID_MARQUEE_LANE, "w-full")}>
              <PageGridLeftRail />
              <PhotoMarqueeRow
                photos={EDIT_SHOWCASE_BOTTOM_ROW}
                trackKey="edit-bottom"
                marqueeInView={marqueeInView}
              />
            </div>
          </>
        ) : (
          <EditShowcaseMarqueePlaceholder />
        )}
      </div>
    </div>
  );
}
