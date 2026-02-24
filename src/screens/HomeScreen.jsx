import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
          {/* Indigo/Dark Blue Map Theme */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          
          <div style={styles.mapOverlay}></div>
          
          {/* Where to? Search Bar inside Map */}
          <div style={styles.floatingSearch}>
             <div style={styles.glassSearch}>
                <span style={{color: '#00FF9D'}}>📍</span>
                <span style={{color: '#B0B7C3', marginLeft: '10px'}}>Where to?</span>
                <button style={styles.rideNowSmall}>Ride Now ❯</button>
             </div>
          </div>
        </MapContainer>
      </div>

      {/* 2. QUICK LINKS (Set Pickup, Wallet, Promos) */}
      <div style={styles.quickActions}>
        <div style={styles.actionPill}>📍 Set Pickup</div>
        <div style={styles.actionPill}>💳 Wallet</div>
        <div style={styles.actionPill}>⭐ Promotions</div>
      </div>

      {/* 3. PRIMARY RIDE CARD (As per Screenshot) */}
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

      {/* 4. SERVICE GRID (Polished Glass Buttons) */}
      <div style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div key={i} style={{...styles.glassButton, borderColor: `${s.color}66`}} onClick={() => navigate(s.path)}>
            <div style={styles.iconBox}>{s.icon}</div>
            <div style={styles.label}>{s.name}</div>
            <div style={{...styles.bottomGlow, background: s.color}}></div>
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
    border: '1px solid rgba(0, 255, 157, 0.3)', marginBottom: '15px',
    boxShadow: '0 0 25px rgba(0, 255, 157, 0.15)', position: 'relative'
  },
  leafletMap: { height: '100%', width: '100%' },
  mapOverlay: { position: 'absolute', inset: 0, background: 'rgba(5, 10, 20, 0.3)', pointerEvents: 'none', zIndex: 400 },

  floatingSearch: { position: 'absolute', bottom: '15px', width: '100%', zIndex: 500, display: 'flex', justifyContent: 'center' },
  glassSearch: { 
    width: '90%', background: 'rgba(10, 20, 30, 0.85)', backdropFilter: 'blur(12px)',
    borderRadius: '20px', padding: '8px 15px', display: 'flex', alignItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  rideNowSmall: { marginLeft: 'auto', background: '#00FF9D', border: 'none', borderRadius: '15px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold' },

  quickActions: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '20px' },
  actionPill: { 
    flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '15px', 
    padding: '10px 5px', fontSize: '11px', textAlign: 'center', color: '#fff',
    border: '1px solid rgba(0, 255, 157, 0.2)', fontWeight: 'bold'
  },

  mainRideHero: {
    background: 'linear-gradient(135deg, rgba(10, 25, 35, 0.9), rgba(0, 255, 157, 0.05))',
    borderRadius: '25px', padding: '20px', marginBottom: '20px',
    border: '1px solid #00FF9D', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', boxShadow: 'inset 0 0 20px rgba(0, 255, 157, 0.1)'
  },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  carGraphic: { fontSize: '45px', filter: 'drop-shadow(0 0 10px #00FF9D)' },
  heroTitle: { color: '#fff', fontSize: '18px', fontWeight: '900', margin: 0 },
  heroSub: { color: '#B0B7C3', fontSize: '12px', margin: 0 },
  bookNowBtn: { background: '#00FF9D', color: '#050A14', border: 'none', borderRadius: '14px', padding: '10px 18px', fontWeight: '900', fontSize: '12px' },

  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  glassButton: {
    background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(15px)',
    borderRadius: '22px', padding: '20px 10px', textAlign: 'center',
    border: '1px solid', position: 'relative', overflow: 'hidden'
  },
  iconBox: { fontSize: '30px', marginBottom: '8px' },
  label: { color: '#fff', fontSize: '13px', fontWeight: '900', letterSpacing: '0.5px' },
  bottomGlow: { position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', opacity: 0.6, filter: 'blur(3px)' }
};

export default HomeScreen;
