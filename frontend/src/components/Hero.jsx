export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Interview prep platform</p>
        <h2>Frontend foundation for a booking, coaching, and AI feedback product.</h2>
        <p>
          This frontend is built as a dedicated client app while the backend stays API-only.
          It is ready for student, tutor, organization, and admin screens.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#features">
            Explore modules
          </a>
          <a className="button button-secondary" href="#workflow">
            View workflow
          </a>
        </div>
      </div>

      <div className="hero-panel">
        <div className="panel-card">
          <span>Frontend structure</span>
          <strong>React + Vite</strong>
        </div>
        <div className="panel-card">
          <span>Backend structure</span>
          <strong>Laravel API only</strong>
        </div>
        <div className="panel-card">
          <span>Primary roles</span>
          <strong>Student, Tutor, Organization, Admin</strong>
        </div>
      </div>
    </section>
  );
}
