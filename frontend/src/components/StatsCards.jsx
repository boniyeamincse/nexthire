export default function StatsCards({ stats }) {
  return (
    <section className="student-stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="student-stat-card">
          <div className="student-stat-topline">{stat.label}</div>
          <div className="student-stat-value">{stat.value}</div>
          <div className="student-stat-subtext">{stat.subtext}</div>
          <div className="student-stat-glow" style={{ background: stat.glow }} />
        </article>
      ))}
    </section>
  );
}
