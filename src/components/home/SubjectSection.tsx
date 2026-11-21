'use client';

import { ModuleCard, ModuleData } from './ModuleCard';

interface SubjectSectionProps {
  code: string;
  slug: string;
  name: string;
  credits?: number;
  modules: ModuleData[];
}

export function SubjectSection({
  code,
  slug,
  name,
  credits = 4,
  modules,
}: SubjectSectionProps) {
  return (
    <article className="subject-block" id={code.toLowerCase()}>
      <span id={slug} className="subject-anchor-target" aria-hidden="true" />
      <div className="subject-header">
        <div className="subject-meta">
          <span className="subject-code">{code}</span>
          <h2 className="subject-name">{name}</h2>
        </div>
        <span className="subject-credit">{credits} Credits · KTU 2024 Scheme</span>
      </div>

      <div className="modules-grid">
        {modules.map((mod) => (
          <ModuleCard key={mod.num} module={mod} />
        ))}
      </div>
    </article>
  );
}
