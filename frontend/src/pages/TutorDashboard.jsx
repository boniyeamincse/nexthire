import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileSettingsCard from '../components/ProfileSettingsCard';

// Dummy data for upcoming tutor sessions
const upcomingSessions = [
  { id: 1, student: 'John Doe', topic: 'System Design Mock', date: '02 Jun 2026', time: '10:00 AM', status: 'Upcoming', link: 'https://zoom.us/j/123' },
  { id: 2, student: 'Alice Smith', topic: 'Behavioral Prep', date: '02 Jun 2026', time: '02:00 PM', status: 'Upcoming', link: 'https://zoom.us/j/456' },
];

export default function TutorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        .tutor-dashboard-shell {
          min-height: 100dvh;
          background:
            radial-gradient(circle at top right, rgba(99, 102, 241, 0.16), transparent 28%),
            radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 22%),
            linear-gradient(180deg, #f8fbff 0%, #eef3ff 100%);
          color: #10203c;
          font-family: var(--font-body);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(15, 35, 73, 0.08);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        .stat-card {
          padding: 24px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.88));
          border: 1px solid rgba(15, 35, 73, 0.08);
          border-radius: 24px;
          box-shadow: 0 12px 32px rgba(80, 112, 169, 0.08);
          position: relative;
          overflow: hidden;
        }
        .stat-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          top: -20px;
          right: -20px;
          filter: blur(40px);
          opacity: 0.15;
        }
        .btn-primary {
          background: linear-gradient(135deg, #7dd3fc, #38bdf8);
          color: #06203d;
          font-weight: 800;
          padding: 12px 24px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(56, 189, 248, 0.3);
          transition: transform 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
        }
        .table-wrap {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(15, 35, 73, 0.08);
          border-radius: 20px;
          overflow: hidden;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th, .table td {
          padding: 16px 24px;
          text-align: left;
          border-bottom: 1px solid rgba(15, 35, 73, 0.05);
        }
        .table th {
          background: rgba(248, 250, 252, 0.5);
          color: #64748b;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
        }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(16, 32, 60, 0.6);
          display: flex; align-items: center; justify-content: center; z-index: 100;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: #fff; width: 100%; max-width: 500px; border-radius: 24px;
          padding: 32px; box-shadow: 0 24px 50px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="tutor-dashboard-shell">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient-brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>N</div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#10203c' }}>NextHire Tutor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #00c6ff, #7c3aed)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {user?.name?.charAt(0) || 'T'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user?.name || 'Tutor User'}</span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Premium Tutor</span>
              </div>
            </div>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>Logout</button>
          </div>
        </header>

        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 8, color: '#10203c' }}>Dashboard Overview</h1>
              <p style={{ color: '#475569', fontSize: '1.05rem' }}>Manage your schedule, earnings, and upcoming mock interviews.</p>
            </div>
            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>+ Create Interview Slot</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 48 }}>
            {[
              { label: 'Upcoming Sessions', value: '2', color: '#38bdf8' },
              { label: 'Completed Interviews', value: '45', color: '#10b981' },
              { label: 'Total Earnings (June)', value: '$1,250', color: '#6366f1' },
            ].map(stat => (
              <div key={stat.label} className="stat-card">
                <div className="stat-glow" style={{ background: stat.color }} />
                <div style={{ color: '#64748b', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: 12 }}>{stat.label}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10203c' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 24 }}>Upcoming Sessions</h2>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Topic</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingSessions.map(session => (
                    <tr key={session.id}>
                      <td style={{ fontWeight: 700 }}>{session.student}</td>
                      <td style={{ color: '#475569' }}>{session.topic}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{session.date}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{session.time}</div>
                      </td>
                      <td>
                        <span style={{ padding: '6px 12px', background: 'rgba(56, 189, 248, 0.15)', color: '#0ea5e9', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700 }}>
                          {session.status}
                        </span>
                      </td>
                      <td>
                        <button style={{ padding: '8px 16px', background: '#10203c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                          Join Room
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <ProfileSettingsCard />

        </main>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>Create Interview Slot</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 24 }}>Open up a new time slot in your calendar for students to book.</p>
            
            <form onSubmit={e => { e.preventDefault(); setShowCreateModal(false); alert('Slot created successfully!'); }}>
              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                <label>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Topic / Category</span>
                  <select style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none' }}>
                    <option>System Design</option>
                    <option>Behavioral</option>
                    <option>Algorithms</option>
                  </select>
                </label>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <label>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Date</span>
                    <input type="date" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none' }} />
                  </label>
                  <label>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Start Time</span>
                    <input type="time" style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none' }} />
                  </label>
                </div>

                <label>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}>Price ($)</span>
                  <input type="number" defaultValue={150} style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none' }} />
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-primary">Publish Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
