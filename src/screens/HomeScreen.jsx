import React from 'react';
import { useNavigate } from 'react-router-dom';
import RideMap from '../components/RideMap';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'FOOD', icon: '🍔', path: '/food', color: '#FFD700' },
    { name: 'SHOP', icon: '🛒', path: '/shop', color: '#00C3FF' },
    { name: 'PARCEL', icon: '📦', path: '/parcel', color: '#FF4D4D' },
    { name: 'HOTELS', icon: '🏨', path: '/hotels', color: '#A855F7' }
  ];

  return (
    <div style={styles.container}>
      {/* 2️⃣ HERO SECTION (Live Map) */}
      <section style={styles.heroSection}>
        <div style={styles.mapContainer}>
          <RideMap /> 
          <div style={styles.searchOverlay}>
            <div style={styles.searchBar}>
              <span style={{fontSize: '18px'}}>🔍</span>
              <input type="text" placeholder="Search for a destination..." style={styles.searchInput} />
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ PRIMARY RIDE CARD (Electric Look) */}
      <section style={styles.primaryCard} onClick={() => navigate('/ride')}>
        <div style={styles.cardContent}>
          <h2 style={styles.primaryTitle}>TEZRO RIDE</h2>
          <p style={styles.primaryDesc}>Fastest pickup in 3 minutes</p>
          <button style={styles.bookNowBtn}>BOOK NOW ⚡</button>
        </div>
        <div style={styles.cardIconLarge}>🚗</div>
      </section>

      {/* 5️⃣ SERVICE GRID (Bold & Beautiful) */}
      <section style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div key={i} style={styles.serviceCard} onClick={() => navigate(s.path)}>
            <div style={styles.serviceIcon}>{s.icon}</div>
            <h3 style={styles.serviceName}>{s.name}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

const styles = {
  container: { padding: '16px', background: '#05080A', minHeight: '100vh' },
  
  heroSection: { height: '280px', marginBottom: '24px', borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(0, 255, 157, 0.3)', boxShadow: '0 0 25px rgba(0, 255, 157, 0.15)' },
  mapContainer: { height: '100%', width: '100%', position: 'relative' },
  searchOverlay: { position: 'absolute', bottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 },
  searchBar: { width: '85%', background: 'rgba(10, 15, 25, 0.85)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '12px 15px', display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)' },
  searchInput: { background: 'none', border: 'none', color: 'white', outline: 'none', marginLeft: '10px', fontSize: '14px', width: '100%' },

  primaryCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)', borderRadius: '24px', border: '1px solid #00FF9D', padding: '24px', marginBottom: '24px', cursor: 'pointer', boxShadow: '0 10px 40px rgba(0, 255, 157, 0.1)' },
  primaryTitle: { margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '1px', color: '#fff' },
  primaryDesc: { fontSize: '13px', color: '#00FF9D', fontWeight: 'bold', margin: '5px 0' },
  bookNowBtn: { marginTop: '15px', padding: '10px 20px', background: '#00FF9D', border: 'none', borderRadius: '12px', fontWeight: '900', color: '#05080A', fontSize: '12px', cursor: 'pointer' },
  cardIconLarge: { fontSize: '60px', opacity: 0.8 },

  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  serviceCard: { height: '120px', background: '#0D1117', borderRadius: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)', transition: '0.3s', cursor: 'pointer' },
  serviceIcon: { fontSize: '32px', marginBottom: '8px' },
  serviceName: { fontSize: '15px', fontWeight: '900', color: '#FFFFFF', letterSpacing: '1px' },
};

export default HomeScreen;
