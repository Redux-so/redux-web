"use client";

import { useEffect, useRef, useState } from "react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

import { getHeroOrbitPhoto } from "@/src/components/hero-orbit-photos";
import HeroOrbitTile from "@/src/components/HeroOrbitTile";

const PREFERS_REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const INNER_TILE_COUNT = 7;
const OUTER_TILE_COUNT = 8;

const HERO_ORBIT_CLIP = "absolute inset-0 overflow-hidden";

/** Extends into the nav spacer so tiles pass behind the translucent navbar. */
const HERO_ORBIT_ROOT = cn(
  "pointer-events-none absolute inset-x-0 bottom-0 z-0",
  "top-[-3.75rem] h-[calc(100%+3.75rem)] sm:top-[-4rem] sm:h-[calc(100%+4rem)]",
);

const ORBIT_COPY_CLEAR_PADDING = 36;

const ORBIT_DURATION = 78;
const DESKTOP_INNER_RADIUS = 390;
const DESKTOP_OUTER_RADIUS = 585;
const DESKTOP_INNER_ICON = 104;
const DESKTOP_OUTER_ICON = 120;
const REFERENCE_WIDTH = 1280;
/** Minimum center-to-center ring distance so tile edges never overlap. */
const TILE_EDGE_GAP = 28;
const MAX_CENTER_BLUR_PX = 3;
/** At max center strength, tiles dim to this brightness (1 = unchanged). */
const MIN_CENTER_BRIGHTNESS = 0.05;

const PARALLAX_MAX_TRANSLATE_X = 14;
const PARALLAX_MAX_TRANSLATE_Y = 10;
const PARALLAX_MAX_ROTATE_DEG = 1;
const PARALLAX_LERP = 0.08;

type ParallaxOffset = {
  x: number;
  y: number;
};

function getMinRingSeparation(innerIconSize: number, outerIconSize: number): number {
  return innerIconSize / 2 + outerIconSize / 2 + TILE_EDGE_GAP;
}

type OrbitConfig = {
  innerDuration: number;
  innerIconSize: number;
  innerRadius: number;
  outerDuration: number;
  outerIconSize: number;
  outerRadius: number;
};

const ORBIT_TILE_CLASS = "rounded-[6px]";
const ORBIT_TILE_RADIUS = 6;

/** Cap layout width so tablet portrait doesn't inflate orbit vs phone. */
const COMPACT_LAYOUT_MAX_WIDTH = 430;

type CopyBounds = {
  width: number;
  height: number;
};

function getMinInnerRadiusForCopy(
  copy: CopyBounds,
  innerIconSize: number,
): number {
  if (copy.width <= 0 || copy.height <= 0) {
    return 0;
  }

  const clearRadius =
    Math.max(copy.width / 2, copy.height / 2) + ORBIT_COPY_CLEAR_PADDING;

  return Math.ceil(clearRadius + innerIconSize / 2);
}

function finalizeOrbitRadii(
  innerRadius: number,
  outerRadius: number,
  innerIconSize: number,
  outerIconSize: number,
  minInnerRadius: number,
  maxOuterRadius?: number,
): { innerRadius: number; outerRadius: number } {
  const minRingSeparation = getMinRingSeparation(innerIconSize, outerIconSize);

  innerRadius = Math.max(innerRadius, minInnerRadius);
  innerRadius = Math.max(innerRadius, Math.round(minRingSeparation * 0.85));

  if (
    maxOuterRadius !== undefined &&
    maxOuterRadius > innerRadius + minRingSeparation
  ) {
    outerRadius = Math.min(outerRadius, maxOuterRadius);
  }

  if (outerRadius - innerRadius < minRingSeparation) {
    outerRadius = innerRadius + minRingSeparation;
  }

  const outerRingExtra = 32;
  if (outerRadius - innerRadius < minRingSeparation + outerRingExtra) {
    outerRadius = innerRadius + Math.ceil(minRingSeparation + outerRingExtra);
  }

  return { innerRadius, outerRadius };
}

function getOrbitConfig(
  width: number,
  height: number,
  copy: CopyBounds,
): OrbitConfig {
  const minInnerDesktop = getMinInnerRadiusForCopy(copy, DESKTOP_INNER_ICON);
  const maxOuterRadius = Math.round(
    Math.min(width, height) * 0.48 - DESKTOP_OUTER_ICON / 2,
  );

  if (width >= REFERENCE_WIDTH) {
    const radii = finalizeOrbitRadii(
      DESKTOP_INNER_RADIUS,
      DESKTOP_OUTER_RADIUS,
      DESKTOP_INNER_ICON,
      DESKTOP_OUTER_ICON,
      minInnerDesktop,
      maxOuterRadius,
    );

    return {
      innerRadius: radii.innerRadius,
      innerIconSize: DESKTOP_INNER_ICON,
      innerDuration: ORBIT_DURATION,
      outerRadius: radii.outerRadius,
      outerIconSize: DESKTOP_OUTER_ICON,
      outerDuration: ORBIT_DURATION,
    };
  }

  const layoutWidth = Math.min(width, COMPACT_LAYOUT_MAX_WIDTH);
  const widthScale = layoutWidth / REFERENCE_WIDTH;

  const innerIconSize = 96;
  const outerIconSize = 104;
  const minInnerCompact = getMinInnerRadiusForCopy(copy, innerIconSize);

  let innerRadius = Math.round(DESKTOP_INNER_RADIUS * widthScale);
  let outerRadius = Math.round(DESKTOP_OUTER_RADIUS * widthScale);

  const compactMaxOuter = Math.round(
    Math.min(width, height) * 0.44 - outerIconSize / 2,
  );

  const radii = finalizeOrbitRadii(
    innerRadius,
    outerRadius,
    innerIconSize,
    outerIconSize,
    minInnerCompact,
    Number.isFinite(compactMaxOuter) && compactMaxOuter > 0
      ? compactMaxOuter
      : undefined,
  );

  return {
    innerRadius: radii.innerRadius,
    innerIconSize,
    innerDuration: ORBIT_DURATION,
    outerRadius: radii.outerRadius,
    outerIconSize,
    outerDuration: ORBIT_DURATION,
  };
}

const DEFAULT_CONFIG = getOrbitConfig(1280, 800, { width: 720, height: 320 });

function getOrbitStageSize(config: OrbitConfig): number {
  return config.outerRadius * 2 + config.outerIconSize;
}

/** Dim/blur zone covers the hero copy and inner ring approach paths. */
function getCenterBlurRadius(config: OrbitConfig): number {
  const innerClear =
    config.innerRadius + config.innerIconSize / 2 + ORBIT_COPY_CLEAR_PADDING;
  const outerReach =
    config.outerRadius + config.outerIconSize / 2 + 48;

  return Math.max(innerClear, outerReach);
}

function getHeroCopyElement(hero: HTMLElement): HTMLElement | null {
  const copy = hero.querySelector<HTMLElement>("[data-hero-orbit-copy]");
  return copy instanceof HTMLElement ? copy : null;
}

function getOrbitFocusCenter(hero: HTMLElement): { x: number; y: number } {
  const copy = getHeroCopyElement(hero);
  if (copy) {
    const rect = copy.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  const heroRect = hero.getBoundingClientRect();
  return {
    x: heroRect.left + heroRect.width / 2,
    y: heroRect.top + heroRect.height / 2,
  };
}

function applyOrbitTileDepth(
  root: HTMLElement,
  hero: HTMLElement,
  config: OrbitConfig,
): void {
  const { x: centerX, y: centerY } = getOrbitFocusCenter(hero);
  const blurRadius = getCenterBlurRadius(config);

  root.querySelectorAll<HTMLElement>(".animate-orbit").forEach((tile) => {
    const rect = tile.getBoundingClientRect();
    const dist = Math.hypot(
      rect.left + rect.width / 2 - centerX,
      rect.top + rect.height / 2 - centerY,
    );

    if (dist >= blurRadius) {
      tile.style.filter = "";
      return;
    }

    const strength = 1 - dist / blurRadius;
    const blur = strength * MAX_CENTER_BLUR_PX;
    const brightness = 1 - strength * (1 - MIN_CENTER_BRIGHTNESS);
    const filters: string[] = [];

    if (blur > 0.25) {
      filters.push(`blur(${blur.toFixed(1)}px)`);
    }
    if (brightness < 0.995) {
      filters.push(`brightness(${brightness.toFixed(2)})`);
    }

    tile.style.filter = filters.length > 0 ? filters.join(" ") : "";
  });
}

function clearOrbitTileDepth(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>(".animate-orbit").forEach((tile) => {
    tile.style.filter = "";
  });
}

/** Lock each tile's current layout transform and pause CSS orbit animation. */
function freezeOrbitAnimation(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>(".animate-orbit").forEach((tile) => {
    if (tile.dataset.orbitFrozen === "true") {
      return;
    }

    const { transform } = getComputedStyle(tile);
    if (transform && transform !== "none") {
      tile.style.transform = transform;
    }

    tile.style.animationPlayState = "paused";
    tile.dataset.orbitFrozen = "true";
  });
}

function unfreezeOrbitAnimation(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>(".animate-orbit").forEach((tile) => {
    tile.style.removeProperty("transform");
    tile.style.animationPlayState = "running";
    delete tile.dataset.orbitFrozen;
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function applyOrbitParallax(stage: HTMLElement, offset: ParallaxOffset): void {
  const translateX = offset.x * PARALLAX_MAX_TRANSLATE_X;
  const translateY = offset.y * PARALLAX_MAX_TRANSLATE_Y;
  const rotateY = offset.x * PARALLAX_MAX_ROTATE_DEG;
  const rotateX = offset.y * -PARALLAX_MAX_ROTATE_DEG;

  stage.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
}

function resetOrbitParallax(stage: HTMLElement): void {
  stage.style.transform = "";
}

type OrbitStageOffset = {
  x: number;
  y: number;
};

function measureOrbitStageOffset(hero: HTMLElement): OrbitStageOffset {
  const heroRect = hero.getBoundingClientRect();
  const focus = getOrbitFocusCenter(hero);

  return {
    x: focus.x - (heroRect.left + heroRect.width / 2),
    y: focus.y - (heroRect.top + heroRect.height / 2),
  };
}

function measureCopyBounds(copy: HTMLElement): CopyBounds {
  const rect = copy.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

export default function HeroOrbitingPhotos() {
  const [config, setConfig] = useState<OrbitConfig>(DEFAULT_CONFIG);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageOffsetRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  const parallaxTargetRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const motionAllowedRef = useRef(true);
  configRef.current = config;

  useEffect(() => {
    const hero = rootRef.current?.parentElement;
    if (!(hero instanceof HTMLElement)) {
      return;
    }

    const copy = getHeroCopyElement(hero);

    const update = () => {
      const { width, height } = hero.getBoundingClientRect();
      if (width <= 0 || height <= 0) {
        return;
      }

      const copyEl = getHeroCopyElement(hero);
      const copyBounds = copyEl
        ? measureCopyBounds(copyEl)
        : { width: 0, height: 0 };

      setConfig(getOrbitConfig(width, height, copyBounds));
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(hero);
    if (copy) {
      resizeObserver.observe(copy);
    }
    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const hero = rootRef.current?.parentElement;
    if (!(hero instanceof HTMLElement)) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!motionAllowedRef.current) {
        return;
      }

      const { x: centerX, y: centerY } = getOrbitFocusCenter(hero);
      const rect = hero.getBoundingClientRect();

      parallaxTargetRef.current = {
        x: clamp((event.clientX - centerX) / (rect.width / 2), -1, 1),
        y: clamp((event.clientY - centerY) / (rect.height / 2), -1, 1),
      };
    };

    const handlePointerLeave = () => {
      parallaxTargetRef.current = { x: 0, y: 0 };
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const hero = root?.parentElement;
    if (!(root instanceof HTMLElement) || !(hero instanceof HTMLElement)) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(PREFERS_REDUCED_MOTION_QUERY);

    const syncMotionPreference = () => {
      motionAllowedRef.current = !reducedMotionQuery.matches;

      if (reducedMotionQuery.matches) {
        requestAnimationFrame(() => {
          freezeOrbitAnimation(root);
        });
      } else {
        unfreezeOrbitAnimation(root);
      }
    };

    syncMotionPreference();
    reducedMotionQuery.addEventListener("change", syncMotionPreference);

    let frameId = 0;

    const tick = () => {
      applyOrbitTileDepth(root, hero, configRef.current);

      const offsetWrapper = stageOffsetRef.current;
      if (offsetWrapper) {
        const offset = measureOrbitStageOffset(hero);
        offsetWrapper.style.transform = `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`;
      }

      if (motionAllowedRef.current && stage instanceof HTMLElement) {
        const target = parallaxTargetRef.current;
        const current = parallaxCurrentRef.current;

        current.x += (target.x - current.x) * PARALLAX_LERP;
        current.y += (target.y - current.y) * PARALLAX_LERP;

        if (
          Math.abs(target.x - current.x) > 0.0005 ||
          Math.abs(target.y - current.y) > 0.0005 ||
          Math.abs(current.x) > 0.0005 ||
          Math.abs(current.y) > 0.0005
        ) {
          applyOrbitParallax(stage, current);
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncMotionPreference);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const stageSize = getOrbitStageSize(config);

  return (
    <div ref={rootRef} aria-hidden className={HERO_ORBIT_ROOT}>
      <div className={cn(HERO_ORBIT_CLIP)}>
        <div
          ref={stageOffsetRef}
          className="hero-orbit-parallax flex h-full w-full items-center justify-center"
        >
          <div
            ref={stageRef}
            className="relative shrink-0 will-change-transform"
            style={{ height: stageSize, width: stageSize }}
          >
            <OrbitingCircles
              className={ORBIT_TILE_CLASS}
              duration={config.innerDuration}
              iconSize={config.innerIconSize}
              path={false}
              radius={config.innerRadius}
              style={{ borderRadius: ORBIT_TILE_RADIUS }}
            >
              {Array.from({ length: INNER_TILE_COUNT }, (_, index) => {
                const photo = getHeroOrbitPhoto(index);
                return (
                  <HeroOrbitTile
                    key={`hero-orbit-inner-${index}`}
                    src={photo.src}
                    tileSize={config.innerIconSize}
                  />
                );
              })}
            </OrbitingCircles>

            <OrbitingCircles
              className={ORBIT_TILE_CLASS}
              duration={config.outerDuration}
              iconSize={config.outerIconSize}
              path={false}
              radius={config.outerRadius}
              style={{ borderRadius: ORBIT_TILE_RADIUS }}
            >
              {Array.from({ length: OUTER_TILE_COUNT }, (_, index) => {
                const photo = getHeroOrbitPhoto(index + INNER_TILE_COUNT);
                return (
                  <HeroOrbitTile
                    key={`hero-orbit-outer-${index}`}
                    src={photo.src}
                    tileSize={config.outerIconSize}
                  />
                );
              })}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </div>
  );
}
