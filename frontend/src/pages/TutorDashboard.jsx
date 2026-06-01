import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TutorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-bg-base)',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 48px',
          borderBottom: '1px solid var(--color-border)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#fff',
            }}
          >
            N
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#fff',
            }}
          >
            NextHire
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00c6ff, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              {user?.name?.charAt(0) || 'T'}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user?.name || 'Tutor'}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: 8 }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Tutor'}! 👋
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: 40 }}>
          Here is your tutoring overview, upcoming interview sessions, and earnings snapshot.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
            marginBottom: 48,
          }}
        >
          {[
            { label: 'Upcoming Sessions', value: '4', color: '#00c6ff' },
            { label: 'Completed Interviews', value: '18', color: '#06d6a0' },
            { label: 'This Month Revenue', value: '$420', color: '#7c3aed' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 24,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: stat.color,
                  filter: 'blur(40px)',
                  opacity: 0.2,
                }}
              />
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(0, 198, 255, 0.1), rgba(124, 58, 237, 0.08))',
            border: '1px solid rgba(0, 198, 255, 0.3)',
            borderRadius: 'var(--radius-xl)',
            padding: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 8, color: '#fff' }}>Grow your tutoring presence</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
              Update your schedule, review bookings, and manage session performance from one place.
            </p>
          </div>
          <button className="btn btn-primary">Manage Sessions →</button>
        </div>
      </main>
    </div>
  );
}
