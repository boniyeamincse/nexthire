const menuItems = [
  'Dashboard',
  'My Interviews',
  'Upcoming Interviews',
  'Completed Interviews',
  'Book Interview',
  'My Tutors',
  'AI Mock Interview',
  'Resume Analysis',
  'Scorecards',
  'Certificates',
  'Payments',
  'Messages',
  'Notifications',
  'Support',
  'Settings',
];

export default function StudentSidebar({ activeItem, onMenuSelect, onLogout }) {
  return (
    <aside className="student-sidebar">
      <div>
        <div className="student-brand-card">
          <div className="student-brand-mark">N</div>
          <div>
            <div className="student-brand-name">NextHire</div>
            <div className="student-brand-copy">Student Dashboard</div>
          </div>
        </div>

        <nav className="student-sidebar-nav" aria-label="Student dashboard menu">
          {menuItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`student-sidebar-link${activeItem === item || (!activeItem && index === 0) ? ' is-active' : ''}`}
              onClick={() => onMenuSelect?.(item)}
            >
              <span className="student-sidebar-bullet" />
              {item}
            </button>
          ))}
        </nav>
      </div>

      <button type="button" className="student-logout-button" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}
