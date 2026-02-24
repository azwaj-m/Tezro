import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* --- TOP HEADER AREA (Logo & Notifications) --- */}
      <div style={styles.header}>
        <div style={styles.menuIcon}>☰</div>
        <div style={styles.logoContainer}>
          <img src="/assets/logo.png" alt="TEZRO" style={styles.logoImg} />
        </div>
        <div style={styles.notifIcon}>🔔<span style={styles.notifBadge}>1</span></div>
      </div>

      {/* --- HERO SECTION: MAP LAYER --- */}
      <section style={styles.mapHero}>
        <div style={styles.mapBlur}>
           {/* یہاں نقشہ (Map) بیک گراؤنڈ میں چلے گا */}
           <div style={styles.mapPlaceholder}></div>
        </div>
        
        {/* Floating Search in Map */}
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
             <span style={styles.iconGreen}>📍</span>
             <span style={styles.searchText}>Where to?</span>
          </div>
          <button style={styles.rideNowBtn} onClick={() => navigate('/ride')}>
            Ride Now ❯
          </button>
        </div>
      </section>

      {/* --- QUICK ACTIONS ROW --- */}
      <div style={styles.quickRow}>
        <div style={styles.glassAction}><span style={styles.iconGreen}>📍</span> Set Pickup</div>
        <div style={styles.glassAction}><span style={styles.iconGreen}>💳</span> Wallet</div>
        <div style={styles.glassAction}><span style={styles.iconGold}>⭐</span> Promotions</div>
      </div>

      {/* --- PRIMARY RIDE HERO CARD --- */}
      <section style={styles.rideHeroCard} onClick={() => navigate('/ride')}>
        <div style={styles.carGraphic}>🚗</div>
        <div style={styles.cardInfo}>
          <h2 style={styles.cardTitle}>Ride Anywhere</h2>
          <p style={styles.cardSub}>Fast. Safe. Affordable.</p>
          <button style={styles.bookBtn}>Book Now ❯</button>
        </div>
      </section>

      {/* --- SERVICE GRID (2x3 Layout) --- */}
      <div style={styles.serviceGrid}>
        <div style={styles.gridCard} onClick={() => navigate('/ride')}>
          <div style={styles.gridIcon}>📍</div>
          <div style={styles.gridLabel}>Ride</div>
        </div>
        <div style={{...styles.gridCard, borderColor: '#FFA500'}}>
          <div style={styles.gridIcon}>🍔</div>
          <div style={styles.gridLabel}>Food</div>
        </div>
        <div style={{...styles.gridCard, borderColor: '#00C3FF'}}>
          <div style={styles.gridIcon}>🛒</div>
          <div style={styles.gridLabel}>Shop</div>
        </div>
        <div style={{...styles.gridCard, borderColor: '#00FF88'}}>
          <div style={styles.gridIcon}>📦</div>
          <div style={styles.gridLabel}>Parcel</div>
        </div>
        <div style={{...styles.gridCard, borderColor: '#A855F7', gridColumn: 'span 1'}}>
          <div style={styles.gridIcon}>🏢</div>
          <div style={styles.gridLabel}>Booking</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#02060a url("https://www.transparenttextures.com/patterns/stardust.png")',
    minHeight: '100vh',
    padding: '15px',
    paddingTop: '60px',
    color: '#fff',
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
    padding: '0 20px', zIndex: 1000, background: 'rgba(2, 6, 10, 0.8)'
  },
  logoImg: { height: '25px', filter: 'drop-shadow(0 0 5px #00FF88)' },
  notifBadge: { position: 'absolute', top: '-5px', right: '-5px', background: 'red', borderRadius: '50%', padding: '2px 5px', fontSize: '10px' },
  
  mapHero: {
    height: '240px', borderRadius: '25px', overflow: 'hidden',
    position: 'relative', border: '1px solid rgba(0, 255, 136, 0.3)',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)', marginBottom: '15px'
  },
  mapPlaceholder: { width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000") center/cover' },
  
  searchContainer: {
    position: 'absolute', bottom: '15px', left: '10px', right: '10px',
    display: 'flex', gap: '10px', alignItems: 'center'
  },
  searchBox: {
    flex: 1, background: 'rgba(10, 20, 30, 0.8)', backdropFilter: 'blur(10px)',
    borderRadius: '20px', padding: '10px 15px', border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', alignItems: 'center', gap: '10px'
  },
  rideNowBtn: {
    background: '#00FF88', color: '#000', border: 'none', borderRadius: '20px',
    padding: '10px 15px', fontWeight: '900', fontSize: '12px'
  },

  quickRow: { display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' },
  glassAction: {
    flex: 1, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
    borderRadius: '15px', padding: '10px', fontSize: '11px', textAlign: 'center',
    border: '1px solid rgba(0, 255, 136, 0.2)', fontWeight: 'bold'
  },

  rideHeroCard: {
    background: 'rgba(0, 255, 136, 0.05)', borderRadius: '25px',
    border: '2px solid rgba(0, 255, 136, 0.3)', padding: '20px',
    display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px',
    boxShadow: 'inset 0 0 15px rgba(0, 255, 136, 0.1)'
  },
  carGraphic: { fontSize: '60px', textShadow: '0 0 20px #00FF88' },
  cardTitle: { fontSize: '20px', fontWeight: '900', margin: 0 },
  cardSub: { fontSize: '12px', color: '#888', margin: '5px 0' },
  bookBtn: {
    background: '#00FF88', color: '#000', border: 'none', padding: '8px 15px',
    borderRadius: '15px', fontWeight: 'bold', marginTop: '10px'
  },

  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' },
  gridCard: {
    background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)',
    borderRadius: '15px', padding: '20px 10px', textAlign: 'center',
    border: '1px solid rgba(0, 255, 136, 0.3)', transition: '0.3s'
  },
  gridIcon: { fontSize: '28px', marginBottom: '8px' },
  gridLabel: { fontSize: '13px', fontWeight: 'bold' },

  iconGreen: { color: '#00FF88' },
  iconGold: { color: '#FFA500' }
};

export default HomeScreen;
