export type ArchitectureNodeKind =
  | "actor"
  | "interface"
  | "service"
  | "state"
  | "artifact"
  | "repository";

export type ArchitectureAuthority = "human" | "write" | "read" | "derived";

export type ArchitectureRelationKind = "command" | "read" | "write" | "verify" | "derive";

export type ArchitectureEvidence = {
  path: string;
  start: number;
  end: number;
  note: string;
};

export type ArchitecturePosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  detail: string;
  kind: ArchitectureNodeKind;
  authority: ArchitectureAuthority;
  icon:
    | "agent"
    | "browser"
    | "cli"
    | "context"
    | "dashboard"
    | "evidence"
    | "index"
    | "model"
    | "recovery"
    | "repository"
    | "store"
    | "user"
    | "verification"
    | "workflow";
  position: ArchitecturePosition;
  evidence: ArchitectureEvidence[];
};

export type ArchitectureEdge = {
  id: string;
  from: string;
  to: string;
  label: string;
  kind: ArchitectureRelationKind;
  path: string;
  evidence: ArchitectureEvidence[];
};

export type ArchitectureView = {
  id: string;
  label: string;
  description: string;
  nodeIds: string[];
  edgeIds: string[];
  defaultNodeId: string;
};

export type ArchitectureGraph = {
  meta: {
    title: string;
    description: string;
    repository: string;
    revision: string;
    width: number;
    height: number;
  };
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  views: ArchitectureView[];
};

export function evidenceUrl(graph: ArchitectureGraph, evidence: ArchitectureEvidence) {
  const lines = evidence.start === evidence.end
    ? `#L${evidence.start}`
    : `#L${evidence.start}-L${evidence.end}`;
  return `${graph.meta.repository}/blob/${graph.meta.revision}/${evidence.path}${lines}`;
}
