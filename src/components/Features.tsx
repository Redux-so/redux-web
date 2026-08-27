"use client";

import Image from "next/image";
import { Fragment } from "react";

import { Icon } from "@/components/shared/Icon";
import ConversationalEditingShowcaseCrop from "@/src/components/features/ConversationalEditingShowcaseCrop";
import SmartSearchShowcaseCrop from "@/src/components/features/SmartSearchShowcaseCrop";
import StyleMatchShowcaseCrop from "@/src/components/features/StyleMatchShowcaseCrop";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { PAGE_CONTAINER } from "@/lib/section-styles";
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
  showcaseScenario?: "conversational" | "styleMatch" | "smartSearch";
};

const imageCropClasses = {
  left: "object-cover object-center object-top lg:object-left-top",
  right: "object-cover object-center object-top lg:object-right-top",
  center: "object-cover object-center object-top",
} as const;

const FEATURE_IMAGE_WIDTH = "lg:w-[62%]";
const FEATURE_TEXT_WIDTH = "lg:w-[38%]";
/** Shared image column sizing — fixed row height on desktop keeps all three features identical. */
const FEATURE_ROW_HEIGHT = "lg:h-[360px] xl:h-[420px]";
const FEATURE_IMAGE_HEIGHT =
  "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-0 lg:shrink-0";

const FEATURE_SHOWCASE_FRAME =
  "overflow-hidden rounded-2xl border border-[#2e2e2e] bg-brand-bg";

const FEATURES_SECTION_LABEL =
  "text-[13px] font-semibold uppercase tracking-wide text-[#888888]";

/** Equal space above/below each feature card. */
const FEATURE_CARD_SPACE = "my-8 sm:my-10";
const FEATURE_CARD_STACK_PADDING = "py-8 sm:py-10";

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
    showcaseScenario: "conversational",
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
    showcaseScenario: "styleMatch",
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
    showcaseScenario: "smartSearch",
  },
];

function FeatureRow({ feature }: { feature: Feature }) {
  const imageOnRight = feature.imagePosition === "right";

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:items-stretch",
        FEATURE_ROW_HEIGHT,
      )}
    >
      <div
        className={cn(
          "relative w-full",
          FEATURE_IMAGE_WIDTH,
          FEATURE_IMAGE_HEIGHT,
          FEATURE_SHOWCASE_FRAME,
          imageOnRight ? "lg:order-2" : "lg:order-1",
        )}
      >
        {feature.showcaseScenario === "conversational" ? (
          <ConversationalEditingShowcaseCrop />
        ) : feature.showcaseScenario === "styleMatch" ? (
          <StyleMatchShowcaseCrop />
        ) : feature.showcaseScenario === "smartSearch" ? (
          <SmartSearchShowcaseCrop />
        ) : feature.image ? (
          <Image
            src={feature.image}
            alt={feature.imageAlt ?? ""}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 62vw"
            className={imageCropClasses[feature.imageCrop ?? "center"]}
          />
        ) : null}
      </div>

      <div
        className={cn(
          "flex flex-col justify-center px-4 py-8 sm:px-8 lg:py-0",
          FEATURE_TEXT_WIDTH,
          imageOnRight ? "lg:order-1" : "lg:order-2",
        )}
      >
        <div className="flex flex-col gap-4">
          <h3 className="m-0 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {feature.headline}
          </h3>
          <p className="m-0 text-sm leading-relaxed text-white/70 sm:text-base">
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
    </div>
  );
}

function FeaturesSectionIntro() {
  return (
    <ScrollReveal
      variant="fadeIn"
      className="py-5 sm:py-6"
    >
      <p className={cn("m-0", FEATURES_SECTION_LABEL)}>Features</p>
    </ScrollReveal>
  );
}

export default function Features() {
  return (
    <div className={cn(PAGE_CONTAINER, "flex flex-col")}>
      <FeaturesSectionIntro />
      <ScrollRevealGroup
        className={cn("flex flex-col", FEATURE_CARD_STACK_PADDING)}
        stagger={0.12}
      >
      {features.map((feature, index) => {
        const row =
          feature.showcaseScenario === "styleMatch" ? (
            <div key={feature.headline}>
              <FeatureRow feature={feature} />
            </div>
          ) : (
            <ScrollRevealItem key={feature.headline}>
              <FeatureRow feature={feature} />
            </ScrollRevealItem>
          );

        return (
          <Fragment key={feature.headline}>
            {row}
            {index < features.length - 1 ? (
              <div aria-hidden className={FEATURE_CARD_SPACE} />
            ) : null}
          </Fragment>
        );
      })}
      </ScrollRevealGroup>
    </div>
  );
}
