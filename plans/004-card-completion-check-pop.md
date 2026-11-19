# 004 — Module Card Completion Checkmark Pop

- **Status**: DONE
- **Commit**: a96012a
- **Severity**: LOW
- **Category**: Physicality & Delight budget
- **Estimated scope**: 2 files (`src/components/home/ModuleCard.tsx`, `src/styles/globals.css`)

## Problem

When a user completes a module, the card status counter on the homepage transitions from e.g. `17/18 completed` to `18/18 completed ✓` with `.card-status.revised`. Today, the checkmark glyph `✓` is appended as plain text, rendering instantly without any visual feedback. In contrast, the TOC sidebar checkmark has a lively spring pop (`checkPop 180ms var(--ease-pop)`).

```tsx
/* src/components/home/ModuleCard.tsx:61 — current */
<div className={`card-status ${isComplete ? 'revised' : ''}`}>
  <span>
    {mounted ? completedCount : 0}/{module.totalTopics} completed{isComplete ? ' ✓' : ''}
  </span>
</div>
```

```css
/* src/styles/globals.css:841 — current */
.card-status.revised {
  color: var(--badge-success);
  font-weight: 600;
}
```

## Target

Wrap the completion checkmark in `<span className="card-check">✓</span>`. Apply `animation: checkPop 180ms var(--ease-pop) both` so when a module reaches completion, the checkmark springs in with the exact same tactile feedback as the TOC sidebar.

```tsx
/* target in src/components/home/ModuleCard.tsx */
<div className={`card-status ${isComplete ? 'revised' : ''}`}>
  <span>
    {mounted ? completedCount : 0}/{module.totalTopics} completed
    {isComplete && <span className="card-check" aria-hidden="true"> ✓</span>}
  </span>
</div>
```

```css
/* target in src/styles/globals.css */
.card-status .card-check {
  display: inline-block;
  color: var(--badge-success);
  font-weight: 700;
  animation: checkPop 180ms var(--ease-pop) both;
  transform-origin: center center;
}

@media (prefers-reduced-motion: reduce) {
  .card-status .card-check {
    animation: none !important;
  }
}
```

## Repo conventions to follow

- Pop easing curve: `--ease-pop: cubic-bezier(0.175, 0.885, 0.32, 1.275);`
- Existing keyframe: `@keyframes checkPop` at `globals.css:1653`
- Green token: `var(--badge-success)` (#10B981)

## Steps

1. In `src/components/home/ModuleCard.tsx`:
   Update the completion render so `{isComplete && <span className="card-check" aria-hidden="true"> ✓</span>}` wraps the checkmark.

2. In `src/styles/globals.css`:
   Add `.card-status .card-check` using `@keyframes checkPop 180ms var(--ease-pop) both` and reduced-motion guard.

## Boundaries

- Do NOT alter card sizing or padding.
- Do NOT add animation to cards that are incomplete (e.g. `0/18 completed` remains static text).

## Verification

- **Mechanical**: `npm run build` passes with zero errors; Playwright test suite passes.
- **Feel check**:
  - In browser localStorage, set `coa-m1-revised` with all 18 topics true.
  - Refresh the hub page (`/`). The checkmark `✓` pops in cleanly with 180ms spring pop.
  - Test `prefers-reduced-motion`: checkmark appears instantly without scale transform.
- **Done when**: Completed module cards render an animated checkmark matching the TOC sidebar physics.
