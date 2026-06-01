export default function UpcomingInterviewCard({ interview }) {
  return (
    <section className="student-panel student-upcoming-card">
      <div className="student-panel-heading-row">
        <div>
          <div className="student-panel-eyebrow">Upcoming Interview</div>
          <h3>{interview.title}</h3>
        </div>
        <span className="student-status-badge">{interview.status}</span>
      </div>

      <div className="student-upcoming-meta-grid">
        <div>
          <span>Tutor</span>
          <strong>{interview.tutor}</strong>
        </div>
        <div>
          <span>Date</span>
          <strong>{interview.date}</strong>
        </div>
        <div>
          <span>Time</span>
          <strong>{interview.time}</strong>
        </div>
        <div>
          <span>Duration</span>
          <strong>{interview.duration}</strong>
        </div>
      </div>

      <div className="student-upcoming-note">{interview.note}</div>

      <div className="student-inline-actions">
        <button type="button" className="student-button-primary" disabled>
          Join Now
        </button>
        <button type="button" className="student-button-secondary">Reschedule</button>
        <button type="button" className="student-button-ghost">Cancel</button>
      </div>
    </section>
  );
}
