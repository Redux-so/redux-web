import PageGrid from "@/src/components/PageGrid";
import EditShowcasePreload from "@/src/components/EditShowcasePreload";
import EditShowcaseSection from "@/src/components/EditShowcaseSection";
import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import ToolkitMarquee from "@/src/components/features/ToolkitMarquee";
import Hero from "@/src/components/Hero";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import { NAV_SCROLL_OFFSET_CLASS } from "@/src/components/Navbar";
import Showcase from "@/src/components/Showcase";
import WaitlistSection from "@/src/components/WaitlistSection";
import { SECTION_DIVIDE, SECTION_VERTICAL_PADDING } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const SECTION_BASE = cn("relative z-[1]", SECTION_DIVIDE, SECTION_VERTICAL_PADDING);

export default function Home() {
  return (
    <>
      <EditShowcasePreload />
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
        <Features />
      </section>

      <section aria-label="The Full Toolkit" className={SECTION_BASE}>
        <ToolkitMarquee />
      </section>

      <section
        id="edit-showcase"
        className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE)}
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
