import React from 'react';
import { useNavigate } from 'react-router-dom';
import RideMap from '../components/RideMap'; // آپ کا موجودہ میپ کمپوننٹ

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* 2. HERO SECTION (Live Map) */}
      <section style={styles.heroSection}>
        <div style={styles.mapContainer}>
          <RideMap /> {/* لیفلیٹ نقشہ یہاں چلے گا */}
          <div style={styles.searchOverlay}>
            <div style={styles.searchBar}>
              <span style={{marginRight: '10px'}}>🔍</span>
              <input type="text" placeholder="Where to?" style={styles.searchInput} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTION ROW */}
      <div style={styles.quickActionRow}>
        <div style={styles.actionItem} onClick={() => navigate('/ride')}>
          <div style={styles.actionIcon}>📍</div>
          <span style={styles.actionLabel}>Set Pickup</span>
        </div>
        <div style={styles.actionItem} onClick={() => navigate('/pay')}>
          <div style={styles.actionIcon}>💰</div>
          <span style={styles.actionLabel}>Wallet</span>
        </div>
        <div style={styles.actionItem}>
          <div style={styles.actionIcon}>🎁</div>
          <span style={styles.actionLabel}>Promos</span>
        </div>
      </div>

      {/* 4. PRIMARY RIDE CARD */}
      <section style={styles.primaryCard} onClick={() => navigate('/ride')}>
        <div style={styles.cardContent}>
          <h2 style={{margin: 0, fontSize: '20px'}}>🚗 Ride Anywhere</h2>
          <p style={{fontSize: '12px', color: '#B0B7C3'}}>Fast. Safe. Affordable.</p>
          <button style={styles.bookNowBtn}>Book Now</button>
        </div>
      </section>

      {/* 5. SERVICE GRID (2 Column) */}
      <section style={styles.serviceGrid}>
        <div style={styles.serviceCard} onClick={() => navigate('/food')}>
          <span style={styles.serviceIcon}>🍔</span>
          <h3 style={styles.serviceTitle}>Food</h3>
        </div>
        <div style={styles.serviceCard} onClick={() => navigate('/shop')}>
          <span style={styles.serviceIcon}>🛒</span>
          <h3 style={styles.serviceTitle}>Shop</h3>
        </div>
        <div style={styles.serviceCard}>
          <span style={styles.serviceIcon}>📦</span>
          <h3 style={styles.serviceTitle}>Parcel</h3>
        </div>
        <div style={styles.serviceCard}>
          <span style={styles.serviceIcon}>🏨</span>
          <h3 style={styles.serviceTitle}>Booking</h3>
        </div>
      </section>

      {/* 7. APP INSTALL BANNER */}
      <div style={styles.installBanner}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <span>🚀</span>
          <div>
            <div style={{fontSize: '12px', fontWeight: 'bold'}}>Install Tezro App</div>
            <div style={{fontSize: '10px', color: '#B0B7C3'}}>Faster & Better Experience</div>
          </div>
        </div>
        <button style={styles.installBtn}>Install Now</button>
      </div>
    </div>
  );
};

// الیکٹرک بلیو پرنٹ کے مطابق اسٹائلز
const styles = {
  container: { padding: '16px', paddingTop: '0px' },
  
  heroSection: { height: '320px', marginBottom: '24px', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)' },
  mapContainer: { height: '100%', width: '100%', position: 'relative' },
  searchOverlay: { position: 'absolute', top: '20px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000 },
  searchBar: { width: '85%', background: 'rgba(10, 15, 25, 0.7)', backdropFilter: 'blur(15px)', borderRadius: '30px', padding: '10px 20px', display: 'flex', alignItems: 'center', border: '1px solid rgba(0, 255, 157, 0.3)' },
  searchInput: { background: 'none', border: 'none', color: 'white', outline: 'none', width: '100%' },

  quickActionRow: { display: 'flex', justifyContent: 'space-around', marginBottom: '24px', gap: '16px' },
  actionItem: { textAlign: 'center', cursor: 'pointer' },
  actionIcon: { width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '8px', border: '1px solid rgba(0, 255, 157, 0.1)' },
  actionLabel: { fontSize: '12px', color: '#B0B7C3' },

  primaryCard: { width: '100%', height: '140px', background: 'linear-gradient(135deg, #0A0F19 0%, #162030 100%)', borderRadius: '22px', border: '1px solid rgba(0, 255, 157, 0.2)', padding: '20px', marginBottom: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' },
  bookNowBtn: { marginTop: '15px', padding: '10px 25px', background: 'linear-gradient(to right, #00FF9D, #00C3FF)', border: 'none', borderRadius: '14px', fontWeight: 'bold', color: '#0A0F19', boxShadow: '0 5px 15px rgba(0, 255, 157, 0.4)' },

  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  serviceCard: { height: '130px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s', cursor: 'pointer' },
  serviceIcon: { fontSize: '32px', marginBottom: '10px' },
  serviceTitle: { fontSize: '16px', fontWeight: '500' },

  installBanner: { position: 'fixed', bottom: '80px', left: '16px', right: '16px', height: '70px', background: 'rgba(10, 15, 25, 0.8)', backdropFilter: 'blur(15px)', borderRadius: '18px', border: '1px solid rgba(0, 255, 157, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 900 },
  installBtn: { background: '#00FF9D', color: '#0A0F19', border: 'none', padding: '8px 15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px' }
};

export default HomeScreen;
