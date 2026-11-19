# Animation Implementation Plans

Prioritized implementation plans authored via the `improve-animations` skill based on Emil Kowalski's motion philosophy.

## Plan Catalog

| Plan | Title | Severity | Category | Target Files | Status |
|---|---|---|---|---|---|
| [001](001-toc-completion-milestone.md) | TOC Module Completion Milestone Animation | MEDIUM | Missed opportunities & Delight | `TableOfContents.tsx`, `globals.css` | DONE |
| [002](002-question-accordions-expansion.md) | Smooth Layout Animation on Question Accordions | MEDIUM | Preventing jarring change | `globals.css` | DONE |
| [003](003-note-page-entrance.md) | Note Page Content Entrance Bridge | LOW | Preventing jarring change & Speed | `globals.css` | DONE |
| [004](004-card-completion-check-pop.md) | Module Card Completion Checkmark Pop | LOW | Physicality & Delight | `ModuleCard.tsx`, `globals.css` | DONE |

## Recommended Execution Order

1. **Plan 001** (`001-toc-completion-milestone.md`): Highest emotional leverage — rewards the student upon revising all 18 topics in a module.
2. **Plan 002** (`002-question-accordions-expansion.md`): Fixes the jarring layout snap when expanding exam practice questions.
3. **Plan 003** (`003-note-page-entrance.md`): Adds a silky 160ms entrance bridge when clicking "Open Notes →".
4. **Plan 004** (`004-card-completion-check-pop.md`): Completes the checkmark pop feedback across home cards and TOC.

## Dependencies

- **None**: All four plans are independent, self-contained, and touch zero external packages.
- Shared tokens: All plans strictly reuse existing motion tokens (`--ease-spring`, `--ease-smooth`, `--ease-out`, `--ease-pop`) defined in `src/styles/globals.css`.
