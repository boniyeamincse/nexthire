import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const MOCK_TUTOR = {
  id: 1,
  name: 'Sarah Chen',
  title: 'Senior SWE at Google',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  rating: 4.9,
  reviews: 124,
  rate: 150,
  about: 'I have conducted over 200 technical interviews at Google and Meta. I specialize in system design, scalable architecture, and behavioral interviewing. My goal is to help you confidently navigate the big tech hiring process.',
  tags: ['System Design', 'Algorithms', 'Go', 'Behavioral'],
  experience: '8+ years',
  interviewsCompleted: 340
};

const MOCK_SLOTS = [
  { id: 101, date: '2026-06-02', time: '10:00 AM', status: 'available' },
  { id: 102, date: '2026-06-02', time: '02:00 PM', status: 'available' },
  { id: 103, date: '2026-06-03', time: '11:00 AM', status: 'available' },
  { id: 104, date: '2026-06-03', time: '04:00 PM', status: 'booked' },
  { id: 105, date: '2026-06-04', time: '09:00 AM', status: 'available' },
];

export default function TutorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2026-06-02');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const availableDates = [...new Set(MOCK_SLOTS.map(s => s.date))];
  const slotsForDate = MOCK_SLOTS.filter(s => s.date === selectedDate);

  const handleBook = () => {
    if (selectedSlot) {
      navigate(`/checkout/${selectedSlot.id}`);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-bg-base)', fontFamily: 'var(--font-body)' }}>
      {/* Navbar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff' }}>N</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>NextHire</span>
        </Link>
        <Link to="/tutors" style={{ color: '#00c6ff', fontWeight: 600, textDecoration: 'none' }}>← Back to Search</Link>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(340px, 1fr)', gap: 48, alignItems: 'start' }}>
        
        {/* Left Column: Tutor Details */}
        <section>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 32 }}>
            <img src={MOCK_TUTOR.avatar} alt={MOCK_TUTOR.name} style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid rgba(0, 198, 255, 0.2)', objectFit: 'cover' }} />
            <div>
              <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: '#fff', marginBottom: 8 }}>{MOCK_TUTOR.name}</h1>
              <p style={{ fontSize: '1.2rem', color: '#00c6ff', fontWeight: 600, marginBottom: 12 }}>{MOCK_TUTOR.title}</p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--color-text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f59e0b', fontWeight: 700 }}><span style={{ fontSize: '1.2rem' }}>★</span> {MOCK_TUTOR.rating} ({MOCK_TUTOR.reviews} reviews)</span>
                <span>•</span>
                <span>{MOCK_TUTOR.experience} exp</span>
                <span>•</span>
                <span>{MOCK_TUTOR.interviewsCompleted} sessions</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {MOCK_TUTOR.tags.map(tag => (
              <span key={tag} style={{
                padding: '6px 14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem', color: '#fff', fontWeight: 600
              }}>{tag}</span>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: 16 }}>About Me</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>{MOCK_TUTOR.about}</p>
          </div>
        </section>

        {/* Right Column: Booking Widget */}
        <section style={{
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-xl)',
          padding: 32,
          boxShadow: '0 24px 50px rgba(0,0,0,0.3)',
          position: 'sticky',
          top: 100
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>Session Rate</div>
              <div style={{ fontSize: '2rem', color: '#06d6a0', fontWeight: 800 }}>${MOCK_TUTOR.rate}<span style={{ fontSize: '1rem', color: 'var(--color-text-faint)', fontWeight: 400 }}>/hr</span></div>
            </div>
            <div style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.9rem' }}>⚡ Fast Response</div>
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: 16 }}>Select a Date</h3>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 16 }}>
            {availableDates.map(date => {
              const d = new Date(date);
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = d.getDate();
              const isSelected = selectedDate === date;
              return (
                <button key={date} onClick={() => { setSelectedDate(date); setSelectedSlot(null); }} style={{
                  flexShrink: 0, width: 64, height: 76, borderRadius: '16px',
                  background: isSelected ? 'var(--gradient-brand)' : 'rgba(255,255,255,0.05)',
                  border: isSelected ? 'none' : '1px solid var(--color-border)',
                  color: isSelected ? '#fff' : 'var(--color-text)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 8px 20px rgba(124, 58, 237, 0.4)' : 'none'
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8 }}>{dayName}</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>{dayNum}</span>
                </button>
              );
            })}
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: 16 }}>Available Slots</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
            {slotsForDate.map(slot => {
              const isSelected = selectedSlot?.id === slot.id;
              const isBooked = slot.status === 'booked';
              return (
                <button key={slot.id} disabled={isBooked} onClick={() => setSelectedSlot(slot)} style={{
                  padding: '12px', borderRadius: '12px',
                  background: isSelected ? 'rgba(0, 198, 255, 0.15)' : isBooked ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isSelected ? '#00c6ff' : 'var(--color-border)'}`,
                  color: isBooked ? 'var(--color-text-faint)' : isSelected ? '#00c6ff' : '#fff',
                  fontWeight: 600, cursor: isBooked ? 'not-allowed' : 'pointer',
                  textDecoration: isBooked ? 'line-through' : 'none'
                }}>
                  {slot.time}
                </button>
              );
            })}
            {slotsForDate.length === 0 && <div style={{ gridColumn: '1 / -1', color: 'var(--color-text-muted)' }}>No slots available on this date.</div>}
          </div>

          <button disabled={!selectedSlot} onClick={handleBook} style={{
            width: '100%', padding: '16px', borderRadius: 'var(--radius-full)',
            background: 'var(--gradient-brand)', color: '#fff', fontSize: '1.1rem', fontWeight: 800,
            border: 'none', cursor: selectedSlot ? 'pointer' : 'not-allowed',
            opacity: selectedSlot ? 1 : 0.5, transition: 'all 0.2s',
            boxShadow: selectedSlot ? '0 10px 25px rgba(124, 58, 237, 0.4)' : 'none'
          }}>
            Proceed to Book {selectedSlot ? `(${selectedSlot.time})` : ''}
          </button>
        </section>

      </main>
    </div>
  );
}
