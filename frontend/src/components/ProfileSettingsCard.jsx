import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfileSettingsCard() {
  const { user, updateProfile, loading } = useAuth();
  
  // State for different sections
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    bio: 'Software Engineering student passionate about backend systems.',
    location: 'Dhaka, Bangladesh',
  });
  
  // Mock state for toggles
  const [toggles, setToggles] = useState({
    google: true,
    linkedin: false,
    emailAlerts: true,
    smsAlerts: false
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(f => ({
      ...f,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user?.name, user?.email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleToggle = (name) => {
    setToggles(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      if (updateProfile) {
        await updateProfile({
          name: form.name,
          email: form.email,
        });
      } else {
        // Mock save if updateProfile isn't fully implemented in AuthContext yet
        await new Promise(r => setTimeout(r, 1000));
      }
      setMessage('Profile updated successfully.');
    } catch (updateError) {
      setError(updateError.response?.data?.message || 'Profile update failed.');
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.6rem', color: '#10203c', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Account Settings</h2>
        <p style={{ color: '#475569', fontSize: '0.95rem' }}>Manage your profile, security, and preferences.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.6fr)', gap: 24, alignItems: 'start' }}>
        
        {/* Left Column: Main Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Section: Personal Info */}
          <section style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.88))',
            border: '1px solid rgba(15, 35, 73, 0.08)',
            borderRadius: '24px',
            padding: 32,
            boxShadow: '0 12px 32px rgba(80, 112, 169, 0.08)'
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#10203c', marginBottom: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#38bdf8' }}>👤</span> Personal Information
            </h3>
            
            <div style={{ display: 'flex', gap: 24, marginBottom: 32, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 90, height: 90, cursor: 'pointer' }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '24px',
                  background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.25)'
                }}>
                  {form.name ? form.name.charAt(0) : 'S'}
                </div>
                {/* Upload Overlay */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '24px',
                  background: 'rgba(16, 32, 60, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.2s', color: '#fff'
                }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  📷
                </div>
              </div>
              <div>
                <button type="button" style={{
                  padding: '8px 16px', background: 'transparent', color: '#163b74',
                  border: '1px solid rgba(22, 59, 116, 0.14)', borderRadius: '999px',
                  fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem'
                }}>Change Avatar</button>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 8 }}>JPG, GIF or PNG. Max size of 800K.</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Full Name</span>
                <input name="name" value={form.name} onChange={handleChange} style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(15, 35, 73, 0.12)', borderRadius: '14px',
                  color: '#10203c', outline: 'none', transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }} onFocus={e => e.target.style.borderColor = '#38bdf8'} onBlur={e => e.target.style.borderColor = 'rgba(15, 35, 73, 0.12)'} />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Location</span>
                <input name="location" value={form.location} onChange={handleChange} style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(15, 35, 73, 0.12)', borderRadius: '14px',
                  color: '#10203c', outline: 'none', transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }} onFocus={e => e.target.style.borderColor = '#38bdf8'} onBlur={e => e.target.style.borderColor = 'rgba(15, 35, 73, 0.12)'} />
              </label>

              <label style={{ display: 'block', gridColumn: '1 / -1' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Professional Bio</span>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(15, 35, 73, 0.12)', borderRadius: '14px',
                  color: '#10203c', outline: 'none', transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)', resize: 'vertical'
                }} onFocus={e => e.target.style.borderColor = '#38bdf8'} onBlur={e => e.target.style.borderColor = 'rgba(15, 35, 73, 0.12)'} />
              </label>
            </div>
          </section>

          {/* Section: Security */}
          <section style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.88))',
            border: '1px solid rgba(15, 35, 73, 0.08)',
            borderRadius: '24px',
            padding: 32,
            boxShadow: '0 12px 32px rgba(80, 112, 169, 0.08)'
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#10203c', marginBottom: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#6366f1' }}>🔒</span> Account Security
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Email Address</span>
                <input name="email" value={form.email} onChange={handleChange} type="email" style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(15, 35, 73, 0.12)', borderRadius: '14px',
                  color: '#10203c', outline: 'none', transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }} onFocus={e => e.target.style.borderColor = '#38bdf8'} onBlur={e => e.target.style.borderColor = 'rgba(15, 35, 73, 0.12)'} />
              </label>

              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Password</span>
                <button type="button" style={{
                  width: '100%', padding: '12px 16px', background: 'rgba(248, 250, 252, 0.88)',
                  border: '1px solid rgba(71, 85, 105, 0.12)', borderRadius: '14px',
                  color: '#475569', fontWeight: 600, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between'
                }}>
                  •••••••••••• <span style={{ color: '#38bdf8' }}>Change</span>
                </button>
              </div>
            </div>
          </section>

          {/* Action Area */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              {message && <div style={{ color: '#15803d', background: 'rgba(22, 163, 74, 0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>✓ {message}</div>}
              {error && <div style={{ color: '#b91c1c', background: 'rgba(220, 38, 38, 0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>⚠ {error}</div>}
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{
              padding: '12px 28px', background: 'linear-gradient(135deg, #7dd3fc, #38bdf8)',
              color: '#06203d', border: 'none', borderRadius: '999px',
              fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.95rem',
              boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)', opacity: loading ? 0.7 : 1, transition: 'all 0.2s'
            }} onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Right Column: Preferences & Integrations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Section: Connected Accounts */}
          <section style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.88))',
            border: '1px solid rgba(15, 35, 73, 0.08)',
            borderRadius: '24px',
            padding: 24,
            boxShadow: '0 12px 32px rgba(80, 112, 169, 0.08)'
          }}>
            <h3 style={{ fontSize: '1rem', color: '#10203c', marginBottom: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              🔗 Connected Accounts
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontWeight: 900 }}>G</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#10203c', fontSize: '0.9rem' }}>Google</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Connected</div>
                  </div>
                </div>
                <Toggle active={toggles.google} onClick={() => handleToggle('google')} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: '#0A66C2', border: '1px solid #0A66C2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900 }}>in</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#10203c', fontSize: '0.9rem' }}>LinkedIn</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Not connected</div>
                  </div>
                </div>
                <Toggle active={toggles.linkedin} onClick={() => handleToggle('linkedin')} />
              </div>
            </div>
          </section>

          {/* Section: Notifications */}
          <section style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.88))',
            border: '1px solid rgba(15, 35, 73, 0.08)',
            borderRadius: '24px',
            padding: 24,
            boxShadow: '0 12px 32px rgba(80, 112, 169, 0.08)'
          }}>
            <h3 style={{ fontSize: '1rem', color: '#10203c', marginBottom: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              🔔 Notifications
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#10203c', fontSize: '0.9rem' }}>Email Alerts</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Interview reminders and scorecards</div>
                </div>
                <Toggle active={toggles.emailAlerts} onClick={() => handleToggle('emailAlerts')} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#10203c', fontSize: '0.9rem' }}>SMS Alerts</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Important last-minute updates</div>
                </div>
                <Toggle active={toggles.smsAlerts} onClick={() => handleToggle('smsAlerts')} />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function Toggle({ active, onClick }) {
  return (
    <div onClick={onClick} style={{
      width: 44, height: 24, borderRadius: '12px',
      background: active ? '#38bdf8' : 'rgba(15, 35, 73, 0.1)',
      position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 2, left: active ? 22 : 2,
        transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </div>
  );
}
