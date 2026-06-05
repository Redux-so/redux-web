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
    <main className="bg-[#111111] text-white overflow-x-hidden">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <Showcase />
      <MarqueeStrip />
      <section id="features">
        <Features />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <WaitlistSection />
      <Footer />
    </main>
  );
}
