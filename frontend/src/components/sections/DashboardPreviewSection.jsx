export default function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}>
          {/* Left: copy */}
          <div>
            <span className="eyebrow" style={{ marginBottom: 'var(--space-5)', display: 'inline-flex' }}>Analytics & Insights</span>
            <h2 className="text-display-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              A dashboard built for{' '}
              <span className="gradient-text">serious growth</span>
            </h2>
            <p className="text-base text-muted" style={{ marginBottom: 'var(--space-6)', lineHeight: 1.8 }}>
              Track every booking, revenue stream, and student performance metric from a single, powerful control center.
              Tutors, admins, and organizations each get a role-specific view tailored to their workflow.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { icon: '📊', title: 'Real-Time Analytics', desc: 'Live bookings, earnings, and session metrics updated instantly.' },
                { icon: '🗓️', title: 'Booking Calendar', desc: 'Visual calendar with drag-and-drop availability management.' },
                { icon: '🤖', title: 'AI Performance Reports', desc: 'Automated scorecards with trend analysis and improvement tips.' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</h4>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-8)' }}>
              <a href="/register" className="btn btn-primary" id="dashboard-cta">Explore the Dashboard →</a>
            </div>
          </div>

          {/* Right: image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -20,
              background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--color-border-strong)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(124,58,237,0.1)',
              position: 'relative',
            }}>
              <img
                src="/images/dashboard-preview.png"
                alt="NextHire Analytics Dashboard"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
