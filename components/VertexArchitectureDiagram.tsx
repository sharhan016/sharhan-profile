import {
  ArrowDown,
  ArrowRight,
  Bot,
  BookOpen,
  Database,
  FileText,
  FolderGit2,
  GitBranch,
  Monitor,
  Network,
  PanelTop,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  SquareTerminal,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Fragment } from "react";
import {
  vertexArchitectureLayout,
  type VertexArchitectureIcon,
  type VertexArchitectureItem,
} from "@/data/architectures";

const iconByName: Record<VertexArchitectureIcon, LucideIcon> = {
  agent: Bot,
  browser: Monitor,
  cli: SquareTerminal,
  context: Network,
  dashboard: PanelTop,
  index: Search,
  ledger: BookOpen,
  mcp: GitBranch,
  model: FileText,
  recovery: RotateCcw,
  repository: FolderGit2,
  store: Database,
  user: UserRound,
  verification: ShieldCheck,
  workflow: Settings2,
};

function ComponentRow({ item }: { item: VertexArchitectureItem }) {
  const Icon = iconByName[item.icon];

  return (
    <li className="grid min-h-20 grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-3 border border-ink/16 bg-paper/35 px-3 py-3.5">
      <Icon className="size-5 stroke-[1.5] text-ink/76" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[13px] font-medium leading-4 tracking-[-0.015em] text-ink">{item.title}</p>
        <p className="mt-1 text-[11px] leading-[1.45] text-ink/58">{item.description}</p>
      </div>
    </li>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <li className="flex min-h-16 items-center justify-center gap-3 text-center xl:min-h-0 xl:flex-col xl:gap-2">
      <span className="max-w-28 font-mono text-[9px] uppercase leading-[1.45] tracking-[0.08em] text-ink/52">
        {label}
      </span>
      <ArrowDown className="size-4 stroke-[1.4] text-ink/48 xl:hidden" aria-hidden="true" />
      <ArrowRight className="hidden size-4 stroke-[1.4] text-ink/48 xl:block" aria-hidden="true" />
    </li>
  );
}

export function VertexArchitectureDiagram({ label }: { label: string }) {
  return (
    <figure aria-label={label}>
      <ol className="grid items-stretch gap-0 xl:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)_4rem_minmax(0,1fr)_4rem_minmax(0,1fr)_4rem_minmax(0,1fr)]">
        {vertexArchitectureLayout.stages.map((stage, index) => (
          <Fragment key={stage.number}>
            <li
              data-architecture-stage={stage.number}
              className="flex flex-col border border-ink/24 bg-paper/20 p-4 sm:p-5 xl:min-h-[34rem]"
            >
              <header className="border-b border-ink/12 pb-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/48">
                  {stage.number} · {stage.label}
                </p>
                <h3 className="mt-3 text-xl leading-none tracking-[-0.035em] text-ink xl:text-[1.05rem] 2xl:text-xl">
                  {stage.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-ink/54">{stage.subtitle}</p>
              </header>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                {stage.items.map((item) => <ComponentRow key={item.title} item={item} />)}
              </ul>
            </li>
            {index < vertexArchitectureLayout.connectors.length ? (
              <Connector label={vertexArchitectureLayout.connectors[index]} />
            ) : null}
          </Fragment>
        ))}
      </ol>

      <section className="relative mt-8 border border-dashed border-ink/28 px-4 pb-4 pt-8 sm:px-5 sm:pb-5">
        <h3 className="absolute -top-2.5 left-4 bg-wash px-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/52">
          Supporting capabilities
        </h3>
        <ul className="grid gap-3 lg:grid-cols-3">
          {vertexArchitectureLayout.supporting.map((capability) => {
            const Icon = iconByName[capability.icon];

            return (
              <li
                key={capability.title}
                data-supporting-capability
                className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 border border-ink/16 bg-paper/35 p-4"
              >
                <Icon className="mt-0.5 size-5 stroke-[1.5] text-ink/72" aria-hidden="true" />
                <div>
                  <h4 className="text-sm font-medium tracking-[-0.02em] text-ink">{capability.title}</h4>
                  <ul className="mt-2 grid gap-1.5">
                    {capability.lines.map((line) => (
                      <li key={line} className="text-[11px] leading-[1.5] text-ink/58">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </figure>
  );
}
