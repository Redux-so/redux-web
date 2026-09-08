"use client";

import ConversationalEditingShowcaseCrop from "@/src/components/features/ConversationalEditingShowcaseCrop";
import { BeforeAfterSlider } from "@/src/components/features/BeforeAfterSlider";
import FeatureBentoCard from "@/src/components/features/FeatureBentoCard";
import FeatureSmallCard from "@/src/components/features/FeatureSmallCard";
import SmartSearchShowcaseCrop from "@/src/components/features/SmartSearchShowcaseCrop";
import StyleMatchShowcaseCrop from "@/src/components/features/StyleMatchShowcaseCrop";
import SectionIntro from "@/src/components/SectionIntro";
import SectionShell from "@/src/components/SectionShell";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Icon } from "@/components/shared/Icon";
import { BRAND_HEADLINE_ACCENT_CLASS } from "@/lib/brand-colors";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";

export default function Features() {
  return (
    <SectionShell
      intro={
        <SectionIntro variant="headline">
          A <span className={BRAND_HEADLINE_ACCENT_CLASS}>Smarter Way</span> to Edit
        </SectionIntro>
      }
    >
      <ScrollRevealGroup
        className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2"
        stagger={0.1}
      >
        {/* Row 1: large hero card */}
        <ScrollRevealItem className="min-w-0 md:col-span-2">
          <FeatureBentoCard
            size="large"
            headline="Semantic Search"
            description="Find images by describing scenes, subjects, or keywords."
            cta="Search Now"
          >
            <SmartSearchShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        {/* Row 2: medium cards */}
        <ScrollRevealItem className="min-w-0">
          <FeatureBentoCard
            size="medium"
            headline="Style Match"
            description="Match your photo to a reference image instantly."
            cta="Match a Style"
          >
            <StyleMatchShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        <ScrollRevealItem className="min-w-0">
          <FeatureBentoCard
            size="medium"
            headline="Conversational Editing"
            description="Describe edits in plain language and AI applies them instantly."
            cta="Ask AI"
            className="h-full gap-3"
            showcaseBare
            showcaseCentered
            showcaseClassName="overflow-visible"
          >
            <ConversationalEditingShowcaseCrop />
          </FeatureBentoCard>
        </ScrollRevealItem>

        {/* Row 3: small pill cards */}
        <ScrollRevealItem className="min-w-0">
          <FeatureSmallCard
            headline="Auto Photo Enhance"
            description="Balance exposure, color, and detail in one click."
            trailing={
              <div className="relative flex shrink-0 items-center">
                <div className="feature-collab-actions-glow" aria-hidden />
                <div className="relative z-[1] w-[8.75rem] max-w-[10.5rem] shrink-0">
                  <BeforeAfterSlider className="h-[4.5rem] w-full" />
                </div>
              </div>
            }
          />
        </ScrollRevealItem>

        <ScrollRevealItem className="min-w-0">
          <FeatureSmallCard
            headline="Collaborative Editing"
            description="Invite others and edit photos together in real time."
            topRightLabel="Coming soon"
            trailing={
              <div className="relative flex shrink-0 items-center">
                <div className="feature-collab-actions-glow" aria-hidden />
                <div className="relative z-[1] flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-900 sm:text-sm"
                  >
                    <Icon
                      name="UserPlus01"
                      size={16}
                      strokeWidth={2}
                      className="text-neutral-900"
                    />
                    Invite
                  </button>
                  <AvatarGroup
                    aria-hidden
                    className="*:data-[slot=avatar]:ring-0 *:data-[slot=avatar]:after:border-0"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-blue-900 text-xs text-white">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-sky-400 text-xs text-white">
                        R
                      </AvatarFallback>
                    </Avatar>
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-red-500 text-xs text-white">
                        L
                      </AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount className="h-7 w-7 bg-neutral-700 text-xs text-white ring-0">
                      +2
                    </AvatarGroupCount>
                  </AvatarGroup>
                </div>
              </div>
            }
          />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionShell>
  );
}
