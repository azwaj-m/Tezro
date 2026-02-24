import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride', color: '#00FF9D' },
    { name: 'Food', icon: '🍔', path: '/food', color: '#FFA500' },
    { name: 'Shop', icon: '🛒', path: '/shop', color: '#00C3FF' },
    { name: 'Parcel', icon: '📦', path: '/parcel', color: '#00FF9D' },
    { name: 'Booking', icon: '🏢', path: '/hotels', color: '#A855F7' }
  ];

  return (
    <div style={styles.container}>
      {/* 1. HERO SECTION WITH LEAFLET MAP */}
      <div style={styles.mapFrame}>
        <MapContainer 
          center={[31.4504, 73.1350]} zoom={13} 
          style={styles.leafletMap} zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <div style={styles.mapOverlay}></div>
          
          {/* Active Search Bar inside Map */}
          <div style={styles.floatingSearch}>
             <div style={styles.glassSearch}>
                <span style={{color: '#00FF9D'}}>📍</span>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  style={styles.activeInput}
                />
                <button style={styles.rideNowSmall} onClick={() => navigate('/ride')}>Ride Now ❯</button>
             </div>
          </div>
        </MapContainer>
      </div>

      {/* 2. QUICK LINKS */}
      <div style={styles.quickActions}>
        <div style={styles.actionPill}>📍 Set Pickup</div>
        <div style={styles.actionPill}>💳 Wallet</div>
        <div style={styles.actionPill}>⭐ Promotions</div>
      </div>

      {/* 3. PRIMARY RIDE CARD */}
      <div style={styles.mainRideHero} onClick={() => navigate('/ride')}>
        <div style={styles.heroContent}>
           <div style={styles.carGraphic}>🚗</div>
           <div>
              <h2 style={styles.heroTitle}>Ride Anywhere</h2>
              <p style={styles.heroSub}>Fast. Safe. Affordable.</p>
           </div>
        </div>
        <button style={styles.bookNowBtn}>Book Now ❯</button>
      </div>

      {/* 4. SERVICE GRID (Electric Red Borders) */}
      <div style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div key={i} style={styles.glassButton} onClick={() => navigate(s.path)}>
            <div style={styles.iconBox}>{s.icon}</div>
            <div style={styles.label}>{s.name}</div>
            {/* نیچے والا مخصوص گلو جو برقی اثر پیدا کرے گا */}
            <div style={styles.electricRedBottom}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    background: '#050A14 url("https://www.transparenttextures.com/patterns/stardust.png")',
    minHeight: '100vh', padding: '16px', paddingTop: '70px', paddingBottom: '100px'
  },
  
  mapFrame: { 
    height: '240px', borderRadius: '28px', overflow: 'hidden', 
    border: '1px solid rgba(255, 68, 68, 0.4)', marginBottom: '15px',
    boxShadow: '0 0 20px rgba(255, 68, 68, 0.2)', position: 'relative'
  },
  leafletMap: { height: '100%', width: '100%' },
  mapOverlay: { position: 'absolute', inset: 0, background: 'rgba(5, 10, 20, 0.3)', pointerEvents: 'none', zIndex: 400 },

  floatingSearch: { position: 'absolute', bottom: '15px', width: '100%', zIndex: 500, display: 'flex', justifyContent: 'center' },
  glassSearch: { 
    width: '90%', background: 'rgba(10, 20, 30, 0.9)', backdropFilter: 'blur(12px)',
    borderRadius: '20px', padding: '5px 15px', display: 'flex', alignItems: 'center',
    border: '1px solid rgba(255, 68, 68, 0.3)', boxShadow: '0 4px 15px rgba(255, 68, 68, 0.2)'
  },
  activeInput: {
    background: 'none', border: 'none', color: '#fff', outline: 'none',
    marginLeft: '10px', fontSize: '14px', width: '100%'
  },
  rideNowSmall: { background: '#00FF9D', border: 'none', borderRadius: '15px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' },

  quickActions: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '20px' },
  actionPill: { 
    flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '15px', 
    padding: '10px 5px', fontSize: '11px', textAlign: 'center', color: '#fff',
    border: '1px solid rgba(255, 68, 68, 0.3)', fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(255, 68, 68, 0.1)'
  },

  mainRideHero: {
    background: 'linear-gradient(135deg, rgba(10, 25, 35, 0.9), rgba(255, 68, 68, 0.05))',
    borderRadius: '25px', padding: '20px', marginBottom: '20px',
    borderBottom: '3px solid #FF4444', borderLeft: '1px solid #FF4444', 
    borderRight: '1px solid #FF4444', borderTop: '0.5px solid #FF4444',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', boxShadow: '0 10px 20px rgba(255, 68, 68, 0.15)'
  },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  carGraphic: { fontSize: '45px', filter: 'drop-shadow(0 0 10px #00FF9D)' },
  heroTitle: { color: '#fff', fontSize: '18px', fontWeight: '900', margin: 0 },
  heroSub: { color: '#00FF9D', fontSize: '12px', margin: 0 },
  bookNowBtn: { background: '#00FF9D', color: '#050A14', border: 'none', borderRadius: '14px', padding: '10px 18px', fontWeight: '900', fontSize: '12px', cursor: 'pointer' },

  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  glassButton: {
    background: 'rgba(10, 15, 25, 0.8)', backdropFilter: 'blur(15px)',
    borderRadius: '22px', padding: '20px 10px', textAlign: 'center',
    position: 'relative', overflow: 'hidden', cursor: 'pointer',
    borderBottom: '3px solid #FF4444', // نیچے سے موٹی
    borderLeft: '1px solid #FF4444', 
    borderRight: '1px solid #FF4444', 
    borderTop: '0.5px solid rgba(255, 68, 68, 0.5)', // اوپر سے باریک
    boxShadow: '0 8px 15px rgba(255, 68, 68, 0.1)'
  },
  iconBox: { fontSize: '30px', marginBottom: '8px' },
  label: { color: '#fff', fontSize: '13px', fontWeight: '900', letterSpacing: '0.5px' },
  
  // بجلی جیسا چمکدار سایہ (Electric Glow)
  electricRedBottom: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    height: '4px', background: '#FF4444', 
    filter: 'blur(8px)', opacity: 0.6 
  }
};

export default HomeScreen;
