"use client";

import Image from "next/image";

import { Icon } from "@/components/shared/Icon";
import SectionLabel from "@/src/components/SectionLabel";
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
  image?: string;
  imageAlt?: string;
  imageCrop?: "left" | "right" | "center";
};

const imageCropClasses = {
  left: "object-cover object-left-top",
  right: "object-cover object-right-top",
  center: "object-cover object-center object-top",
} as const;

const features: Feature[] = [
  {
    headline: "Conversational Editing",
    description:
      "Describe your edits, and our AI applies professional changes instantly. Review and refine in real-time until your photo is perfect.",
    cta: "Ask AI",
    imagePosition: "left",
    image: "/features/conversational-editing.png",
    imageAlt:
      "Redux editor with AI chat applying blue hour color edits to a mountain landscape",
    imageCrop: "left",
  },
  {
    headline: "Style Match",
    description:
      "Recreate any style instantly. Upload a reference image, and our AI applies its aesthetic to your photo.",
    cta: "Match a Style",
    imagePosition: "right",
    image: "/features/style-match.png",
    imageAlt:
      "Redux editor applying Style Match to Mount Fuji via AI chat with a reference image",
    imageCrop: "right",
  },
  {
    headline: "Smart Search",
    description:
      "Find any photo by describing its content. Search by keywords and instantly surface matching images.",
    cta: "Search Now",
    imagePosition: "left",
    image: "/features/smart-search.png",
    imageAlt:
      "Redux library search showing results for a city skyline with water query",
    imageCrop: "center",
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
                    className={cn(
                      "relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#0a0a0a]",
                      "mx-4 mt-4 sm:mx-5 sm:mt-5 lg:mb-5 lg:aspect-auto lg:min-h-[400px] lg:flex-[1.55] lg:shrink-0 xl:min-h-[440px]",
                      feature.imagePosition === "left"
                        ? "lg:ml-5 lg:mt-5"
                        : "lg:mr-5 lg:mt-5",
                    )}
                    aria-hidden={feature.image ? undefined : true}
                  >
                    {feature.image ? (
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt ?? ""}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 62vw"
                        className={
                          imageCropClasses[feature.imageCrop ?? "center"]
                        }
                      />
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "flex flex-1 flex-col justify-center gap-4 px-4 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-8",
                      "lg:flex-[0.85] lg:py-10 lg:pt-10",
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
                    <a
                      href="#waitlist"
                      className={cn(
                        BTN_PRIMARY_SOLID,
                        "w-fit shrink-0 gap-1 px-3.5 leading-none",
                      )}
                    >
                      <span className="leading-none">{feature.cta}</span>
                      <Icon
                        name="ArrowUpRight"
                        size={16}
                        className="shrink-0"
                        aria-hidden
                      />
                    </a>
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
