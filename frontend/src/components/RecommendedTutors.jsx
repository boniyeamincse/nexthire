export default function RecommendedTutors({ tutors }) {
  return (
    <section className="student-panel">
      <div className="student-panel-heading-row">
        <div>
          <div className="student-panel-eyebrow">Recommended Tutors</div>
          <h3>Book with proven interview specialists</h3>
        </div>
        <div className="student-filter-row">
          {['Category', 'Price', 'Rating', 'Availability', 'Language'].map((filter) => (
            <span key={filter} className="student-filter-chip">{filter}</span>
          ))}
        </div>
      </div>

      <div className="student-tutor-grid">
        {tutors.map((tutor) => (
          <article key={tutor.name} className="student-tutor-card">
            <div className="student-tutor-avatar">{tutor.name.charAt(0)}</div>
            <div>
              <div className="student-tutor-name">{tutor.name}</div>
              <div className="student-tutor-specialty">{tutor.specialty}</div>
            </div>
            <div className="student-tutor-metrics">
              <span>Rating: {tutor.rating}</span>
              <span>Sessions: {tutor.sessions}</span>
              <span>Price: {tutor.price}</span>
            </div>
            <div className="student-inline-actions compact">
              <button type="button" className="student-button-secondary">View Profile</button>
              <button type="button" className="student-button-primary">Book Now</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
