import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true); // آپ اسے ٹوگل کر سکتے ہیں
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride' },
    { name: 'Food', icon: '🍔', path: '/food' },
    { name: 'Shop', icon: '🛒', path: '/shop' },
    { name: 'Parcel', icon: '📦', path: '/parcel' },
    { name: 'Booking', icon: '🏢', path: '/hotels' }
  ];

  // ڈائنامک کلرز
  const theme = {
    bg: darkMode ? '#1A0F0A' : '#F8F9FA', // گہرا براؤن بمقابلہ سفید
    cardBg: darkMode ? 'rgba(45, 25, 15, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    border: darkMode ? '#D4AF37' : '#A855F7', // گولڈن بمقابلہ جامنی
    text: darkMode ? '#F3E5AB' : '#2D3436',
    mapTile: darkMode 
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  };

  return (
    <div style={{...styles.container, background: theme.bg}}>
      
      {/* 🌙 Mode Toggler (For Testing) */}
      <button onClick={() => setDarkMode(!darkMode)} style={styles.modeToggle}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* 1. MAP SECTION */}
      <div style={{...styles.mapFrame, borderColor: theme.border}}>
        <MapContainer center={[31.4504, 73.1350]} zoom={13} style={styles.leafletMap} zoomControl={false}>
          <TileLayer url={theme.mapTile} />
          <div style={styles.mapOverlay}></div>
          
          {/* Active Search Bar */}
          <div style={styles.floatingSearch}>
             <div style={{...styles.glassSearch, background: theme.cardBg}}>
                <span style={{color: theme.border}}>📍</span>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                <button style={{...styles.rideNowSmall, background: theme.border, color: darkMode ? '#000' : '#fff'}}>
                  Go ❯
                </button>
             </div>
          </div>
        </MapContainer>
      </div>

      {/* 2. QUICK ACTIONS */}
      <div style={styles.quickActions}>
        {['📍 Pickup', '💳 Wallet', '⭐ Promos'].map((act) => (
          <div key={act} style={{
            ...styles.actionPill, 
            borderColor: theme.border, 
            color: theme.text,
            boxShadow: `0 4px 10px ${theme.border}33`
          }}>
            {act}
          </div>
        ))}
      </div>

      {/* 3. PRIMARY RIDE CARD */}
      <div style={{
        ...styles.mainRideHero, 
        background: darkMode ? 'linear-gradient(135deg, #2D1B10, #3E2723)' : 'linear-gradient(135deg, #F3E5F5, #E1F5FE)',
        borderColor: theme.border,
        borderWidth: '1px 1px 4px 1px' // اوپر باریک، نیچے موٹی
      }} onClick={() => navigate('/ride')}>
        <div style={styles.heroContent}>
           <div style={{...styles.carGraphic, filter: `drop-shadow(0 0 10px ${theme.border})`}}>🚗</div>
           <div>
              <h2 style={{...styles.heroTitle, color: theme.text}}>Ride Anywhere</h2>
              <p style={{color: theme.border, fontSize: '12px', fontWeight: 'bold'}}>Fast. Safe. Affordable.</p>
           </div>
        </div>
        <button style={{...styles.bookNowBtn, background: theme.border, color: darkMode ? '#000' : '#fff'}}>Book Now</button>
      </div>

      {/* 4. SERVICE GRID */}
      <div style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div key={i} style={{
            ...styles.glassButton, 
            background: theme.cardBg,
            borderColor: theme.border,
            borderWidth: '1px 1px 4px 1px', // لہر دار اثر کے لیے نیچے سے موٹی بارڈر
            boxShadow: `0 10px 20px -5px ${theme.border}44`
          }} onClick={() => navigate(s.path)}>
            <div style={styles.iconBox}>{s.icon}</div>
            <div style={{...styles.label, color: theme.text}}>{s.name}</div>
            <div style={{...styles.bottomGlow, background: theme.border}}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', padding: '16px', paddingTop: '60px', transition: 'all 0.4s ease' },
  modeToggle: { position: 'fixed', top: '10px', right: '10px', zIndex: 2000, padding: '5px 10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '12px' },
  mapFrame: { height: '220px', borderRadius: '24px', overflow: 'hidden', border: '2px solid', marginBottom: '15px', position: 'relative' },
  leafletMap: { height: '100%', width: '100%' },
  mapOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', pointerEvents: 'none', zIndex: 400 },
  floatingSearch: { position: 'absolute', bottom: '15px', width: '100%', zIndex: 500, display: 'flex', justifyContent: 'center' },
  glassSearch: { width: '90%', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '8px 15px', display: 'flex', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' },
  searchInput: { background: 'none', border: 'none', color: 'inherit', marginLeft: '10px', outline: 'none', flex: 1, fontSize: '14px' },
  rideNowSmall: { border: 'none', borderRadius: '10px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' },
  quickActions: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '20px' },
  actionPill: { flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px 5px', fontSize: '11px', textAlign: 'center', border: '1px solid', fontWeight: 'bold' },
  mainRideHero: { borderRadius: '25px', padding: '20px', marginBottom: '20px', borderStyle: 'solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  carGraphic: { fontSize: '40px' },
  heroTitle: { fontSize: '18px', fontWeight: '900', margin: 0 },
  bookNowBtn: { border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: '900', fontSize: '12px' },
  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  glassButton: { borderRadius: '20px', padding: '18px 10px', textAlign: 'center', borderStyle: 'solid', position: 'relative', overflow: 'hidden' },
  iconBox: { fontSize: '28px', marginBottom: '8px' },
  label: { fontSize: '13px', fontWeight: '900', letterSpacing: '0.5px' },
  bottomGlow: { position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '3px', filter: 'blur(4px)', opacity: 0.7 }
};

export default HomeScreen;
