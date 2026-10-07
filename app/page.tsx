import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Work } from "@/components/Work";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Capabilities />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
