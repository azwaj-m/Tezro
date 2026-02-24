import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'RIDE', icon: '🚗', path: '/ride', glow: '#00FF88' },
    { name: 'FOOD', icon: '🍔', path: '/food', glow: '#FFD700' },
    { name: 'SHOP', icon: '🛍️', path: '/shop', glow: '#00C3FF' },
    { name: 'PARCEL', icon: '📦', path: '/parcel', glow: '#FF4D4D' },
    { name: 'HOTEL', icon: '🏨', path: '/hotels', glow: '#A855F7' },
    { name: 'PAY', icon: '💳', path: '/pay', glow: '#00FF88' }
  ];

  return (
    <div style={styles.container}>
      {/* --- HERO SECTION: LIVE MAP --- */}
      <section style={styles.mapCard}>
        <div style={styles.mapOverlay}>
          <div style={styles.searchBar}>
            <span style={{color: '#00FF88'}}>📍</span>
            <span style={styles.searchText}>Where would you like to go?</span>
          </div>
        </div>
      </section>

      {/* --- RIDE HERO: THE GLOSSY MASTER --- */}
      <div style={styles.rideHero} onClick={() => navigate('/ride')}>
        <div style={styles.rideContent}>
          <h2 style={styles.heroTitle}>TEZRO RIDE</h2>
          <p style={styles.heroSub}>Electric Speed • Premium Safety</p>
          <button style={styles.electricBtn}>BOOK NOW ⚡</button>
        </div>
        <div style={styles.heroIcon}>🚗</div>
      </div>

      {/* --- SERVICES GRID: THE GLASS COLLECTION --- */}
      <div style={styles.grid}>
        {services.map((s, i) => (
          <div key={i} style={{...styles.glassCard, '--glow': s.glow}} onClick={() => navigate(s.path)}>
            <div style={styles.cardGlow}></div>
            <div style={styles.iconWrapper}>{s.icon}</div>
            <span style={styles.serviceLabel}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    background: '#020406', minHeight: '100vh', padding: '20px', 
    paddingTop: '80px', fontFamily: "'Inter', sans-serif" 
  },
  
  mapCard: {
    height: '200px', borderRadius: '24px', marginBottom: '25px',
    background: 'linear-gradient(rgba(0,255,136,0.1), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=1000") center/cover',
    border: '1px solid rgba(0, 255, 136, 0.3)', position: 'relative',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.15)'
  },

  mapOverlay: { position: 'absolute', bottom: '15px', width: '100%', display: 'flex', justifyContent: 'center' },
  searchBar: { 
    width: '85%', background: 'rgba(15, 25, 35, 0.8)', backdropFilter: 'blur(12px)',
    borderRadius: '15px', padding: '12px 20px', display: 'flex', alignItems: 'center',
    gap: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#888' 
  },

  rideHero: {
    background: 'linear-gradient(135deg, rgba(10, 20, 30, 0.8), rgba(0, 255, 136, 0.05))',
    borderRadius: '24px', padding: '25px', marginBottom: '25px', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
    border: '1px solid rgba(0, 255, 136, 0.4)', backdropFilter: 'blur(10px)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 15px rgba(0, 255, 136, 0.1)'
  },

  heroTitle: { fontSize: '22px', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '1px' },
  heroSub: { fontSize: '12px', color: '#00FF88', fontWeight: '600', marginTop: '5px' },
  electricBtn: { 
    marginTop: '15px', padding: '10px 20px', background: '#00FF88', 
    border: 'none', borderRadius: '12px', fontWeight: '900', color: '#000',
    boxShadow: '0 0 15px #00FF88' 
  },
  heroIcon: { fontSize: '50px', filter: 'drop-shadow(0 0 10px #00FF88)' },

  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' },
  
  glassCard: {
    background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px',
    padding: '20px 10px', textAlign: 'center', cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative',
    overflow: 'hidden', transition: '0.3s', backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  },

  // یہ وہ "نکھار" ہے جو آپ کو چاہیے تھا
  cardGlow: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
    background: 'linear-gradient(90deg, transparent, #00FF88, transparent)',
    opacity: 0.5
  },

  iconWrapper: { fontSize: '30px', marginBottom: '10px' },
  serviceLabel: { fontSize: '11px', fontWeight: '800', color: '#fff', letterSpacing: '0.5px' }
};

export default HomeScreen;
