export default function CTASection() {
  return (
    <section id="cta" className="section-sm">
      <div className="container">
        <div style={{
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(0,198,255,0.12) 0%, rgba(124,58,237,0.1) 50%, rgba(6,214,160,0.08) 100%)',
          border: '1px solid rgba(0,198,255,0.2)',
          padding: 'var(--space-16) var(--space-12)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background blobs */}
          <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,198,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="eyebrow" style={{ marginBottom: 'var(--space-5)', display: 'inline-flex' }}>
              Get Started Today
            </span>
            <h2 className="text-display-xl" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              Ready to{' '}
              <span className="gradient-text">ace your next interview?</span>
            </h2>
            <p className="text-lg text-muted" style={{ maxWidth: '50ch', margin: '0 auto var(--space-8)' }}>
              Join 50,000+ professionals using NextHire to land top jobs at leading companies. Start your free trial today — no credit card needed.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/register" className="btn btn-primary btn-lg" id="cta-primary">
                Start Free Trial →
              </a>
              <a href="#features" className="btn btn-secondary btn-lg" id="cta-secondary">
                Explore Features
              </a>
            </div>
            <p className="text-xs text-faint" style={{ marginTop: 'var(--space-5)' }}>
              7-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
