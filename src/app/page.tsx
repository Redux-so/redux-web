import BlueprintFrame from "@/src/components/BlueprintFrame";
import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import HeroParticleBackground from "@/src/components/HeroParticleBackground";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import Navbar, {
  NAV_SCROLL_OFFSET_CLASS,
  NAV_SPACER_CLASS,
} from "@/src/components/Navbar";
import Showcase from "@/src/components/Showcase";
import WaitlistSection from "@/src/components/WaitlistSection";
import { blueprintRow } from "@/lib/blueprint-grid";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main
      id="home"
      className="bg-brand-bg px-4 text-white sm:px-6 lg:px-8"
    >
      <Navbar />
      <BlueprintFrame>
        <div aria-hidden className={NAV_SPACER_CLASS} />

        <section className={cn(blueprintRow, "relative overflow-hidden bg-brand-bg")}>
          <HeroParticleBackground />
          <Hero />
        </section>

        <section className={cn(blueprintRow, "bg-brand-bg")}>
          <Showcase />
        </section>

        <MarqueeStrip />

        <section
          id="features"
          className={cn(blueprintRow, NAV_SCROLL_OFFSET_CLASS, "bg-brand-bg")}
        >
          <Features />
        </section>

        <section
          id="faq"
          className={cn(blueprintRow, NAV_SCROLL_OFFSET_CLASS, "bg-brand-bg")}
        >
          <FAQ />
        </section>

        <WaitlistSection />

        <Footer />
      </BlueprintFrame>
    </main>
  );
}
