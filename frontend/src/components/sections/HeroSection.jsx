import { STATS } from '../../constants';

export default function Hero() {
  return (
    <section id="hero" style={{ paddingTop: 'calc(var(--navbar-h) + var(--space-20))', paddingBottom: 'var(--space-24)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Top badge */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }} className="animate-fade-up">
          <span className="eyebrow">
            🚀 AI-Powered Interview Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-display-2xl animate-fade-up delay-100" style={{ textAlign: 'center', maxWidth: '18ch', margin: '0 auto var(--space-6)' }}>
          Ace Every Interview with{' '}
          <span className="gradient-text">AI Precision</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-muted animate-fade-up delay-200" style={{ textAlign: 'center', maxWidth: '60ch', margin: '0 auto var(--space-8)' }}>
          Book live sessions with verified industry experts, practice with intelligent AI interviewers,
          and get real-time performance scoring — all in one platform.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-12)' }}>
          <a href="/register" className="btn btn-primary btn-lg" id="hero-cta-primary">
            Start Free Trial →
          </a>
          <a href="#how-it-works" className="btn btn-secondary btn-lg" id="hero-cta-secondary">
            ▶ Watch Demo
          </a>
        </div>

        {/* Hero Image */}
        <div className="animate-fade-up delay-400 animate-float" style={{
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid var(--color-border-strong)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(0,198,255,0.08)',
          maxWidth: 1000,
          margin: '0 auto var(--space-16)',
          position: 'relative',
        }}>
          {/* Glow border effect */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(0,198,255,0.15) 0%, transparent 50%, rgba(124,58,237,0.1) 100%)',
            pointerEvents: 'none', zIndex: 1,
          }} />
          <img
            src="/images/interview-room.png"
            alt="NextHire Virtual Interview Room with AI Analysis"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-4)',
          maxWidth: 800,
          margin: '0 auto',
        }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className={`card animate-fade-up delay-${(i+1)*100}`} style={{ textAlign: 'center', padding: 'var(--space-5) var(--space-4)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
              <div className="text-xs text-muted" style={{ marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
