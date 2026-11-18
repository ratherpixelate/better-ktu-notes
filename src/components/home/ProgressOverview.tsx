'use client';

import { useCourseStats } from '@/hooks/useRevisionProgress';

export function ProgressOverview() {
  const { totalModulesCompleted, totalModules, totalTopicsCompleted, totalTopics, subjects, mounted } = useCourseStats();

  const percentage = totalModules > 0 ? Math.round((totalModulesCompleted / totalModules) * 100) : 0;

  return (
    <section className="progress-card" aria-label="Course revision progress">
      <div className="progress-header">
        <div>
          <span className="progress-badge">Study Tracker</span>
          <h2 className="progress-title">Semester 3 Revision Progress</h2>
        </div>
        <div className="progress-counter">
          <span className="progress-num">{mounted ? totalModulesCompleted : 0}</span>
          <span className="progress-den">/ {totalModules} Modules</span>
        </div>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-fill"
          style={{ width: `${mounted ? percentage : 0}%` }}
        ></div>
      </div>

      <div className="progress-meta">
        <span className="progress-status">
          {mounted && totalTopicsCompleted > 0
            ? `${totalTopicsCompleted} of ${totalTopics} Topics Revised (${percentage}% complete)`
            : 'Select any module below to start tracking topics'}
        </span>
        <div className="progress-subjects">
          {subjects.map((sub) => (
            <span key={sub.code} className="progress-sub-pill">
              <strong>{sub.code}:</strong> {mounted ? sub.completedModules : 0}/{sub.totalModules}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
