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
    <SectionShell intro={<SectionIntro variant="headline">A Smarter Way to Edit</SectionIntro>}>
      <ScrollRevealGroup
        className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2"
        stagger={0.1}
      >
        {/* Row 1: large hero card */}
        <ScrollRevealItem className="min-w-0 md:col-span-2">
          <FeatureBentoCard
            size="large"
            headline="Conversational Editing"
            description="Describe your edits in plain language and let AI apply professional changes instantly."
            cta="Ask AI"
          >
            <ConversationalEditingShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        {/* Row 2: medium cards */}
        <ScrollRevealItem className="min-w-0">
          <FeatureBentoCard
            size="medium"
            headline="Style Match"
            description="Upload a reference image and Redux applies its look to your photo in one step."
            cta="Match a Style"
          >
            <StyleMatchShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        <ScrollRevealItem className="min-w-0">
          <FeatureBentoCard
            size="medium"
            headline="Smart Search"
            description="Search your library by describing what's in the image: keywords, scenes, subjects."
            cta="Search Now"
          >
            <SmartSearchShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        {/* Row 3: small pill cards */}
        <ScrollRevealItem className="min-w-0">
          <FeatureSmallCard
            headline="Auto Tone Balance"
            description="Auto balance exposure, contrast, and color across your whole image."
            icon="Contrast01"
          />
        </ScrollRevealItem>

        <ScrollRevealItem className="min-w-0">
          <FeatureSmallCard
            headline="Generative Fill"
            description="Remove backgrounds or generatively fill gaps with AI-powered inpainting."
            icon="Expand04"
          />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionShell>
  );
}
