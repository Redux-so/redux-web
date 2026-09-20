import dynamic from "next/dynamic";

import PageGrid from "@/src/components/PageGrid";
import FAQ from "@/src/components/FAQ";
import FeaturesSection from "@/src/components/features/FeaturesSection";
import Hero from "@/src/components/Hero";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import {
  EditShowcaseMarqueePlaceholder,
  EditorShowcaseSectionPlaceholder,
  ToolkitMarqueePlaceholder,
} from "@/src/components/marketing/MarketingSectionPlaceholders";
import { NAV_SCROLL_OFFSET_CLASS } from "@/src/components/Navbar";
import WaitlistSection from "@/src/components/WaitlistSection";
import { SECTION_DIVIDE, SECTION_VERTICAL_PADDING } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const SECTION_BASE = cn("relative z-[1]", SECTION_DIVIDE, SECTION_VERTICAL_PADDING);

const Showcase = dynamic(() => import("@/src/components/Showcase"), {
  loading: () => <EditorShowcaseSectionPlaceholder />,
});

const ToolkitMarquee = dynamic(
  () => import("@/src/components/features/ToolkitMarquee"),
  { loading: () => <ToolkitMarqueePlaceholder /> },
);

const EditShowcaseSection = dynamic(
  () => import("@/src/components/EditShowcaseSection"),
  { loading: () => <EditShowcaseMarqueePlaceholder /> },
);

export default function Home() {
  return (
    <>
      <PageGrid />
      <section
        id="home"
        data-page-grid-hide-verticals
        className={cn(
          NAV_SCROLL_OFFSET_CLASS,
          "relative z-[1] overflow-x-clip",
        )}
      >
        <div aria-hidden className="hero-top-glow" />
        <Hero />
      </section>

      <section aria-label="Editor showcase" className={SECTION_BASE}>
        <Showcase />
      </section>

      <section
        aria-label="Inspired by workflows from"
        className="relative z-[1]"
        data-page-grid-skip-boundary-after
      >
        <MarqueeStrip />
      </section>

      <section
        id="features"
        className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE)}
      >
        <FeaturesSection />
      </section>

      <section aria-label="The Full Toolkit" className={SECTION_BASE}>
        <ToolkitMarquee />
      </section>

      <section
        id="edit-showcase"
        className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE, "overflow-x-visible")}
      >
        <EditShowcaseSection />
      </section>

      <section
        id="faq"
        className={cn(NAV_SCROLL_OFFSET_CLASS, "relative z-[1]", SECTION_DIVIDE)}
      >
        <FAQ />
      </section>

      <section
        id="waitlist"
        className={cn(
          NAV_SCROLL_OFFSET_CLASS,
          "relative z-[1]",
          SECTION_DIVIDE,
          "py-10 sm:py-12 lg:py-16",
        )}
      >
        <WaitlistSection />
      </section>
    </>
  );
}
