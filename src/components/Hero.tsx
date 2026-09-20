"use client";

import { MarketingIcon } from "@/components/shared/MarketingIcon";
import HeroOrbitingPhotos from "@/src/components/HeroOrbitingPhotos";
import MarketingNavLink from "@/src/components/MarketingNavLink";
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
          data-hero-orbit-copy=""
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
            <p className="mt-5 text-lg leading-relaxed text-marketing-muted">
              Agentic photo editing platform
            </p>
          </ScrollRevealItem>

          <ScrollRevealItem className="mt-8 flex w-full justify-center px-0">
            <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3">
              <MarketingNavLink
                href="#waitlist"
                className={cn(HERO_PILL_CTA_BASE, "hero-pill-cta--purple")}
              >
                <span className="leading-none">Join Waitlist</span>
              </MarketingNavLink>
              <MarketingNavLink
                href="#features"
                className={cn(HERO_CTA_WITH_ICON, "hero-pill-cta--charcoal")}
              >
                <span className="leading-none">See how it works</span>
                <MarketingIcon
                  name="ArrowNarrowDown"
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-white"
                  aria-hidden
                />
              </MarketingNavLink>
            </div>
          </ScrollRevealItem>
        </ScrollRevealGroup>
      </div>
    </div>
  );
}
