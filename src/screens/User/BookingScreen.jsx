import React, { useState } from 'react';
import { useTezroSettings } from '../../hooks/useTezroSettings'; // وہی ہک جو ڈرائیور کے لیے بنایا تھا
import { useLiveDrivers } from '../../hooks/useLiveDrivers';

const BookingScreen = () => {
  const { fares } = useTezroSettings();
  const drivers = useLiveDrivers();
  const [distance, setDistance] = useState(5); // فرض کریں 5 کلومیٹر کا فاصلہ ہے

  // 💰 کرایے کا حساب (ایڈمن کے سمارٹ رولز کے مطابق)
  const estimatedFare = distance * fares.base * fares.surge;

  return (
    <div style={styles.container}>
      {/* میپ کا حصہ */}
      <div style={styles.mapArea}>
        <p style={styles.statusBadge}>Nearby Drivers: {drivers.length}</p>
        {/* یہاں آپ کا Google Map کمپوننٹ آئے گا جہاں drivers.map استعمال ہوگا */}
      </div>

      {/* بکنگ کارڈ */}
      <div style={styles.bookingCard}>
        <div style={styles.priceRow}>
          <span style={styles.label}>Estimated Fare</span>
          <span style={styles.price}>PKR {estimatedFare.toFixed(0)}</span>
        </div>
        
        {fares.surge > 1 && (
          <small style={{ color: '#D4AF37' }}>⚡ High demand pricing active</small>
        )}

        <button 
          disabled={drivers.length === 0}
          style={{...styles.confirmBtn, opacity: drivers.length === 0 ? 0.5 : 1}}
        >
          {drivers.length > 0 ? "Book Tezro Now" : "No Drivers Available"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', flexDirection: 'column', background: '#000' },
  mapArea: { flex: 1, position: 'relative', background: '#111' },
  statusBadge: { position: 'absolute', top: 20, left: 20, background: '#D4AF37', color: '#000', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' },
  bookingCard: { background: '#1A0F0A', padding: '25px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', border: '1px solid #D4AF37' },
  priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  price: { fontSize: '24px', fontWeight: 'bold', color: '#F3E5AB' },
  confirmBtn: { width: '100%', padding: '15px', background: '#D4AF37', border: 'none', borderRadius: '15px', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer' }
};

export default BookingScreen;
