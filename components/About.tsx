import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section id="about" className="section-space page-shell scroll-mt-20">
      <Reveal>
        <SectionLabel number="01">About</SectionLabel>
      </Reveal>
      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:mt-24">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.22em] text-ink/45">
            Useful products<br />Reliable systems<br />Thoughtful execution
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <p className="editorial-copy">
            I&apos;m a software engineer focused on building useful products and reliable systems.
          </p>
          <div className="mt-10 grid gap-6 text-base leading-7 text-ink/58 sm:grid-cols-2">
            <p>My work spans product engineering, backend systems, automation and AI-powered workflows.</p>
            <p>I enjoy taking ambiguous problems, understanding the system behind them and turning them into software that actually works.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
