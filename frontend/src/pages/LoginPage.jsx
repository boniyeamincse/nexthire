import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const validate = () => {
    const e = {};
    if (!form.email)                          e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email  = 'Enter a valid email address';
    if (!form.password)                        e.password = 'Password is required';
    else if (form.password.length < 6)         e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const result = await login({ email: form.email, password: form.password });
      const dashboardPath = result?.user?.role === 'tutor' ? '/tutor/dashboard' : '/student/profile';
      navigate(dashboardPath);
    } catch (err) {
      setErrors({ email: err.response?.data?.message || 'Login failed. Please check your credentials.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--color-bg-base)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* ── LEFT PANEL — Brand / Visual ────────────────────── */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 48px',
        background: 'linear-gradient(135deg, #050b18 0%, #080f22 60%, #0c1030 100%)',
        overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:-100, left:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,198,255,0.12) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)', pointerEvents:'none' }} />

        {/* Grid overlay */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize:'40px 40px',
        }} />

        {/* Logo */}
        <div style={{ position:'relative', zIndex:1 }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none' }}>
            <div style={{
              width:40, height:40, borderRadius:12,
              background:'var(--gradient-brand)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:900, fontSize:20, color:'#fff',
              boxShadow:'0 4px 20px rgba(0,114,255,0.4)',
            }}>N</div>
            <span style={{
              fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.4rem',
              background:'var(--gradient-brand)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>NextHire</span>
          </Link>
        </div>

        {/* Center content */}
        <div style={{ position:'relative', zIndex:1 }}>
          {/* Interview room screenshot card */}
          <div style={{
            borderRadius:20,
            overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.1)',
            boxShadow:'0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(0,198,255,0.07)',
            marginBottom:32,
          }}>
            <img src="/images/interview-room.png" alt="NextHire Interview Room" style={{ width:'100%', display:'block' }} />
          </div>

          {/* Quote */}
          <div style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:16, padding:'24px 28px',
            backdropFilter:'blur(12px)',
          }}>
            <p style={{ color:'rgba(238,242,255,0.8)', fontSize:'1rem', lineHeight:1.7, marginBottom:16, fontStyle:'italic' }}>
              "NextHire helped me land my dream job at Google. The AI feedback was spot-on and the tutors were incredible."
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{
                width:40, height:40, borderRadius:'50%',
                background:'linear-gradient(135deg, rgba(0,198,255,0.3), rgba(124,58,237,0.3))',
                border:'2px solid rgba(0,198,255,0.4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:700, fontSize:'0.85rem', color:'#00c6ff',
              }}>AR</div>
              <div>
                <div style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--color-text)' }}>Anika Rahman</div>
                <div style={{ fontSize:'0.78rem', color:'var(--color-text-faint)' }}>Software Engineer @ Google</div>
              </div>
              <div style={{ marginLeft:'auto', display:'flex', gap:2 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color:'#f59e0b', fontSize:13 }}>★</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ position:'relative', zIndex:1, display:'flex', gap:32 }}>
          {[['50K+','Interviews'],['8.2K+','Tutors'],['94%','Success Rate']].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.4rem', background:'var(--gradient-brand)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{val}</div>
              <div style={{ fontSize:'0.75rem', color:'var(--color-text-faint)', marginTop:2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ────────────────────────── */}
      <div style={{
        display:'flex', flexDirection:'column',
        justifyContent:'center', alignItems:'center',
        padding:'48px 64px',
        background:'var(--color-bg-base)',
        position:'relative',
      }}>
        {/* Top right nav */}
        <div style={{ position:'absolute', top:32, right:40, display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:'0.88rem', color:'var(--color-text-faint)' }}>No account?</span>
          <Link to="/register" style={{
            padding:'8px 20px', borderRadius:'var(--radius-full)',
            border:'1px solid var(--color-border-strong)',
            fontSize:'0.875rem', fontWeight:600, color:'var(--color-text)',
            background:'rgba(255,255,255,0.04)',
            transition:'all 0.2s',
          }}>Sign Up</Link>
        </div>

        <div style={{ width:'100%', maxWidth:440 }}>
          {/* Heading */}
          <div style={{ marginBottom:36 }}>
            <h1 style={{
              fontFamily:'var(--font-display)', fontWeight:800,
              fontSize:'clamp(1.8rem, 3vw, 2.4rem)',
              lineHeight:1.1, marginBottom:10,
            }}>
              Welcome back 👋
            </h1>
            <p style={{ color:'var(--color-text-muted)', fontSize:'0.95rem', lineHeight:1.6 }}>
              Sign in to your NextHire account to continue your interview journey.
            </p>
          </div>

          {/* Social Login Buttons */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:28 }}>
            {[
              { icon: 'G', label: 'Google',   bg: '#fff', color: '#333' },
              { icon: 'in', label: 'LinkedIn', bg: '#0A66C2', color: '#fff' },
            ].map(({ icon, label, bg, color }) => (
              <button key={label} id={`social-${label.toLowerCase()}`} style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                padding:'11px 16px', borderRadius:'var(--radius-md)',
                border:'1px solid var(--color-border-strong)',
                background:'rgba(255,255,255,0.04)', color:'var(--color-text)',
                fontSize:'0.875rem', fontWeight:600, cursor:'pointer',
                transition:'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='var(--color-border-strong)'; }}
              >
                <span style={{ width:20, height:20, borderRadius:6, background:bg, color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, flexShrink:0 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
            <div style={{ flex:1, height:1, background:'var(--color-border)' }} />
            <span style={{ fontSize:'0.78rem', color:'var(--color-text-faint)', whiteSpace:'nowrap' }}>or sign in with email</span>
            <div style={{ flex:1, height:1, background:'var(--color-border)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom:20 }}>
              <label htmlFor="email" style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'var(--color-text)' }}>
                Email address
              </label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, opacity:0.5 }}>✉</span>
                <input
                  id="email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{
                    width:'100%', padding:'12px 14px 12px 42px',
                    background:'rgba(255,255,255,0.05)',
                    border:`1px solid ${errors.email ? '#ef4444' : 'var(--color-border-strong)'}`,
                    borderRadius:'var(--radius-md)',
                    color:'var(--color-text)', fontSize:'0.95rem',
                    outline:'none', transition:'all 0.2s',
                    fontFamily:'var(--font-body)',
                  }}
                  onFocus={e => { e.target.style.borderColor='var(--color-primary)'; e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor=errors.email?'#ef4444':'var(--color-border-strong)'; e.target.style.boxShadow='none'; }}
                />
              </div>
              {errors.email && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:6 }}>⚠ {errors.email}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <label htmlFor="password" style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--color-text)' }}>Password</label>
                <a href="/forgot-password" style={{ fontSize:'0.78rem', color:'var(--color-primary)', textDecoration:'none' }}>Forgot password?</a>
              </div>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, opacity:0.5 }}>🔒</span>
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width:'100%', padding:'12px 44px 12px 42px',
                    background:'rgba(255,255,255,0.05)',
                    border:`1px solid ${errors.password ? '#ef4444' : 'var(--color-border-strong)'}`,
                    borderRadius:'var(--radius-md)',
                    color:'var(--color-text)', fontSize:'0.95rem',
                    outline:'none', transition:'all 0.2s',
                    fontFamily:'var(--font-body)',
                  }}
                  onFocus={e => { e.target.style.borderColor='var(--color-primary)'; e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor=errors.password?'#ef4444':'var(--color-border-strong)'; e.target.style.boxShadow='none'; }}
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} style={{
                  position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer',
                  color:'var(--color-text-faint)', fontSize:16, padding:4,
                }}>
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:6 }}>⚠ {errors.password}</p>}
            </div>

            {/* Remember me */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28 }}>
              <input
                id="remember" name="remember" type="checkbox"
                checked={form.remember} onChange={handleChange}
                style={{ width:16, height:16, accentColor:'var(--color-primary)', cursor:'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize:'0.875rem', color:'var(--color-text-muted)', cursor:'pointer' }}>
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit */}
            <button id="login-submit" type="submit" disabled={loading} style={{
              width:'100%', padding:'14px',
              background: loading ? 'rgba(0,198,255,0.3)' : 'var(--gradient-brand)',
              border:'none', borderRadius:'var(--radius-full)',
              color:'#fff', fontWeight:700, fontSize:'1rem',
              fontFamily:'var(--font-body)', cursor: loading ? 'not-allowed' : 'pointer',
              transition:'all 0.25s',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(0,114,255,0.35)',
              display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(0,114,255,0.5)'; }}}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,114,255,0.35)'; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width:18, height:18, border:'2px solid rgba(255,255,255,0.3)',
                    borderTopColor:'#fff', borderRadius:'50%',
                    display:'inline-block', animation:'spin 0.75s linear infinite',
                  }} />
                  Signing in…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Bottom link */}
          <p style={{ textAlign:'center', marginTop:28, fontSize:'0.875rem', color:'var(--color-text-faint)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color:'var(--color-primary)', fontWeight:600 }}>
              Create one free →
            </Link>
          </p>

          {/* Role badges */}
          <div style={{ marginTop:32, display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {['Student', 'Tutor', 'Organization', 'Admin'].map(role => (
              <span key={role} style={{
                fontSize:'0.72rem', padding:'4px 12px',
                borderRadius:'var(--radius-full)',
                border:'1px solid var(--color-border)',
                color:'var(--color-text-faint)',
                background:'rgba(255,255,255,0.03)',
              }}>{role} Login</span>
            ))}
          </div>
        </div>
      </div>

      {/* Spinner keyframe injected inline */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #login-grid { grid-template-columns: 1fr !important; }
          #login-left  { display: none !important; }
          #login-right { padding: 32px 24px !important; }
        }
        input::placeholder { color: rgba(238,242,255,0.3); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px rgba(8,15,30,0.95) inset !important;
          -webkit-text-fill-color: #eef2ff !important;
          caret-color: #eef2ff !important;
        }
      `}</style>
    </div>
  );
}
