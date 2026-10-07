"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  href,
  children,
  variant = "dark",
  direction = "up",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "line";
  direction?: "up" | "down";
}) {
  const Icon = direction === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <motion.a
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-between gap-8 border px-5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300",
        variant === "dark" && "border-ink bg-ink text-paper hover:bg-transparent hover:text-ink",
        variant === "light" && "border-white bg-white text-ink hover:bg-transparent hover:text-white",
        variant === "line" && "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
      )}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
      <Icon
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}
