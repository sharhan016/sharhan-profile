import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ArchitectureModel } from "@/data/architectures";
import { MermaidDiagram } from "@/components/ui/MermaidDiagram";
import { VertexArchitectureDiagram } from "@/components/VertexArchitectureDiagram";

export function ArchitecturePage({ model }: { model: ArchitectureModel }) {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/12">
        <div className="page-shell flex min-h-20 items-center justify-between gap-6">
          <Link
            href="/#work"
            className="focus-ring inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/64 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Selected work
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">Sharhan</span>
        </div>
      </header>

      <article className="page-shell py-14 sm:py-20 lg:py-28">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/48">
              Project {model.number} · Architecture
            </p>
            <h1 className="mt-5 text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.065em]">
              {model.project}
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink/64 lg:col-span-4">
            {model.summary}
          </p>
        </header>

        <section className="mt-12 border-y border-ink/16 bg-wash px-4 py-8 sm:px-8 sm:py-10 lg:mt-16 lg:px-12 lg:py-14">
          <h2 className="sr-only">System architecture diagram</h2>
          {model.presentation === "vertex-stages" ? (
            <VertexArchitectureDiagram label={model.accessibleLabel} />
          ) : (
            <MermaidDiagram
              chart={model.diagram}
              mobileChart={model.mobileDiagram}
              label={model.accessibleLabel}
            />
          )}
        </section>

        <div className="mt-6 flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
          <span>Current implementation</span>
          <span>System model</span>
        </div>
      </article>
    </main>
  );
}
