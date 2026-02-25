import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useTheme } from '../context/ThemeContext'; 
import QuickAuthPopup from '../components/Auth/QuickAuthPopup'; // پاپ اپ امپورٹ کریں
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const activeTheme = theme || {
    bg: '#1A0F0A',
    card: 'rgba(45, 25, 15, 0.8)',
    border: '#D4AF37',
    text: '#F3E5AB',
    darkMode: true
  };

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride', type: 'RIDER' },
    { name: 'Food', icon: '🍔', path: '/food', type: 'BUYER' },
    { name: 'Shop', icon: '🛒', path: '/shop', type: 'BUYER' },
    { name: 'Parcel', icon: '📦', path: '/parcel', type: 'BUYER' },
    { name: 'Hotels', icon: '🏨', path: '/hotels', type: 'HOTEL' }
  ];

  // سروس سلیکٹ کرنے پر صرف نیویگیٹ کرے گا (آزادی)
  const handleServiceClick = (service) => {
    setSelectedService(service);
    navigate(service.path);
  };

  return (
    <div style={{ ...styles.container, background: activeTheme.bg }}>
      
      {/* --- HEADER --- */}
      <header style={{ ...styles.header, background: activeTheme.bg, borderBottom: `1px solid ${activeTheme.border}44` }}>
        <div style={{ color: activeTheme.border, fontWeight: 'bold', fontSize: '20px' }}>TEZRO</div>
        <button style={{ ...styles.installBtn, background: activeTheme.border }}>📲 Install App</button>
      </header>

      {/* 1. MAP SECTION */}
      <div style={{ ...styles.mapFrame, borderColor: activeTheme.border }}>
        <MapContainer center={[31.4504, 73.1350]} zoom={13} style={styles.leafletMap} zoomControl={false}>
          <TileLayer url={activeTheme.darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} 
          />
          <div style={styles.floatingSearch}>
             <div style={{ ...styles.glassSearch, background: activeTheme.card, borderColor: activeTheme.border }}>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  style={{ ...styles.searchInput, color: activeTheme.text }}
                />
                <button style={{ ...styles.rideNowSmall, background: activeTheme.border }}>Go ❯</button>
             </div>
          </div>
        </MapContainer>
      </div>

      {/* 2. PRIMARY RIDE CARD */}
      <div style={{ ...styles.mainRideHero, background: activeTheme.card, borderColor: activeTheme.border }} onClick={() => navigate('/ride')}>
        <div style={styles.heroContent}>
           <div style={styles.carGraphic}>🚗</div>
           <div>
              <h2 style={{ ...styles.heroTitle, color: activeTheme.text }}>Ride Anywhere</h2>
              <p style={{ color: activeTheme.border, fontSize: '11px' }}>Safe & Fast</p>
           </div>
        </div>
        <button style={{ ...styles.bookNowBtn, background: activeTheme.border }}>Book Now</button>
      </div>

      {/* 3. SERVICE GRID (5 Buttons Corrected) */}
      <div style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div 
            key={i} 
            style={{ ...styles.glassButton, background: activeTheme.card, borderColor: activeTheme.border }} 
            onClick={() => handleServiceClick(s)}
          >
            <div style={styles.iconBox}>{s.icon}</div>
            <div style={{ ...styles.label, color: activeTheme.text }}>{s.name}</div>
          </div>
        ))}
      </div>

      {/* --- FOOTER --- */}
      <footer style={{ ...styles.footer, background: activeTheme.bg, borderTop: `1px solid ${activeTheme.border}44` }}>
        {['🏠 Home', '🔍 Search', '📦 Orders', '👤 Profile'].map((tab, i) => (
          <div key={i} style={{ color: activeTheme.text, fontSize: '12px', cursor: 'pointer' }}>{tab}</div>
        ))}
      </footer>

      {/* رجسٹریشن پاپ اپ (صرف تب آئے گا جب سسٹم میں کنفرمیشن کال ہوگی) */}
      {showAuth && (
        <QuickAuthPopup 
          type={selectedService?.type} 
          onConfirm={() => { setShowAuth(false); alert("Confirmed!"); }}
        />
      )}
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', padding: '16px', paddingTop: '80px', paddingBottom: '80px' },
  header: { position: 'fixed', top: 0, left: 0, right: 0, height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', zIndex: 1000 },
  installBtn: { border: 'none', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' },
  mapFrame: { height: '180px', borderRadius: '22px', overflow: 'hidden', border: '1px solid', marginBottom: '15px', position: 'relative' },
  leafletMap: { height: '100%', width: '100%' },
  floatingSearch: { position: 'absolute', bottom: '10px', width: '100%', zIndex: 500, display: 'flex', justifyContent: 'center' },
  glassSearch: { width: '90%', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '5px 12px', display: 'flex', alignItems: 'center', border: '1px solid' },
  searchInput: { background: 'none', border: 'none', marginLeft: '10px', outline: 'none', flex: 1, fontSize: '14px' },
  rideNowSmall: { border: 'none', borderRadius: '8px', padding: '4px 10px', fontWeight: 'bold', cursor: 'pointer' },
  mainRideHero: { borderRadius: '20px', padding: '15px', marginBottom: '15px', borderStyle: 'solid', borderWidth: '1px 1px 4px 1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  heroContent: { display: 'flex', alignItems: 'center', gap: '12px' },
  carGraphic: { fontSize: '35px' },
  heroTitle: { fontSize: '16px', fontWeight: 'bold', margin: 0 },
  bookNowBtn: { border: 'none', borderRadius: '10px', padding: '8px 15px', fontWeight: 'bold', fontSize: '11px' },
  serviceGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }, // 5 بٹنز ایک لائن میں
  glassButton: { borderRadius: '15px', padding: '12px 5px', textAlign: 'center', borderStyle: 'solid', borderWidth: '1px 1px 3px 1px' },
  iconBox: { fontSize: '22px', marginBottom: '5px' },
  label: { fontSize: '10px', fontWeight: 'bold' },
  footer: { position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 }
};

export default HomeScreen;
