import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride' },
    { name: 'Food', icon: '🍔', path: '/food' },
    { name: 'Shop', icon: '🛒', path: '/shop' },
    { name: 'Parcel', icon: '📦', path: '/parcel' },
    { name: 'Booking', icon: '🏢', path: '/hotels' }
  ];

  return (
    <div style={{ ...styles.container, background: theme.bg }}>
      
      {/* 🌙 Mode Switcher */}
      <button 
        onClick={() => theme.setDarkMode(!theme.darkMode)} 
        style={{ ...styles.modeBtn, background: theme.card, color: theme.border, borderColor: theme.border }}
      >
        {theme.darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* 1. MAP WITH THEME ADAPTATION */}
      <div style={{ ...styles.mapFrame, borderColor: theme.border, boxShadow: theme.shadow }}>
        <MapContainer center={[31.4504, 73.1350]} zoom={13} style={{ height: '100%' }} zoomControl={false}>
          <TileLayer url={theme.darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} 
          />
          <div style={styles.floatingSearch}>
            <div style={{ ...styles.glassSearch, background: theme.card, borderColor: theme.border }}>
              <span style={{ color: theme.border }}>📍</span>
              <input 
                style={{ ...styles.input, color: theme.text }} 
                placeholder="Where to go?" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button style={{ ...styles.goBtn, background: theme.border, color: theme.darkMode ? '#000' : '#fff' }}>Go</button>
            </div>
          </div>
        </MapContainer>
      </div>

      {/* 2. ELECTRIC RIDE HERO (Wave Boundary) */}
      <div style={{
        ...styles.rideHero, 
        background: theme.card,
        borderColor: theme.border,
        boxShadow: theme.shadow
      }} onClick={() => navigate('/ride')}>
        <div style={styles.heroContent}>
          <div style={{ ...styles.car, filter: `drop-shadow(0 0 8px ${theme.border})` }}>🚗</div>
          <div>
            <h2 style={{ color: theme.text, margin: 0, fontSize: '18px' }}>Ride Anywhere</h2>
            <p style={{ color: theme.border, fontSize: '11px', fontWeight: 'bold', margin: 0 }}>Fast • Safe • Affordable</p>
          </div>
        </div>
        <button style={{ ...styles.bookBtn, background: theme.border, color: theme.darkMode ? '#000' : '#fff' }}>Book Now</button>
      </div>

      {/* 3. SERVICE GRID (Electric Shine) */}
      <div style={styles.grid}>
        {services.map((s, i) => (
          <div key={i} style={{
            ...styles.serviceCard, 
            background: theme.card,
            borderColor: theme.border,
            boxShadow: `0 8px 15px -5px ${theme.border}44`
          }} onClick={() => navigate(s.path)}>
            <div style={styles.icon}>{s.icon}</div>
            <div style={{ ...styles.label, color: theme.text }}>{s.name}</div>
            <div style={{ ...styles.bottomGlow, background: theme.border }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '16px', minHeight: '100vh', transition: '0.4s ease', paddingTop: '70px' },
  modeBtn: { position: 'fixed', top: '15px', right: '15px', zIndex: 1100, padding: '6px 12px', borderRadius: '12px', border: '1px solid', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  mapFrame: { height: '230px', borderRadius: '25px', overflow: 'hidden', border: '2px solid', position: 'relative', marginBottom: '20px' },
  floatingSearch: { position: 'absolute', bottom: '15px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000 },
  glassSearch: { width: '90%', padding: '10px 15px', borderRadius: '18px', display: 'flex', alignItems: 'center', backdropFilter: 'blur(10px)', border: '1px solid' },
  input: { background: 'none', border: 'none', marginLeft: '10px', outline: 'none', flex: 1, fontSize: '14px' },
  goBtn: { border: 'none', borderRadius: '10px', padding: '5px 15px', fontWeight: 'bold', cursor: 'pointer' },
  rideHero: { borderRadius: '25px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderStyle: 'solid', borderWidth: '1px 1px 5px 1px', marginBottom: '20px', cursor: 'pointer' },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  car: { fontSize: '42px' },
  bookBtn: { border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: '900', fontSize: '12px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  serviceCard: { borderRadius: '20px', padding: '15px 5px', textAlign: 'center', borderStyle: 'solid', borderWidth: '1px 1px 4px 1px', position: 'relative', overflow: 'hidden' },
  icon: { fontSize: '28px', marginBottom: '5px' },
  label: { fontSize: '12px', fontWeight: '900' },
  bottomGlow: { position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', filter: 'blur(4px)', opacity: 0.6 }
};

export default HomeScreen;
