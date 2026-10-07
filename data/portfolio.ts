export const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
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
  url?: string;
};

export const projects: PortfolioProject[] = [
  {
    number: "01",
    title: "Vertex Harness",
    description:
      "An experimental engineering harness for making coding-agent workflows more reliable, verifiable and recoverable.",
    technologies: ["Python", "MCP", "Agent workflows", "Pytest"],
    motif: "vertex",
  },
  {
    number: "02",
    title: "AiNad",
    description:
      "An AI-assisted travel booking workflow around multi-portal flight search, automation, passenger profiles and booking operations.",
    technologies: [
      "Python",
      "Playwright",
      "Tauri",
      "React",
      "TypeScript",
      "Node.js",
      "Rust",
    ],
    motif: "route",
  },
  {
    number: "03",
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
    note: "Optional Sentence Transformers / CrossEncoder reranking",
    url: "https://ledgerlens.sharhan.dev/",
  },
  {
    number: "04",
    title: "Enterprise E-commerce",
    description:
      "Large-scale Flutter engineering work involving production application development, analytics, QA and enterprise workflows.",
    technologies: ["Flutter", "Firebase", "Analytics"],
    motif: "commerce",
  },
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

export const writing = [
  "Building reliable AI agents requires more than a good model.",
  "Why context engineering matters.",
  "RAG is a systems problem, not just a vector database.",
  "Designing software around agents instead of adding agents to software.",
];

export const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Email", href: "mailto:hello@example.com" },
];
