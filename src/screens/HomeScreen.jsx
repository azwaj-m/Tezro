import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useTheme } from '../context/ThemeContext'; 
import UniversalAuthPopup from '../components/Auth/UniversalAuthPopup'; 
import 'leaflet/dist/leaflet.css';

// ورسل کے لیے لیف لیٹ کو محفوظ طریقے سے لوڈ کرنا
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// میپ کے سائز کو خودکار طور پر درست کرنے والا انٹرنل کمپوننٹ
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500); // ورسل پر تھوڑا زیادہ وقت دینا بہتر ہے
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme(); 
  const [showAuth, setShowAuth] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // تھیم سیٹ اپ (آپ کا اوریجنل ڈیزائن)
  const activeTheme = theme || {
    bg: '#1A0F0A',
    card: 'rgba(45, 25, 15, 0.8)',
    border: '#D4AF37',
    text: '#F3E5AB',
    darkMode: true
  };

  const services = [
    { name: 'Ride', icon: '📍', path: '/ride', type: 'RIDE' },
    { name: 'Food', icon: '🍔', path: '/food', type: 'FOOD' },
    { name: 'Shop', icon: '🛒', path: '/shop', type: 'SHOP' },
    { name: 'Parcel', icon: '📦', path: '/parcel', type: 'PARCEL' },
    { name: 'Hotels', icon: '🏨', path: '/hotels', type: 'HOTEL' }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    navigate(service.path);
  };

  return (
    <div style={{ ...styles.container, background: activeTheme.bg }}>
      
      {/* --- HEADER --- */}
      <header style={{ ...styles.header, background: activeTheme.bg, borderBottom: `1px solid ${activeTheme.border}44` }}>
        <div style={{ color: activeTheme.border, fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px' }}>TEZRO</div>
        <button style={{ ...styles.installBtn, background: activeTheme.border, color: '#000' }}>📲 Install App</button>
      </header>

      {/* 1. MAP SECTION (Vercel Optimized) */}
      <div style={{ ...styles.mapFrame, borderColor: activeTheme.border }}>
        <MapContainer 
          center={[31.4504, 73.1350]} 
          zoom={13} 
          style={styles.leafletMap} 
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <MapResizer />
          <TileLayer 
            attribution='&copy; OpenStreetMap'
            url={activeTheme.darkMode 
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
                <button style={{ ...styles.rideNowSmall, background: activeTheme.border, color: '#000' }}>Go ❯</button>
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
              <p style={{ color: activeTheme.border, fontSize: '11px', margin: 0 }}>Safe, Fast & Secure</p>
           </div>
        </div>
        <button style={{ ...styles.bookNowBtn, background: activeTheme.border, color: '#000' }}>Book Now</button>
      </div>

      {/* 3. SERVICE GRID */}
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
        {[
          {n: 'Home', i: '🏠', p: '/'},
          {n: 'Search', i: '🔍', p: '/search'},
          {n: 'Orders', i: '📦', p: '/orders'},
          {n: 'Profile', i: '👤', p: '/business-portal'}
        ].map((tab, i) => (
          <div key={i} onClick={() => navigate(tab.p)} style={{ ...styles.navItem, color: activeTheme.text }}>
            <span style={{fontSize: '18px'}}>{tab.i}</span>
            <span>{tab.n}</span>
          </div>
        ))}
      </footer>

      {showAuth && (
        <UniversalAuthPopup 
          serviceType={selectedService?.type} 
          orderData={{ total: 0 }}
          onConfirm={(data) => { setShowAuth(false); alert("Success!"); }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

// اسٹائلز وہی رہیں گے جو آپ کے پاس ہیں
const styles = {
  container: { minHeight: '100vh', padding: '16px', paddingTop: '80px', paddingBottom: '90px', display: 'flex', flexDirection: 'column' },
  header: { position: 'fixed', top: 0, left: 0, right: 0, height: '65px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', zIndex: 1000 },
  installBtn: { border: 'none', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' },
  mapFrame: { height: '220px', borderRadius: '22px', overflow: 'hidden', border: '1px solid', marginBottom: '15px', position: 'relative', zIndex: 1 },
  leafletMap: { height: '100%', width: '100%' },
  floatingSearch: { position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', width: '90%', zIndex: 1000 },
  glassSearch: { backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '8px 12px', display: 'flex', alignItems: 'center', border: '1px solid' },
  searchInput: { background: 'none', border: 'none', marginLeft: '10px', outline: 'none', flex: 1, fontSize: '14px' },
  rideNowSmall: { border: 'none', borderRadius: '8px', padding: '6px 15px', fontWeight: 'bold', cursor: 'pointer' },
  mainRideHero: { borderRadius: '22px', padding: '18px', marginBottom: '18px', borderStyle: 'solid', borderWidth: '1px 1px 4px 1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  heroContent: { display: 'flex', alignItems: 'center', gap: '15px' },
  carGraphic: { fontSize: '40px' },
  heroTitle: { fontSize: '17px', fontWeight: 'bold', margin: 0 },
  bookNowBtn: { border: 'none', borderRadius: '12px', padding: '10px 20px', fontWeight: 'bold', fontSize: '12px' },
  serviceGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' },
  glassButton: { borderRadius: '18px', padding: '15px 5px', textAlign: 'center', borderStyle: 'solid', borderWidth: '1px 1px 3px 1px' },
  iconBox: { fontSize: '24px', marginBottom: '5px' },
  label: { fontSize: '10px', fontWeight: 'bold' },
  footer: { position: 'fixed', bottom: 0, left: 0, right: 0, height: '75px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', gap: '4px' }
};

export default HomeScreen;
