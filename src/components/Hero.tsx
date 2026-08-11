"use client";

import { Icon } from "@/components/shared/Icon";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="relative z-[1] px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <ScrollRevealGroup className="mx-auto max-w-3xl text-center" stagger={0.12}>
        <ScrollRevealItem>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your AI agent for professional photo editing
          </h1>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Organize, edit, and export photos, all from your browser
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
    </div>
  );
}
