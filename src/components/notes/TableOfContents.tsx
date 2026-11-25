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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const tocListRef = useRef<HTMLUListElement>(null);
  const readingBarRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>(activeId);
  const isClickScrollingRef = useRef<boolean>(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse drag-to-scroll refs
  const isPointerDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

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

  // Mouse drag-to-scroll event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType === 'touch') return;
    if (!tocListRef.current) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = tocListRef.current.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!isPointerDownRef.current || !tocListRef.current) return;

    const dx = e.clientX - startXRef.current;
    if (!hasDraggedRef.current && Math.abs(dx) > 4) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      tocListRef.current.scrollLeft = startScrollLeftRef.current - dx;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLUListElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}

    isPointerDownRef.current = false;
    if (hasDraggedRef.current) {
      setTimeout(() => {
        hasDraggedRef.current = false;
        setIsDragging(false);
      }, 50);
    } else {
      setIsDragging(false);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Instant click feedback & auto-scroll
  const handlePillClick = (e: React.MouseEvent, id: string) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      return;
    }
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
      // === PHASE 1: BATCHED DOM READS (No style mutations) ===
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const maxScroll = scrollHeight - innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      let currentId = activeIdRef.current;
      let targetScrollLeft: number | null = null;

      if (!isClickScrollingRef.current && items && items.length > 0) {
        // Bottom of document check
        const isBottom = innerHeight + scrollY >= scrollHeight - 60;
        if (isBottom) {
          currentId = items[items.length - 1].id;
        } else {
          // Trigger when section top enters upper 35% of viewport (capped at 260px)
          const triggerPoint = Math.max(120, Math.min(innerHeight * 0.35, 260));
          let candidateId = items[0].id;
          for (const item of items) {
            const el = document.getElementById(item.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerPoint) {
                candidateId = item.id;
              }
            }
          }
          currentId = candidateId;
        }

        // If active section changed, read pill dimensions for centering BEFORE any writes
        if (
          currentId !== activeIdRef.current &&
          window.matchMedia('(max-width: 899px)').matches &&
          tocListRef.current
        ) {
          const activeLink = tocListRef.current.querySelector(`a[href="#${currentId}"]`) as HTMLElement;
          if (activeLink) {
            const list = tocListRef.current;
            targetScrollLeft = Math.max(
              0,
              activeLink.offsetLeft - (list.clientWidth / 2) + (activeLink.offsetWidth / 2)
            );
          }
        }
      }

      // === PHASE 2: BATCHED DOM WRITES (Zero layout invalidation / forced reflow) ===
      if (readingBarRef.current) {
        readingBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (currentId !== activeIdRef.current) {
        activeIdRef.current = currentId;
        setActiveId(currentId);

        if (targetScrollLeft !== null && tocListRef.current) {
          tocListRef.current.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth',
          });
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

    // Initial check: if already scrolled on load, defer check until after first paint to prevent forced reflow
    if (typeof window !== 'undefined' && window.scrollY > 0) {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        handleScroll();
      });
    }

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
      <ul
        ref={tocListRef}
        id="toclist"
        className={isDragging ? 'is-dragging' : ''}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={handleDragStart}
      >
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
                  draggable={false}
                  className={`${isCurrent ? 'on' : ''} ${isDone ? 'done' : ''}`}
                  onClick={(e) => handlePillClick(e, item.id)}
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
