import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useTheme } from '../context/ThemeContext'; // تھیم انجن سے لنک
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // مرکزی تھیم کا استعمال
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride' },
    { name: 'Food', icon: '🍔', path: '/food' },
    { name: 'Shop', icon: '🛒', path: '/shop' },
    { name: 'Parcel', icon: '📦', path: '/parcel' },
    { name: 'Booking', icon: '🏢', path: '/hotels' }
  ];

  // اگر تھیم دستیاب نہ ہو تو کریش ہونے سے بچانے کے لیے محفوظ کلرز
  const activeTheme = theme || {
    bg: '#1A0F0A',
    card: 'rgba(45, 25, 15, 0.8)',
    border: '#D4AF37',
    text: '#F3E5AB',
    darkMode: true
  };

  return (
    <div style={{ ...styles.container, background: activeTheme.bg }}>
      
      {/* 1. MAP SECTION WITH DYNAMIC THEME */}
      <div style={{ ...styles.mapFrame, borderColor: activeTheme.border }}>
        <MapContainer center={[31.4504, 73.1350]} zoom={13} style={styles.leafletMap} zoomControl={false}>
          <TileLayer url={activeTheme.darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} 
          />
          <div style={styles.mapOverlay}></div>
          
          {/* Active Search Bar */}
          <div style={styles.floatingSearch}>
             <div style={{ ...styles.glassSearch, background: activeTheme.card, borderColor: activeTheme.border }}>
                <span style={{ color: activeTheme.border }}>📍</span>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ ...styles.searchInput, color: activeTheme.text }}
                />
                <button style={{ ...styles.rideNowSmall, background: activeTheme.border, color: activeTheme.darkMode ? '#000' : '#fff' }}>
                  Go ❯
                </button>
             </div>
          </div>
        </MapContainer>
      </div>

      {/* 2. QUICK ACTIONS (Pills) */}
      <div style={styles.quickActions}>
        {['📍 Pickup', '💳 Wallet', '⭐ Promos'].map((act) => (
          <div key={act} style={{
            ...styles.actionPill, 
            borderColor: activeTheme.border, 
            color: activeTheme.text,
            background: activeTheme.card,
            boxShadow: `0 4px 10px ${activeTheme.border}22`
          }}>
            {act}
          </div>
        ))}
      </div>

      {/* 3. PRIMARY RIDE CARD (Wave Boundary) */}
      <div style={{
        ...styles.mainRideHero, 
        background: activeTheme.card,
        borderColor: activeTheme.border,
        boxShadow: `0 15px 30px ${activeTheme.border}22`
      }} onClick={() => navigate('/ride')}>
        <div style={styles.heroContent}>
           <div style={{ ...styles.carGraphic, filter: `drop-shadow(0 0 10px ${activeTheme.border})` }}>🚗</div>
           <div>
              <h2 style={{ ...styles.heroTitle, color: activeTheme.text }}>Ride Anywhere</h2>
              <p style={{ color: activeTheme.border, fontSize: '12px', fontWeight: 'bold', margin: 0 }}>Fast. Safe. Affordable.</p>
           </div>
        </div>
        <button style={{ ...styles.bookNowBtn, background: activeTheme.border, color: activeTheme.darkMode ? '#000' : '#fff' }}>Book Now</button>
      </div>

      {/* 4. SERVICE GRID (Electric Buttons) */}
      <div style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div key={i} style={{
            ...styles.glassButton, 
            background: activeTheme.card,
            borderColor: activeTheme.border,
            boxShadow: `0 8px 15px -5px ${activeTheme.border}44`
          }} onClick={() => navigate(s.path)}>
            <div style={styles.iconBox}>{s.icon}</div>
            <div style={{ ...styles.label, color: activeTheme.text }}>{s.name}</div>
            {/* یہ نیچے والا حصہ بٹن میں نکھار لاتا ہے */}
            <div style={{ ...styles.bottomGlow, background: activeTheme.border }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', padding: '16px', paddingTop: '70px', transition: 'all 0.4s ease' },
  mapFrame: { height: '220px', borderRadius: '28px', overflow: 'hidden', border: '2px solid', marginBottom: '15px', position: 'relative' },
  leafletMap: { height: '100%', width: '100%' },
  mapOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', pointerEvents: 'none', zIndex: 400 },
  floatingSearch: { position: 'absolute', bottom: '15px', width: '100%', zIndex: 500, display: 'flex', justifyContent: 'center' },
  glassSearch: { width: '90%', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '8px 15px', display: 'flex', alignItems: 'center', border: '1px solid' },
  searchInput: { background: 'none', border: 'none', marginLeft: '10px', outline: 'none', flex: 1, fontSize: '14px' },
  rideNowSmall: { border: 'none', borderRadius: '10px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' },
  quickActions: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '20px' },
  actionPill: { flex: 1, borderRadius: '12px', padding: '10px 5px', fontSize: '11px', textAlign: 'center', border: '1px solid', fontWeight: 'bold' },
  mainRideHero: { borderRadius: '25px', padding: '20px', marginBottom: '20px', borderStyle: 'solid', borderWidth: '1px 1px 5px 1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  carGraphic: { fontSize: '42px' },
  heroTitle: { fontSize: '18px', fontWeight: '900', margin: 0 },
  bookNowBtn: { border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: '900', fontSize: '12px' },
  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  glassButton: { borderRadius: '22px', padding: '18px 10px', textAlign: 'center', borderStyle: 'solid', borderWidth: '1px 1px 4px 1px', position: 'relative', overflow: 'hidden' },
  iconBox: { fontSize: '28px', marginBottom: '8px' },
  label: { fontSize: '13px', fontWeight: '900', letterSpacing: '0.5px' },
  bottomGlow: { position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '3px', filter: 'blur(4px)', opacity: 0.7 }
};

export default HomeScreen;
