import FAQ from "@/src/components/FAQ";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import Navbar from "@/src/components/Navbar";
import WaitlistSection from "@/src/components/WaitlistSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#111111] text-white">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <WaitlistSection />
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </main>
  );
}
