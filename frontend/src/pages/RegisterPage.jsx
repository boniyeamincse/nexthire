import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  { id: 'student',      label: 'Student',      icon: '🎓', desc: 'Practice & book sessions' },
  { id: 'tutor',        label: 'Tutor',         icon: '👨‍🏫', desc: 'Teach & earn money' },
  { id: 'organization', label: 'Organization',  icon: '🏢', desc: 'Hire & manage candidates' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep]     = useState(1); // 1 = role, 2 = details
  const [role, setRole]     = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({
    name: '', email: '', password: '', confirmPassword: '', terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                           e.name            = 'Full name is required';
    if (!form.email)                                 e.email           = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))      e.email           = 'Enter a valid email';
    if (!form.password)                              e.password        = 'Password is required';
    else if (form.password.length < 8)               e.password        = 'Minimum 8 characters';
    if (form.confirmPassword !== form.password)      e.confirmPassword = 'Passwords do not match';
    if (!form.terms)                                 e.terms           = 'You must accept the terms';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const result = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        role: role
      });
      const dashboardPath = result?.user?.role === 'tutor' ? '/tutor/dashboard' : '/student/profile';
      navigate(dashboardPath);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ email: err.response?.data?.message || 'Registration failed.' });
      }
    } finally {
      setLoading(false);
    }
  };

  /* Password strength */
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)          s++;
    if (/[A-Z]/.test(p))        s++;
    if (/[0-9]/.test(p))        s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#06d6a0', '#00c6ff'][strength];

  const inputStyle = (err) => ({
    width: '100%', padding: '12px 14px 12px 42px',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${err ? '#ef4444' : 'var(--color-border-strong)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)', fontSize: '0.95rem',
    outline: 'none', transition: 'all 0.2s',
    fontFamily: 'var(--font-body)',
  });

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: 'var(--color-bg-base)',
    }}>
      {/* ── LEFT PANEL ── */}
      <div style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 48px',
        background: 'linear-gradient(135deg, #050b18 0%, #080f22 60%, #0c1030 100%)',
        overflow: 'hidden',
      }}>
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:-120, left:-80, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, right:-60, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,198,255,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />

        {/* Logo */}
        <div style={{ position:'relative', zIndex:1 }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'var(--gradient-brand)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:20, color:'#fff', boxShadow:'0 4px 20px rgba(0,114,255,0.4)' }}>N</div>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.4rem', background:'var(--gradient-brand)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>NextHire</span>
          </Link>
        </div>

        {/* Center: feature list */}
        <div style={{ position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.5rem,2.5vw,2rem)', lineHeight:1.2, marginBottom:8 }}>
            Start your journey to{' '}
            <span style={{ background:'var(--gradient-brand)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>career success</span>
          </h2>
          <p style={{ color:'var(--color-text-muted)', fontSize:'0.95rem', marginBottom:32, lineHeight:1.7 }}>
            Join 50,000+ professionals using NextHire to land top roles.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { icon:'🤖', title:'AI Mock Interviews',      desc:'Unlimited intelligent practice sessions' },
              { icon:'🎥', title:'Live Expert Sessions',    desc:'1-on-1 with verified industry professionals' },
              { icon:'📊', title:'Real-time Scorecard',     desc:'Detailed AI performance analytics' },
              { icon:'🗓️', title:'Smart Scheduling',        desc:'Book sessions that fit your calendar' },
              { icon:'💰', title:'Wallet & Payments',        desc:'bKash, Nagad, Stripe & more' },
            ].map(f => (
              <div key={f.title} style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'rgba(0,198,255,0.1)', border:'1px solid rgba(0,198,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--color-text)' }}>{f.title}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--color-text-faint)' }}>{f.desc}</div>
                </div>
                <span style={{ marginLeft:'auto', color:'#06d6a0', fontSize:16 }}>✓</span>
              </div>
            ))}
          </div>

          {/* Dashboard preview */}
          <div style={{ marginTop:32, borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
            <img src="/images/dashboard-preview.png" alt="Dashboard" style={{ width:'100%', display:'block' }} />
          </div>
        </div>

        {/* Bottom */}
        <div style={{ position:'relative', zIndex:1, display:'flex', gap:32 }}>
          {[['50K+','Professionals'],['8.2K+','Tutors'],['94%','Success Rate']].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.3rem', background:'var(--gradient-brand)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{v}</div>
              <div style={{ fontSize:'0.72rem', color:'var(--color-text-faint)', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'48px 64px', background:'var(--color-bg-base)', position:'relative', overflowY:'auto' }}>
        {/* Top-right nav */}
        <div style={{ position:'absolute', top:32, right:40, display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:'0.88rem', color:'var(--color-text-faint)' }}>Have an account?</span>
          <Link to="/login" style={{ padding:'8px 20px', borderRadius:'var(--radius-full)', border:'1px solid var(--color-border-strong)', fontSize:'0.875rem', fontWeight:600, color:'var(--color-text)', background:'rgba(255,255,255,0.04)' }}>Sign In</Link>
        </div>

        <div style={{ width:'100%', maxWidth:460 }}>

          {/* ── STEP 1: Role Selection ── */}
          {step === 1 && (
            <>
              <div style={{ marginBottom:32 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-primary)', background:'rgba(0,198,255,0.1)', border:'1px solid rgba(0,198,255,0.2)', padding:'5px 14px', borderRadius:'var(--radius-full)', marginBottom:16 }}>
                  Step 1 of 2 — Choose your role
                </div>
                <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.7rem,3vw,2.2rem)', lineHeight:1.1, marginBottom:10 }}>
                  Join NextHire 🚀
                </h1>
                <p style={{ color:'var(--color-text-muted)', fontSize:'0.95rem', lineHeight:1.6 }}>
                  Select how you want to use the platform.
                </p>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:32 }}>
                {ROLES.map(r => (
                  <button key={r.id} id={`role-${r.id}`} onClick={() => setRole(r.id)} style={{
                    display:'flex', alignItems:'center', gap:16, padding:'18px 20px',
                    borderRadius:'var(--radius-lg)', cursor:'pointer', textAlign:'left',
                    background: role === r.id ? 'linear-gradient(135deg,rgba(0,198,255,0.1),rgba(124,58,237,0.08))' : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${role === r.id ? 'rgba(0,198,255,0.45)' : 'var(--color-border)'}`,
                    transition:'all 0.2s',
                    boxShadow: role === r.id ? '0 0 20px rgba(0,198,255,0.1)' : 'none',
                  }}>
                    <div style={{ width:48, height:48, borderRadius:14, background: role===r.id ? 'rgba(0,198,255,0.15)' : 'rgba(255,255,255,0.06)', border:`1px solid ${role===r.id?'rgba(0,198,255,0.3)':'var(--color-border)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0 }}>{r.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:'1rem', color:'var(--color-text)', marginBottom:3 }}>{r.label}</div>
                      <div style={{ fontSize:'0.8rem', color:'var(--color-text-faint)' }}>{r.desc}</div>
                    </div>
                    <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${role===r.id?'var(--color-primary)':'var(--color-border-strong)'}`, background: role===r.id ? 'var(--color-primary)' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
                      {role===r.id && <span style={{ color:'#fff', fontSize:11, fontWeight:900 }}>✓</span>}
                    </div>
                  </button>
                ))}
              </div>

              <button id="step1-next" onClick={() => role && setStep(2)} style={{
                width:'100%', padding:'14px',
                background: role ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.06)',
                border: role ? 'none' : '1px solid var(--color-border)',
                borderRadius:'var(--radius-full)', color: role ? '#fff' : 'var(--color-text-faint)',
                fontWeight:700, fontSize:'1rem', fontFamily:'var(--font-body)',
                cursor: role ? 'pointer' : 'not-allowed', transition:'all 0.25s',
                boxShadow: role ? '0 4px 20px rgba(0,114,255,0.35)' : 'none',
              }}>
                Continue →
              </button>

              <p style={{ textAlign:'center', marginTop:24, fontSize:'0.875rem', color:'var(--color-text-faint)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color:'var(--color-primary)', fontWeight:600 }}>Sign in</Link>
              </p>
            </>
          )}

          {/* ── STEP 2: Registration Details ── */}
          {step === 2 && (
            <>
              <div style={{ marginBottom:28 }}>
                <button onClick={() => setStep(1)} style={{ background:'none', border:'none', color:'var(--color-text-muted)', cursor:'pointer', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:6, marginBottom:16, padding:0 }}>
                  ← Back
                </button>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-primary)', background:'rgba(0,198,255,0.1)', border:'1px solid rgba(0,198,255,0.2)', padding:'5px 14px', borderRadius:'var(--radius-full)', marginBottom:14 }}>
                  Step 2 of 2 — {ROLES.find(r=>r.id===role)?.icon} {ROLES.find(r=>r.id===role)?.label} Account
                </div>
                <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.6rem,3vw,2.1rem)', lineHeight:1.1, marginBottom:8 }}>
                  Create your account
                </h1>
                <p style={{ color:'var(--color-text-muted)', fontSize:'0.9rem' }}>Free for 7 days. No credit card required.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div style={{ marginBottom:18 }}>
                  <label htmlFor="name" style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:7, color:'var(--color-text)' }}>Full Name</label>
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, opacity:0.5 }}>👤</span>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Boney Yamin" autoComplete="name" style={inputStyle(errors.name)}
                      onFocus={e=>{e.target.style.borderColor='var(--color-primary)';e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)';}}
                      onBlur={e=>{e.target.style.borderColor=errors.name?'#ef4444':'var(--color-border-strong)';e.target.style.boxShadow='none';}}
                    />
                  </div>
                  {errors.name && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:5 }}>⚠ {errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ marginBottom:18 }}>
                  <label htmlFor="email" style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:7, color:'var(--color-text)' }}>Email Address</label>
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, opacity:0.5 }}>✉</span>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" style={inputStyle(errors.email)}
                      onFocus={e=>{e.target.style.borderColor='var(--color-primary)';e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)';}}
                      onBlur={e=>{e.target.style.borderColor=errors.email?'#ef4444':'var(--color-border-strong)';e.target.style.boxShadow='none';}}
                    />
                  </div>
                  {errors.email && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:5 }}>⚠ {errors.email}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom:8 }}>
                  <label htmlFor="password" style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:7, color:'var(--color-text)' }}>Password</label>
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, opacity:0.5 }}>🔒</span>
                    <input id="password" name="password" type={showPwd?'text':'password'} value={form.password} onChange={handleChange} placeholder="Min. 8 characters" autoComplete="new-password" style={{ ...inputStyle(errors.password), paddingRight:44 }}
                      onFocus={e=>{e.target.style.borderColor='var(--color-primary)';e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)';}}
                      onBlur={e=>{e.target.style.borderColor=errors.password?'#ef4444':'var(--color-border-strong)';e.target.style.boxShadow='none';}}
                    />
                    <button type="button" onClick={()=>setShowPwd(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--color-text-faint)', fontSize:16, padding:4 }}>{showPwd?'🙈':'👁'}</button>
                  </div>
                  {/* Strength bar */}
                  {form.password && (
                    <div style={{ marginTop:8 }}>
                      <div style={{ display:'flex', gap:4, marginBottom:4 }}>
                        {[1,2,3,4].map(i => (
                          <div key={i} style={{ flex:1, height:3, borderRadius:2, background: i<=strength ? strengthColor : 'rgba(255,255,255,0.1)', transition:'all 0.3s' }} />
                        ))}
                      </div>
                      <span style={{ fontSize:'0.72rem', color:strengthColor, fontWeight:600 }}>{strengthLabel}</span>
                    </div>
                  )}
                  {errors.password && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:5 }}>⚠ {errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom:18 }}>
                  <label htmlFor="confirmPassword" style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:7, color:'var(--color-text)' }}>Confirm Password</label>
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, opacity:0.5 }}>🔒</span>
                    <input id="confirmPassword" name="confirmPassword" type={showCPwd?'text':'password'} value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" autoComplete="new-password" style={{ ...inputStyle(errors.confirmPassword), paddingRight:44 }}
                      onFocus={e=>{e.target.style.borderColor='var(--color-primary)';e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)';}}
                      onBlur={e=>{e.target.style.borderColor=errors.confirmPassword?'#ef4444':'var(--color-border-strong)';e.target.style.boxShadow='none';}}
                    />
                    <button type="button" onClick={()=>setShowCPwd(p=>!p)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--color-text-faint)', fontSize:16, padding:4 }}>{showCPwd?'🙈':'👁'}</button>
                  </div>
                  {errors.confirmPassword && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:5 }}>⚠ {errors.confirmPassword}</p>}
                </div>

                {/* Terms */}
                <div style={{ marginBottom:24 }}>
                  <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
                    <input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={handleChange} style={{ width:16, height:16, marginTop:2, accentColor:'var(--color-primary)', flexShrink:0 }} />
                    <span style={{ fontSize:'0.85rem', color:'var(--color-text-muted)', lineHeight:1.6 }}>
                      I agree to NextHire's{' '}
                      <a href="/terms" style={{ color:'var(--color-primary)', fontWeight:600 }}>Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" style={{ color:'var(--color-primary)', fontWeight:600 }}>Privacy Policy</a>
                    </span>
                  </label>
                  {errors.terms && <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:5, marginLeft:26 }}>⚠ {errors.terms}</p>}
                </div>

                {/* Submit */}
                <button id="register-submit" type="submit" disabled={loading} style={{
                  width:'100%', padding:'14px',
                  background: loading ? 'rgba(0,198,255,0.3)' : 'var(--gradient-brand)',
                  border:'none', borderRadius:'var(--radius-full)',
                  color:'#fff', fontWeight:700, fontSize:'1rem',
                  fontFamily:'var(--font-body)', cursor: loading ? 'not-allowed' : 'pointer',
                  transition:'all 0.25s',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(0,114,255,0.35)',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                }}
                onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 30px rgba(0,114,255,0.5)';}}}
                onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 20px rgba(0,114,255,0.35)';}}
                >
                  {loading ? (
                    <>
                      <span style={{ width:18, height:18, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 0.75s linear infinite' }} />
                      Creating account…
                    </>
                  ) : 'Create Account →'}
                </button>
              </form>

              <p style={{ textAlign:'center', marginTop:24, fontSize:'0.875rem', color:'var(--color-text-faint)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color:'var(--color-primary)', fontWeight:600 }}>Sign in →</Link>
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
        input::placeholder { color: rgba(238,242,255,0.3); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px rgba(8,15,30,0.95) inset !important;
          -webkit-text-fill-color: #eef2ff !important;
        }
      `}</style>
    </div>
  );
}
