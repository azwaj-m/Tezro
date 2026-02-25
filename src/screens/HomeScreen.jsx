import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useTheme } from '../context/ThemeContext'; 
import QuickAuthPopup from '../components/Auth/QuickAuthPopup'; // پاپ اپ امپورٹ کیا
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme(); 
  const [searchQuery, setSearchQuery] = useState("");
  
  // سیکیورٹی سٹیٹ
  const [isLoggedIn, setIsLoggedIn] = useState(false); // عارضی طور پر فالس
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  const activeTheme = theme || {
    bg: '#1A0F0A',
    card: 'rgba(45, 25, 15, 0.8)',
    border: '#D4AF37',
    text: '#F3E5AB',
    darkMode: true
  };

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride' },
    { name: 'Food', icon: '🍔', path: '/food' },
    { name: 'Shop', icon: '🛒', path: '/shop' },
    { name: 'Parcel', icon: '📦', path: '/parcel' },
    { name: 'Booking', icon: '🏢', path: '/hotels' }
  ];

  // سروس پر کلک کرنے کا محفوظ طریقہ
  const handleProtectedAction = (path) => {
    if (!isLoggedIn) {
      setPendingPath(path);
      setShowAuthPopup(true); // اگر لاگ ان نہیں تو پاپ اپ دکھائیں
    } else {
      navigate(path);
    }
  };

  const handleAuthComplete = (userData) => {
    console.log("User Registered & Secured:", userData);
    setIsLoggedIn(true);
    setShowAuthPopup(false);
    if (pendingPath) navigate(pendingPath);
  };

  return (
    <div style={{ ...styles.container, background: activeTheme.bg }}>
      
      {/* 0. TOP LOGIN BAR (نئی ایڈیشن) */}
      <div style={styles.topBar}>
         <h2 style={{ color: activeTheme.border, margin: 0, fontSize: '20px' }}>TEZRO</h2>
         {!isLoggedIn && (
           <button 
             onClick={() => setShowAuthPopup(true)}
             style={{ ...styles.loginBtn, borderColor: activeTheme.border, color: activeTheme.text }}
           >
             Login / Register
           </button>
         )}
      </div>

      {/* 1. MAP SECTION */}
      <div style={{ ...styles.mapFrame, borderColor: activeTheme.border }}>
        <MapContainer center={[31.4504, 73.1350]} zoom={13} style={styles.leafletMap} zoomControl={false}>
          <TileLayer url={activeTheme.darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} 
          />
          <div style={styles.mapOverlay}></div>
          <div style={styles.floatingSearch}>
             <form 
               style={{ ...styles.glassSearch, background: activeTheme.card, borderColor: activeTheme.border }}
               onSubmit={(e) => { e.preventDefault(); handleProtectedAction(`/ride?to=${searchQuery}`); }}
             >
                <span style={{ color: activeTheme.border }}>📍</span>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ ...styles.searchInput, color: activeTheme.text }}
                />
                <button type="submit" style={{ ...styles.rideNowSmall, background: activeTheme.border, color: '#000' }}>
                  Go ❯
                </button>
             </form>
          </div>
        </MapContainer>
      </div>

      {/* 2. QUICK ACTIONS */}
      <div style={styles.quickActions}>
        {[
          {id: 'Pickup', icon: '📍', path: '/ride'},
          {id: 'Wallet', icon: '💳', path: '/pay'},
          {id: 'Promos', icon: '⭐', path: '/promos'}
        ].map((act) => (
          <div 
            key={act.id} 
            onClick={() => handleProtectedAction(act.path)}
            style={{ ...styles.actionPill, borderColor: activeTheme.border, color: activeTheme.text, background: activeTheme.card }}
          >
            {act.icon} {act.id}
          </div>
        ))}
      </div>

      {/* 3. PRIMARY RIDE CARD */}
      <div 
        style={{ ...styles.mainRideHero, background: activeTheme.card, borderColor: activeTheme.border }} 
        onClick={() => handleProtectedAction('/ride')}
      >
        <div style={styles.heroContent}>
           <div style={{ ...styles.carGraphic, filter: `drop-shadow(0 0 10px ${activeTheme.border})` }}>🚗</div>
           <div>
              <h2 style={{ ...styles.heroTitle, color: activeTheme.text }}>Ride Anywhere</h2>
              <p style={{ color: activeTheme.border, fontSize: '11px' }}>Secure & Verified Rides</p>
           </div>
        </div>
        <button style={{ ...styles.bookNowBtn, background: activeTheme.border, color: '#000' }}>Book Now</button>
      </div>

      {/* 4. SERVICE GRID */}
      <div style={styles.serviceGrid}>
        {services.map((s, i) => (
          <div 
            key={i} 
            style={{ ...styles.glassButton, background: activeTheme.card, borderColor: activeTheme.border }} 
            onClick={() => handleProtectedAction(s.path)}
          >
            <div style={styles.iconBox}>{s.icon}</div>
            <div style={{ ...styles.label, color: activeTheme.text }}>{s.name}</div>
            <div style={{ ...styles.bottomGlow, background: activeTheme.border }}></div>
          </div>
        ))}
      </div>

      {/* 5. REGISTRATION POPUP */}
      {showAuthPopup && (
        <QuickAuthPopup 
          serviceType="GENERAL" 
          onConfirm={handleAuthComplete} 
          onClose={() => setShowAuthPopup(false)} 
        />
      )}
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', padding: '16px', paddingTop: '20px' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  loginBtn: { background: 'none', border: '1px solid', padding: '8px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  mapFrame: { height: '200px', borderRadius: '28px', overflow: 'hidden', border: '2px solid', marginBottom: '15px', position: 'relative' },
  leafletMap: { height: '100%', width: '100%' },
  mapOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', pointerEvents: 'none', zIndex: 400 },
  floatingSearch: { position: 'absolute', bottom: '15px', width: '100%', zIndex: 500, display: 'flex', justifyContent: 'center' },
  glassSearch: { width: '90%', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '8px 15px', display: 'flex', alignItems: 'center', border: '1px solid' },
  searchInput: { background: 'none', border: 'none', marginLeft: '10px', outline: 'none', flex: 1, fontSize: '14px' },
  rideNowSmall: { border: 'none', borderRadius: '10px', padding: '5px 12px', fontSize: '11px', fontWeight: 'bold' },
  quickActions: { display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '20px' },
  actionPill: { flex: 1, borderRadius: '12px', padding: '10px 5px', fontSize: '11px', textAlign: 'center', border: '1px solid', cursor: 'pointer' },
  mainRideHero: { borderRadius: '25px', padding: '20px', marginBottom: '20px', borderStyle: 'solid', borderWidth: '1px 1px 5px 1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  carGraphic: { fontSize: '42px' },
  heroTitle: { fontSize: '18px', fontWeight: 'bold', margin: 0 },
  bookNowBtn: { border: 'none', borderRadius: '12px', padding: '10px 18px', fontWeight: 'bold' },
  serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  glassButton: { borderRadius: '22px', padding: '18px 10px', textAlign: 'center', borderStyle: 'solid', borderWidth: '1px 1px 4px 1px', position: 'relative' },
  iconBox: { fontSize: '28px', marginBottom: '8px' },
  label: { fontSize: '13px', fontWeight: 'bold' },
  bottomGlow: { position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', filter: 'blur(3px)' }
};

export default HomeScreen;
