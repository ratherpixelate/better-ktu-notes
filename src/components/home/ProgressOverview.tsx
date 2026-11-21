'use client';

import { useCourseStats } from '@/hooks/useRevisionProgress';

export function ProgressOverview() {
  const { totalModulesCompleted, totalModules, subjects, mounted } = useCourseStats();

  const percentage = totalModules > 0 ? Math.round((totalModulesCompleted / totalModules) * 100) : 0;

  return (
    <section className="progress-card" aria-label="Revision Progress">
      <div className="progress-header">
        <div className="progress-title-wrap">
          <div className="progress-icon" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <h2 className="progress-title">Your Exam Revision Progress</h2>
            <p className="progress-subtitle">Persists automatically in your browser as you revise each topic</p>
          </div>
        </div>
        <div className="progress-score" id="overall-progress-score">
          {mounted ? totalModulesCompleted : 0} of {totalModules} Modules Revised ({mounted ? percentage : 0}%)
        </div>
      </div>

      <div
        className="progress-meter"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="progress-fill"
          id="overall-progress-fill"
          style={{ width: `${mounted ? percentage : 0}%` }}
        />
      </div>

      <div className="progress-breakdown">
        {subjects.map((sub) => {
          const subPct = sub.totalModules > 0 ? Math.round((sub.completedModules / sub.totalModules) * 100) : 0;
          return (
            <a
              key={sub.code}
              href={`#${sub.code.toLowerCase()}`}
              className="breakdown-item"
              title={`Jump to ${sub.name}`}
            >
              <span className="breakdown-name">
                {sub.name} ({sub.slug.toUpperCase()})
              </span>
              <span className="breakdown-val">
                {mounted ? sub.completedModules : 0} / {sub.totalModules} Modules ({mounted ? subPct : 0}%)
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
