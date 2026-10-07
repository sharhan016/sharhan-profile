"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { navigation } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open
          ? "border-ink/10 bg-paper/90 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      <nav className="page-shell flex h-18 items-center justify-between" aria-label="Primary navigation">
        <a href="#top" className="text-[13px] font-semibold tracking-[0.26em] focus-ring">
          SHARHAN
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="nav-link focus-ring">
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="focus-ring grid size-10 place-items-center md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-ink/10 bg-paper px-5 pb-8 pt-5 md:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navigation.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex border-b border-ink/10 py-4 text-xl tracking-[-0.03em]"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
