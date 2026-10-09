export type ArchitectureModel = {
  project: string;
  number: string;
  summary: string;
  accessibleLabel: string;
  diagram: string;
  mobileDiagram: string;
  presentation?: "vertex-stages";
};

export type VertexArchitectureIcon =
  | "agent"
  | "browser"
  | "cli"
  | "context"
  | "dashboard"
  | "index"
  | "ledger"
  | "mcp"
  | "model"
  | "recovery"
  | "repository"
  | "store"
  | "user"
  | "verification"
  | "workflow";

export type VertexArchitectureItem = {
  title: string;
  description: string;
  icon: VertexArchitectureIcon;
};

export const vertexArchitectureLayout = {
  stages: [
    {
      number: "01",
      label: "Users",
      title: "Engineers & Agents",
      subtitle: "Human and tool entry points",
      items: [
        { title: "Engineer", description: "Uses the lifecycle CLI", icon: "user" },
        { title: "Coding agent", description: "Uses read-only MCP tools", icon: "agent" },
        { title: "Local browser", description: "Opens read-only dashboard views", icon: "browser" },
      ],
    },
    {
      number: "02",
      label: "Interfaces",
      title: "Controlled Access",
      subtitle: "Lifecycle and read-only interfaces",
      items: [
        { title: "Vertex CLI", description: "Lifecycle commands", icon: "cli" },
        { title: "MCP server", description: "Read-only tools", icon: "mcp" },
        { title: "Loopback dashboard", description: "Read-only views", icon: "dashboard" },
      ],
    },
    {
      number: "03",
      label: "Execution",
      title: "Workflow & Verification",
      subtitle: "Application services",
      items: [
        { title: "Workflow service", description: "Task and evidence workflow", icon: "workflow" },
        { title: "Executable verification", description: "Checks the target repository", icon: "verification" },
        { title: "Conservative Python indexer", description: "Indexes symbols and imports", icon: "index" },
      ],
    },
    {
      number: "04",
      label: "Repository state",
      title: "Local Project State",
      subtitle: "Repository-local storage",
      items: [
        { title: "Task and evidence model", description: "Tasks, checks and evidence", icon: "model" },
        { title: "Atomic project store", description: "Atomic repository-local state", icon: "store" },
        { title: "Target repository", description: "Source under verification", icon: "repository" },
        { title: "Source index", description: "Symbols and imports", icon: "index" },
      ],
    },
    {
      number: "05",
      label: "Evidence & recovery",
      title: "Understandable Work",
      subtitle: "Inspect, understand and resume",
      items: [
        { title: "Project ledger", description: "Tasks, checks and evidence", icon: "ledger" },
        { title: "Context and projections", description: "Bounded read projections", icon: "context" },
        { title: "Interrupted-work recovery", description: "Resumes from stored state", icon: "recovery" },
      ],
    },
  ] satisfies Array<{
    number: string;
    label: string;
    title: string;
    subtitle: string;
    items: VertexArchitectureItem[];
  }>,
  connectors: ["Commands & requests", "Lifecycle operations", "Verified state", "Evidence & context"],
  supporting: [
    {
      title: "Read-only context",
      icon: "context" as const,
      lines: [
        "Coding agent → MCP server → context and projections",
        "Local browser → loopback dashboard → context and projections",
        "Context → project ledger / source index",
      ],
    },
    {
      title: "Verification & indexing",
      icon: "verification" as const,
      lines: [
        "Vertex CLI → executable verification → target repository / atomic project store",
        "Vertex CLI → conservative Python indexer → target repository / source index",
      ],
    },
    {
      title: "Recovery path",
      icon: "recovery" as const,
      lines: ["Vertex CLI → interrupted-work recovery → atomic project store"],
    },
  ],
};

export const vertexArchitecture: ArchitectureModel = {
  project: "Vertex Harness",
  number: "02",
  presentation: "vertex-stages",
  summary:
    "A Python-first toolkit for making long-running software work understandable, verifiable and recoverable.",
  accessibleLabel:
    "Vertex Harness architecture showing engineers and coding agents using the CLI and read-only interfaces, workflow and executable verification, repository-local state, evidence, context, indexing and interrupted-work recovery.",
  diagram: `flowchart TB
    subgraph Actors["01 · Engineer / Coding Agent"]
      Engineer["Engineer"]
      Agent["Coding agent"]
      Browser["Local browser"]
    end

    subgraph Interfaces["02 · Interfaces"]
      CLI["Vertex CLI<br/>lifecycle commands"]
      MCP["MCP server<br/>read-only tools"]
      Dashboard["Loopback dashboard<br/>read-only views"]
    end

    subgraph Services["03 · Workflow & Verification"]
      Workflow["Workflow service"]
      Verification["Executable verification"]
      Indexer["Conservative Python indexer"]
    end

    subgraph Repository["04 · Repository State"]
      Domain["Task and evidence model"]
      Store["Atomic project store"]
      Code["Target repository"]
      Index[("Source index<br/>symbols · imports")]
    end

    subgraph Evidence["05 · Evidence & Recovery"]
      Ledger[("Project ledger<br/>tasks · checks · evidence")]
      Recovery["Interrupted-work recovery"]
      Context["Context and projections"]
    end

    Engineer --> CLI
    Agent --> MCP
    Browser -.-> Dashboard

    CLI --> Workflow
    CLI --> Verification
    Workflow --> Domain --> Store --> Ledger
    Verification --> Store
    Verification --> Code

    CLI -.-> Recovery
    CLI -.-> Indexer
    Recovery -.-> Store
    Indexer -.-> Code
    Indexer -.-> Index
    MCP -. "bounded reads" .-> Context
    Dashboard -. "observational reads" .-> Context
    Context -.-> Ledger
    Context -.-> Index

    classDef supporting fill:#f7f3eb,stroke:#8f887e,color:#363432,stroke-dasharray:4 3;
    class Browser,Dashboard,Indexer,Context supporting`,
  mobileDiagram: `flowchart TB
    Actors["01 · Engineer / Coding Agent<br/>Engineer · coding agent"]
    Interfaces["02 · Interfaces<br/>Vertex CLI · lifecycle commands"]
    Services["03 · Workflow & Verification<br/>Workflow service · executable verification"]
    Repository["04 · Repository State<br/>Task and evidence model · atomic project store<br/>Target repository"]
    Evidence["05 · Evidence & Recovery<br/>Project ledger · tasks · checks · evidence<br/>Interrupted-work recovery"]

    Actors -->|"Engineer → CLI"| Interfaces
    Interfaces -->|"CLI → workflow / verification"| Services
    Services -->|"workflow → model · verification → repository / store"| Repository
    Repository -->|"store → ledger"| Evidence

    subgraph Supporting["Supporting capabilities"]
      direction TB
      ReadOnly["Read-only context<br/>Coding agent → MCP server<br/>Local browser → loopback dashboard<br/>MCP / dashboard → context and projections<br/>Context → project ledger / source index"]
      VerificationPath["Verification path<br/>Executable verification → target repository<br/>Executable verification → atomic project store"]
      Indexing["Source indexing<br/>Vertex CLI → conservative Python indexer<br/>Indexer → target repository / source index"]
      RecoveryPath["Recovery path<br/>Vertex CLI → interrupted-work recovery<br/>Recovery → atomic project store"]
      ReadOnly ~~~ VerificationPath ~~~ Indexing ~~~ RecoveryPath
    end

    Evidence ~~~ Supporting

    classDef supporting fill:#f7f3eb,stroke:#8f887e,color:#363432,stroke-dasharray:4 3;
    class ReadOnly,VerificationPath,Indexing,RecoveryPath supporting`,
};

export const ainadArchitecture: ArchitectureModel = {
  project: "AiNad",
  number: "04",
  summary:
    "A voice-first desktop assistant that transcribes, understands and executes supported low-risk work through an application-owned browser.",
  accessibleLabel:
    "AiNad architecture showing the React and Tauri desktop, speech and intent processing, safety controls, Playwright automation, portal access, flight search and extraction, portal selection, customer information entry and the final Book Now human handoff.",
  diagram: `flowchart TB
    User["User<br/>push to talk"]

    subgraph Desktop["01 · Desktop App"]
      direction TB
      Rust["Rust host<br/>hotkey · microphone · supervision"]
      UI["React interface<br/>status · clarification · results"]
      UI <-->|"restricted commands / events"| Rust
    end

    subgraph Processing["02 · Speech & Intent Processing"]
      direction TB
      Speech["Python speech worker<br/>faster-whisper"]
      Backend["Node.js backend<br/>versioned task controller"]
      Intent["Intent boundary<br/>deterministic path · OpenAI fallback"]
      Speech -->|"transcript"| Backend --> Intent
    end

    subgraph Safety["03 · Decision & Safety Controls"]
      direction TB
      Policy["Consequence policy<br/>confirmation · freshness · cancellation"]
      Decision["Decision provider<br/>deterministic choice · Jev"]
      Policy --> Decision
    end

    subgraph Automation["04 · Browser Automation"]
      direction TB
      Runner["Automation controller<br/>observe · act · verify"]
      Browser["Persistent Playwright session<br/>allowlisted portal adapters"]
      Runner --> Browser
    end

    subgraph Portals["05 · External Flight Portals"]
      direction TB
      Portal["Flight portal session<br/>Alhind search implemented"]
      Access["Portal access checkpoint<br/>password · OTP · CAPTCHA"]
      Search["Flight search inputs<br/>entered in portal"]
      Results["Flight results<br/>extracted from portals"]
      Selection["User selects<br/>booking portal"]
      Customer["Customer information<br/>entered in selected portal"]
      BookNow["Book Now<br/>human handoff"]

      Portal -->|"credential boundary"| Access
      Access -->|"challenge completed"| Search
      Search --> Results --> Selection --> Customer --> BookNow
    end

    User --> Rust
    Rust -->|"temporary WAV"| Speech
    Intent --> Policy
    Decision --> Runner
    Browser --> Portal

    Rust <-. "versioned JSONL" .-> Backend
    Results -. "observations / typed fares" .-> Runner
    Runner -.-> Backend

    classDef supporting fill:#f7f3eb,stroke:#8f887e,color:#363432,stroke-dasharray:4 3;
    class Access,Selection,BookNow supporting`,
  mobileDiagram: `flowchart TB
    User["User · push to talk"]

    subgraph Desktop["01 · Desktop App"]
      direction TB
      Rust["Rust host<br/>hotkey · microphone · supervision"]
      UI["React interface<br/>status · clarification · results"]
      UI <-->|"restricted Tauri commands / events"| Rust
    end

    subgraph Processing["02 · Speech & Intent Processing"]
      direction TB
      Speech["Python speech worker<br/>faster-whisper"]
      Backend["Node.js backend<br/>versioned task controller"]
      Intent["Intent boundary<br/>deterministic path · OpenAI fallback"]
      Speech -->|"original-language transcript"| Backend --> Intent
    end

    subgraph Safety["03 · Decision & Safety Controls"]
      direction TB
      Policy["Consequence policy<br/>confirmation · freshness · cancellation"]
      Decision["Decision provider<br/>deterministic choice · Jev"]
      Policy --> Decision
    end

    subgraph Automation["04 · Browser Automation"]
      direction TB
      Runner["Automation controller<br/>observe · act · verify"]
      Browser["Persistent Playwright session<br/>allowlisted portal adapters"]
      Runner --> Browser
    end

    subgraph Portals["05 · External Flight Portals"]
      direction TB
      Portal["Flight portal session<br/>Alhind search implemented"]
      Access["Portal access checkpoint<br/>password · OTP · CAPTCHA"]
      Search["Flight search inputs<br/>entered in portal"]
      Results["Flight results<br/>extracted from portals"]
      Selection["User selects<br/>booking portal"]
      Customer["Customer information<br/>entered in selected portal"]
      BookNow["Book Now<br/>human handoff"]

      Portal -->|"credential boundary"| Access
      Access -->|"challenge completed"| Search
      Search --> Results --> Selection --> Customer --> BookNow
    end

    User --> Rust
    Rust -->|"private temporary WAV"| Speech
    Intent --> Policy
    Decision --> Runner
    Browser --> Portal

    Rust <-. "private versioned JSONL" .-> Backend
    Results -. "fresh observations and typed fares" .-> Runner
    Runner -.-> Backend

    classDef supporting fill:#f7f3eb,stroke:#8f887e,color:#363432,stroke-dasharray:4 3;
    class Access,Selection,BookNow supporting`,
};
