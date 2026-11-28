# BetterKTUNotes

Exam-focused study notes for the **KTU 2024 Scheme, Semester 3**. Every page is built from the official syllabus, past question papers, and standard textbook references — written to be read on a phone the night before the exam.

**[→ Open the site](https://ratherpixelate.github.io/better-ktu-notes/)**

---

## What's covered

| Subject | Code | Modules live | Topics |
| :--- | :--- | :---: | :---: |
| Computer Organisation & Architecture | PCITT302 | 4 / 4 | 48 |
| Data Structures | PCITT303 | 2 / 4 | 30 |
| Database Management Systems | PBITT304 | 4 / 4 | 41 |
| Digital Electronics & Logic Design | GAEST305 | 3 / 4 | 32 |
| **Total** | | **13 / 16** | **151** |

Each module page includes:

- Syllabus-aligned topic sections with revision checkboxes
- Past paper questions mapped to the sections they test
- Worked numericals, algorithm traces, and comparison tables
- Expandable Q&A for likely exam questions with model answers

## How it's built

| Layer | Stack |
| :--- | :--- |
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript, React 19 |
| Search | Fuse.js — 176 indexed topics, `Ctrl+K` / `⌘K` |
| Styling | Hand-written CSS, no component library |
| Testing | Playwright, 11 E2E tests |
| Hosting | GitHub Pages via GitHub Actions CI/CD |
| Analytics | Cloudflare Web Analytics (cookie-free) |

The site is fully static — no server, no database, no login. `npm run build` outputs plain HTML into `out/` and the deploy workflow pushes it to Pages on every commit to `main`.

## Project structure

```
better-ktu-notes/
├── content/
│   ├── curriculum.json          # Syllabus metadata for all modules
│   ├── search-index.json        # Fuse.js search corpus
│   ├── toc-data.json            # Table of contents per module
│   └── notes-html/              # Static HTML content for each module
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, metadata, fonts
│   │   ├── page.tsx             # Home — progress dashboard
│   │   └── notes/[slug]/page.tsx
│   ├── components/
│   │   ├── home/                # ModuleCard, ProgressOverview, SubjectSection
│   │   ├── layout/              # Navbar, Footer
│   │   ├── notes/               # NoteShell, TableOfContents, RevisionCheckbox
│   │   └── search/              # SearchModal
│   ├── hooks/                   # useRevisionProgress, useTheme
│   └── styles/globals.css       # All styles — tokens, layout, typography
├── tests/e2e.spec.ts            # Playwright end-to-end suite
├── public/                      # Static assets, sitemap, redirects
└── .github/workflows/deploy.yml # CI/CD pipeline
```

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server on http://localhost:3000
npm run dev

# Production build (outputs to ./out)
npm run build

# Run the E2E test suite
npx playwright test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new modules and submitting changes.
