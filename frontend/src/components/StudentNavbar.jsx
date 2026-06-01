export default function StudentNavbar({ user }) {
  return (
    <header className="student-navbar">
      <label className="student-search">
        <span className="student-search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search tutors, categories, interviews..."
          aria-label="Search tutors, categories, interviews"
        />
      </label>

      <div className="student-navbar-actions">
        <button type="button" className="student-icon-button" aria-label="Notifications">
          🔔
        </button>
        <button type="button" className="student-icon-button" aria-label="Messages">
          ✉
        </button>
        <div className="student-profile-chip">
          <div className="student-profile-avatar">{user?.name?.charAt(0) || 'S'}</div>
          <div>
            <div className="student-profile-greeting">Hello, {user?.name || 'Student'}</div>
            <div className="student-profile-role">Student Dashboard</div>
          </div>
        </div>
      </div>
    </header>
  );
}
