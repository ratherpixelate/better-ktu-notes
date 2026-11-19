'use client';

import Link from 'next/link';
import { useRevisionProgress } from '@/hooks/useRevisionProgress';

export interface ModuleData {
  num: number;
  slug: string;
  title: string;
  desc: string;
  status: string;
  storageKey?: string;
  totalTopics: number;
  href: string | null;
}

interface ModuleCardProps {
  module: ModuleData;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const { completedCount, mounted } = useRevisionProgress(module.storageKey);
  const isComplete = mounted && completedCount >= module.totalTopics && module.totalTopics > 0;

  if (module.status !== 'active' || !module.href) {
    return (
      <div className="module-card locked" aria-disabled="true">
        <div>
          <div className="card-top">
            <span className="module-pill" style={{ color: 'var(--fg-muted)', background: 'var(--border)' }}>
              Module {module.num}
            </span>
          </div>
          <h3 className="module-title">{module.title}</h3>
          <p className="module-desc">{module.desc}</p>
        </div>
        <div className="card-footer">
          <div className="card-status pending">
            <span className="status-dot"></span>
            <span>Upcoming Module</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--fg-muted)' }}>
            Drafting
          </span>
        </div>
      </div>
    );
  }

  return (
    <Link href={module.href} className="module-card active-module">
      <div>
        <div className="card-top">
          <span className="module-pill">Module {module.num}</span>
        </div>
        <h3 className="module-title">{module.title}</h3>
        <p className="module-desc">{module.desc}</p>
      </div>
      <div className="card-footer">
        <div className={`card-status ${isComplete ? 'revised' : ''}`}>
          <span>
            {mounted ? completedCount : 0}/{module.totalTopics} completed{isComplete ? ' ✓' : ''}
          </span>
        </div>
        <div className="card-arrow">
          <span>Open Notes</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </Link>
  );
}
