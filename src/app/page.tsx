import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import Navbar from "@/src/components/Navbar";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#111111] text-white">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <Footer />
    </main>
  );
}
