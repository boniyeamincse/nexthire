import { FOR_TUTORS } from '../../constants';

export default function ForTutorsSection() {
  return (
    <section id="for-tutors" className="section" style={{
      background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.04) 50%, transparent)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}>
          {/* Left: image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -20,
              background: 'radial-gradient(ellipse at center, rgba(0,198,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-strong)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(0,198,255,0.08)',
            }}>
              <img
                src="/images/hero-illustration.png"
                alt="NextHire Tutor Marketplace"
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: -20, right: -20,
              background: 'rgba(6,214,160,0.15)', border: '1px solid rgba(6,214,160,0.3)',
              backdropFilter: 'blur(16px)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-5)',
              boxShadow: 'var(--shadow-md)',
            }}>
              <div style={{ fontSize: '0.7rem', color: '#06d6a0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Avg. Monthly Earning</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#fff', marginTop: 2 }}>৳42,500</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Top tutors on NextHire</div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <span className="eyebrow" style={{ marginBottom: 'var(--space-5)', display: 'inline-flex' }}>For Tutors</span>
            <h2 className="text-display-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              Turn your expertise into{' '}
              <span className="gradient-text">recurring income</span>
            </h2>
            <p className="text-base text-muted" style={{ marginBottom: 'var(--space-8)', lineHeight: 1.8 }}>
              Join 8,200+ verified professionals earning on NextHire. Set your own schedule, pricing, and categories.
              Get paid for every session, instantly.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
              {FOR_TUTORS.map(item => (
                <div key={item.title} className="card" style={{ padding: 'var(--space-5)' }}>
                  <div style={{ fontSize: 24, marginBottom: 'var(--space-3)' }}>{item.icon}</div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{item.title}</h4>
                  <p className="text-xs text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <a href="/tutor-apply" className="btn btn-primary" id="tutor-cta">Become a Tutor →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
