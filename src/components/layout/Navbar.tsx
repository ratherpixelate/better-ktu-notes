'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { SearchModal } from '@/components/search/SearchModal';

interface NavbarProps {
  currentSubject?: string;
  currentModule?: string;
}

export function Navbar({ currentSubject, currentModule }: NavbarProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K / / shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="site-nav">
        <div className="nav-container">
          <Link href="/" className="brand-wrap" aria-label="BetterKTUNotes Home">
            <div className="brand-logo" aria-hidden="true">
              B
            </div>
            <div className="brand-text">
              <span className="brand-title">BetterKTUNotes</span>
              <span className="brand-subtitle">
                {currentSubject ? `${currentSubject} · ${currentModule || 'Notes'}` : '2024 Scheme · S3 Studio'}
              </span>
            </div>
          </Link>

          <div className="nav-actions">
            <button
              className="search-trigger"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search notes (Ctrl+K)"
            >
              <svg
                width="15"
                height="15"
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
              <span>Search topics...</span>
              <kbd>Ctrl K</kbd>
            </button>

            <button
              className="btn-icon theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle visual theme (Light / Dark)"
              title="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                /* Sun icon for Dark mode */
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                /* Moon icon for Light mode */
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <a
              href="https://github.com/ratherpixelate/better-ktu-notes"
              className="btn-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              title="Open GitHub Repository"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
