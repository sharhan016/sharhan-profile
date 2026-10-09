"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ProjectVisual } from "@/components/ProjectVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/portfolio";

export function Work() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="section-space scroll-mt-20 bg-ink text-paper">
      <div className="page-shell">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel number="03" light>Selected work</SectionLabel>
          <h2 className="mt-12 max-w-4xl text-[clamp(3rem,8vw,8rem)] leading-[0.88] tracking-[-0.065em]">
            Systems made<br /><span className="text-white/35">to hold up.</span>
          </h2>
        </motion.div>

        <div className="mt-20 space-y-24 lg:mt-32 lg:space-y-36">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="project group grid items-start gap-8 lg:grid-cols-12 lg:gap-12"
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`overflow-hidden lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
                <motion.div whileHover={reduceMotion ? {} : { scale: 1.025 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                  <ProjectVisual motif={project.motif} number={project.number} />
                </motion.div>
              </div>
              <div className={`flex min-h-full flex-col justify-between lg:col-span-5 ${index % 2 ? "lg:order-1" : ""}`}>
                <div>
                  <div className="flex items-center justify-between border-b border-white/16 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/42">
                    <span>Project {project.number}</span>
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="mt-7 text-[clamp(2.4rem,5vw,5.25rem)] leading-[0.94] tracking-[-0.055em] transition-transform duration-500 group-hover:translate-x-1.5">
                    {project.title}
                  </h3>
                  <p className="mt-7 max-w-lg text-base leading-7 text-white/55 sm:text-lg">{project.description}</p>
                  {project.note && (
                    <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-white/52">
                      {project.note}
                    </p>
                  )}
                  {project.links && (
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3" aria-label={`${project.title} links`}>
                      {project.links.map((link) => {
                        const className = "inline-flex items-center gap-2 border-b border-white/32 pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/68 transition-colors hover:border-white hover:text-white focus-ring";
                        const content = (
                          <>
                            {link.label}
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                          </>
                        );

                        return link.href.startsWith("/") ? (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-label={`${link.label} for ${project.title}`}
                            className={className}
                          >
                            {content}
                          </Link>
                        ) : (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${link.label} for ${project.title} (opens in a new tab)`}
                            className={className}
                          >
                            {content}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
                <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/16 pt-5" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => (
                    <li key={technology} className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">{technology}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
