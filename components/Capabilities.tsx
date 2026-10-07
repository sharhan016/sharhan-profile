import { capabilities } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Capabilities() {
  return (
    <section id="capabilities" className="section-space page-shell scroll-mt-20">
      <Reveal>
        <SectionLabel number="04">Engineering / Capabilities</SectionLabel>
        <h2 className="sr-only">Engineering capabilities</h2>
      </Reveal>
      <div className="mt-16 grid border-t border-ink/20 lg:mt-24 lg:grid-cols-3">
        {capabilities.map((group, groupIndex) => (
          <Reveal
            key={group.title}
            delay={groupIndex * 0.08}
            className={
              groupIndex === 0
                ? "border-b border-ink/16 py-10 lg:col-span-3"
                : groupIndex === 1
                  ? "border-b border-ink/16 py-8 lg:border-r lg:pr-8"
                  : groupIndex === capabilities.length - 1
                    ? "border-b border-ink/16 py-8 lg:pl-8"
                    : "border-b border-ink/16 py-8 lg:border-r lg:px-8"
            }
          >
            <h3 className={`font-mono uppercase tracking-[0.2em] ${groupIndex === 0 ? "text-xs text-ink/65" : "text-[11px] text-ink/55"}`}>
              0{groupIndex + 1} / {group.title}
            </h3>
            <ul className={groupIndex === 0 ? "mt-10 grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12" : "mt-10"}>
              {group.skills.map((skill) => (
                <li key={skill} className={`capability-item border-t border-ink/12 py-3.5 tracking-[-0.035em] first:border-t-0 ${groupIndex === 0 ? "text-[clamp(1.3rem,2vw,1.8rem)]" : "text-[clamp(1.15rem,1.7vw,1.5rem)]"}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
