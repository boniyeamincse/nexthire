export default function NotificationPanel({ notifications }) {
  return (
    <section className="student-panel">
      <div className="student-panel-heading-row">
        <div>
          <div className="student-panel-eyebrow">Notifications</div>
          <h3>Important updates</h3>
        </div>
      </div>

      <div className="student-notification-list">
        {notifications.map((notification) => (
          <article key={notification.text} className="student-notification-item">
            <div className="student-notification-dot" />
            <div>
              <div className="student-notification-text">{notification.text}</div>
              <div className="student-notification-time">{notification.time}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
