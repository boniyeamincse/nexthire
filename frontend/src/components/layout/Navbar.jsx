import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="navbar" style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 'var(--z-overlay)',
      transition: 'all var(--transition-base)',
      background: scrolled ? 'rgba(5,11,24,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 'var(--navbar-h)',
      }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--gradient-brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: '#fff',
            boxShadow: '0 4px 16px rgba(0,114,255,0.4)',
          }}>N</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem',
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>NextHire</span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 4 }} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} style={{
              padding: '8px 16px', borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-muted)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--color-text)'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--color-text-muted)'; e.target.style.background = 'transparent'; }}
            >{link.label}</a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="/login" className="btn btn-secondary btn-sm" id="nav-login">Sign In</a>
          <a href="/register" className="btn btn-primary btn-sm" id="nav-register">Get Started →</a>
        </div>
      </div>
    </header>
  );
}
