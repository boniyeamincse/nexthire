import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TutorApplyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: '', email: '', linkedin: '', phone: '',
    domain: '', experience: '', skills: '',
    rate: '', bio: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.name) e.name = 'Name is required';
      if (!form.email) e.email = 'Email is required';
      if (!form.linkedin) e.linkedin = 'LinkedIn URL is required';
    } else if (step === 2) {
      if (!form.domain) e.domain = 'Primary domain is required';
      if (!form.experience) e.experience = 'Experience is required';
    } else if (step === 3) {
      if (!form.rate) e.rate = 'Hourly rate is required';
      if (!form.bio) e.bio = 'Bio is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handlePrev = () => {
    setStep(s => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  const inputStyle = (err) => ({
    width: '100%', padding: '12px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${err ? '#ef4444' : 'var(--color-border-strong)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)', fontSize: '0.95rem',
    outline: 'none', transition: 'all 0.2s',
    fontFamily: 'var(--font-body)',
    marginBottom: '8px'
  });

  if (success) {
    return (
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-bg-base)', fontFamily: 'var(--font-body)'
      }}>
        <div style={{
          maxWidth: 500, padding: 48, textAlign: 'center',
          background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-strong)'
        }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 16 }}>Application Submitted!</h1>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
            Thank you for applying to become a NextHire tutor. Our team will review your application and get back to you within 48 hours.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary">Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'var(--color-bg-base)', fontFamily: 'var(--font-body)'
    }}>
      {/* Header */}
      <header style={{ padding: '24px 48px', borderBottom: '1px solid var(--color-border)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff' }}>N</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>NextHire Tutor</span>
        </Link>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 600 }}>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: step >= i ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'
              }} />
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: 40, borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 8 }}>
              {step === 1 && 'Personal Information'}
              {step === 2 && 'Professional Experience'}
              {step === 3 && 'Availability & Pricing'}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>
              {step === 1 && 'Tell us about yourself.'}
              {step === 2 && 'What domains can you interview candidates for?'}
              {step === 3 && 'Set your rates and availability.'}
            </p>

            {/* Step 1 */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} style={inputStyle(errors.name)} placeholder="John Doe" />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.name}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle(errors.email)} placeholder="john@example.com" />
                  {errors.email && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.email}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>LinkedIn URL *</label>
                  <input name="linkedin" value={form.linkedin} onChange={handleChange} style={inputStyle(errors.linkedin)} placeholder="https://linkedin.com/in/johndoe" />
                  {errors.linkedin && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.linkedin}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle()} placeholder="+880 1..." />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Primary Domain *</label>
                  <select name="domain" value={form.domain} onChange={handleChange} style={inputStyle(errors.domain)}>
                    <option value="">Select a domain</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Design">UI/UX Design</option>
                  </select>
                  {errors.domain && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.domain}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Years of Experience *</label>
                  <input name="experience" type="number" value={form.experience} onChange={handleChange} style={inputStyle(errors.experience)} placeholder="e.g., 5" />
                  {errors.experience && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.experience}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Key Skills (comma separated)</label>
                  <input name="skills" value={form.skills} onChange={handleChange} style={inputStyle()} placeholder="React, Node.js, System Design" />
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Hourly Rate (BDT) *</label>
                  <input name="rate" type="number" value={form.rate} onChange={handleChange} style={inputStyle(errors.rate)} placeholder="e.g., 1500" />
                  {errors.rate && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.rate}</div>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem' }}>Short Bio *</label>
                  <textarea name="bio" value={form.bio} onChange={handleChange} style={{ ...inputStyle(errors.bio), minHeight: 120 }} placeholder="Briefly describe your experience and interviewing style..." />
                  {errors.bio && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.bio}</div>}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--color-border)' }}>
              {step > 1 ? (
                <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 'var(--radius-full)', cursor: 'pointer' }}>Back</button>
              ) : <div></div>}
              
              {step < 3 ? (
                <button onClick={handleNext} className="btn btn-primary">Next Step</button>
              ) : (
                <button onClick={handleSubmit} disabled={loading} className="btn btn-primary" style={{ minWidth: 140 }}>
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
