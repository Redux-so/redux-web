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
    <div className="flex flex-col items-center px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
      <ScrollRevealGroup className="mx-auto max-w-3xl text-center" stagger={0.12}>
        <ScrollRevealItem>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your AI agent for professional photo editing
          </h1>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <p className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl">
            Organize, edit, and export photos, all from your browser
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem className="mt-8 flex justify-center">
          <a
            href="#waitlist"
            className={cn(
              BTN_PRIMARY_SOLID,
              "h-11 gap-1.5 px-5 text-[15px] leading-none",
            )}
          >
            <span className="leading-none">Join Waitlist</span>
            <Icon
              name="ArrowUpRight"
              size={20}
              className="shrink-0"
              aria-hidden
            />
          </a>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </div>
  );
}
