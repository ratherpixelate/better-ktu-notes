'use client';

import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

export function Footer() {
  const { toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSearch = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true })
    );
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-main">
        {/* Brand & Academic Context Column */}
        <div className="footer-col footer-col-brand">
          <div className="footer-brand-title">
            <span className="footer-brand-mark">B</span>
            <span className="footer-brand-name">BetterKTUNotes</span>
          </div>
          <p className="footer-tagline">
            Syllabus-aligned revision notes, derivations, and university PYQ patterns. Filtered to cut textbook fluff for KTU 2024 Scheme Semester 3.
          </p>
          <div className="footer-meta-tags">
            <span className="footer-pill">KTU 2024 Scheme</span>
            <span className="footer-pill">Semester 3 IT &amp; CSE</span>
            <span className="footer-pill">Client-Side Storage</span>
          </div>
        </div>

        {/* Modules Navigation Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Available Notes</h4>
          <ul className="footer-nav-list">
            <li><Link href="/notes/coa-module-1/">COA Module 1 · Basic Structure &amp; RISC</Link></li>
            <li><Link href="/notes/coa-module-2/">COA Module 2 · Pipelining &amp; Hazards</Link></li>
            <li><Link href="/notes/ds-module-1/">DS Module 1 · Stacks &amp; Matrices</Link></li>
            <li><Link href="/notes/dbms-module-1/">DBMS Module 1 · ERD &amp; SQL DDL</Link></li>
          </ul>
        </div>

        {/* Syllabus & Curriculum Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Curriculum Courses</h4>
          <ul className="footer-nav-list">
            <li><span className="footer-nav-static"><span className="footer-code">PCITT302</span> Computer Organisation</span></li>
            <li><span className="footer-nav-static"><span className="footer-code">PCITT303</span> Data Structures</span></li>
            <li><span className="footer-nav-static"><span className="footer-code">PBITT304</span> Database Management</span></li>
            <li><span className="footer-nav-static">4 Modules per Subject</span></li>
          </ul>
        </div>

        {/* Utilities & Shortcuts Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Actions</h4>
          <ul className="footer-nav-list">
            <li>
              <button className="footer-action-btn" onClick={openSearch} aria-label="Search all notes">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <span>Search Topics</span>
                <kbd>Ctrl+K</kbd>
              </button>
            </li>
            <li>
              <button className="footer-action-btn" onClick={toggleTheme} aria-label="Toggle light or dark theme">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <span>Switch Theme</span>
              </button>
            </li>
            <li>
              <button className="footer-action-btn" onClick={scrollToTop} aria-label="Scroll back to top">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
                <span>Back to Top</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Colophon / Academic Attribution */}
      <div className="footer-colophon">
        <div className="colophon-inner">
          <p className="colophon-legal">
            Unofficial student-curated academic study resource. Syllabus items and PYQ classifications reference APJ Abdul Kalam Technological University curriculum documents.
          </p>
          <p className="colophon-copy">
            Zero Tracking · Client-Side Storage · 2026 BetterKTUNotes
          </p>
        </div>
      </div>
    </footer>
  );
}
