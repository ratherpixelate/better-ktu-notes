import curriculum from '@/../content/curriculum.json';
import { ProgressOverview } from '@/components/home/ProgressOverview';
import { SubjectSection } from '@/components/home/SubjectSection';

export default function HomePage() {
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero" aria-label="Course Overview">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>KTU 2024 Scheme · Semester 3 Studio</span>
          </div>

          <h1 className="hero-title">
            Direct syllabus notes.<br />
            <span>No textbook fluff.</span>
          </h1>

          <p className="hero-subtitle">
            Curated hardware architectures, algorithmic proofs, and ER derivations.
            Interactive revision tracking saved directly to your browser with zero logins or telemetry.
          </p>

          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-val">4</span>
              <span className="stat-lbl">Active Modules</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">33</span>
              <span className="stat-lbl">Indexed Topics</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">100%</span>
              <span className="stat-lbl">Syllabus Match</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">Local</span>
              <span className="stat-lbl">Offline Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Revision Progress Tracker */}
      <ProgressOverview />

      {/* Curriculum Subject Blocks */}
      <section className="subjects-list" aria-label="Courses and Modules">
        {curriculum.subjects.map((sub) => (
          <SubjectSection
            key={sub.code}
            code={sub.code}
            name={sub.name}
            modules={sub.modules}
          />
        ))}
      </section>
    </main>
  );
}
