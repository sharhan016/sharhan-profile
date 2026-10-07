import { experience } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-y border-ink/12 bg-wash">
      <div className="section-space page-shell">
        <Reveal>
          <SectionLabel number="02">Experience</SectionLabel>
        </Reveal>
        <div className="mt-14 border-t border-ink/20 lg:mt-20">
          {experience.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.04}>
              <article className="experience-row group grid gap-5 border-b border-ink/16 py-8 sm:grid-cols-12 sm:py-10">
                <div className="flex items-start gap-5 sm:col-span-6">
                  <span className="mt-1 font-mono text-[9px] tracking-[0.2em] text-ink/35">0{index + 1}</span>
                  <div>
                    <h3 className="text-[clamp(1.45rem,2.4vw,2.45rem)] leading-tight tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2">
                      {item.company}
                    </h3>
                    <p className="mt-2 text-sm text-ink/55">{item.role}</p>
                  </div>
                </div>
                <div className="sm:col-span-3 sm:pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/52">{item.period}</p>
                </div>
                <div className="sm:col-span-3 sm:pt-2 sm:text-right">
                  {item.location && <p className="text-xs uppercase tracking-[0.13em] text-ink/42">{item.location}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
