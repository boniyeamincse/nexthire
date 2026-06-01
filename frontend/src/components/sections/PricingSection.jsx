import { PRICING_PLANS } from '../../constants';

export default function PricingSection() {
  return (
    <section id="pricing" className="section" style={{
      background: 'linear-gradient(180deg, transparent, rgba(0,198,255,0.03) 50%, transparent)',
    }}>
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="eyebrow" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>Pricing</span>
          <h2 className="text-display-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            Simple, transparent{' '}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-muted" style={{ maxWidth: '44ch', margin: '0 auto' }}>
            No hidden fees. Cancel anytime. Start free, upgrade when ready.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', alignItems: 'start' }}>
          {PRICING_PLANS.map((plan) => (
            <div key={plan.name} className="card" style={{
              padding: 'var(--space-8)',
              position: 'relative',
              ...(plan.popular ? {
                border: '1px solid rgba(0,198,255,0.35)',
                background: 'linear-gradient(135deg, rgba(0,198,255,0.07) 0%, rgba(124,58,237,0.05) 100%)',
                boxShadow: '0 0 60px rgba(0,198,255,0.08), 0 24px 64px rgba(0,0,0,0.4)',
                transform: 'scale(1.03)',
              } : {}),
            }}>
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--gradient-brand)', color: '#fff',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                  padding: '5px 16px', borderRadius: 'var(--radius-full)',
                  whiteSpace: 'nowrap',
                }}>⚡ MOST POPULAR</div>
              )}

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>{plan.name}</h3>
                <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-4)' }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{plan.price}</span>
                  <span className="text-muted text-sm">{plan.period}</span>
                </div>
              </div>

              <hr className="divider" style={{ marginBottom: 'var(--space-6)' }} />

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
                {plan.features.map(feature => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ color: '#06d6a0', fontSize: 16, flexShrink: 0 }}>✓</span>
                    <span className="text-sm text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/register"
                id={`pricing-${plan.name.toLowerCase()}`}
                className={`btn btn-${plan.variant}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >{plan.cta}</a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-sm text-faint" style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
          All plans include a 7-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}
