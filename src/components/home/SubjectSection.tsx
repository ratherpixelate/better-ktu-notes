'use client';

import { ModuleCard, ModuleData } from './ModuleCard';

interface SubjectSectionProps {
  code: string;
  name: string;
  modules: ModuleData[];
}

export function SubjectSection({ code, name, modules }: SubjectSectionProps) {
  return (
    <article className="subject-block" id={code.toLowerCase()}>
      <div className="subject-header">
        <div className="subject-meta">
          <span className="subject-code">{code}</span>
          <h2 className="subject-name">{name}</h2>
        </div>
        <span className="subject-credit">4 Credits · KTU 2024 Scheme</span>
      </div>

      <div className="modules-grid">
        {modules.map((mod) => (
          <ModuleCard key={mod.num} module={mod} />
        ))}
      </div>
    </article>
  );
}
