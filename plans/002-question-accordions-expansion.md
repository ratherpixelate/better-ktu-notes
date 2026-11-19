# 002 — Smooth Layout Animation on Question Accordions

- **Status**: DONE
- **Commit**: a96012a
- **Severity**: MEDIUM
- **Category**: Preventing a jarring change & Interruptibility
- **Estimated scope**: 1 file (`src/styles/globals.css`)

## Problem

At the bottom of every note page (e.g. `PCITT302 · Module 1`), there is a "Likely Exam Questions & Answers" accordion section (`<details class="q"><summary>...</summary><div class="ans">...</div></details>`). When a student clicks a question, the answer `.ans` snaps into the DOM instantly with an abrupt layout shift, pushing the surrounding content downward with a hard jump.

```css
/* src/styles/globals.css:2488 — current */
details.q {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  margin: 10px 0;
  transition: background-color 150ms var(--ease-smooth), border-color 150ms var(--ease-smooth);
}
details.q summary {
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14.5px;
  line-height: 1.45;
  color: var(--fg);
  user-select: none;
}
details.q[open] summary {
  border-bottom: 1px solid var(--border);
}
details.q .ans {
  padding: 12px 16px 14px;
  font-size: 14.5px;
  color: var(--fg-secondary);
  line-height: 1.6;
}
```

## Target

Animate the question expansion smoothly using CSS `@starting-style` and keyframe opacity/transform transition, keeping the animation under 240ms budget. When clicked, `.ans` transitions in with an opacity fade (`0 → 1`) and a subtle `translateY(-4px) → 0` micro-motion, eliminating the jarring jump while keeping content reading instant.

```css
/* target in src/styles/globals.css */
@keyframes ansIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

details.q[open] .ans {
  animation: ansIn 200ms var(--ease-out) both;
  will-change: opacity, transform;
}

@media (prefers-reduced-motion: reduce) {
  details.q[open] .ans {
    animation: none !important;
  }
}
```

## Repo conventions to follow

- Out easing token: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);`
- Smooth easing token: `--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);`
- Existing accordion selectors: `details.q`, `details.q summary`, `details.q .ans` at lines 2488–2520 of `globals.css`

## Steps

1. In `src/styles/globals.css`:
   Add `@keyframes ansIn` with `opacity: 0` / `translateY(-4px)` to `opacity: 1` / `translateY(0)`.
   Apply `animation: ansIn 200ms var(--ease-out) both` to `details.q[open] .ans`.
   Add reduced-motion override in `@media (prefers-reduced-motion: reduce)`.

## Boundaries

- Do NOT alter the HTML markup inside `content/notes-html/*.html` or convert `<details>` to custom JavaScript state.
- Keep duration strictly at 200ms (inside the 300ms budget).

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**:
  - Open `/notes/coa-module-1/`. Scroll to "Likely Exam Questions & Answers".
  - Click on a question summary. The answer unfolds with smooth opacity and 4px settle without tearing.
  - Close and re-open rapidly: confirming no jumpy keyframe glitch.
  - Enable `prefers-reduced-motion`: opens instantly with no transform.
- **Done when**: Clicking question accordions reveals answers with a crisp 200ms transition instead of an instant snap.
