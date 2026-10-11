import type { ArchitectureGraph } from "@/lib/architecture/model";
import { validateArchitectureGraph } from "@/lib/architecture/validate";

const lifecycleNodeIds = [
  "engineer",
  "cli",
  "workflow",
  "domain",
  "verification",
  "store",
  "evidence",
  "recovery",
  "repository",
];

const intelligenceNodeIds = [
  "agent",
  "browser",
  "mcp",
  "dashboard",
  "context",
  "indexer",
  "store",
  "evidence",
  "source-index",
  "repository",
];

const graph = {
  meta: {
    title: "Vertex Harness system map",
    description:
      "A source-backed map of the lifecycle, verification, recovery and repository-intelligence paths in Vertex Harness.",
    repository: "https://github.com/sharhan016/vertex-harness",
    revision: "cf1382097008518e0909d0a821dabea225a170ad",
    width: 1280,
    height: 820,
  },
  nodes: [
    {
      id: "engineer",
      label: "Engineer",
      eyebrow: "Human authority",
      description: "Defines and operates the work lifecycle.",
      detail:
        "The engineer invokes explicit CLI commands to initialize state, shape tasks, run verification and reconcile interrupted work.",
      kind: "actor",
      authority: "human",
      icon: "user",
      position: { x: 30, y: 100, width: 180, height: 88 },
      evidence: [
        { path: "src/vertex_harness/cli.py", start: 37, end: 179, note: "The complete human-facing command surface." },
      ],
    },
    {
      id: "agent",
      label: "Coding agent",
      eyebrow: "Read-only consumer",
      description: "Requests bounded context and repository queries.",
      detail:
        "Agents consume project status, task context and repository intelligence through an MCP surface that exposes no state-changing tools.",
      kind: "actor",
      authority: "read",
      icon: "agent",
      position: { x: 30, y: 290, width: 180, height: 88 },
      evidence: [
        { path: "src/vertex_harness/agent/mcp.py", start: 19, end: 47, note: "Read-only operating instructions and tool annotations." },
      ],
    },
    {
      id: "browser",
      label: "Local browser",
      eyebrow: "Read-only consumer",
      description: "Observes a loopback-only field ledger.",
      detail:
        "The browser receives status, evidence, context and index projections. Mutation methods are rejected by the HTTP adapter.",
      kind: "actor",
      authority: "read",
      icon: "browser",
      position: { x: 30, y: 480, width: 180, height: 88 },
      evidence: [
        { path: "src/vertex_harness/interfaces/http.py", start: 57, end: 107, note: "GET projections and explicit mutation rejection." },
      ],
    },
    {
      id: "cli",
      label: "Vertex CLI",
      eyebrow: "Audited write path",
      description: "Owns every lifecycle-changing command.",
      detail:
        "The command parser is the controlled entry point for tasks, checks, verification, recovery, indexing, context and observational interfaces.",
      kind: "interface",
      authority: "write",
      icon: "cli",
      position: { x: 260, y: 100, width: 190, height: 88 },
      evidence: [
        { path: "src/vertex_harness/cli.py", start: 37, end: 179, note: "Command registration and dispatch surface." },
        { path: "src/vertex_harness/cli.py", start: 182, end: 205, note: "Central handler dispatch and domain-error boundary." },
      ],
    },
    {
      id: "mcp",
      label: "MCP server",
      eyebrow: "Read-only interface",
      description: "Exposes status, context and index queries.",
      detail:
        "The stdio server advertises only idempotent, non-destructive tools and delegates them to stable application projections.",
      kind: "interface",
      authority: "read",
      icon: "model",
      position: { x: 260, y: 290, width: 190, height: 88 },
      evidence: [
        { path: "src/vertex_harness/agent/mcp.py", start: 25, end: 91, note: "Read-only tool declarations." },
        { path: "src/vertex_harness/agent/mcp.py", start: 208, end: 238, note: "Tool-to-service dispatch." },
      ],
    },
    {
      id: "dashboard",
      label: "Loopback dashboard",
      eyebrow: "Read-only interface",
      description: "Serves observational browser projections.",
      detail:
        "A loopback HTTP adapter renders the field ledger and exposes only GET and HEAD, keeping lifecycle commands outside the dashboard.",
      kind: "interface",
      authority: "read",
      icon: "dashboard",
      position: { x: 260, y: 480, width: 190, height: 88 },
      evidence: [
        { path: "src/vertex_harness/interfaces/http.py", start: 20, end: 50, note: "Loopback binding and server lifecycle." },
        { path: "src/vertex_harness/interfaces/http.py", start: 57, end: 107, note: "Read endpoints and method boundary." },
      ],
    },
    {
      id: "workflow",
      label: "Workflow service",
      eyebrow: "Application service",
      description: "Coordinates task lifecycle operations.",
      detail:
        "WorkflowService translates CLI intent into domain-safe transformations and commits them through the repository-local store.",
      kind: "service",
      authority: "write",
      icon: "workflow",
      position: { x: 510, y: 75, width: 200, height: 88 },
      evidence: [
        { path: "src/vertex_harness/application/workflows.py", start: 16, end: 83, note: "Workflow operations and store boundary." },
      ],
    },
    {
      id: "verification",
      label: "Executable verification",
      eyebrow: "Proof service",
      description: "Runs declared checks and binds their evidence.",
      detail:
        "Verification requires an active task and complete criterion coverage, fingerprints source around each command, and records bounded receipts before completion.",
      kind: "service",
      authority: "write",
      icon: "verification",
      position: { x: 510, y: 245, width: 200, height: 88 },
      evidence: [
        { path: "src/vertex_harness/application/verification.py", start: 39, end: 85, note: "Verification contract and completion gate." },
        { path: "src/vertex_harness/application/verification.py", start: 95, end: 180, note: "Attempt execution, source binding and evidence persistence." },
      ],
    },
    {
      id: "context",
      label: "Bounded context",
      eyebrow: "Derived projection",
      description: "Builds task-oriented packets within a byte budget.",
      detail:
        "Context combines the current task, next action, evidence, checkpoints and index freshness, then fingerprints the bounded packet.",
      kind: "service",
      authority: "derived",
      icon: "context",
      position: { x: 510, y: 435, width: 200, height: 88 },
      evidence: [
        { path: "src/vertex_harness/application/context.py", start: 21, end: 90, note: "Bounded packet composition and fingerprinting." },
      ],
    },
    {
      id: "indexer",
      label: "Python indexer",
      eyebrow: "Conservative analysis",
      description: "Extracts symbols and import relationships.",
      detail:
        "The dependency-free AST indexer reads Python files, records declarations and imports, and refuses a result if the repository changes during extraction.",
      kind: "service",
      authority: "derived",
      icon: "index",
      position: { x: 510, y: 625, width: 200, height: 88 },
      evidence: [
        { path: "src/vertex_harness/intelligence/indexer.py", start: 24, end: 69, note: "Stable repository indexing pass." },
        { path: "src/vertex_harness/intelligence/indexer.py", start: 81, end: 133, note: "Symbol and import extraction." },
      ],
    },
    {
      id: "domain",
      label: "Task & evidence model",
      eyebrow: "Domain rules",
      description: "Owns lifecycle states and completion invariants.",
      detail:
        "Immutable domain values enforce task identity, dependency order, valid transitions, acceptance coverage and verification completeness.",
      kind: "state",
      authority: "write",
      icon: "model",
      position: { x: 785, y: 75, width: 210, height: 88 },
      evidence: [
        { path: "src/vertex_harness/domain/model.py", start: 25, end: 91, note: "Task states, criteria and check contracts." },
        { path: "src/vertex_harness/domain/model.py", start: 147, end: 259, note: "Project aggregate and guarded transitions." },
      ],
    },
    {
      id: "store",
      label: "Atomic project store",
      eyebrow: "Canonical state",
      description: "Persists `.vertex/project.json` by revision.",
      detail:
        "The store serializes the project, receipts, attempts and checkpoints under an exclusive lock, then atomically replaces and syncs the canonical file.",
      kind: "state",
      authority: "write",
      icon: "store",
      position: { x: 785, y: 245, width: 210, height: 88 },
      evidence: [
        { path: "src/vertex_harness/state/store.py", start: 35, end: 78, note: "State shape and repository-local paths." },
        { path: "src/vertex_harness/state/store.py", start: 115, end: 174, note: "Revisioned transaction, lock and atomic replacement." },
      ],
    },
    {
      id: "evidence",
      label: "Evidence & checkpoints",
      eyebrow: "Durable record",
      description: "Retains receipts, attempts and handoff notes.",
      detail:
        "Evidence records commands, criteria, timestamps, outcomes, bounded output and before/after source fingerprints alongside recovery attempts and checkpoints.",
      kind: "artifact",
      authority: "derived",
      icon: "evidence",
      position: { x: 785, y: 435, width: 210, height: 88 },
      evidence: [
        { path: "src/vertex_harness/application/verification.py", start: 151, end: 180, note: "Receipt and attempt persistence." },
        { path: "src/vertex_harness/application/views.py", start: 49, end: 64, note: "Stable evidence projection." },
      ],
    },
    {
      id: "source-index",
      label: "Source index",
      eyebrow: "Generated state",
      description: "Stores provenance-carrying Python intelligence.",
      detail:
        "The generated `.vertex/index.json` records files, symbols, imports, issues and the source hash used to report staleness on every query.",
      kind: "artifact",
      authority: "derived",
      icon: "index",
      position: { x: 785, y: 625, width: 210, height: 88 },
      evidence: [
        { path: "src/vertex_harness/intelligence/store.py", start: 31, end: 72, note: "Atomic index storage and loading." },
        { path: "src/vertex_harness/intelligence/query.py", start: 18, end: 41, note: "Provenance and staleness in query results." },
      ],
    },
    {
      id: "recovery",
      label: "Interrupted-work recovery",
      eyebrow: "Conservative reconciliation",
      description: "Reconciles dead attempts without replay.",
      detail:
        "Recovery refuses to act while a recorded process is alive. Dead attempts become interrupted and their tasks are blocked for explicit side-effect inspection.",
      kind: "service",
      authority: "write",
      icon: "recovery",
      position: { x: 1065, y: 75, width: 185, height: 88 },
      evidence: [
        { path: "src/vertex_harness/application/recovery.py", start: 62, end: 119, note: "Live-process guard and interrupted-attempt reconciliation." },
      ],
    },
    {
      id: "repository",
      label: "Target repository",
      eyebrow: "Work under verification",
      description: "Supplies source and project-defined checks.",
      detail:
        "Vertex discovers tracked and unignored files, fingerprints their paths, modes and contents, and executes verification commands with the repository as working directory.",
      kind: "repository",
      authority: "human",
      icon: "repository",
      position: { x: 1065, y: 245, width: 185, height: 88 },
      evidence: [
        { path: "src/vertex_harness/workspace.py", start: 25, end: 63, note: "Deterministic discovery and content fingerprint." },
        { path: "src/vertex_harness/application/verification.py", start: 113, end: 143, note: "Project-defined command execution in the target repository." },
      ],
    },
  ],
  edges: [
    { id: "engineer-cli", from: "engineer", to: "cli", label: "lifecycle commands", kind: "command", path: "M210 144 H260", evidence: [{ path: "src/vertex_harness/cli.py", start: 37, end: 179, note: "CLI command surface." }] },
    { id: "cli-workflow", from: "cli", to: "workflow", label: "task operations", kind: "command", path: "M450 144 H480 V119 H510", evidence: [{ path: "src/vertex_harness/cli.py", start: 225, end: 255, note: "CLI delegates task operations." }] },
    { id: "workflow-domain", from: "workflow", to: "domain", label: "validated transitions", kind: "write", path: "M710 119 H785", evidence: [{ path: "src/vertex_harness/application/workflows.py", start: 28, end: 83, note: "Workflow constructs and applies domain transitions." }] },
    { id: "domain-store", from: "domain", to: "store", label: "revisioned snapshot", kind: "write", path: "M890 163 V245", evidence: [{ path: "src/vertex_harness/state/store.py", start: 100, end: 134, note: "Domain transforms become revisioned transactions." }] },
    { id: "cli-verification", from: "cli", to: "verification", label: "verify active task", kind: "command", path: "M450 144 H478 V289 H510", evidence: [{ path: "src/vertex_harness/cli.py", start: 114, end: 123, note: "Verification and evidence commands." }] },
    { id: "verification-repository", from: "verification", to: "repository", label: "execute declared checks", kind: "verify", path: "M710 289 H1065", evidence: [{ path: "src/vertex_harness/application/verification.py", start: 113, end: 143, note: "Checks run in the target repository." }] },
    { id: "verification-store", from: "verification", to: "store", label: "persist attempt", kind: "write", path: "M710 300 H785", evidence: [{ path: "src/vertex_harness/application/verification.py", start: 95, end: 130, note: "Attempt is persisted before execution continues." }] },
    { id: "verification-evidence", from: "verification", to: "evidence", label: "bind receipt", kind: "verify", path: "M610 333 V405 H785 V435", evidence: [{ path: "src/vertex_harness/application/verification.py", start: 147, end: 180, note: "Source-bound receipt is retained." }] },
    { id: "cli-recovery", from: "cli", to: "recovery", label: "explicit recovery", kind: "command", path: "M355 100 V42 H1158 V75", evidence: [{ path: "src/vertex_harness/cli.py", start: 125, end: 137, note: "Recovery and checkpoint command registration." }] },
    { id: "recovery-store", from: "recovery", to: "store", label: "reconcile or block", kind: "write", path: "M1065 119 H1025 V289 H995", evidence: [{ path: "src/vertex_harness/application/recovery.py", start: 65, end: 119, note: "Recovery updates durable attempt and task state." }] },
    { id: "agent-mcp", from: "agent", to: "mcp", label: "read-only tools", kind: "read", path: "M210 334 H260", evidence: [{ path: "src/vertex_harness/agent/mcp.py", start: 25, end: 91, note: "Read-only MCP tool declarations." }] },
    { id: "mcp-context", from: "mcp", to: "context", label: "bounded context", kind: "read", path: "M450 334 H478 V479 H510", evidence: [{ path: "src/vertex_harness/agent/mcp.py", start: 208, end: 222, note: "MCP delegates context reads." }] },
    { id: "browser-dashboard", from: "browser", to: "dashboard", label: "loopback GET", kind: "read", path: "M210 524 H260", evidence: [{ path: "src/vertex_harness/interfaces/http.py", start: 57, end: 85, note: "Dashboard GET surface." }] },
    { id: "dashboard-context", from: "dashboard", to: "context", label: "context projection", kind: "read", path: "M450 524 H480 V479 H510", evidence: [{ path: "src/vertex_harness/interfaces/http.py", start: 67, end: 83, note: "HTTP projections use application services." }] },
    { id: "context-store", from: "context", to: "store", label: "read current state", kind: "read", path: "M710 479 H748 V289 H785", evidence: [{ path: "src/vertex_harness/application/context.py", start: 31, end: 50, note: "Context reads the project snapshot." }] },
    { id: "context-evidence", from: "context", to: "evidence", label: "select recent proof", kind: "derive", path: "M710 490 H785", evidence: [{ path: "src/vertex_harness/application/context.py", start: 60, end: 79, note: "Evidence and checkpoints are included within budget." }] },
    { id: "context-index", from: "context", to: "source-index", label: "index freshness", kind: "read", path: "M610 523 V585 H890 V625", evidence: [{ path: "src/vertex_harness/application/context.py", start: 141, end: 152, note: "Context reports index age and coverage." }] },
    { id: "cli-indexer", from: "cli", to: "indexer", label: "build index", kind: "command", path: "M355 188 V669 H510", evidence: [{ path: "src/vertex_harness/cli.py", start: 145, end: 157, note: "Index and query commands." }] },
    { id: "indexer-repository", from: "indexer", to: "repository", label: "parse Python source", kind: "read", path: "M710 669 H1028 V289 H1065", evidence: [{ path: "src/vertex_harness/intelligence/indexer.py", start: 24, end: 69, note: "Indexer reads a stable source snapshot." }] },
    { id: "indexer-source-index", from: "indexer", to: "source-index", label: "atomic generated index", kind: "derive", path: "M710 669 H785", evidence: [{ path: "src/vertex_harness/intelligence/store.py", start: 37, end: 54, note: "Index is atomically persisted." }] },
    { id: "mcp-index", from: "mcp", to: "source-index", label: "provenance queries", kind: "read", path: "M355 378 V768 H890 V713", evidence: [{ path: "src/vertex_harness/agent/mcp.py", start: 224, end: 238, note: "MCP query tools delegate to QueryService." }] },
    { id: "dashboard-index", from: "dashboard", to: "source-index", label: "index projection", kind: "read", path: "M450 548 H468 V790 H920 V713", evidence: [{ path: "src/vertex_harness/interfaces/http.py", start: 82, end: 83, note: "Dashboard index endpoint." }] },
  ],
  views: [
    {
      id: "system",
      label: "Whole system",
      description: "Lifecycle commands, read-only consumers, durable proof and repository intelligence together.",
      nodeIds: [
        "engineer", "agent", "browser", "cli", "mcp", "dashboard", "workflow",
        "verification", "context", "indexer", "domain", "store", "evidence",
        "source-index", "recovery", "repository",
      ],
      edgeIds: [
        "engineer-cli", "cli-workflow", "workflow-domain", "domain-store",
        "cli-verification", "verification-repository", "verification-store",
        "verification-evidence", "cli-recovery", "recovery-store", "agent-mcp",
        "mcp-context", "browser-dashboard", "dashboard-context", "context-store",
        "context-evidence", "context-index", "cli-indexer", "indexer-repository",
        "indexer-source-index", "mcp-index", "dashboard-index",
      ],
      defaultNodeId: "store",
    },
    {
      id: "lifecycle",
      label: "Lifecycle & proof",
      description: "How explicit commands become guarded task state, executable checks and recoverable evidence.",
      nodeIds: lifecycleNodeIds,
      edgeIds: [
        "engineer-cli", "cli-workflow", "workflow-domain", "domain-store",
        "cli-verification", "verification-repository", "verification-store",
        "verification-evidence", "cli-recovery", "recovery-store",
      ],
      defaultNodeId: "verification",
    },
    {
      id: "intelligence",
      label: "Repository intelligence",
      description: "How agents and the dashboard read bounded state and conservative Python analysis.",
      nodeIds: intelligenceNodeIds,
      edgeIds: [
        "agent-mcp", "mcp-context", "browser-dashboard", "dashboard-context",
        "context-store", "context-evidence", "context-index", "indexer-repository",
        "indexer-source-index", "mcp-index", "dashboard-index",
      ],
      defaultNodeId: "context",
    },
  ],
} satisfies ArchitectureGraph;

export const vertexArchitectureGraph = validateArchitectureGraph(graph);
