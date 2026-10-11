type ArchitectureModelBase = {
  project: string;
  number: string;
  summary: string;
  accessibleLabel: string;
};

type MermaidArchitectureModel = ArchitectureModelBase & {
  diagram: string;
  mobileDiagram: string;
  presentation?: never;
};

type VertexArchitectureModel = ArchitectureModelBase & {
  presentation: "vertex-explorer";
};

export type ArchitectureModel = MermaidArchitectureModel | VertexArchitectureModel;

export const vertexArchitecture: ArchitectureModel = {
  project: "Vertex Harness",
  number: "02",
  presentation: "vertex-explorer",
  summary:
    "A Python-first, repository-local harness for understandable, verifiable and recoverable software work.",
  accessibleLabel:
    "Interactive Vertex Harness architecture showing the audited CLI write path, read-only MCP and dashboard interfaces, guarded workflow and verification services, atomic repository-local state, bounded context, conservative Python indexing and interrupted-work recovery.",
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
