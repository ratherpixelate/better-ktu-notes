'use client';

import { ModuleCard, ModuleData } from './ModuleCard';

interface SubjectSectionProps {
  code: string;
  slug: string;
  name: string;
  category?: string;
  credits?: number;
  modules: ModuleData[];
}

export function SubjectSection({
  code,
  slug,
  name,
  category,
  credits = 4,
  modules,
}: SubjectSectionProps) {
  const activeCount = modules.filter((m) => m.status === 'active').length;

  return (
    <article className="subject-block" id={code.toLowerCase()}>
      <span id={slug} className="subject-anchor-target" aria-hidden="true" />
      <div className="subject-header">
        <div className="subject-meta">
          <span className="subject-code">{code}</span>
          <h2 className="subject-name">{name}</h2>
          {category && <span className="subject-category">{category}</span>}
        </div>
        <div className="subject-badges">
          <span className="subject-count-pill">
            {activeCount} of {modules.length} {activeCount === 1 ? 'Module' : 'Modules'} Ready
          </span>
          <span className="subject-credit">{credits} Credits · KTU 2024 Scheme</span>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map((mod) => (
          <ModuleCard key={mod.num} module={mod} />
        ))}
      </div>
    </article>
  );
}
