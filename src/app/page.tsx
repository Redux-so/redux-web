import EditShowcasePreload from "@/src/components/EditShowcasePreload";
import EditShowcaseSection from "@/src/components/EditShowcaseSection";
import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import Navbar, {
  NAV_SCROLL_OFFSET_CLASS,
  NAV_SPACER_CLASS,
} from "@/src/components/Navbar";
import Showcase from "@/src/components/Showcase";
import WaitlistSection from "@/src/components/WaitlistSection";
import { SECTION_DIVIDE } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const SECTION_BASE = cn("bg-brand-bg", SECTION_DIVIDE);

export default function Home() {
  return (
    <>
      <EditShowcasePreload />

      {/*
        Sticky footer reveal: this layer scrolls over the footer (z-10 + solid bg).
        Footer is a sibling with sticky bottom-0 z-0 so it is uncovered at scroll end.
        Keep overflow-x-hidden on main only — not this wrapper — so sticky is not broken.
      */}
      <div className="relative z-10 bg-brand-bg text-white">
        <Navbar />
        <div aria-hidden className={NAV_SPACER_CLASS} />

        <main className="overflow-x-hidden">
          <section
            id="home"
            className={cn(NAV_SCROLL_OFFSET_CLASS, "bg-brand-bg")}
          >
            <Hero />
          </section>

          <section aria-label="Editor showcase" className={SECTION_BASE}>
            <Showcase />
          </section>

          <section aria-label="Inspired by workflows from" className={SECTION_BASE}>
            <MarqueeStrip />
          </section>

          <section
            id="features"
            className={cn(NAV_SCROLL_OFFSET_CLASS, SECTION_BASE)}
          >
            <Features />
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
    </>
  );
}
