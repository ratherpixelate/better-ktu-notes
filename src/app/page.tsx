import curriculum from '@/../content/curriculum.json';
import { ProgressOverview } from '@/components/home/ProgressOverview';
import { SubjectSection } from '@/components/home/SubjectSection';

export default function HomePage() {
  return (
    <main className="main-content">
      {/* Hero Header */}
      <section className="hero-section">
        <h1 className="hero-title">
          BetterKTUNotes
          <span className="hero-keyword">KTU 2024 Scheme S3 Notes</span>
        </h1>
        <p className="hero-lead">
          Semester 3 · B.Tech Computer Science &amp; Information Technology · 2024 Scheme. Reference materials, worked derivations, and syllabus-aligned module notes.
        </p>
      </section>

      {/* Real-Time Progress Tracker Dashboard */}
      <ProgressOverview />

      {/* Subjects & Module Grid */}
      <section className="subjects-container" aria-label="Subjects and Modules">
        {curriculum.subjects.map((sub) => (
          <SubjectSection
            key={sub.code}
            code={sub.code}
            slug={sub.slug}
            name={sub.name}
            credits={sub.credits}
            modules={sub.modules}
          />
        ))}
      </section>
    </main>
  );
}
