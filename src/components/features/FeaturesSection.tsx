import dynamic from "next/dynamic";

import {
  AUTO_ENHANCE_AFTER,
  AUTO_ENHANCE_BEFORE,
} from "@/lib/auto-enhance-images";
import FeatureBentoCard from "@/src/components/features/FeatureBentoCard";
import FeatureSmallCard from "@/src/components/features/FeatureSmallCard";
import FeaturesScrollReveal, {
  FeaturesScrollRevealItem,
} from "@/src/components/features/FeaturesScrollReveal";
import {
  AutoEnhancePlaceholder,
  BentoShowcasePlaceholder,
  ConversationalEditingPlaceholder,
} from "@/src/components/marketing/MarketingSectionPlaceholders";
import SectionIntro from "@/src/components/SectionIntro";
import SectionShell from "@/src/components/SectionShell";
import { BRAND_HEADLINE_ACCENT_CLASS } from "@/lib/brand-colors";

const SmartSearchShowcaseCrop = dynamic(
  () => import("@/src/components/features/SmartSearchShowcaseCrop"),
  { loading: () => <BentoShowcasePlaceholder size="large" /> },
);

const StyleMatchShowcaseCrop = dynamic(
  () => import("@/src/components/features/StyleMatchShowcaseCrop"),
  { loading: () => <BentoShowcasePlaceholder size="medium" /> },
);

const ConversationalEditingShowcaseCrop = dynamic(
  () => import("@/src/components/features/ConversationalEditingShowcaseCrop"),
  { loading: () => <ConversationalEditingPlaceholder /> },
);

const BeforeAfterSlider = dynamic(
  () =>
    import("@/src/components/features/BeforeAfterSlider").then(
      (mod) => mod.BeforeAfterSlider,
    ),
  { loading: () => <AutoEnhancePlaceholder /> },
);

const FeaturesCollaborationTrailing = dynamic(
  () => import("@/src/components/features/FeaturesCollaborationTrailing"),
);

export default function FeaturesSection() {
  return (
    <SectionShell
      intro={
        <SectionIntro variant="headline">
          A <span className={BRAND_HEADLINE_ACCENT_CLASS}>Smarter Way</span> to
          Edit
        </SectionIntro>
      }
    >
      <FeaturesScrollReveal>
        <FeaturesScrollRevealItem className="min-w-0 md:col-span-2">
          <FeatureBentoCard
            size="large"
            headline="Semantic Search"
            description="Find images by describing scenes, subjects, or keywords."
            cta="Search Now"
          >
            <SmartSearchShowcaseCrop />
          </FeatureBentoCard>
        </FeaturesScrollRevealItem>

        <FeaturesScrollRevealItem className="min-w-0">
          <FeatureBentoCard
            size="medium"
            headline="Style Match"
            description="Match your photo to a reference image instantly."
            cta="Match a Style"
          >
            <StyleMatchShowcaseCrop />
          </FeatureBentoCard>
        </FeaturesScrollRevealItem>

        <FeaturesScrollRevealItem className="min-w-0">
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
        </FeaturesScrollRevealItem>

        <FeaturesScrollRevealItem className="min-w-0">
          <FeatureSmallCard
            headline="Auto Photo Enhance"
            description="Balance exposure, color, and detail in one click."
            trailing={
              <div className="relative flex shrink-0 items-center">
                <div className="feature-collab-actions-glow" aria-hidden />
                <div className="relative z-[1] w-[9.25rem] shrink-0 sm:w-[10rem] md:w-[10.5rem]">
                  <BeforeAfterSlider
                    beforeSrc={AUTO_ENHANCE_AFTER.src}
                    afterSrc={AUTO_ENHANCE_BEFORE.src}
                    className="h-[5.75rem] w-full sm:h-[6rem]"
                  />
                </div>
              </div>
            }
          />
        </FeaturesScrollRevealItem>

        <FeaturesScrollRevealItem className="min-w-0">
          <FeatureSmallCard
            headline="Collaborative Editing"
            description="Invite others and edit photos together in real time."
            topRightLabel="Coming soon"
            trailing={
              <div className="relative flex shrink-0 items-center">
                <div className="feature-collab-actions-glow" aria-hidden />
                <FeaturesCollaborationTrailing />
              </div>
            }
          />
        </FeaturesScrollRevealItem>
      </FeaturesScrollReveal>
    </SectionShell>
  );
}
