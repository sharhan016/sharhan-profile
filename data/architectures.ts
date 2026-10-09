export type ArchitectureModel = {
  project: string;
  number: string;
  summary: string;
  accessibleLabel: string;
  diagram: string;
  mobileDiagram: string;
};

export const vertexArchitecture: ArchitectureModel = {
  project: "Vertex Harness",
  number: "02",
  summary:
    "A Python-first toolkit for making long-running software work understandable, verifiable and recoverable.",
  accessibleLabel:
    "Vertex Harness architecture showing its CLI, read-only MCP and dashboard interfaces, application services, repository state, verification, recovery and source index.",
  diagram: `flowchart LR
    Engineer["Engineer"]
    Agent["Coding agent"]
    Browser["Local browser"]

    subgraph Interfaces["Interfaces"]
      CLI["Vertex CLI<br/>lifecycle commands"]
      MCP["MCP server<br/>read-only tools"]
      Dashboard["Loopback dashboard<br/>read-only views"]
    end

    subgraph Application["Application services"]
      Workflow["Workflow service"]
      Verification["Executable verification"]
      Recovery["Interrupted-work recovery"]
      Context["Context and projections"]
      Indexer["Conservative Python indexer"]
    end

    subgraph Repository["Repository-local state"]
      Domain["Task and evidence model"]
      Store["Atomic project store"]
      Ledger[("Project ledger<br/>tasks · checks · evidence")]
      Index[("Source index<br/>symbols · imports")]
      Code["Target repository"]
    end

    Engineer --> CLI
    Agent --> MCP
    Browser --> Dashboard
    CLI --> Workflow
    CLI --> Verification
    CLI --> Recovery
    CLI --> Indexer
    Workflow --> Domain --> Store --> Ledger
    Verification --> Code
    Verification --> Store
    Recovery --> Store
    Indexer --> Code
    Indexer --> Index
    MCP -. "bounded reads" .-> Context
    Dashboard -. "observational reads" .-> Context
    Context --> Ledger
    Context --> Index`,
  mobileDiagram: `flowchart TB
    People["Engineer · coding agent · local browser"]
    Interfaces["Interfaces<br/>CLI · read-only MCP · loopback dashboard"]
    Services["Application services<br/>workflow · verification · recovery · context"]
    Domain["Task and evidence model"]
    Store["Atomic project store"]
    Ledger[("Project ledger<br/>tasks · checks · evidence")]
    Verification["Executable checks<br/>against the target repository"]
    Indexer["Conservative Python indexer"]
    Index[("Source index<br/>symbols · imports")]

    People --> Interfaces --> Services
    Services --> Domain --> Store --> Ledger
    Services --> Verification --> Store
    Services --> Indexer --> Index`,
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
