import type { Metadata } from "next";

import { LegalPageSection } from "@/src/components/MarketingPageShell";
import {
  PAGE_CONTAINER,
  SECTION_HEADLINE,
} from "@/lib/section-styles";

export const metadata: Metadata = {
  title: "Terms of Service | Redux",
  description: "Terms of Service for Redux — the agentic photo editing platform.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageSection>
      <div className={PAGE_CONTAINER}>
        <h1 className={SECTION_HEADLINE}>Terms of Service</h1>
        <div className="mt-8 max-w-none text-base leading-relaxed text-white/70">
          <p>Content coming soon.</p>
        </div>
      </div>
    </LegalPageSection>
  );
}
