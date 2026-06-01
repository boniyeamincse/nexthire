import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSettingsCard from '../components/ProfileSettingsCard';
import RecentBookingsTable from '../components/RecentBookingsTable';
import NotificationPanel from '../components/NotificationPanel';

const recentBookings = [
  { title: 'Cyber Security Interview', tutor: 'Mr. Rahim', date: '01 Jun 2026', time: '08:00 PM', payment: 'Paid', status: 'Confirmed', action: 'Join Room' },
  { title: 'DevOps Mock Interview', tutor: 'Mr. Hasan', date: '05 Jun 2026', time: '09:00 PM', payment: 'Paid', status: 'Upcoming', action: 'View' },
  { title: 'HR Interview', tutor: 'Ms. Ayesha', date: '10 Jun 2026', time: '07:30 PM', payment: 'Pending', status: 'Pending', action: 'Pay Now' },
];

const notifications = [
  { text: 'Your interview starts in 30 minutes.', time: 'Just now' },
  { text: 'Payment successful for Cyber Security Interview.', time: '12 minutes ago' },
  { text: 'Your scorecard is ready to review.', time: '1 hour ago' },
];

export default function StudentProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-bg-base)', fontFamily: 'var(--font-body)' }}>
      {/* Navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff' }}>N</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>NextHire</span>
          </Link>
          <nav style={{ display: 'flex', gap: 24 }}>
            <Link to="/tutors" style={{ color: 'var(--color-text-muted)', fontWeight: 600, textDecoration: 'none' }}>Find a Tutor</Link>
            <Link to="/student/profile" style={{ color: '#00c6ff', fontWeight: 600, textDecoration: 'none' }}>My Profile</Link>
          </nav>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #00c6ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>
              {user?.name?.charAt(0) || 'S'}
            </div>
            <span style={{ color: '#fff', fontWeight: 600 }}>{user?.name || 'Student'}</span>
          </div>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontWeight: 600 }}>Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff', marginBottom: 8 }}>My Profile</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Manage your account settings, view bookings, and stay updated.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(320px, 1fr)', gap: 32, marginBottom: 40 }}>
          <section>
            <RecentBookingsTable bookings={recentBookings} />
          </section>
          <section>
            <NotificationPanel notifications={notifications} />
          </section>
        </div>

        {/* The Enterprise ProfileSettingsCard handles its own internal layout */}
        <ProfileSettingsCard />
        
      </main>
    </div>
  );
}
