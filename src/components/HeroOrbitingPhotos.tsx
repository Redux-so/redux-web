"use client";

import { useEffect, useRef, useState } from "react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

import HeroOrbitTile from "@/src/components/HeroOrbitTile";

const INNER_TILE_COUNT = 7;
const OUTER_TILE_COUNT = 8;

/** Extends into the nav spacer so tiles pass behind the translucent navbar. */
const HERO_ORBIT_CLIP = cn(
  "absolute inset-x-0 bottom-0 overflow-x-clip overflow-y-hidden",
  "top-[-3.75rem] h-[calc(100%+3.75rem)] sm:top-[-4rem] sm:h-[calc(100%+4rem)]",
);

/** Desktop reference — radii scale from these while preserving the same ring ratio. */
const DESKTOP_INNER_RADIUS = 540;
const DESKTOP_OUTER_RADIUS = 780;
const DESKTOP_INNER_ICON = 104;
const DESKTOP_OUTER_ICON = 120;
const REFERENCE_WIDTH = 1280;
/** Minimum center-to-center ring distance so tile edges never overlap. */
const TILE_EDGE_GAP = 28;

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
      innerDuration: 52,
      outerRadius: DESKTOP_OUTER_RADIUS,
      outerIconSize: DESKTOP_OUTER_ICON,
      outerDuration: 70,
    };
  }

  const widthScale = width / REFERENCE_WIDTH;

  // Keep tile size consistent on phones/tablets — only radii adapt.
  const innerIconSize = 96;
  const outerIconSize = 104;
  const minRingSeparation = getMinRingSeparation(innerIconSize, outerIconSize);

  let innerRadius = Math.round(DESKTOP_INNER_RADIUS * widthScale);
  let outerRadius = Math.round(DESKTOP_OUTER_RADIUS * widthScale);

  innerRadius = Math.round(
    Math.max(innerRadius, width * 0.62, height * 0.28),
  );
  outerRadius = Math.round(
    Math.max(outerRadius, width * 0.86, innerRadius + minRingSeparation),
  );

  // Re-check after rounding — tile half-widths require this gap at minimum.
  if (outerRadius - innerRadius < minRingSeparation) {
    outerRadius = innerRadius + Math.ceil(minRingSeparation);
  }

  return {
    innerRadius,
    innerIconSize,
    innerDuration: 52,
    outerRadius,
    outerIconSize,
    outerDuration: 70,
  };
}

const DEFAULT_CONFIG = getOrbitConfig(1280, 800);

function getOrbitStageSize(config: OrbitConfig): number {
  return config.outerRadius * 2 + config.outerIconSize;
}

export default function HeroOrbitingPhotos() {
  const [config, setConfig] = useState<OrbitConfig>(DEFAULT_CONFIG);
  const rootRef = useRef<HTMLDivElement>(null);

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

  const stageSize = getOrbitStageSize(config);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      <div className={cn(HERO_ORBIT_CLIP)}>
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative shrink-0"
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
                <HeroOrbitTile key={`hero-orbit-inner-${index}`} />
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
                <HeroOrbitTile key={`hero-orbit-outer-${index}`} />
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </div>
  );
}
