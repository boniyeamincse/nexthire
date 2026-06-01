import { FEATURES } from '../../constants';

export default function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="eyebrow" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>Platform Features</span>
          <h2 className="text-display-lg" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            Everything you need to{' '}
            <span className="gradient-text">land the role</span>
          </h2>
          <p className="text-lg text-muted" style={{ maxWidth: '52ch', margin: '0 auto' }}>
            From AI-powered practice to live expert coaching — NextHire covers the entire interview journey.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-5)',
        }}>
          {FEATURES.map((feature, i) => (
            <div key={feature.id} className="card" style={{
              padding: 'var(--space-6)',
              background: `linear-gradient(135deg, rgba(${hexToRgb(feature.color)},0.07) 0%, var(--color-bg-card) 60%)`,
              cursor: 'default',
            }}>
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `rgba(${hexToRgb(feature.color)},0.15)`,
                border: `1px solid rgba(${hexToRgb(feature.color)},0.25)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 'var(--space-4)',
              }}>{feature.icon}</div>

              {/* Badge */}
              <span className={`badge ${feature.badgeVariant}`} style={{ marginBottom: 'var(--space-3)' }}>
                {feature.badge}
              </span>

              {/* Content */}
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', marginBottom: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                {feature.title}
              </h3>
              <p className="text-sm text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Utility: hex to rgb string
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
