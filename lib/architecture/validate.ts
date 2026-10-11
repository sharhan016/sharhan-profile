import type { ArchitectureGraph } from "@/lib/architecture/model";

function assertUnique(values: string[], subject: string) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length > 0) {
    throw new Error(`${subject} contains duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
  }
}

export function validateArchitectureGraph(graph: ArchitectureGraph) {
  if (!/^[0-9a-f]{40}$/.test(graph.meta.revision)) {
    throw new Error("Architecture repository revision must be a full Git commit SHA.");
  }

  const nodeIds = graph.nodes.map((node) => node.id);
  const edgeIds = graph.edges.map((edge) => edge.id);
  const viewIds = graph.views.map((view) => view.id);
  const knownNodes = new Set(nodeIds);
  const knownEdges = new Set(edgeIds);

  assertUnique(nodeIds, "Architecture nodes");
  assertUnique(edgeIds, "Architecture edges");
  assertUnique(viewIds, "Architecture views");

  for (const node of graph.nodes) {
    const { x, y, width, height } = node.position;
    if (x < 0 || y < 0 || width <= 0 || height <= 0
      || x + width > graph.meta.width || y + height > graph.meta.height) {
      throw new Error(`Node ${node.id} lies outside the architecture canvas.`);
    }
    validateEvidence(node.evidence, `Node ${node.id}`);
  }

  for (const edge of graph.edges) {
    if (!knownNodes.has(edge.from) || !knownNodes.has(edge.to)) {
      throw new Error(`Edge ${edge.id} references an unknown node.`);
    }
    if (!edge.path.trim().startsWith("M")) {
      throw new Error(`Edge ${edge.id} must define an SVG path beginning with M.`);
    }
    validateEvidence(edge.evidence, `Edge ${edge.id}`);
  }

  for (const view of graph.views) {
    if (!knownNodes.has(view.defaultNodeId) || !view.nodeIds.includes(view.defaultNodeId)) {
      throw new Error(`View ${view.id} has an invalid default node.`);
    }
    for (const nodeId of view.nodeIds) {
      if (!knownNodes.has(nodeId)) throw new Error(`View ${view.id} references unknown node ${nodeId}.`);
    }
    for (const edgeId of view.edgeIds) {
      const edge = graph.edges.find((candidate) => candidate.id === edgeId);
      if (!knownEdges.has(edgeId) || !edge
        || !view.nodeIds.includes(edge.from) || !view.nodeIds.includes(edge.to)) {
        throw new Error(`View ${view.id} contains an invalid edge ${edgeId}.`);
      }
    }
  }

  return graph;
}

function validateEvidence(
  evidence: ArchitectureGraph["nodes"][number]["evidence"],
  subject: string,
) {
  for (const source of evidence) {
    if (!source.path || source.start < 1 || source.end < source.start || !source.note) {
      throw new Error(`${subject} contains invalid source evidence.`);
    }
  }
}
