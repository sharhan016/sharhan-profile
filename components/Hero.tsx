"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 55]);
  const sequence = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="top" ref={ref} className="relative min-h-svh overflow-hidden border-b border-ink/12 pt-18">
      <div className="page-shell grid min-h-[calc(100svh-4.5rem)] grid-cols-1 lg:grid-cols-12">
        <motion.div
          className="relative z-10 flex flex-col justify-between pb-10 pt-14 lg:col-span-6 lg:pb-14 lg:pt-24"
          variants={sequence}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/58">
            <span className="h-px w-7 bg-ink/40" /> BUILDING RELIABLE AI SYSTEMS
          </motion.div>

          <div className="py-16 sm:py-20 lg:py-10">
            <div className="overflow-hidden">
              <motion.h1 variants={item} className="display-title">
                SHARHAN
              </motion.h1>
            </div>
            {/* <motion.p variants={item} className="mt-2 text-[12px] font-medium uppercase tracking-[0.3em] text-ink/64 sm:text-[14px]">
              AI Engineer
            </motion.p> */}
            <motion.p
              variants={item}
              className="mt-3 flex flex-col gap-1 uppercase sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="text-[12px] font-medium tracking-[0.3em] text-ink sm:text-[14px]">
                AI Engineer
              </span>
              <span aria-hidden="true" className="hidden h-px w-6 bg-ink/30 sm:block" />
              <span className="text-[11px] font-medium tracking-[0.18em] text-ink/64 sm:text-[12px]">
                Agentic Systems &amp; Production LLMs
              </span>
            </motion.p>
            <motion.p variants={item} className="mt-10 max-w-md text-xl leading-[1.5] tracking-[-0.02em] text-ink/65 sm:text-2xl">
              I build AI systems, custom apps and automation for real-world problems.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Button href="#work" direction="down">View work</Button>
              <Button href="mailto:sharhan.sathar@gmail.com" variant="line">Get in touch</Button>
            </motion.div>
          </div>

          <motion.div variants={item} className="hidden items-end justify-between pr-8 text-ink/45 sm:flex lg:max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Scroll to explore</span>
            <span className="h-px w-24 bg-ink/25" />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative min-h-[58svh] overflow-hidden lg:col-span-6 lg:min-h-0"
          initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.15, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div style={{ y: imageY }} className="absolute -inset-y-14 inset-x-0">
            <Image
              src="/sharhan-portrait-v2.png"
              alt="Sharhan standing against a warm architectural wall"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-[74%_center]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-paper/16 lg:to-transparent" />
          <div className="absolute bottom-6 right-6 hidden items-center gap-4 text-white/75 sm:flex">
            <span className="font-mono text-[9px] uppercase leading-5 tracking-[0.25em]">Software<br />Systems<br />Automation</span>
            <span className="h-16 w-px bg-white/45" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
