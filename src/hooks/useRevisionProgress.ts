'use client';

import { useState, useEffect, useCallback } from 'react';
import curriculum from '@/../content/curriculum.json';

export type RevisionMap = Record<string, boolean>;

export function useRevisionProgress(storageKey?: string) {
  const [revisedTopics, setRevisedTopics] = useState<RevisionMap>({});
  const [mounted, setMounted] = useState(false);

  const loadProgress = useCallback(() => {
    if (!storageKey) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setRevisedTopics(JSON.parse(stored));
      } else {
        setRevisedTopics({});
      }
    } catch (e) {
      console.warn('Failed to parse revision storage', e);
      setRevisedTopics({});
    }
  }, [storageKey]);

  useEffect(() => {
    setMounted(true);
    loadProgress();

    const handleUpdate = () => loadProgress();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('revision-updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('revision-updated', handleUpdate);
    };
  }, [loadProgress]);

  const toggleTopic = useCallback((topicId: string) => {
    if (!storageKey) return;
    setRevisedTopics((prev) => {
      const updated = { ...prev, [topicId]: !prev[topicId] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
        window.dispatchEvent(new Event('revision-updated'));
      } catch (e) {
        console.warn('Failed to save revision storage', e);
      }
      return updated;
    });
  }, [storageKey]);

  const isTopicRevised = useCallback((topicId: string) => {
    return !!revisedTopics[topicId];
  }, [revisedTopics]);

  const completedCount = Object.entries(revisedTopics).filter(
    ([key, val]) => Boolean(val) && key !== 't-sheet' && key !== 't-qa'
  ).length;

  return { revisedTopics, isTopicRevised, toggleTopic, completedCount, mounted };
}

export interface SubjectStats {
  code: string;
  name: string;
  slug: string;
  completedModules: number;
  totalModules: number;
  completedTopics: number;
  totalTopics: number;
}

const defaultTotalModules = curriculum.subjects.reduce((acc, sub) => acc + sub.modules.length, 0);
const defaultTotalTopics = curriculum.subjects.reduce(
  (acc, sub) => acc + sub.modules.reduce((mAcc, m) => mAcc + m.totalTopics, 0),
  0
);

export function useCourseStats() {
  const [stats, setStats] = useState<{
    totalModulesCompleted: number;
    totalModules: number;
    totalTopicsCompleted: number;
    totalTopics: number;
    subjects: SubjectStats[];
  }>({
    totalModulesCompleted: 0,
    totalModules: defaultTotalModules,
    totalTopicsCompleted: 0,
    totalTopics: defaultTotalTopics,
    subjects: [],
  });
  const [mounted, setMounted] = useState(false);

  const calculateStats = useCallback(() => {
    let allCompletedModules = 0;
    let allTotalModules = 0;
    let allCompletedTopics = 0;
    let allTotalTopics = 0;

    const subjectsSummary: SubjectStats[] = curriculum.subjects.map((sub) => {
      let subCompletedModules = 0;
      let subCompletedTopics = 0;
      let subTotalTopics = 0;

      sub.modules.forEach((mod) => {
        subTotalTopics += mod.totalTopics;
        if (mod.status === 'active' && mod.storageKey) {
          try {
            const raw = localStorage.getItem(mod.storageKey);
            const parsed: RevisionMap = raw ? JSON.parse(raw) : {};
            const done = Object.entries(parsed).filter(
              ([k, v]) => Boolean(v) && k !== 't-sheet' && k !== 't-qa'
            ).length;
            subCompletedTopics += done;
            if (done >= mod.totalTopics && mod.totalTopics > 0) {
              subCompletedModules++;
            }
          } catch (e) {}
        }
      });

      allCompletedModules += subCompletedModules;
      allTotalModules += sub.modules.length;
      allCompletedTopics += subCompletedTopics;
      allTotalTopics += subTotalTopics;

      return {
        code: sub.code,
        name: sub.name,
        slug: sub.slug,
        completedModules: subCompletedModules,
        totalModules: sub.modules.length,
        completedTopics: subCompletedTopics,
        totalTopics: subTotalTopics,
      };
    });

    setStats({
      totalModulesCompleted: allCompletedModules,
      totalModules: allTotalModules,
      totalTopicsCompleted: allCompletedTopics,
      totalTopics: allTotalTopics,
      subjects: subjectsSummary,
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    calculateStats();

    const handleUpdate = () => calculateStats();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('revision-updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('revision-updated', handleUpdate);
    };
  }, [calculateStats]);

  return { ...stats, mounted, refresh: calculateStats };
}
