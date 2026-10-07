import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section id="about" className="section-space page-shell scroll-mt-20">
      <Reveal>
        <SectionLabel number="01">About</SectionLabel>
        <h2 className="sr-only">About Sharhan</h2>
      </Reveal>
      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:mt-24">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.22em] text-ink/45">
            Useful products<br />Reliable systems<br />Thoughtful execution
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <p className="editorial-copy">
            I build product software and AI systems where reliability, constraints and clear evidence matter.
          </p>
          <div className="mt-10 grid gap-6 text-base leading-7 text-ink/58 sm:grid-cols-2">
            <p>My work spans governed retrieval, agent tooling, browser automation and production application engineering across Python, TypeScript and Flutter.</p>
            <p>I like turning ambiguous workflows into bounded systems with explicit inputs, observable behavior, recoverable failure and software people can actually use.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
