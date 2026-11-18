# BetterKTUNotes (`better-ktu-notes`)

A syllabus-aligned, Swiss-minimalist academic revision studio for APJ Abdul Kalam Technological University (KTU) 2024 Scheme (Semester 3).

Built with **Next.js (App Router, Static Export)**, **React 19**, and **TypeScript**.

---

## Live Website

🔗 **[https://ratherpixelate.github.io/better-ktu-notes/](https://ratherpixelate.github.io/better-ktu-notes/)**

---

## Subjects & Syllabus Coverage

Each technical subject follows the 4-module curriculum of the KTU 2024 scheme:

1. **PCITT302: Computer Organisation and Architecture (COA)**
   - Module 1: Basic Structure of Computers & Machine Instructions *(Available)*
   - Module 2: Processor Organization, Datapaths & Pipelining *(Available)*
   - Module 3: Memory Hierarchy & Cache Architectures *(Drafting)*
   - Module 4: Parallel Processing & Multicore Architectures *(Drafting)*

2. **PCITT303: Data Structures (DS)**
   - Module 1: Introduction to Data Structures, Arrays & Stacks *(Available)*
   - Module 2: Linked Lists, Queues & Double-Ended Queues *(Drafting)*
   - Module 3: Trees, Binary Search Trees & Traversals *(Drafting)*
   - Module 4: Sorting, Searching & Hashing *(Drafting)*

3. **PBITT304: Database Management Systems (DBMS)**
   - Module 1: Database Design and Creation *(Available)*
   - Module 2: Relational Algebra & SQL Query Processing *(Drafting)*
   - Module 3: Database Normalization & Functional Dependencies *(Drafting)*
   - Module 4: Introduction to NoSQL Concepts & Architecture *(Drafting)*

---

## Key Features

- **Component-Driven Architecture**: Single source-of-truth React components for Navbar, Footer, NoteShell, TOC, and SearchModal.
- **Swiss Monochrome Design**: High-contrast, typography-first academic interface with zero AI-slop gradients or fuzzy glassmorphism.
- **Client-Side Revision Tracker**: Real-time progress tracker with `localStorage` persistence counting revision completion by module per subject.
- **Global Instant Search (`Ctrl+K`)**: Fuzzy keyword search using Fuse.js covering 61 indexed syllabus topics, formulas, algorithms, and PYQ classifications.
- **Static Export & Zero Downtime**: Fully pre-rendered static HTML via `next build` with GitHub Actions deployment to GitHub Pages.
- **Legacy URL Continuity**: Auto-redirects preserve existing student bookmarks and search engine index links.
- **Automated E2E Testing**: Headless Playwright test suite verifying theme toggling, search, revision state, and SVG rendering integrity.

---

## Project Structure

```
better-ktu-notes/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: Automated build & deploy to GitHub Pages
├── content/
│   ├── curriculum.json             # Canonical syllabus metadata for all 12 modules
│   ├── search-index.json           # 61 indexed syllabus topics for instant search
│   ├── toc-data.json               # Table of Contents structure by module
│   └── notes-html/                 # Note content bodies (COA, DS, DBMS)
├── public/
│   ├── robots.txt                  # Search engine crawler instructions
│   ├── sitemap.xml                 # XML sitemap with clean note URLs
│   ├── .nojekyll                   # Bypasses Jekyll on GitHub Pages
│   └── *.html                      # Backward-compatibility redirect files
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML layout, SEO metadata & fonts
│   │   ├── page.tsx                # Revision dashboard & subject portal
│   │   └── notes/[slug]/page.tsx   # Dynamic static note page renderer
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer
│   │   ├── home/                   # ProgressOverview, SubjectSection, ModuleCard
│   │   ├── notes/                  # NoteShell, TableOfContents, RevisionCheckbox
│   │   └── search/                 # SearchModal (Fuse.js)
│   ├── hooks/
│   │   ├── useRevisionProgress.ts  # Reactive localStorage revision state hook
│   │   └── useTheme.ts             # Dark/Light mode theme manager
│   └── styles/
│       └── globals.css             # Swiss editorial design tokens & layout
├── tests/
│   └── e2e.spec.ts                 # Playwright end-to-end test suite
├── next.config.mjs                 # Next.js static export configuration
├── playwright.config.ts            # Playwright test runner configuration
├── package.json
└── tsconfig.json
```

---

## Developer Workflow

### 1. Local Development
```bash
# Install dependencies
npm install

# Start local Next.js dev server at http://localhost:3000
npm run dev
```

### 2. Static Build & Export
```bash
# Build production static export into ./out directory
npm run build
```

### 3. End-to-End Testing (Playwright)
```bash
# Run all E2E tests headlessly
npx playwright test

# Run tests with interactive UI
npx playwright test --ui
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on drafting new syllabus modules, formatting formulas, adding block diagrams, and submitting PRs.
