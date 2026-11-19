# 003 — Note Page Content Entrance Bridge

- **Status**: DONE
- **Commit**: a96012a
- **Severity**: LOW
- **Category**: Preventing a jarring change & Speed
- **Estimated scope**: 1 file (`src/styles/globals.css`)

## Problem

When navigating from the homepage (`/`) into any note route (e.g. `/notes/coa-module-1/`), the module card scales down (`scale(0.985)`), and Next.js switches routes. When the note page mounts, thousands of words of dense technical text, formulas, diagrams, and section headings pop into the viewport simultaneously with 0ms transition. This creates an abrupt visual jolt.

```css
/* src/styles/globals.css:1691 — current */
main.notes-main {
  min-width: 0;
  max-width: 820px;
}
```

## Target

Introduce a high-speed, sub-200ms entry transition on `main.notes-main`:
Duration: `160ms`
Easing: `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`)
Transform: `translateY(4px) → translateY(0)`
Opacity: `0 → 1`
This grounds the page arrival smoothly without delaying the student from reading (strictly respects Emil Kowalski's rule: "Data the user is trying to read or act on should not move for style").

```css
/* target in src/styles/globals.css */
@keyframes noteEnter {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main.notes-main {
  min-width: 0;
  max-width: 820px;
  animation: noteEnter 160ms var(--ease-out) both;
}

@media (prefers-reduced-motion: reduce) {
  main.notes-main {
    animation: none !important;
  }
}
```

## Repo conventions to follow

- Out easing token: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);`
- Reduced-motion global media query: `globals.css:2529`
- Fast transition budget for content reading: ≤ 160ms

## Steps

1. In `src/styles/globals.css`:
   Add `@keyframes noteEnter` (`translateY(4px)` and `opacity: 0` to `translateY(0)` and `opacity: 1`).
   Add `animation: noteEnter 160ms var(--ease-out) both` to `main.notes-main`.
   Add reduced-motion override.

## Boundaries

- Do NOT animate individual topic sections separately (staggering thousands of words of content hinders reading).
- Do NOT animate the sticky TOC sidebar (sidebar navigation must remain instantly anchored for orientation).
- Do NOT exceed 160ms.

## Verification

- **Mechanical**: `npm run build` succeeds; static export contains `noteEnter` keyframes.
- **Feel check**:
  - Click "Open Notes →" on COA Module 1.
  - The note content enters with a silky, almost imperceptible 160ms fade-up (4px). The transition feels instantaneous yet soft, removing the harsh pop.
  - Test on mobile viewport: content displays cleanly without overflow or horizontal jitter.
  - In DevTools set playback to 10%: confirm `translateY` travels only 4px and settles smoothly without bounce.
- **Done when**: Opening any note route arrives without visual page snap.
