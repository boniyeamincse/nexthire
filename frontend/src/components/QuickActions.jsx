export default function QuickActions({ actions }) {
  return (
    <section className="student-panel">
      <div className="student-panel-heading-row">
        <div>
          <div className="student-panel-eyebrow">Quick Actions</div>
          <h3>Jump straight into what matters most</h3>
        </div>
      </div>

      <div className="student-actions-grid">
        {actions.map((action) => (
          <button key={action.label} type="button" className="student-action-card">
            <span className="student-action-icon">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
