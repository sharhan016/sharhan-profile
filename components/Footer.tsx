import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-ink py-10 text-paper">
      <div className="page-shell grid gap-10 sm:grid-cols-12 sm:items-end">
        <div className="sm:col-span-5">
          <p className="text-xl font-semibold tracking-[0.2em]">SHARHAN</p>
          <p className="mt-3 text-sm text-white/58">Senior Software Engineer</p>
          <p className="mt-1 text-sm text-white/58">Bengaluru, India</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-5 sm:justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={link.href.startsWith("http") ? `${link.label} (opens in a new tab)` : link.label}
              className="group flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-white/68 transition-colors hover:text-white focus-ring"
            >
              {link.label}
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/48 sm:col-span-2 sm:text-right">
          © {new Date().getFullYear()}<br />Built with care
        </div>
      </div>
    </footer>
  );
}
