"use client";

import { Icon } from "@/components/shared/Icon";
import HeroPhotoMarquee from "@/src/components/HeroPhotoMarquee";
import SectionShell from "@/src/components/SectionShell";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

/** Shared hero CTA dimensions — keeps primary and secondary buttons pixel-matched. */
const HERO_CTA_SIZE =
  "!h-10 !min-h-10 !max-h-10 w-full min-w-0 gap-1.5 px-4 text-sm font-medium leading-none box-border sm:whitespace-nowrap";

const HERO_CTA_ICON = "ml-0.5 shrink-0 !size-4 -translate-y-0.25";

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
          <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:w-max sm:grid-flow-col sm:auto-cols-fr">
            <a
              href="#waitlist"
              className={cn(BTN_PRIMARY_SOLID, HERO_CTA_SIZE)}
            >
              <span className="leading-none">Join Waitlist</span>
              <Icon
                name="LinkExternal01"
                size={16}
                strokeWidth={2}
                className={HERO_CTA_ICON}
                aria-hidden
              />
            </a>
            <a
              href="#features"
              className={cn(
                BTN_PRIMARY_SOLID,
                HERO_CTA_SIZE,
                "!border-brand-border !bg-brand-surface hover:!border-white/20",
              )}
            >
              <span className="leading-none">See how it works</span>
              <Icon
                name="ArrowNarrowDown"
                size={16}
                strokeWidth={2}
                className={HERO_CTA_ICON}
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
