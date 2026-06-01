export default function PerformanceOverview({ metrics }) {
  const points = metrics.map((metric, index) => `${index * 24},${100 - metric.value}`).join(' ');

  return (
    <section className="student-panel">
      <div className="student-panel-heading-row">
        <div>
          <div className="student-panel-eyebrow">Performance Overview</div>
          <h3>Track how your interview skills are improving</h3>
        </div>
        <div className="student-chart-caption">Monthly performance graph</div>
      </div>

      <div className="student-performance-grid">
        <div className="student-skill-list">
          {metrics.map((metric) => (
            <div key={metric.label} className="student-skill-item">
              <div className="student-skill-row">
                <span>{metric.label}</span>
                <strong>{metric.value}%</strong>
              </div>
              <div className="student-progress-track">
                <div className="student-progress-fill" style={{ width: `${metric.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="student-chart-card">
          <svg viewBox="0 0 100 100" className="student-chart" aria-label="Interview score trend chart">
            <polyline
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              points="0,72 24,58 48,64 72,42 96,30"
            />
            <polyline
              fill="none"
              stroke="url(#student-performance-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            <defs>
              <linearGradient id="student-performance-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="student-chart-summary">
            Overall Score <strong>82%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
