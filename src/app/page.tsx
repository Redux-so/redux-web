import FAQ from "@/src/components/FAQ";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import MarqueeStrip from "@/src/components/MarqueeStrip";
import Navbar from "@/src/components/Navbar";
import Showcase from "@/src/components/Showcase";
import WaitlistSection from "@/src/components/WaitlistSection";

export default function Home() {
  return (
    <main
      id="home"
      className="overflow-x-hidden bg-[#111111] pt-16 text-white"
    >
      <Navbar />
      <section className="bg-hero-showcase-glow">
        <Hero />
        <Showcase />
      </section>
      <MarqueeStrip />
      <section
        aria-label="Product information"
        className="bg-hero-showcase-glow"
      >
        <section id="features">
          <Features />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </section>
      <WaitlistSection />
      <Footer />
    </main>
  );
}
