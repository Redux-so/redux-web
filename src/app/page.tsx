import EditShowcasePreload from "@/src/components/EditShowcasePreload";
import EditShowcaseSection from "@/src/components/EditShowcaseSection";
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
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main id="home" className="overflow-x-hidden bg-brand-bg text-white">
      <EditShowcasePreload />
      <Navbar />
      <div aria-hidden className={NAV_SPACER_CLASS} />

      <section className="relative overflow-hidden bg-waitlist-spotlight">
        <HeroParticleBackground />
        <Hero />
      </section>

      <section className="bg-brand-bg">
        <Showcase />
      </section>

      <MarqueeStrip />

      <section
        id="features"
        className={cn(NAV_SCROLL_OFFSET_CLASS, "bg-brand-bg")}
      >
        <Features />
      </section>

      <section
        id="edit-showcase"
        className={cn(NAV_SCROLL_OFFSET_CLASS, "bg-brand-bg")}
      >
        <EditShowcaseSection />
      </section>

      <section id="faq" className={cn(NAV_SCROLL_OFFSET_CLASS, "bg-brand-bg")}>
        <FAQ />
      </section>

      <WaitlistSection />

      <Footer />
    </main>
  );
}
