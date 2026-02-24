import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'RIDE', icon: '🚗', path: '/ride' },
    { name: 'FOOD', icon: '🍔', path: '/food' },
    { name: 'SHOP', icon: '🛍️', path: '/shop' },
    { name: 'PARCEL', icon: '📦', path: '/parcel' },
    { name: 'HOTEL', icon: '🏨', path: '/hotels' },
    { name: 'PAY', icon: '💳', path: '/pay' }
  ];

  return (
    <div style={styles.container}>
      {/* --- LEAFLET MAP HERO --- */}
      <section style={styles.mapHero}>
        <MapContainer 
          center={[31.4504, 73.1350]} zoom={13} 
          style={{ height: '100%', width: '100%' }} zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <div style={styles.mapOverlay}></div>
        </MapContainer>
      </section>

      {/* --- PRIMARY RIDE CARD WITH ELECTRIC RED BORDER --- */}
      <div style={styles.electricCard} onClick={() => navigate('/ride')}>
        <div style={styles.cardInternal}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <div style={styles.carIcon}>🚗</div>
            <div>
              <h2 style={styles.cardTitle}>TEZRO RIDE</h2>
              <p style={styles.cardSub}>High-Voltage Speed</p>
            </div>
          </div>
          <button style={styles.actionBtn}>BOOK NOW</button>
        </div>
      </div>

      {/* --- SERVICE GRID --- */}
      <div style={styles.grid}>
        {services.map((s, i) => (
          <div key={i} style={styles.gridButton} onClick={() => navigate(s.path)}>
            <div style={styles.iconWrapper}>{s.icon}</div>
            <span style={styles.label}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    background: '#050A14', minHeight: '100vh', padding: '20px', 
    paddingTop: '80px', fontFamily: "'Inter', sans-serif" 
  },

  mapHero: {
    height: '220px', borderRadius: '24px', overflow: 'hidden',
    border: '1px solid rgba(255, 50, 50, 0.3)', marginBottom: '25px',
    boxShadow: '0 0 20px rgba(255, 0, 0, 0.15)', position: 'relative'
  },

  mapOverlay: { position: 'absolute', inset: 0, background: 'rgba(5, 10, 20, 0.4)', pointerEvents: 'none' },

  // الیکٹرک ریڈ باؤنڈری (اوپر باریک، نیچے موٹی)
  electricCard: {
    background: 'linear-gradient(to bottom, #ff3232 1px, #ff0000 4px)', // اوپر 1px نیچے 4px
    padding: '0 0 4px 0', // نیچے کی موٹائی کے لیے سپیس
    borderRadius: '24px',
    marginBottom: '20px',
    boxShadow: '0 10px 30px rgba(255, 0, 0, 0.2), 0 0 15px rgba(255, 0, 0, 0.1)',
    cursor: 'pointer'
  },

  cardInternal: {
    background: '#0D1117',
    borderRadius: '22px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  cardTitle: { color: '#fff', fontSize: '20px', fontWeight: '900', margin: 0 },
  cardSub: { color: '#ff3232', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' },
  actionBtn: { background: '#ff3232', border: 'none', color: '#fff', fontWeight: '900', padding: '10px 15px', borderRadius: '10px' },
  carIcon: { fontSize: '40px', filter: 'drop-shadow(0 0 10px #ff3232)' },

  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' },

  // گرڈ بٹنز کے لیے الیکٹرک ریڈ ڈیزائن
  gridButton: {
    background: 'linear-gradient(to bottom, rgba(255, 50, 50, 0.2) 1px, #ff0000 3px)', 
    padding: '0 0 3px 0',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    overflow: 'hidden'
  },

  iconWrapper: {
    background: '#0D1117',
    padding: '20px 10px 10px',
    fontSize: '30px',
    borderRadius: '18px 18px 0 0'
  },

  label: {
    background: '#0D1117',
    display: 'block',
    padding: '0 10px 15px',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '800',
    borderRadius: '0 0 18px 18px'
  }
};

export default HomeScreen;
