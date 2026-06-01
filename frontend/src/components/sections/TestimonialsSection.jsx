import { TESTIMONIALS } from '../../constants';

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="eyebrow" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>Success Stories</span>
          <h2 className="text-display-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            Trusted by{' '}
            <span className="gradient-text">50,000+ professionals</span>
          </h2>
          <p className="text-lg text-muted" style={{ maxWidth: '46ch', margin: '0 auto' }}>
            Real results from students, tutors, and organizations around the world.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Quote mark */}
              <div style={{ fontSize: '2.5rem', color: t.color, opacity: 0.4, lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</div>

              <StarRating count={t.rating} />

              <p className="text-sm text-muted" style={{ lineHeight: 1.8, flex: 1 }}>"{t.text}"</p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}40, ${t.color}20)`,
                  border: `2px solid ${t.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.9rem', color: t.color,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: 'var(--space-12)',
          padding: 'var(--space-6) var(--space-8)',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: 'var(--space-8)',
        }}>
          <span className="text-sm text-faint" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.7rem' }}>Trusted by teams at</span>
          {['Google', 'Microsoft', 'Grameenphone', 'BRAC', 'TechCorp', 'Robi', 'Shajgoj'].map(co => (
            <span key={co} style={{ fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.95rem', fontFamily: 'var(--font-display)' }}>{co}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
