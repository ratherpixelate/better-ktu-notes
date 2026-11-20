'use client';

import { useEffect, useState, useRef } from 'react';

export interface TocItem {
  id: string;
  title: string;
  group?: string;
}

interface TableOfContentsProps {
  moduleCode: string;
  items: TocItem[];
  revisedTopics: Record<string, boolean>;
  totalTopics: number;
}

export function TableOfContents({
  moduleCode,
  items,
  revisedTopics,
  totalTopics,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const tocListRef = useRef<HTMLUListElement>(null);
  const readingBarRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  const isClickScrollingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep activeIdRef updated
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  // Centering helper for mobile horizontal pill bar
  const centerPill = (id: string, smooth: boolean = true) => {
    if (!tocListRef.current) return;
    const activeLink = tocListRef.current.querySelector(`a[href="#${id}"]`) as HTMLElement;
    if (activeLink) {
      const list = tocListRef.current;
      const target = activeLink.offsetLeft - (list.clientWidth / 2) + (activeLink.offsetWidth / 2);
      list.scrollTo({
        left: Math.max(0, target),
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  // Instant click feedback & auto-scroll
  const handlePillClick = (id: string) => {
    activeIdRef.current = id;
    setActiveId(id);
    if (window.matchMedia('(max-width: 899px)').matches) {
      centerPill(id, true);
    }

    // Lock spy during smooth-scroll transition so intermediate sections do not flicker
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);
  };

  // Viewport-aware scroll spy & real-time GPU reading progress
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // 1. Update reading progress indicator (GPU-accelerated, zero React re-renders)
      if (readingBarRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        readingBarRef.current.style.transform = `scaleX(${progress})`;
      }

      // If user recently clicked a pill, skip spy until smooth scroll settles
      if (isClickScrollingRef.current) return;

      if (!items || items.length === 0) return;

      // 2. Bottom of document check
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      let currentId = items[0].id;

      if (isBottom) {
        currentId = items[items.length - 1].id;
      } else {
        // Trigger when section top enters upper 35% of viewport (capped at 260px)
        const triggerPoint = Math.max(120, Math.min(window.innerHeight * 0.35, 260));
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
              currentId = item.id;
            }
          }
        }
      }

      // 3. Update active pill and center in horizontal strip
      if (currentId && currentId !== activeIdRef.current) {
        activeIdRef.current = currentId;
        setActiveId(currentId);

        if (window.matchMedia('(max-width: 899px)').matches) {
          centerPill(currentId, true);
        }
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        handleScroll();
      });
    };

    // Release click lock early on manual user touch / wheel interaction
    const onUserInteraction = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false;
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
    };
  }, [items]);

  const revisedCount = Object.entries(revisedTopics).filter(
    ([key, val]) => Boolean(val) && key !== 't-sheet' && key !== 't-qa'
  ).length;
  const isAllRevised = totalTopics > 0 && revisedCount >= totalTopics;

  return (
    <nav className="toc" aria-label="Module sections">
      <div ref={readingBarRef} className="toc-reading-bar" aria-hidden="true" />
      <p className="brand">{moduleCode}</p>
      <ul ref={tocListRef} id="toclist">
        {items.map((item, idx) => {
          const isDone = item.id !== 't-sheet' && item.id !== 't-qa' && !!revisedTopics[item.id];
          const isCurrent = activeId === item.id;
          const showGroup = item.group && (idx === 0 || items[idx - 1].group !== item.group);

          return (
            <span key={item.id} style={{ display: 'contents' }}>
              {showGroup && <li className="grp">{item.group}</li>}
              <li>
                <a
                  href={`#${item.id}`}
                  className={`${isCurrent ? 'on' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => handlePillClick(item.id)}
                >
                  <span>{item.title}</span>
                </a>
              </li>
            </span>
          );
        })}
      </ul>
      <div className={`progress ${isAllRevised ? 'complete' : ''}`}>
        {revisedCount} of {totalTopics} sections revised
        {isAllRevised && <span className="milestone-check" aria-hidden="true"> ✓</span>}
      </div>
    </nav>
  );
}
