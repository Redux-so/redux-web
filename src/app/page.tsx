import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import HeroParticleBackground from "@/src/components/HeroParticleBackground";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import Navbar, { NAV_CLEARANCE_CLASS } from "@/src/components/Navbar";
import Showcase from "@/src/components/Showcase";
import WaitlistSection from "@/src/components/WaitlistSection";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main
      id="home"
      className={cn(
        "overflow-x-hidden bg-brand-bg text-white",
        NAV_CLEARANCE_CLASS,
      )}
    >
      <Navbar />
      <section className="relative overflow-hidden bg-hero-showcase-glow">
        <HeroParticleBackground />
        <div className="relative z-[1]">
          <Hero />
          <Showcase />
        </div>
      </section>
      <MarqueeStrip />
      <section
        aria-label="Product information"
        className="bg-hero-showcase-glow"
      >
        <section id="features">
          <Features />
        </section>
        <section id="faq" className="scroll-mt-12">
          <FAQ />
        </section>
      </section>
      <WaitlistSection />
      <Footer />
    </main>
  );
}
