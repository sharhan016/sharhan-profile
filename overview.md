# Sharhan Portfolio — Project Overview

This document is the canonical handoff guide for the portfolio. It describes the current website from top to bottom so another coding agent or chatbot can understand the established hierarchy, content, visual language, interactions, architecture, and constraints before making changes.

## 1. Project purpose

This is a premium personal portfolio for **Sharhan**, a senior software engineer based in Bengaluru, India.

The site is intended to communicate quiet technical confidence through:

- editorial composition
- large, carefully spaced typography
- restrained color
- architectural photography
- subtle motion
- clear project and experience narratives
- minimal UI chrome

It should feel like a high-end independent engineer’s portfolio—not a SaaS landing page, résumé template, terminal interface, or neon AI website.

## 2. Technology

- Next.js 16
- TypeScript
- App Router
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Geist Sans and Geist Mono
- Next.js Image

The page uses server components by default. Client components are limited to elements that require motion, scrolling state, or interaction.

## 3. Primary files

```text
app/
├── globals.css              Global design system and responsive styling
├── layout.tsx               Root layout, fonts, and metadata
└── page.tsx                 Top-level page composition

components/
├── About.tsx
├── Capabilities.tsx
├── Contact.tsx
├── Experience.tsx
├── Footer.tsx
├── Hero.tsx
├── Navbar.tsx
├── ProjectVisual.tsx
├── Work.tsx
├── Writing.tsx
└── ui/
    ├── Button.tsx
    ├── Reveal.tsx
    └── SectionLabel.tsx

data/
└── portfolio.ts             Navigation, experience, projects, skills, writing, and links

lib/
└── utils.ts                 Class-name helper

public/
├── sharhan-portrait-v2.png  Active generated hero portrait
└── sharhan-portrait.png     Earlier reference composite; not used by the site

tests/
└── visual_check.py          Browser checks across all required breakpoints
```

## 4. Page hierarchy

The page is one continuous editorial experience in this exact order:

```text
Root layout
├── Fixed navigation
├── Main
│   ├── Hero
│   ├── About
│   ├── Experience
│   ├── Selected Work
│   ├── Engineering / Capabilities
│   ├── Writing / Notes
│   └── Contact
└── Footer
```

The composition is intentionally section-based without relying on repeated rounded cards. Thin borders, background shifts, whitespace, and typography create separation.

## 5. Navigation

Component: `components/Navbar.tsx`

### Desktop layout

- Fixed at the top of the viewport.
- Left: `SHARHAN`
- Right:
  - `WORK` → `#work`
  - `ABOUT` → `#about`
  - `WRITING` → `#writing`
  - `CONTACT` → `#contact`
- Transparent at the top of the page.
- On scroll, it gains:
  - warm paper background with slight transparency
  - backdrop blur
  - subtle bottom border
- Navigation links use a restrained animated underline.

### Mobile layout

- Brand remains on the left.
- Menu icon is on the right.
- Opening the menu reveals four full-width navigation links beneath the bar.
- The menu closes when a destination is selected.
- The trigger exposes proper expanded/collapsed accessibility state.

## 6. Hero

Component: `components/Hero.tsx`

Anchor: `#top`

The hero is the most visually important part of the site.

### Desktop composition

- Minimum height: full viewport.
- Two-column composition at widths of 1024 px and above.
- Left half contains the typography and actions.
- Right half contains the portrait as an edge-to-edge editorial image rather than a profile card.

### Hero content

Location metadata:

```text
BENGALURU, INDIA
```

Primary heading:

```text
SHARHAN
```

Role:

```text
Software Engineer
```

Introduction:

```text
I build software, AI systems and automation for real-world problems.
```

Actions:

- `VIEW WORK` → `#work`
- `GET IN TOUCH` → `#contact`

Supporting desktop metadata:

- `SCROLL TO EXPLORE`
- right-side vertical metadata: `SOFTWARE / SYSTEMS / AUTOMATION`

### Hero image

Active asset:

```text
public/sharhan-portrait-v2.png
```

The active image was created using:

- the original person photograph as the authoritative identity source
- the supplied approved image as art-direction reference only

The active hero asset is a clean, text-free photographic composition. It preserves the person and recreates the warm architectural setting, directional daylight, hands-in-pockets stance, gray denim shirt, black trousers, and negative space. Website typography is rendered in HTML and is not baked into the image.

Do not replace the active image with `public/sharhan-portrait.png`; that earlier file contains the reference composite and is intentionally unused.

### Hero motion

- staggered metadata, heading, copy, and button entrance
- vertical image reveal using clipping
- subtle image parallax while scrolling
- reduced-motion support

### Mobile composition

- Typography appears first.
- Buttons stack/wrap cleanly.
- Portrait becomes a separate wide image block beneath the text.
- The crop keeps the face prominent and avoids horizontal overflow.

## 7. About

Component: `components/About.tsx`

Anchor: `#about`

Section label:

```text
01 — ABOUT
```

Small thematic metadata:

```text
USEFUL PRODUCTS
RELIABLE SYSTEMS
THOUGHTFUL EXECUTION
```

Primary statement:

```text
I'm a software engineer focused on building useful products and reliable systems.
```

Supporting copy:

```text
My work spans product engineering, backend systems, automation and AI-powered workflows.

I enjoy taking ambiguous problems, understanding the system behind them and turning them into software that actually works.
```

The lead sentence uses oversized editorial typography. The supporting paragraphs form a restrained two-column layout on larger screens.

## 8. Experience

Component: `components/Experience.tsx`

Anchor: `#experience`

Section label:

```text
02 — EXPERIENCE
```

The section uses a spacious editorial timeline/list rather than a traditional résumé table. Each entry has an index, company, role, date range, and location where provided.

### Entries

1. **Logixal Solutions Pvt Ltd**
   - Senior Software Engineer
   - Dec 2024 — Present
   - Bengaluru, India

2. **Ampcome Technologies**
   - Software Engineer
   - Mar 2021 — Oct 2024

3. **Dataviv**
   - Software Engineer
   - Aug 2020 — Feb 2021

4. **De Sparrow Solutions**
   - Software Engineer
   - Nov 2019 — Jun 2020

Rows reveal while scrolling. Company names shift slightly on hover. There are no invented job details, achievements, or metrics.

## 9. Selected Work

Component: `components/Work.tsx`

Visual component: `components/ProjectVisual.tsx`

Anchor: `#work`

This is the primary dark section of the portfolio.

Section label:

```text
03 — SELECTED WORK
```

Section heading:

```text
Systems made
to hold up.
```

Projects alternate between text-first and visual-first layouts on desktop. On mobile, each project becomes a clean vertical sequence.

No fake application screenshots, customer logos, project metrics, or case-study results are used. Project imagery is generated through CSS as abstract, typographic engineering compositions.

### Project 01 — Vertex Harness

Description:

```text
An experimental engineering harness for making coding-agent workflows more reliable, verifiable and recoverable.
```

Technology:

- Python
- MCP
- Agent workflows
- Pytest

Visual motif: concentric system/orbit geometry with the caption `VERIFY / RECOVER`.

### Project 02 — AiNad

Description:

```text
An AI-assisted travel booking workflow around multi-portal flight search, automation, passenger profiles and booking operations.
```

Technology:

- Python
- Playwright
- Tauri
- React
- TypeScript
- Node.js
- Rust

Visual motif: angled route geometry with the caption `SEARCH / ROUTE`.

### Project 03 — LedgerLens

Description:

```text
A multi-tenant banking knowledge assistant demonstrating governed RAG through tenant and role-constrained hybrid retrieval, reranking, citations and grounding checks.
```

Technology:

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- asyncpg
- Alembic
- PostgreSQL
- pgvector
- PyJWT
- pypdf
- React
- TypeScript
- Vite

Sentence Transformers and CrossEncoder reranking are optional rather than mandatory dependencies.

Project URL: `https://ledgerlens.sharhan.dev/`

Visual motif: layered ledger/retrieval geometry with the caption `GOVERN / GROUND`.

### Project 04 — Enterprise E-commerce

Description:

```text
Large-scale Flutter engineering work involving production application development, analytics, QA and enterprise workflows.
```

Technology:

- Flutter
- Firebase
- Analytics

Visual motif: scaled grid/orbit geometry with the caption `SCALE / OPERATE`.

### Project interactions

- image composition scales subtly on hover
- project title shifts slightly
- arrow moves diagonally
- metadata uses understated opacity transitions
- each project reveals while entering the viewport

LedgerLens links to its deployed project. The other projects currently remain non-clickable previews.

## 10. Engineering / Capabilities

Component: `components/Capabilities.tsx`

Anchor: `#capabilities`

Section label:

```text
04 — ENGINEERING / CAPABILITIES
```

The section uses a prominent full-width AI Systems group followed by three editorial columns. It does not use cards, ratings, progress bars, or expertise percentages.

### 01 — AI Systems

- LLM Applications
- Governed RAG
- Agent Workflows
- Automation
- MCP
- Evaluation
- Context & Retrieval
- Hybrid Retrieval
- Reranking
- Grounding & Citations

### 02 — Engineering Practice

- Architecture
- Verification
- Observability
- Testing
- Recovery
- Developer Tooling

### 03 — Product Engineering

- Python
- FastAPI
- Flutter
- React
- Next.js
- TypeScript
- Node.js
- NestJS

### 04 — Backend & Infrastructure

- PostgreSQL
- MongoDB
- Firebase
- Docker
- AWS
- GCP
- CI/CD

Individual capabilities gain a small left inset and muted color on hover.

## 11. Writing / Notes

Component: `components/Writing.tsx`

Anchor: `#writing`

Section label:

```text
05 — WRITING / NOTES
```

Current placeholders:

1. `Building reliable AI agents requires more than a good model.`
2. `Why context engineering matters.`
3. `RAG is a systems problem, not just a vector database.`
4. `Designing software around agents instead of adding agents to software.`

Every item is labeled `DRAFT`. These are intentionally non-clickable placeholders. No article content has been fabricated.

## 12. Contact

Component: `components/Contact.tsx`

Anchor: `#contact`

Background: muted warm clay.

Section label:

```text
06 — CONTACT
```

Headline:

```text
LET'S BUILD
SOMETHING USEFUL.
```

Supporting copy:

```text
If you're working on a difficult product, workflow or automation problem, I'd be interested in hearing about it.
```

CTA:

```text
GET IN TOUCH
```

The email currently points to the placeholder `mailto:hello@example.com` and must be replaced when the real email is supplied.

## 13. Footer

Component: `components/Footer.tsx`

Background: near-black.

Identity block:

```text
SHARHAN
Software Engineer
Bengaluru, India
```

Links:

- LinkedIn
- GitHub
- Email

LinkedIn and GitHub currently use `#`. Email currently uses `mailto:hello@example.com`.

All link values live in `data/portfolio.ts` so they can be replaced centrally without editing the footer component.

The footer also displays the current year and `BUILT WITH CARE`.

## 14. Content source

All repeatable content is centralized in `data/portfolio.ts`:

- `navigation`
- `experience`
- `projects`
- `capabilities`
- `writing`
- `socialLinks`

When changing content, update this file before hardcoding values in presentation components.

Static one-off statements remain inside their relevant section components.

## 15. Visual system

The main design tokens are declared in `app/globals.css`.

### Colors

```text
Paper: #f3f0e9
Wash:  #eae6dd
Ink:   #101112
Clay:  #d5c9b8
```

The dominant experience is warm off-white with near-black text. The photography supplies most of the visual richness. Selected Work uses the inverted dark palette. Contact uses muted clay.

Avoid introducing:

- neon colors
- purple AI gradients
- glassmorphism
- glow effects
- excessive rounded corners
- large decorative blobs
- repeated boxed cards
- generic AI imagery

### Typography

- Primary sans: Geist Sans
- Metadata/technical labels: Geist Mono
- Hero and section headings use tight tracking and compact line height.
- Uppercase is reserved for navigation, labels, metadata, and actions.
- Body copy is deliberately constrained in width.

Important global classes:

- `.page-shell` — centered responsive content width
- `.section-space` — shared responsive vertical spacing
- `.section-label` — numbered monospaced section labels
- `.display-title` — hero name typography
- `.editorial-copy` — oversized About statement
- `.nav-link` — desktop navigation interaction
- `.project-visual` and motif classes — project artwork
- `.focus-ring` — visible keyboard focus

### Borders and surfaces

- Thin, low-opacity borders divide sections and rows.
- Shadows are intentionally avoided.
- Square corners are the default.
- Background changes provide large-scale section rhythm.

## 16. Motion system

Motion is restrained and implemented with Framer Motion.

### Shared reveal

`components/ui/Reveal.tsx` provides reusable viewport-triggered fade-and-rise animation.

### Page load

- navigation fades/slides into place
- hero metadata, heading, copy, and buttons stagger in
- image reveals vertically through a clipping animation

### Scroll

- sections and timeline entries reveal once
- the hero image has subtle vertical parallax
- project case studies reveal with a larger controlled offset

### Hover

- project visuals scale approximately 1.025
- arrows shift diagonally
- titles shift horizontally by a few pixels
- capability labels gain a small inset

### Accessibility

- `prefers-reduced-motion` is honored in JavaScript and CSS
- reduced-motion users do not receive meaningful transforms or long transitions

Do not animate every element or add bouncing/spring-heavy behavior.

## 17. Responsive behavior

The website has been checked at:

- 1440 px
- 1280 px
- 1024 px
- 768 px
- 390 px
- 375 px

### Main responsive decisions

- Hero becomes two columns at 1024 px.
- Navigation switches from menu button to desktop links at 768 px.
- About supporting copy becomes two columns on wider screens.
- Experience rows use a twelve-column desktop grid and stack on mobile.
- Projects alternate direction only on desktop.
- AI Systems spans the full capabilities width; the remaining three capability groups form columns on desktop.
- Contact copy moves into the right half on desktop.
- The global page gutter reduces on small screens.
- Hero and section headings use `clamp()` rather than fixed desktop sizes.
- Horizontal overflow is not permitted.

## 18. Accessibility requirements already implemented

- semantic `header`, `nav`, `main`, `section`, `article`, `footer`, headings, and lists
- one primary `h1`
- ordered heading hierarchy for major content
- descriptive portrait alt text
- accessible mobile menu button and state
- visible keyboard focus indicators
- meaningful link and button labels
- sufficient palette contrast for primary content
- reduced-motion support
- keyboard-accessible navigation and CTAs

Maintain these behaviors when editing components.

## 19. Performance decisions

- The portrait uses Next.js Image.
- The hero image is marked as priority because it appears above the fold.
- Responsive `sizes` are provided.
- AVIF and WebP output formats are enabled in `next.config.ts`.
- Most components remain server components.
- Client-side JavaScript is used only for interactive navigation, motion, and the hero parallax.
- Project artwork is CSS-based rather than loading fabricated screenshots.

## 20. Shared UI primitives

### Button

File: `components/ui/Button.tsx`

Variants:

- `dark`
- `light`
- `line`

Directions:

- `up`
- `down`

Buttons use a restrained vertical hover movement and directional Lucide arrow.

### SectionLabel

File: `components/ui/SectionLabel.tsx`

Provides a consistent numbered label with a short dividing line. It has light and dark modes.

### Reveal

File: `components/ui/Reveal.tsx`

Provides viewport-triggered opacity and vertical movement with optional delay and reduced-motion support.

## 21. Placeholders that still require real values

The following values are intentionally not invented:

- LinkedIn URL
- GitHub URL
- email address
- project URLs
- article URLs or article bodies

Update `socialLinks` in `data/portfolio.ts` when contact URLs are available.

Do not invent:

- employers
- customers
- revenue
- user counts
- awards
- testimonials
- credentials
- years of AI experience
- project metrics
- customer logos
- case-study outcomes

## 22. Running the project

Install dependencies:

```bash
npm install
```

Start development mode:

```bash
npm run dev
```

The default local URL is:

```text
http://localhost:3000
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Run the built site:

```bash
npm run start
```

## 23. Verification

Automated responsive checks are available in `tests/visual_check.py`.

The test checks:

- required sections exist
- hero heading is present
- the portrait loads successfully
- body and document widths do not exceed the viewport
- no browser console or page errors occur
- mobile navigation exposes all four links
- animated section content becomes visible
- screenshots can be captured for every required breakpoint

The most recent verified state passed:

- ESLint
- TypeScript through the Next.js build
- production compilation
- static page generation
- browser rendering at all required widths
- production dependency audit with no known production vulnerabilities

## 24. Rules for future modifications

Before changing the site:

1. Preserve the editorial, quiet, premium direction.
2. Keep the generated portrait as a clean photographic asset; do not bake website text into it.
3. Keep content in `data/portfolio.ts` where practical.
4. Do not convert the page into a collection of cards.
5. Do not add unverified facts, metrics, or achievements.
6. Keep motion restrained and preserve reduced-motion behavior.
7. Verify both desktop and mobile composition after meaningful visual changes.
8. Run lint and production build before handing off changes.
9. Preserve semantic HTML, focus states, contrast, and keyboard access.
10. Update this overview if the hierarchy, content, assets, or architecture changes materially.
