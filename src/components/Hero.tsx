"use client";

import { Icon } from "@/components/shared/Icon";
import SectionShell from "@/src/components/SectionShell";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <SectionShell className="relative z-[1]">
      <ScrollRevealGroup className="mx-auto max-w-3xl text-center" stagger={0.12}>
        <ScrollRevealItem>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-balance text-white sm:text-5xl lg:text-[3.25rem]">
            From Raw Photo to
            <br />
            Finished Edit in Minutes
          </h1>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
                Agentic photo editing platform
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem className="mt-8 flex justify-center">
          <a
            href="#waitlist"
            className={cn(
              BTN_PRIMARY_SOLID,
              "h-10 gap-1.5 px-4 text-sm leading-none",
            )}
          >
            <span className="leading-none">Join Waitlist</span>
            <Icon
              name="LinkExternal01"
              size={16}
              strokeWidth={2}
              className="ml-0.5 shrink-0 !size-4 -translate-y-0.25"
              aria-hidden
            />
          </a>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionShell>
  );
}
