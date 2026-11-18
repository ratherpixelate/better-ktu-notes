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

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = 120;
      let currentId = items[0]?.id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - scrollY <= 0) {
            currentId = item.id;
          }
        }
      }

      if (currentId && currentId !== activeId) {
        setActiveId(currentId);

        // Auto scroll on mobile horizontal pill strip
        if (window.matchMedia('(max-width: 899px)').matches && tocListRef.current) {
          const activeLink = tocListRef.current.querySelector(`a[href="#${currentId}"]`) as HTMLElement;
          if (activeLink) {
            const target = activeLink.offsetLeft - 16;
            if (Math.abs(tocListRef.current.scrollLeft - target) > 80) {
              tocListRef.current.scrollTo({ left: target, behavior: 'smooth' });
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, activeId]);

  const revisedCount = Object.values(revisedTopics).filter(Boolean).length;

  return (
    <nav className="toc" aria-label="Module sections">
      <p className="brand">{moduleCode}</p>
      <ul ref={tocListRef} id="toclist">
        {items.map((item, idx) => {
          const isDone = !!revisedTopics[item.id];
          const isCurrent = activeId === item.id;
          const showGroup = item.group && (idx === 0 || items[idx - 1].group !== item.group);

          return (
            <span key={item.id} style={{ display: 'contents' }}>
              {showGroup && <li className="grp">{item.group}</li>}
              <li>
                <a
                  href={`#${item.id}`}
                  className={`${isCurrent ? 'on' : ''} ${isDone ? 'done' : ''}`}
                >
                  <span>{item.title}</span>
                </a>
              </li>
            </span>
          );
        })}
      </ul>
      <div className="progress">
        {revisedCount} of {totalTopics} sections revised
      </div>
    </nav>
  );
}
