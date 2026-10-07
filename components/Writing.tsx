import { ArrowUpRight } from "lucide-react";
import { writing } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Writing() {
  return (
    <section id="writing" className="scroll-mt-20 border-y border-ink/12 bg-wash">
      <div className="section-space page-shell">
        <Reveal>
          <SectionLabel number="05">Writing / Notes</SectionLabel>
        </Reveal>
        <div className="mt-14 border-t border-ink/20 lg:mt-20">
          {writing.map((title, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article className="writing-row group grid gap-5 border-b border-ink/16 py-7 sm:grid-cols-12 sm:items-center sm:py-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/36 sm:col-span-1">0{index + 1}</p>
                <h3 className="text-[clamp(1.35rem,2.8vw,2.75rem)] leading-[1.08] tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 sm:col-span-9">{title}</h3>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-ink/38 sm:col-span-2 sm:justify-end">
                  <span>Draft</span>
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
