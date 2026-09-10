import type { Metadata } from "next";

import { LegalPageSection } from "@/src/components/MarketingPageShell";
import {
  PAGE_CONTAINER,
  SECTION_HEADLINE,
} from "@/lib/section-styles";

export const metadata: Metadata = {
  title: "Privacy Policy | Redux",
  description: "Privacy Policy for Redux — the agentic photo editing platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageSection>
      <div className={PAGE_CONTAINER}>
        <h1 className={SECTION_HEADLINE}>Privacy Policy</h1>
        <div className="mt-8 max-w-none text-base leading-relaxed text-white/70">
          <p>Content coming soon.</p>
        </div>
      </div>
    </LegalPageSection>
  );
}
