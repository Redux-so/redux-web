"use client";

import { Icon } from "@/components/shared/Icon";
import HeroPhotoMarquee from "@/src/components/HeroPhotoMarquee";
import SectionShell from "@/src/components/SectionShell";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const HERO_PILL_CTA =
  "hero-pill-cta inline-flex items-center justify-center gap-2 w-full min-w-0 box-border sm:w-auto no-underline";

export default function Hero() {
  return (
    <SectionShell className="relative z-[1]">
      <ScrollRevealGroup className="mx-auto max-w-3xl text-center" stagger={0.12}>
        <ScrollRevealItem>
          <h1 className="font-display text-5xl font-[550] leading-tight tracking-tight text-balance text-white sm:text-6xl lg:text-[4rem]">
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
          <div className="grid w-full max-w-md grid-cols-1 items-center gap-3 sm:max-w-none sm:w-max sm:grid-flow-col sm:auto-cols-max sm:items-stretch">
            <a
              href="#waitlist"
              className={cn(HERO_PILL_CTA, "hero-pill-cta--purple !px-[22px]")}
            >
              <span className="leading-none">Join Waitlist</span>
              <Icon
                name="LinkExternal01"
                size={16}
                strokeWidth={2}
                className="shrink-0 text-white"
                aria-hidden
              />
            </a>
            <a
              href="#features"
              className={cn(HERO_PILL_CTA, "hero-pill-cta--charcoal")}
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

      <HeroPhotoMarquee className="mt-3 sm:mt-3.5 lg:mt-4" />
    </SectionShell>
  );
}
