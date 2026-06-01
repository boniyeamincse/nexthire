import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const validate = () => {
    if (!email)                         return 'Email address is required';
    if (!/\S+@\S+\.\S+/.test(email))   return 'Enter a valid email address';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-base)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Background atmosphere */}
      <div style={{ position:'absolute', top:-150, left:'20%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,198,255,0.09) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-100, right:'15%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)', backgroundSize:'48px 48px', maskImage:'linear-gradient(180deg,rgba(0,0,0,0.5),transparent 90%)' }} />

      {/* Top-left logo */}
      <div style={{ position:'absolute', top:32, left:40 }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:11, background:'var(--gradient-brand)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:19, color:'#fff', boxShadow:'0 4px 16px rgba(0,114,255,0.4)' }}>N</div>
          <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.25rem', background:'var(--gradient-brand)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>NextHire</span>
        </Link>
      </div>

      {/* Back to login — top right */}
      <div style={{ position:'absolute', top:36, right:40 }}>
        <Link to="/login" style={{ display:'flex', alignItems:'center', gap:7, fontSize:'0.875rem', fontWeight:600, color:'var(--color-text-muted)', padding:'8px 18px', borderRadius:'var(--radius-full)', border:'1px solid var(--color-border-strong)', background:'rgba(255,255,255,0.04)', transition:'all 0.2s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.color='var(--color-text)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.color='var(--color-text-muted)';}}
        >
          ← Back to Sign In
        </Link>
      </div>

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 460,
        margin: '0 24px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--color-border-strong)',
        borderRadius: 'var(--radius-xl)',
        padding: '48px 44px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}>

        {/* ── SUCCESS STATE ── */}
        {sent ? (
          <div style={{ textAlign:'center' }}>
            {/* Animated checkmark circle */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(6,214,160,0.12)',
              border: '2px solid rgba(6,214,160,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px',
              animation: 'pulse-ring 2s ease-in-out infinite',
            }}>
              <span style={{ fontSize: 36 }}>✅</span>
            </div>

            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.9rem', lineHeight:1.15, marginBottom:12 }}>
              Check your inbox
            </h1>
            <p style={{ color:'var(--color-text-muted)', fontSize:'0.95rem', lineHeight:1.75, marginBottom:8 }}>
              We've sent a password reset link to:
            </p>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,198,255,0.1)',
              border: '1px solid rgba(0,198,255,0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 18px',
              fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)',
              marginBottom: 28,
            }}>{email}</div>

            <p style={{ color:'var(--color-text-faint)', fontSize:'0.85rem', lineHeight:1.7, marginBottom:32 }}>
              The link will expire in <strong style={{ color:'var(--color-text-muted)' }}>15 minutes</strong>. Check your spam folder if you don't see it.
            </p>

            {/* Steps */}
            <div style={{ textAlign:'left', marginBottom:36, display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { n:'1', text:'Open the email from NextHire' },
                { n:'2', text:'Click "Reset Password" button' },
                { n:'3', text:'Create your new secure password' },
              ].map(({ n, text }) => (
                <div key={n} style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(0,198,255,0.12)', border:'1px solid rgba(0,198,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:700, color:'var(--color-primary)', flexShrink:0 }}>{n}</div>
                  <span style={{ fontSize:'0.9rem', color:'var(--color-text-muted)' }}>{text}</span>
                </div>
              ))}
            </div>

            <button id="resend-btn" onClick={() => { setSent(false); }} style={{
              width:'100%', padding:'12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-text-muted)', fontWeight:600, fontSize:'0.9rem',
              fontFamily:'var(--font-body)', cursor:'pointer', marginBottom:16,
              transition:'all 0.2s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.09)';e.currentTarget.style.color='var(--color-text)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.color='var(--color-text-muted)';}}
            >
              ↩ Resend Email
            </button>

            <Link to="/login" id="back-login-success" style={{
              display:'block', width:'100%', padding:'12px',
              background: 'var(--gradient-brand)',
              borderRadius: 'var(--radius-full)', textAlign:'center',
              color:'#fff', fontWeight:700, fontSize:'0.95rem',
              boxShadow:'0 4px 20px rgba(0,114,255,0.3)',
            }}>
              Back to Sign In →
            </Link>
          </div>

        ) : (
          /* ── REQUEST STATE ── */
          <>
            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: 'linear-gradient(135deg, rgba(0,198,255,0.15), rgba(124,58,237,0.12))',
              border: '1px solid rgba(0,198,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, marginBottom: 24,
            }}>🔑</div>

            <h1 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.7rem,3vw,2.2rem)', lineHeight:1.1, marginBottom:10 }}>
              Forgot password?
            </h1>
            <p style={{ color:'var(--color-text-muted)', fontSize:'0.95rem', lineHeight:1.7, marginBottom:32 }}>
              No worries — enter your email and we'll send you a secure reset link within seconds.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email field */}
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="fp-email" style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'var(--color-text)' }}>
                  Email Address
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:17, opacity:0.5 }}>✉</span>
                  <input
                    id="fp-email" name="email" type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoFocus
                    style={{
                      width: '100%', padding: '13px 14px 13px 44px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${error ? '#ef4444' : 'var(--color-border-strong)'}`,
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text)', fontSize: '0.95rem',
                      outline: 'none', transition: 'all 0.2s',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={e=>{e.target.style.borderColor='var(--color-primary)';e.target.style.boxShadow='0 0 0 3px rgba(0,198,255,0.12)';}}
                    onBlur={e=>{e.target.style.borderColor=error?'#ef4444':'var(--color-border-strong)';e.target.style.boxShadow='none';}}
                  />
                </div>
                {error && (
                  <p style={{ color:'#ef4444', fontSize:'0.78rem', marginTop:6, display:'flex', alignItems:'center', gap:5 }}>
                    ⚠ {error}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button id="send-reset-btn" type="submit" disabled={loading} style={{
                width:'100%', padding:'14px',
                background: loading ? 'rgba(0,198,255,0.3)' : 'var(--gradient-brand)',
                border: 'none', borderRadius: 'var(--radius-full)',
                color: '#fff', fontWeight: 700, fontSize: '1rem',
                fontFamily: 'var(--font-body)', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(0,114,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                marginBottom: 20,
              }}
              onMouseEnter={e=>{if(!loading){e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 30px rgba(0,114,255,0.5)';}}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 20px rgba(0,114,255,0.35)';}}
              >
                {loading ? (
                  <>
                    <span style={{ width:18,height:18,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin 0.75s linear infinite' }} />
                    Sending reset link…
                  </>
                ) : '📧 Send Reset Link'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ flex:1, height:1, background:'var(--color-border)' }} />
              <span style={{ fontSize:'0.75rem', color:'var(--color-text-faint)' }}>or</span>
              <div style={{ flex:1, height:1, background:'var(--color-border)' }} />
            </div>

            {/* Back to login */}
            <Link to="/login" id="back-login" style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              padding:'12px', borderRadius:'var(--radius-full)',
              border:'1px solid var(--color-border-strong)',
              background:'rgba(255,255,255,0.04)',
              color:'var(--color-text-muted)', fontWeight:600, fontSize:'0.9rem',
              transition:'all 0.2s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.color='var(--color-text)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.color='var(--color-text-muted)';}}
            >
              ← Back to Sign In
            </Link>

            {/* Help text */}
            <p style={{ textAlign:'center', marginTop:24, fontSize:'0.8rem', color:'var(--color-text-faint)', lineHeight:1.6 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color:'var(--color-primary)', fontWeight:600 }}>Sign up free →</Link>
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg);}to{transform:rotate(360deg);} }
        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(6,214,160,0.2); }
          50%      { box-shadow: 0 0 0 12px rgba(6,214,160,0); }
        }
        input::placeholder { color: rgba(238,242,255,0.3); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px rgba(8,15,30,0.95) inset !important;
          -webkit-text-fill-color: #eef2ff !important;
        }
      `}</style>
    </div>
  );
}
