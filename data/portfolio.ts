export const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  // { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const experience = [
  {
    company: "Logixal Solutions Pvt Ltd",
    role: "Senior Software Engineer",
    period: "Dec 2024 — Present",
    location: "Bengaluru, India",
  },
  {
    company: "Ampcome Technologies",
    role: "Software Engineer",
    period: "Mar 2021 — Oct 2024",
  },
  {
    company: "Dataviv",
    role: "Software Engineer",
    period: "Aug 2020 — Feb 2021",
  },
  {
    company: "De Sparrow Solutions",
    role: "Software Engineer",
    period: "Nov 2019 — Jun 2020",
  },
];

export type PortfolioProject = {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  motif: string;
  note?: string;
  links?: { label: string; href: string }[];
};

export const projects: PortfolioProject[] = [
  {
    number: "01",
    title: "LedgerLens",
    description:
      "A multi-tenant banking knowledge assistant demonstrating governed RAG through tenant and role-constrained hybrid retrieval, reranking, citations and grounding checks.",
    technologies: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "asyncpg",
      "Alembic",
      "PostgreSQL",
      "pgvector",
      "PyJWT",
      "pypdf",
      "React",
      "TypeScript",
      "Vite",
    ],
    motif: "ledger",
    note: "Built around a synthetic banking-policy corpus; Sentence Transformers / CrossEncoder reranking is optional",
    links: [
      { label: "Live demo", href: "https://ledgerlens.sharhan.dev/" },
      { label: "Source", href: "https://github.com/sharhan016/LedgerLens" },
    ],
  },
  {
    number: "02",
    title: "Vertex Harness",
    description:
      "A Python-first, repository-local development harness for verifiable and recoverable software work, with CLI workflows, durable evidence, repository intelligence, read-only MCP and a local dashboard.",
    technologies: ["Python 3.11+", "Python standard library", "MCP", "Pytest", "Ruff"],
    motif: "vertex",
    note: "Development tool to enhance and audit the development lifecycle of an application",
    links: [{ label: "Source", href: "https://github.com/sharhan016/vertex-harness" }],
  },
  {
    number: "03",
    title: "AiNad",
    description:
      "A voice-first desktop assistant designed to accelerate flight search and booking workflows across portal applications through speech-driven automation.",
    technologies: [
      "Python",
      "faster-whisper",
      "Playwright",
      "Tauri 2",
      "React",
      "TypeScript",
      "Node.js",
      "Rust",
    ],
    motif: "route",
    note: "Designed to enhance the efficiency and speed for flight search and booking in different portal applications",
    links: [{ label: "Source", href: "https://github.com/sharhan016/aiNad" }],
  },
  /* Enterprise E-commerce is intentionally hidden until its portfolio treatment is revisited.
  {
    number: "04",
    title: "Enterprise E-commerce",
    description:
      "Large-scale Flutter engineering work involving production application development, analytics, QA and enterprise workflows.",
    technologies: ["Flutter", "Firebase", "Analytics"],
    motif: "commerce",
  },
  */
];

export const capabilities = [
  {
    title: "AI Systems",
    skills: [
      "LLM Applications",
      "Governed RAG",
      "Agent Workflows",
      "Automation",
      "MCP",
      "Evaluation",
      "Context & Retrieval",
      "Hybrid Retrieval",
      "Reranking",
      "Grounding & Citations",
    ],
  },
  {
    title: "Engineering Practice",
    skills: [
      "Architecture",
      "Verification",
      "Observability",
      "Testing",
      "Recovery",
      "Developer Tooling",
    ],
  },
  {
    title: "Product Engineering",
    skills: [
      "Python",
      "FastAPI",
      "Flutter",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
    ],
  },
  {
    title: "Backend & Infrastructure",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Docker", "AWS", "GCP", "CI/CD"],
  },
];

/* Writing is intentionally hidden until the section is revisited.
export const writing = [
  { title: "Building reliable AI agents requires more than a good model.", topic: "Agent systems" },
  { title: "Why context engineering matters.", topic: "Context" },
  { title: "RAG is a systems problem, not just a vector database.", topic: "Retrieval" },
  { title: "Designing software around agents instead of adding agents to software.", topic: "Architecture" },
];
*/

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sharhan-sathar/" },
  { label: "GitHub", href: "https://github.com/sharhan016" },
  { label: "Email", href: "mailto:sharhan.sathar@gmail.com" },
];
