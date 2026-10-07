import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Contact() {
  return (
    <section id="contact" className="section-space scroll-mt-20 bg-clay text-ink">
      <div className="page-shell">
        <Reveal>
          <SectionLabel number="05">Contact</SectionLabel>
        </Reveal>
        <Reveal delay={0.08} className="mt-16 lg:mt-24">
          <h2 className="max-w-6xl text-[clamp(3.4rem,10vw,9.5rem)] font-medium uppercase leading-[0.84] tracking-[-0.075em]">
            Let&apos;s build<br />something <span className="text-ink/35">useful.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 border-t border-ink/20 pt-8 lg:grid-cols-12 lg:mt-24">
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-lg leading-8 text-ink/62 sm:text-xl">
              I&apos;m interested in difficult product, workflow and automation problems—especially where reliability and clear system boundaries matter.
            </p>
            <div className="mt-8">
              <Button href="mailto:sharhan.sathar@gmail.com">Get in touch</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
