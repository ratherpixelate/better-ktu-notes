import curriculum from '@/../content/curriculum.json';
import { ProgressOverview } from '@/components/home/ProgressOverview';
import { SubjectSection } from '@/components/home/SubjectSection';

export default function HomePage() {
  return (
    <main className="main-content">
      {/* Hero Header */}
      <section className="hero-section">
        <h1 className="hero-title">BetterKTUNotes</h1>
        <p className="hero-lead">
          Semester 3 · B.Tech Computer Science &amp; Information Technology · 2024 Scheme. Reference materials, worked derivations, and syllabus-aligned module notes.
        </p>
      </section>

      {/* Real-Time Progress Tracker Dashboard */}
      <ProgressOverview />

      {/* Quick Subject Jump Bar */}
      <nav className="subject-jump-nav" aria-label="Quick jump to subject">
        <span className="subject-jump-label">Subjects</span>
        <div className="subject-jump-links">
          {curriculum.subjects.map((sub) => {
            const activeCount = sub.modules.filter((m) => m.status === 'active').length;
            return (
              <a
                key={sub.code}
                href={`#${sub.code.toLowerCase()}`}
                className="subject-jump-pill"
              >
                <span className="pill-code">{sub.slug.toUpperCase()}</span>
                <span className="pill-name">{sub.name.split(' ')[0]}</span>
                <span className="pill-count">{activeCount}/{sub.modules.length}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Subjects & Module Grid */}
      <section className="subjects-container" aria-label="Subjects and Modules">
        {curriculum.subjects.map((sub) => (
          <SubjectSection
            key={sub.code}
            code={sub.code}
            slug={sub.slug}
            name={sub.name}
            category={sub.category}
            credits={sub.credits}
            modules={sub.modules}
          />
        ))}
      </section>
    </main>
  );
}
