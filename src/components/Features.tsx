"use client";

import ConversationalEditingShowcaseCrop from "@/src/components/features/ConversationalEditingShowcaseCrop";
import FeatureBentoCard from "@/src/components/features/FeatureBentoCard";
import FeatureSmallCard from "@/src/components/features/FeatureSmallCard";
import SmartSearchShowcaseCrop from "@/src/components/features/SmartSearchShowcaseCrop";
import StyleMatchShowcaseCrop from "@/src/components/features/StyleMatchShowcaseCrop";
import SectionIntro from "@/src/components/SectionIntro";
import SectionShell from "@/src/components/SectionShell";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";

export default function Features() {
  return (
    <SectionShell intro={<SectionIntro>Features</SectionIntro>}>
      <ScrollRevealGroup
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        stagger={0.1}
      >
        {/* Row 1 — large hero card */}
        <ScrollRevealItem className="md:col-span-2">
          <FeatureBentoCard
            size="large"
            headline="Get a professional edit in seconds"
            description="Describe your edits in plain language and let AI apply professional changes instantly."
            cta="Ask AI"
          >
            <ConversationalEditingShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        {/* Row 2 — medium cards */}
        <ScrollRevealItem>
          <FeatureBentoCard
            size="medium"
            headline="Get someone else's aesthetic without years of practicing it"
            description="Upload a reference image and Redux applies its look to your photo in one step."
            cta="Match a Style"
          >
            <StyleMatchShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <FeatureBentoCard
            size="medium"
            headline="Stop scrolling through 10,000 photos to find the one"
            description="Search your library by describing what's in the image — keywords, scenes, subjects."
            cta="Search Now"
          >
            <SmartSearchShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        {/* Row 3 — small pill cards */}
        <ScrollRevealItem>
          <FeatureSmallCard
            headline="One click, balanced tones"
            description="Auto balance exposure, contrast, and color across your whole image."
            icon="Contrast01"
          />
        </ScrollRevealItem>

        <ScrollRevealItem>
          <FeatureSmallCard
            headline="Erase or extend, instantly"
            description="Remove backgrounds or generatively fill gaps with AI-powered inpainting."
            icon="Expand04"
          />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionShell>
  );
}
