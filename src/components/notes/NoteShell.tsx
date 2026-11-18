'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { TableOfContents, TocItem } from './TableOfContents';
import { useRevisionProgress } from '@/hooks/useRevisionProgress';

interface NoteShellProps {
  moduleCode: string;
  tocItems: TocItem[];
  storageKey: string;
  totalTopics: number;
  children: React.ReactNode;
}

export function NoteShell({
  moduleCode,
  tocItems,
  storageKey,
  totalTopics,
  children,
}: NoteShellProps) {
  const { revisedTopics, toggleTopic } = useRevisionProgress(storageKey);
  const mainRef = useRef<HTMLDivElement>(null);

  // Sync checkboxes with reactive state & listen to changes
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    // 1. Sync checked attribute
    const boxes = main.querySelectorAll<HTMLInputElement>('input.rev');
    boxes.forEach((box) => {
      const secId = box.getAttribute('data-sec') || box.id.replace('r-', 't-');
      if (secId) {
        box.checked = !!revisedTopics[secId];
      }
    });

    // 2. Event listener for user toggling checkbox
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.matches('input.rev')) {
        const secId = target.getAttribute('data-sec') || target.id.replace('r-', 't-');
        if (secId) {
          toggleTopic(secId);
        }
      }
    };

    main.addEventListener('change', handleChange);
    return () => main.removeEventListener('change', handleChange);
  }, [revisedTopics, toggleTopic]);

  return (
    <div className="shell">
      <TableOfContents
        moduleCode={moduleCode}
        items={tocItems}
        revisedTopics={revisedTopics}
        totalTopics={totalTopics}
      />
      <main ref={mainRef} className="notes-main">
        <Link href="/" className="nav-back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>All Modules</span>
        </Link>
        {children}
      </main>
    </div>
  );
}
