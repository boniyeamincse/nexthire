import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { slotId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  // Mock slot and tutor data
  const slotData = {
    tutorName: 'Sarah Chen',
    tutorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    date: 'Jun 02, 2026',
    time: '10:00 AM',
    duration: '60 Minutes',
    price: 150,
    fee: 5,
  };

  const handlePayment = async () => {
    setLoading(true);
    // Simulate API call for payment processing
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    alert('Payment Successful! Your interview is booked.');
    navigate('/student/profile');
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-bg-base)', fontFamily: 'var(--font-body)', color: '#fff' }}>
      <header style={{
        padding: '20px 48px', borderBottom: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center'
      }}>
        <Link to={`/tutors`} style={{ color: '#00c6ff', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          ← Back to Profile
        </Link>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: 8 }}>Secure Checkout</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Complete your booking to secure the interview slot.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(320px, 0.8fr)', gap: 48, alignItems: 'start' }}>
          
          {/* Payment Details */}
          <section>
            <h2 style={{ fontSize: '1.4rem', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>Payment Method</h2>
            
            <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
              {/* Stripe Option */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 24,
                border: `2px solid ${paymentMethod === 'stripe' ? '#00c6ff' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)', background: paymentMethod === 'stripe' ? 'rgba(0,198,255,0.05)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#00c6ff', width: 20, height: 20 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>Credit or Debit Card</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Powered by Stripe</div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>💳</div>
              </label>

              {/* bKash Option */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 24,
                border: `2px solid ${paymentMethod === 'bkash' ? '#e2136e' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)', background: paymentMethod === 'bkash' ? 'rgba(226,19,110,0.05)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <input type="radio" name="payment" value="bkash" checked={paymentMethod === 'bkash'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#e2136e', width: 20, height: 20 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>bKash Mobile Payment</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Secure mobile banking</div>
                </div>
                <div style={{ fontWeight: 900, color: '#e2136e', background: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: '0.9rem' }}>bKash</div>
              </label>

              {/* SSLCommerz Option */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: 24,
                border: `2px solid ${paymentMethod === 'ssl' ? '#00c6ff' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)', background: paymentMethod === 'ssl' ? 'rgba(0,198,255,0.05)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <input type="radio" name="payment" value="ssl" checked={paymentMethod === 'ssl'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#00c6ff', width: 20, height: 20 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>SSLCommerz</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Net banking & mobile wallets</div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>🏦</div>
              </label>
            </div>

            {paymentMethod === 'stripe' && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>CVC</label>
                    <input type="text" placeholder="123" style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bkash' && (
              <div style={{ background: 'rgba(226,19,110,0.05)', padding: 24, borderRadius: 'var(--radius-lg)', border: '1px solid rgba(226,19,110,0.3)', textAlign: 'center' }}>
                <p style={{ color: '#fff', marginBottom: 16 }}>You will be redirected to the bKash payment gateway to complete your purchase securely.</p>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <section style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', position: 'sticky', top: 40 }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--color-border)' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
              <img src={slotData.tutorAvatar} alt="Tutor" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{slotData.tutorName}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Mock Interview Session</div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Date</span>
                <span style={{ fontWeight: 600 }}>{slotData.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Time</span>
                <span style={{ fontWeight: 600 }}>{slotData.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Duration</span>
                <span style={{ fontWeight: 600 }}>{slotData.duration}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px dashed var(--color-border)', margin: '24px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Session Fee</span>
              <span>${slotData.price.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Platform Fee</span>
              <span>${slotData.fee.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#06d6a0' }}>${(slotData.price + slotData.fee).toFixed(2)}</span>
            </div>

            <button onClick={handlePayment} disabled={loading} style={{
              width: '100%', padding: '16px', borderRadius: 'var(--radius-full)',
              background: 'var(--gradient-brand)', color: '#fff', fontSize: '1.1rem', fontWeight: 800,
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1, boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
            }}>
              {loading ? 'Processing...' : `Pay $${(slotData.price + slotData.fee).toFixed(2)}`}
            </button>
            <div style={{ textAlign: 'center', marginTop: 16, color: 'var(--color-text-faint)', fontSize: '0.85rem' }}>
              🔒 Guaranteed safe & secure checkout
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
