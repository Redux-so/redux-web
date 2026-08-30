import PageGrid from "@/src/components/PageGrid";
import EditShowcasePreload from "@/src/components/EditShowcasePreload";
import EditShowcaseSection from "@/src/components/EditShowcaseSection";
import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import ToolkitMarquee from "@/src/components/features/ToolkitMarquee";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import Navbar, {
  NAV_SCROLL_OFFSET_CLASS,
  NAV_SPACER_CLASS,
} from "@/src/components/Navbar";
import Showcase from "@/src/components/Showcase";
import WaitlistSection from "@/src/components/WaitlistSection";
import { SECTION_DIVIDE, SECTION_VERTICAL_PADDING } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const SECTION_BASE = cn("relative z-[1]", SECTION_DIVIDE, SECTION_VERTICAL_PADDING);

export default function Home() {
  return (
    <div className="min-h-full bg-[#040404]">
      <EditShowcasePreload />

      {/*
        Sticky footer reveal: this layer scrolls over the footer (z-10 + solid bg).
        Footer is a sibling with sticky bottom-0 z-0 so it is uncovered at scroll end.
        Rounded bottom corners clip this sheet as it slides up; overflow-hidden is
        safe here because the footer is outside this wrapper (sticky is unaffected).
      */}
      <div
        data-page-grid-root
        className="relative z-10 overflow-x-clip overflow-hidden rounded-b-[2.5rem] bg-brand-bg text-white sm:rounded-b-[3.25rem] lg:rounded-b-[4rem] xl:rounded-b-[5rem]"
      >
        <Navbar />
        <div aria-hidden className={NAV_SPACER_CLASS} />

        <main className="relative flex min-w-0 flex-col overflow-x-clip">
          <PageGrid />
          <section
            id="home"
            className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE)}
          >
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
            className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE)}
          >
            <FAQ />
          </section>

          <section
            id="waitlist"
            className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE)}
          >
            <WaitlistSection />
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
