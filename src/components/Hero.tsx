"use client";

import { Icon } from "@/components/shared/Icon";
import HeroOrbitingPhotos from "@/src/components/HeroOrbitingPhotos";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { HERO_PILL_CTA_BASE } from "@/lib/button-styles";
import { HERO_HEADLINE } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const HERO_CTA_WITH_ICON = cn(HERO_PILL_CTA_BASE, "gap-2");

export default function Hero() {
  return (
    <div className="relative -mt-[3.75rem] flex min-h-[calc(100svh-3.75rem)] w-full flex-col overflow-x-clip overflow-y-hidden pt-[3.75rem] sm:-mt-16 sm:min-h-[calc(100svh-4rem)] sm:pt-16">
      <div className="relative flex min-h-0 flex-1 w-full flex-col items-center justify-center">
        <HeroOrbitingPhotos />

        <ScrollRevealGroup
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
          stagger={0.12}
        >
          <ScrollRevealItem>
            <h1 className={HERO_HEADLINE}>
              From Raw Photo to
              <br />
              Finished Edit in Minutes
            </h1>
          </ScrollRevealItem>

          <ScrollRevealItem>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              Agentic photo editing platform
            </p>
          </ScrollRevealItem>

          <ScrollRevealItem className="mt-8 flex w-full justify-center px-0">
            <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
              <a
                href="#waitlist"
                className={cn(HERO_PILL_CTA_BASE, "hero-pill-cta--purple hero-pill-cta--shimmer")}
              >
                <span className="hero-pill-cta__shimmer-text">
                  <span className="hero-pill-cta__shimmer-text-base">Join Waitlist</span>
                  <span className="hero-pill-cta__shimmer-text-shine" aria-hidden>
                    Join Waitlist
                  </span>
                </span>
              </a>
              <a
                href="#features"
                className={cn(HERO_CTA_WITH_ICON, "hero-pill-cta--charcoal")}
              >
                <span className="leading-none">See how it works</span>
                <Icon
                  name="ArrowNarrowDown"
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-white"
                  aria-hidden
                />
              </a>
            </div>
          </ScrollRevealItem>
        </ScrollRevealGroup>
      </div>
    </div>
  );
}
