'use client';

interface RevisionCheckboxProps {
  topicId: string;
  isRevised: boolean;
  onToggle: (topicId: string) => void;
}

export function RevisionCheckbox({ topicId, isRevised, onToggle }: RevisionCheckboxProps) {
  return (
    <label className="rev" htmlFor={`rev-${topicId}`}>
      <input
        className="rev"
        type="checkbox"
        id={`rev-${topicId}`}
        checked={isRevised}
        onChange={() => onToggle(topicId)}
        aria-label={`Mark topic as revised`}
      />
      <span>{isRevised ? 'revised ✓' : 'revised'}</span>
    </label>
  );
}
