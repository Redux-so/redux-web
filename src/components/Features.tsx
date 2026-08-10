"use client";

import Image from "next/image";

import { Icon } from "@/components/shared/Icon";
import SectionLabel from "@/src/components/SectionLabel";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { blueprintBorderB, blueprintCol } from "@/lib/blueprint-grid";
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
    imageCrop: "right",
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
      "Redux library search showing mountain photo results for a rural mountains query",
    imageCrop: "left",
  },
];

export default function Features() {
  return (
    <div>
      <ScrollReveal>
        <div
          className={cn(
            blueprintBorderB,
            "flex flex-col items-center gap-3 px-6 py-10 sm:px-8 sm:py-12 lg:px-10",
          )}
        >
          <SectionLabel>Features</SectionLabel>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Professional Results,{" "}
            <span className="text-brand-link">Intuitive Tools</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollRevealGroup
        className="grid grid-cols-1 lg:grid-cols-3"
        stagger={0.12}
      >
        {features.map((feature) => (
          <ScrollRevealItem
            key={feature.headline}
            className={cn(blueprintCol, "flex flex-col")}
          >
            <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-brand-bg", blueprintBorderB)}>
              {feature.image ? (
                <Image
                  src={feature.image}
                  alt={feature.imageAlt ?? ""}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={
                    imageCropClasses[feature.imageCrop ?? "center"]
                  }
                />
              ) : null}
            </div>

            <div className="flex flex-1 flex-col gap-4 px-6 py-8 sm:px-8">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {feature.headline}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-white/70 sm:text-base">
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
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </div>
  );
}
