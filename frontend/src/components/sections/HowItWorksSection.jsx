import { HOW_IT_WORKS } from '../../constants';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section" style={{
      background: 'linear-gradient(180deg, transparent, rgba(0,198,255,0.03) 50%, transparent)',
    }}>
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="eyebrow" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>How It Works</span>
          <h2 className="text-display-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            From signup to{' '}
            <span className="gradient-text">offer letter</span>
            {' '}in 6 steps
          </h2>
          <p className="text-lg text-muted" style={{ maxWidth: '50ch', margin: '0 auto' }}>
            A seamless journey designed for real results.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-5)',
        }}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.step} className="card" style={{ padding: 'var(--space-6)', position: 'relative', overflow: 'hidden' }}>
              {/* Step number watermark */}
              <div style={{
                position: 'absolute', top: -10, right: 16,
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: '5rem', color: 'rgba(255,255,255,0.035)',
                lineHeight: 1, userSelect: 'none',
              }}>{step.step}</div>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: 'rgba(0,198,255,0.1)',
                border: '1px solid rgba(0,198,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 'var(--space-4)',
              }}>{step.icon}</div>

              {/* Step label */}
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--color-primary)',
                marginBottom: 'var(--space-2)',
              }}>Step {step.step}</div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 'var(--space-2)' }}>
                {step.title}
              </h3>
              <p className="text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
