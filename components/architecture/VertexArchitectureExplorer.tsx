"use client";

import {
  ArrowDownRight,
  Bot,
  BookCheck,
  Database,
  ExternalLink,
  FileCode2,
  FileText,
  FolderGit2,
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
import { useEffect, useState } from "react";
import { vertexArchitectureGraph as graph } from "@/data/vertex-architecture";
import { evidenceUrl, type ArchitectureNode } from "@/lib/architecture/model";
import styles from "./VertexArchitectureExplorer.module.css";

const iconByName: Record<ArchitectureNode["icon"], LucideIcon> = {
  agent: Bot,
  browser: Monitor,
  cli: SquareTerminal,
  context: Network,
  dashboard: PanelTop,
  evidence: BookCheck,
  index: Search,
  model: FileText,
  recovery: RotateCcw,
  repository: FolderGit2,
  store: Database,
  user: UserRound,
  verification: ShieldCheck,
  workflow: Settings2,
};

const authorityLabel: Record<ArchitectureNode["authority"], string> = {
  human: "Human controlled",
  write: "State changing",
  read: "Read only",
  derived: "Generated projection",
};

const relationLabel = {
  command: "Command",
  read: "Read",
  write: "State write",
  verify: "Verified proof",
  derive: "Derived output",
} as const;

const boundaries = [
  { label: "Actors", x: 15, y: 55, width: 210, height: 555 },
  { label: "Controlled interfaces", x: 240, y: 55, width: 230, height: 555 },
  { label: "Application services", x: 490, y: 30, width: 240, height: 730 },
  { label: "Repository-local state", x: 765, y: 30, width: 250, height: 730 },
  { label: "Target & recovery", x: 1045, y: 30, width: 220, height: 350 },
];

function writeHash(viewId: string, nodeId: string) {
  const url = new URL(window.location.href);
  url.hash = new URLSearchParams({ view: viewId, node: nodeId }).toString();
  window.history.replaceState(null, "", url.toString());
}

export function VertexArchitectureExplorer({ label }: { label: string }) {
  const [viewId, setViewId] = useState(graph.views[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState(graph.views[0].defaultNodeId);

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const requestedView = graph.views.find((view) => view.id === params.get("view"));
      const nextView = requestedView ?? graph.views[0];
      const requestedNode = params.get("node");
      const nextNode = requestedNode && nextView.nodeIds.includes(requestedNode)
        ? requestedNode
        : nextView.defaultNodeId;
      setViewId(nextView.id);
      setSelectedNodeId(nextNode);
    };

    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, []);

  const view = graph.views.find((candidate) => candidate.id === viewId) ?? graph.views[0];
  const visibleNodes = graph.nodes.filter((node) => view.nodeIds.includes(node.id));
  const visibleEdges = graph.edges.filter((edge) => view.edgeIds.includes(edge.id));
  const selectedNode = graph.nodes.find((node) => node.id === selectedNodeId) ?? visibleNodes[0];
  const relatedEdges = visibleEdges.filter(
    (edge) => edge.from === selectedNode.id || edge.to === selectedNode.id,
  );
  const relatedNodeIds = new Set(
    relatedEdges.flatMap((edge) => [edge.from, edge.to]),
  );

  function selectNode(nodeId: string) {
    setSelectedNodeId(nodeId);
    writeHash(view.id, nodeId);
  }

  function selectView(nextViewId: string) {
    const nextView = graph.views.find((candidate) => candidate.id === nextViewId) ?? graph.views[0];
    const nextNodeId = nextView.nodeIds.includes(selectedNodeId)
      ? selectedNodeId
      : nextView.defaultNodeId;
    setViewId(nextView.id);
    setSelectedNodeId(nextNodeId);
    writeHash(nextView.id, nextNodeId);
  }

  return (
    <div className={styles.explorer}>
      <div className="flex flex-col gap-6 border-b border-ink/14 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
            Source-backed system map
          </p>
          <p className="mt-2 text-sm leading-6 text-ink/62">{view.description}</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Architecture views">
          {graph.views.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              aria-pressed={candidate.id === view.id}
              onClick={() => selectView(candidate.id)}
              className={`focus-ring border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${
                candidate.id === view.id
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/18 bg-paper/45 text-ink/58 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {candidate.label}
            </button>
          ))}
        </div>
      </div>

      <figure aria-label={label} className="mt-6">
        <figcaption className="sr-only">{graph.meta.description}</figcaption>

        <div className={`hidden xl:block ${styles.canvasViewport}`}>
          <div className={styles.canvas}>
            {boundaries.map((boundary) => (
              <div
                key={boundary.label}
                className={styles.boundary}
                style={{
                  left: `${(boundary.x / graph.meta.width) * 100}%`,
                  top: `${(boundary.y / graph.meta.height) * 100}%`,
                  width: `${(boundary.width / graph.meta.width) * 100}%`,
                  height: `${(boundary.height / graph.meta.height) * 100}%`,
                }}
              >
                <span className={styles.boundaryLabel}>{boundary.label}</span>
              </div>
            ))}

            <svg
              className={styles.edges}
              viewBox={`0 0 ${graph.meta.width} ${graph.meta.height}`}
              aria-hidden="true"
            >
              <defs>
                <marker id="vertex-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0 0 8 4 0 8Z" fill="context-stroke" />
                </marker>
              </defs>
              {visibleEdges.map((edge) => {
                const active = edge.from === selectedNode.id || edge.to === selectedNode.id;
                return (
                  <path
                    key={edge.id}
                    d={edge.path}
                    data-kind={edge.kind}
                    markerEnd="url(#vertex-arrow)"
                    className={`${styles.edge} ${active ? styles.edgeActive : styles.edgeDimmed}`}
                  />
                );
              })}
            </svg>

            {visibleNodes.map((node) => {
              const Icon = iconByName[node.icon];
              const active = node.id === selectedNode.id;
              const dimmed = !active && !relatedNodeIds.has(node.id);
              return (
                <button
                  key={node.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${node.label}: ${node.description}`}
                  data-authority={node.authority}
                  onClick={() => selectNode(node.id)}
                  className={`${styles.node} ${active ? styles.nodeActive : ""} ${dimmed ? styles.nodeDimmed : ""}`}
                  style={{
                    left: `${(node.position.x / graph.meta.width) * 100}%`,
                    top: `${(node.position.y / graph.meta.height) * 100}%`,
                    width: `${(node.position.width / graph.meta.width) * 100}%`,
                    height: `${(node.position.height / graph.meta.height) * 100}%`,
                  }}
                >
                  <Icon className={styles.nodeIcon} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className={styles.nodeEyebrow}>{node.eyebrow}</span>
                    <span className={styles.nodeLabel}>{node.label}</span>
                    <span className={styles.nodeDescription}>{node.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 xl:hidden">
          {visibleNodes.map((node, index) => {
            const Icon = iconByName[node.icon];
            const active = node.id === selectedNode.id;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  data-active={active}
                  aria-pressed={active}
                  onClick={() => selectNode(node.id)}
                  className={`focus-ring ${styles.mobileNode} grid h-full w-full grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 border border-ink/16 bg-paper/40 p-4 text-left`}
                >
                  <span className="font-mono text-[9px] text-ink/38">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="flex items-center gap-2 text-sm font-medium tracking-[-0.02em]">
                      <Icon className="size-4 stroke-[1.5]" aria-hidden="true" />
                      {node.label}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-ink/56">{node.description}</span>
                  </span>
                  <ArrowDownRight className="size-3.5 text-ink/38" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ol>
      </figure>

      <div className="mt-8 grid border-y border-ink/16 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
        <section className="py-7 lg:border-r lg:border-ink/16 lg:pr-8" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-[#bb4d2f]/35 bg-[#bb4d2f]/8 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-[#8f3823]">
              {authorityLabel[selectedNode.authority]}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/38">
              {selectedNode.eyebrow}
            </span>
          </div>
          <h3 className="mt-4 text-3xl tracking-[-0.045em] text-ink">{selectedNode.label}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/62">{selectedNode.detail}</p>

          <div className="mt-6">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/42">Source evidence</h4>
            <ul className="mt-3 grid gap-2">
              {selectedNode.evidence.map((source) => (
                <li key={`${source.path}:${source.start}`}>
                  <a
                    href={evidenceUrl(graph, source)}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring group grid gap-1 border-l border-ink/18 py-1 pl-3 transition-colors hover:border-[#bb4d2f]"
                  >
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-ink/62 group-hover:text-ink">
                      {source.path}:{source.start}
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </span>
                    <span className="text-xs leading-5 text-ink/48">{source.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="py-7 lg:pl-8" aria-label={`Relationships for ${selectedNode.label}`}>
          <h3 className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/42">
            Connected paths · {relatedEdges.length}
          </h3>
          <ul className="mt-3 grid gap-2">
            {relatedEdges.map((edge) => {
              const outbound = edge.from === selectedNode.id;
              const otherId = outbound ? edge.to : edge.from;
              const other = graph.nodes.find((node) => node.id === otherId);
              if (!other) return null;
              return (
                <li key={edge.id}>
                  <button
                    type="button"
                    onClick={() => selectNode(other.id)}
                    className="focus-ring grid w-full grid-cols-[auto_minmax(0,1fr)] gap-3 border border-ink/12 bg-paper/35 px-3 py-2.5 text-left transition-colors hover:border-ink/35 hover:bg-paper/70"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#8f3823]">
                      {outbound ? "Out" : "In"}
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-ink">{edge.label}</span>
                      <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.1em] text-ink/42">
                        {relationLabel[edge.kind]} · {other.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.13em] text-ink/42">
        <div className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Relationship legend">
          <span>— Command / write</span>
          <span>– – Read only</span>
          <span>··· Derived</span>
          <span className="text-[#8f3823]">— Verified proof</span>
        </div>
        <a
          href={`${graph.meta.repository}/tree/${graph.meta.revision}`}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-1.5 text-ink/55 transition-colors hover:text-ink"
        >
          Source · {graph.meta.revision.slice(0, 7)}
          <FileCode2 className="size-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
