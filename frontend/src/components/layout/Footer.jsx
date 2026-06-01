import { FOOTER_LINKS, SITE } from '../../constants';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      background: 'rgba(5,11,24,0.9)',
      paddingTop: 'var(--space-16)',
      paddingBottom: 'var(--space-10)',
    }}>
      <div className="container">
        {/* Top Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: 'var(--space-10)',
          marginBottom: 'var(--space-12)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-4)' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--gradient-brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, color: '#fff',
              }}>N</div>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem',
                background: 'var(--gradient-brand)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>NextHire</span>
            </div>
            <p className="text-sm text-muted" style={{ maxWidth: '28ch', lineHeight: 1.7 }}>
              The AI-powered interview marketplace helping professionals land their dream jobs.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 'var(--space-5)' }}>
              {['𝕏', 'in', '▶', '📧'].map((icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: 'var(--color-text-muted)',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,198,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(0,198,255,0.3)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-card)'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 'var(--space-4)' }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted" style={{ transition: 'color var(--transition-fast)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                    onMouseLeave={e => e.target.style.color = ''}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="divider" />

        {/* Bottom Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-5)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <p className="text-xs text-faint">© 2026 NextHire. All rights reserved. Built with ❤️ in Bangladesh.</p>
          <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-xs text-faint" style={{ transition: 'color var(--transition-fast)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text-muted)'}
              onMouseLeave={e => e.target.style.color = ''}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
