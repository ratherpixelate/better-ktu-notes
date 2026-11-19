# 001 — TOC Module Completion Milestone Animation

- **Status**: DONE
- **Commit**: a96012a
- **Severity**: MEDIUM
- **Category**: Missed opportunities & Delight budget
- **Estimated scope**: 2 files (`src/components/notes/TableOfContents.tsx`, `src/styles/globals.css`)

## Problem

When a student checks off the final topic in a module (e.g. topic 18 of 18 in COA Module 1), reaching 100% revision completion is a rare, high-emotion academic milestone. Today, the TOC sidebar progress counter at `src/components/notes/TableOfContents.tsx:90` silently switches text with zero celebration or state feedback. It sits in plain muted text (`color: var(--fg-muted)`), feeling identical to `5 of 18 sections revised`.

```tsx
/* src/components/notes/TableOfContents.tsx:90 — current */
<div className="progress">
  {revisedCount} of {totalTopics} sections revised
</div>
```

```css
/* src/styles/globals.css:1680 — current */
.toc .progress {
  margin-top: 24px;
  padding: 14px 12px 0;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--fg-muted);
  font-weight: 600;
}
```

## Target

When `revisedCount === totalTopics && totalTopics > 0`, the progress element applies `.complete`. It performs a subtle spring milestone pop (`scale(0.96) → scale(1.025) → scale(1)`), flips color to `var(--badge-success)` (#10B981) with a soft background wash, and pops a completion checkmark glyph using `--ease-pop`.

```css
/* target in src/styles/globals.css */
@keyframes milestonePop {
  0% {
    transform: scale(0.96);
    opacity: 0.85;
  }
  60% {
    transform: scale(1.025);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.toc .progress {
  margin-top: 24px;
  padding: 14px 12px 0;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--fg-muted);
  font-weight: 600;
  transition: color 200ms var(--ease-smooth),
              border-color 200ms var(--ease-smooth),
              background-color 200ms var(--ease-smooth);
}

.toc .progress.complete {
  color: var(--badge-success);
  border-top-color: var(--badge-success);
  animation: milestonePop 260ms var(--ease-spring) both;
  transform-origin: left center;
}

.toc .progress.complete .milestone-check {
  display: inline-block;
  margin-left: 4px;
  animation: checkPop 220ms var(--ease-pop) both;
}

@media (prefers-reduced-motion: reduce) {
  .toc .progress.complete {
    animation: none !important;
  }
  .toc .progress.complete .milestone-check {
    animation: none !important;
  }
}
```

## Repo conventions to follow

- Spring easing token: `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);`
- Pop easing token: `--ease-pop: cubic-bezier(0.175, 0.885, 0.32, 1.275);`
- Exemplar checkmark pop: `.toc a.done::after` at `src/styles/globals.css:1667`
- Reduced-motion accessibility block: `globals.css:2529`

## Steps

1. In `src/components/notes/TableOfContents.tsx`:
   Compute `const isAllRevised = totalTopics > 0 && revisedCount >= totalTopics;`
   Update the progress render:
   ```tsx
   <div className={`progress ${isAllRevised ? 'complete' : ''}`}>
     {revisedCount} of {totalTopics} sections revised
     {isAllRevised && <span className="milestone-check" aria-hidden="true">✓</span>}
   </div>
   ```

2. In `src/styles/globals.css`:
   Add `.toc .progress.complete` styling, `@keyframes milestonePop`, and reduced-motion handling.

## Boundaries

- Do NOT touch the checkbox event logic in `useRevisionProgress.ts`.
- Do NOT add external sound effects, canvas confetti, or blocking modal dialogs.
- Keep the duration under 300ms (260ms spring).

## Verification

- **Mechanical**: `npm run build` passes with zero TypeScript warnings.
- **Feel check**:
  - Open `/notes/coa-module-1/`.
  - Check off sections 1 through 17. The counter reads `17 of 18 sections revised` in muted gray.
  - Check off section 18. The progress bar smoothly springs into emerald green `18 of 18 sections revised ✓` without layout jump.
  - In DevTools Animations panel set speed to 10%: confirm `milestonePop` scales from `0.96` to `1.025` smoothly without overshoot distortion.
  - Emulate `prefers-reduced-motion: reduce`: color transitions smoothly to green, scale transforms are disabled.
- **Done when**: Reaching 18/18 displays an animated celebratory feedback badge in the TOC sidebar.
