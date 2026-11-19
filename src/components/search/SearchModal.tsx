'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import searchData from '@/../content/search-index.json';

interface SearchItem {
  id: string;
  title: string;
  badge: string;
  url: string;
  chips: string[];
  keywords: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => {
    return new Fuse<SearchItem>(searchData as SearchItem[], {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'keywords', weight: 0.3 },
        { name: 'chips', weight: 0.15 },
        { name: 'badge', weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) {
      return (searchData as SearchItem[]).slice(0, 8);
    }
    return fuse.search(query).map((res) => res.item).slice(0, 12);
  }, [query, fuse]);

  const handleSelect = useCallback(
    (targetUrl: string) => {
      onClose();

      // Check if target is on the current page (in-page hash jump)
      const [targetPath, hash] = targetUrl.split('#');
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname.replace(/\/$/, '');
        const cleanTargetPath = targetPath.replace(/\/$/, '');

        // If already on the same module page, smooth scroll directly to the section
        if (hash && (currentPath.endsWith(cleanTargetPath) || cleanTargetPath.endsWith(currentPath))) {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${hash}`);
            return;
          }
        }
      }

      // Navigate via Next.js router (which automatically prepends basePath in production)
      router.push(targetUrl);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          handleSelect(selected.url);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`search-modal-backdrop ${isOpen ? 'open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global Topic Search"
    >
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any topic, formula, or PYQ... (e.g. 'Booth', 'IEEE', 'Hazard')"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            inputMode="search"
            enterKeyHint="search"
          />
        </div>

        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">
              No topics found matching &quot;<strong>{query}</strong>&quot;.
            </div>
          ) : (
            results.map((item, idx) => (
              <Link
                key={`${item.badge}-${item.id}`}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item.url);
                }}
                className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="result-main">
                  <span className="result-title">{item.title}</span>
                  {item.chips && item.chips.length > 0 && (
                    <div className="result-chips">
                      {item.chips.map((chip, chipIdx) => (
                        <span key={`${chip}-${chipIdx}`} className="result-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="result-badge">{item.badge}</span>
              </Link>
            ))
          )}
        </div>

        <div className="search-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to open</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
