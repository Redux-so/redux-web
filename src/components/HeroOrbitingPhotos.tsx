"use client";

import { useEffect, useRef, useState } from "react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

import HeroOrbitTile from "@/src/components/HeroOrbitTile";

const INNER_TILE_COUNT = 7;
const OUTER_TILE_COUNT = 8;

const HERO_ORBIT_FILLER_IMAGES = [
  "/hero-orbit/golden-gate.jpg",
  "/hero-orbit/city-skyline.jpg",
  "/hero-orbit/living-room.jpg",
  "/hero-orbit/mount-fuji.jpg",
  "/hero-orbit/mountain-sunset.jpg",
  "/hero-orbit/temple-snow.jpg",
  "/hero-orbit/sports-car.jpg",
  "/hero-orbit/stadium.jpg",
  "/hero-orbit/watch.jpg",
  "/hero-orbit/product-tubes.jpg",
] as const;

const HERO_ORBIT_CLIP = "absolute inset-0 overflow-hidden";

const ORBIT_DURATION = 78;
const DESKTOP_INNER_RADIUS = 500;
const DESKTOP_OUTER_RADIUS = 720;
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

function getOrbitConfig(width: number, height: number): OrbitConfig {
  if (width >= REFERENCE_WIDTH) {
    return {
      innerRadius: DESKTOP_INNER_RADIUS,
      innerIconSize: DESKTOP_INNER_ICON,
      innerDuration: ORBIT_DURATION,
      outerRadius: DESKTOP_OUTER_RADIUS,
      outerIconSize: DESKTOP_OUTER_ICON,
      outerDuration: ORBIT_DURATION,
    };
  }

  const widthScale = width / REFERENCE_WIDTH;

  const innerIconSize = 96;
  const outerIconSize = 104;
  const minRingSeparation = getMinRingSeparation(innerIconSize, outerIconSize);

  let innerRadius = Math.round(DESKTOP_INNER_RADIUS * widthScale);
  let outerRadius = Math.round(DESKTOP_OUTER_RADIUS * widthScale);

  innerRadius = Math.round(
    Math.max(innerRadius, width * 0.58, height * 0.26),
  );
  outerRadius = Math.round(
    Math.max(outerRadius, width * 0.82, innerRadius + minRingSeparation),
  );

  if (outerRadius - innerRadius < minRingSeparation) {
    outerRadius = innerRadius + Math.ceil(minRingSeparation);
  }

  return {
    innerRadius,
    innerIconSize,
    innerDuration: ORBIT_DURATION,
    outerRadius,
    outerIconSize,
    outerDuration: ORBIT_DURATION,
  };
}

const DEFAULT_CONFIG = getOrbitConfig(1280, 800);

function getOrbitStageSize(config: OrbitConfig): number {
  return config.outerRadius * 2 + config.outerIconSize;
}

/** Blur zone extends through the outer ring — tiles orbit at 400–780px from center. */
function getCenterBlurRadius(config: OrbitConfig): number {
  return config.outerRadius + config.outerIconSize / 2 + 48;
}

function applyOrbitTileDepth(
  root: HTMLElement,
  hero: HTMLElement,
  config: OrbitConfig,
): void {
  const heroRect = hero.getBoundingClientRect();
  const centerX = heroRect.left + heroRect.width / 2;
  const centerY = heroRect.top + heroRect.height / 2;
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

export default function HeroOrbitingPhotos() {
  const [config, setConfig] = useState<OrbitConfig>(DEFAULT_CONFIG);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const configRef = useRef(config);
  const parallaxTargetRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const parallaxEnabledRef = useRef(true);
  configRef.current = config;

  useEffect(() => {
    const hero = rootRef.current?.parentElement;
    if (!(hero instanceof HTMLElement)) {
      return;
    }

    const update = () => {
      const { width, height } = hero.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setConfig(getOrbitConfig(width, height));
      }
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(hero);
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

    parallaxEnabledRef.current = !window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const handlePointerMove = (event: PointerEvent) => {
      if (!parallaxEnabledRef.current) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

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

    let frameId = 0;

    const tick = () => {
      applyOrbitTileDepth(root, hero, configRef.current);

      if (stage instanceof HTMLElement && parallaxEnabledRef.current) {
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
      window.cancelAnimationFrame(frameId);
      clearOrbitTileDepth(root);
      if (stage instanceof HTMLElement) {
        resetOrbitParallax(stage);
      }
    };
  }, []);

  const stageSize = getOrbitStageSize(config);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      <div className={cn(HERO_ORBIT_CLIP)}>
        <div className="hero-orbit-parallax flex h-full w-full items-center justify-center">
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
              {Array.from({ length: INNER_TILE_COUNT }, (_, index) => (
                <HeroOrbitTile
                  key={`hero-orbit-inner-${index}`}
                  alt=""
                  src={HERO_ORBIT_FILLER_IMAGES[index % HERO_ORBIT_FILLER_IMAGES.length]}
                />
              ))}
            </OrbitingCircles>

            <OrbitingCircles
              className={ORBIT_TILE_CLASS}
              duration={config.outerDuration}
              iconSize={config.outerIconSize}
              path={false}
              radius={config.outerRadius}
              style={{ borderRadius: ORBIT_TILE_RADIUS }}
            >
              {Array.from({ length: OUTER_TILE_COUNT }, (_, index) => (
                <HeroOrbitTile
                  key={`hero-orbit-outer-${index}`}
                  alt=""
                  src={
                    HERO_ORBIT_FILLER_IMAGES[
                      (index + Math.ceil(HERO_ORBIT_FILLER_IMAGES.length / 2)) %
                        HERO_ORBIT_FILLER_IMAGES.length
                    ]
                  }
                />
              ))}
            </OrbitingCircles>
          </div>
        </div>
        <div
          aria-hidden
          className="hero-orbit-center-vignette pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
