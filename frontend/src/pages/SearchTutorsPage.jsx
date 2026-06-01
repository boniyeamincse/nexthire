import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import api from '../services/api'; // Commented out until we connect to real backend for this page

const MOCK_TUTORS = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior SWE at Google',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 4.9,
    reviews: 124,
    rate: 150,
    tags: ['System Design', 'Algorithms', 'Go'],
  },
  {
    id: 2,
    name: 'Michael Ross',
    title: 'Engineering Manager at Meta',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    rating: 4.8,
    reviews: 89,
    rate: 200,
    tags: ['Leadership', 'Behavioral', 'React'],
  },
  {
    id: 3,
    name: 'Priya Patel',
    title: 'Staff Engineer at Stripe',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    rating: 5.0,
    reviews: 210,
    rate: 175,
    tags: ['Frontend', 'System Design', 'TypeScript'],
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Ex-Amazon SDE II',
    avatar: 'https://i.pravatar.cc/150?u=david',
    rating: 4.7,
    reviews: 56,
    rate: 90,
    tags: ['Algorithms', 'Java', 'Data Structures'],
  },
];

export default function SearchTutorsPage() {
  const { user, logout } = useAuth();
  const [tutors, setTutors] = useState(MOCK_TUTORS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    domain: '',
    priceMax: 300,
  });

  /* 
  // Real backend integration will look like this:
  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const response = await api.get('/tutors', { params: filters });
        setTutors(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, [filters]);
  */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--color-bg-base)',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-text)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(12px)'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff' }}>N</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>NextHire</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/tutors" style={{ color: '#00c6ff', fontWeight: 600, textDecoration: 'none' }}>Find a Tutor</Link>
          <Link to="/student/profile" style={{ color: 'var(--color-text)', fontWeight: 600, textDecoration: 'none' }}>My Profile</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 24, borderLeft: '1px solid var(--color-border)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #00c6ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem' }}>
                {user?.name?.charAt(0) || 'S'}
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 24px' }}>Sign In</Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, maxWidth: 1400, margin: '0 auto', width: '100%', padding: '40px 24px', gap: 48 }}>
        
        {/* Sidebar Filters */}
        <aside style={{ width: 280, flexShrink: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>Filters</h2>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>Domain / Skills</label>
            <select name="domain" value={filters.domain} onChange={handleFilterChange} style={{
              width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)', outline: 'none'
            }}>
              <option value="">All Domains</option>
              <option value="software_engineering">Software Engineering</option>
              <option value="product_management">Product Management</option>
              <option value="data_science">Data Science</option>
              <option value="design">Product Design</option>
            </select>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 8 }}>
              Max Hourly Rate: ${filters.priceMax}
            </label>
            <input type="range" name="priceMax" min="50" max="500" step="10" value={filters.priceMax} onChange={handleFilterChange} style={{ width: '100%', accentColor: '#00c6ff' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-faint)', marginTop: 4 }}>
              <span>$50</span><span>$500+</span>
            </div>
          </div>
          
          <button style={{
            width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--color-border-strong)', borderRadius: 'var(--radius-md)',
            color: 'var(--color-text)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
          }} onClick={() => setFilters({ domain: '', priceMax: 300 })}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
            Reset Filters
          </button>
        </aside>

        {/* Results Grid */}
        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Top Tutors</h1>
            <div style={{ color: 'var(--color-text-muted)' }}>Showing {tutors.length} results</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {tutors.filter(t => t.rate <= filters.priceMax).map(tutor => (
              <Link to={`/tutors/${tutor.id}`} key={tutor.id} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)', padding: 24, cursor: 'pointer',
                  transition: 'all 0.3s', position: 'relative', overflow: 'hidden'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,198,255,0.5)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  
                  <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                    <img src={tutor.avatar} alt={tutor.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{tutor.name}</h3>
                      <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{tutor.title}</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★</span>
                      <span style={{ fontWeight: 700, color: '#fff' }}>{tutor.rating}</span>
                      <span style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem' }}>({tutor.reviews})</span>
                    </div>
                    <div style={{ width: 1, height: 16, background: 'var(--color-border)' }} />
                    <div style={{ fontWeight: 700, color: '#06d6a0' }}>${tutor.rate}<span style={{ color: 'var(--color-text-faint)', fontSize: '0.8rem', fontWeight: 400 }}>/hr</span></div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {tutor.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '4px 10px', background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem', color: 'var(--color-text-muted)'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </Link>
            ))}
          </div>

          {tutors.filter(t => t.rate <= filters.priceMax).length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: 8 }}>No tutors found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
