/* Writing is intentionally hidden until its portfolio role is revisited.
import { writing } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Writing() {
  return (
    <section id="writing" className="scroll-mt-20 border-y border-ink/12 bg-wash">
      <div className="section-space page-shell">
        <Reveal>
          <SectionLabel number="05">Working ideas</SectionLabel>
          <h2 className="sr-only">Writing themes and working ideas</h2>
        </Reveal>
        <Reveal delay={0.06} className="mt-14 lg:mt-20">
          <p className="max-w-3xl text-[clamp(1.7rem,3.2vw,3.25rem)] leading-[1.04] tracking-[-0.05em]">
            Themes shaping how I think about retrieval, agent systems and software architecture.
          </p>
        </Reveal>
        <div className="mt-10 border-t border-ink/20 lg:mt-14">
          {writing.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="grid gap-5 border-b border-ink/16 py-7 sm:grid-cols-12 sm:items-center sm:py-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/48 sm:col-span-1">0{index + 1}</p>
                <h3 className="text-[clamp(1.35rem,2.8vw,2.75rem)] leading-[1.08] tracking-[-0.045em] sm:col-span-9">{item.title}</h3>
                <div className="text-[11px] uppercase tracking-[0.16em] text-ink/52 sm:col-span-2 sm:text-right">
                  {item.topic}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
*/
