"use client";

import SectionLabel from "@/src/components/SectionLabel";
import { Button } from "@/components/ui/button";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

type Feature = {
  headline: string;
  description: string;
  cta: string;
  imagePosition: "left" | "right";
};

const features: Feature[] = [
  {
    headline: "Conversational Editing",
    description:
      "Describe your edits, and our AI applies professional changes instantly. Review and refine in real-time until your photo is perfect.",
    cta: "Ask AI",
    imagePosition: "left",
  },
  {
    headline: "Style Match",
    description:
      "Recreate any style instantly. Upload a reference image, and our AI applies its aesthetic to your photo.",
    cta: "Match a Style",
    imagePosition: "right",
  },
  {
    headline: "Smart Search",
    description:
      "Find any photo by describing its content. Search by keywords and instantly surface matching images.",
    cta: "Search Now",
    imagePosition: "left",
  },
];

export default function Features() {
  return (
    <div className="px-4 pb-12 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-3">
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Professional Results,{" "}
              <span className="text-[#9a6ff2]">Intuitive Tools</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollRevealGroup
          className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10"
          stagger={0.12}
        >
          {features.map((feature) => (
            <ScrollRevealItem key={feature.headline}>
              <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-brand-surface-card">
                <div
                  className={cn(
                    "flex flex-col lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10",
                    feature.imagePosition === "right" && "lg:flex-row-reverse",
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "min-h-[260px] w-full rounded-xl bg-[#0a0a0a] sm:min-h-[300px]",
                      "mx-4 mt-4 sm:mx-5 sm:mt-5 lg:mb-5 lg:min-h-[380px] lg:flex-[1.3] lg:shrink-0 xl:min-h-[420px]",
                      feature.imagePosition === "left"
                        ? "lg:ml-5 lg:mt-5"
                        : "lg:mr-5 lg:mt-5",
                    )}
                  />

                  <div
                    className={cn(
                      "flex flex-1 flex-col justify-center gap-4 px-4 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-8",
                      "lg:flex-[0.9] lg:py-10 lg:pt-10",
                      feature.imagePosition === "left"
                        ? "lg:pr-10"
                        : "lg:pl-10 lg:pr-10",
                    )}
                  >
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {feature.headline}
                    </h3>
                    <p className="text-base leading-relaxed text-white/70">
                      {feature.description}
                    </p>
                    <Button asChild className={cn(BTN_PRIMARY_SOLID, "w-fit shrink-0")}>
                      <a href="#waitlist">{feature.cta}</a>
                    </Button>
                  </div>
                </div>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </div>
  );
}
