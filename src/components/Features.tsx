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
            headline="Auto Photo Enhance"
            description="One-click enhancement for balanced exposure, color, and detail."
            trailing={
              <div className="relative flex shrink-0 items-center">
                <div className="feature-collab-actions-glow" aria-hidden />
                <div className="relative z-[1] w-full sm:min-w-[9.5rem] sm:max-w-[11.5rem]">
                  <BeforeAfterSlider className="h-20 w-full" />
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
