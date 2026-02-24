import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);

  // ایڈمن پینل کے لیے خفیہ لانگ پریس لاجک (® بٹن)
  const handleAdminStart = () => {
    const timer = setTimeout(() => {
      navigate('/admin-panel');
    }, 3000); // 3 سیکنڈ تک دبائے رکھنے پر ایڈمن پینل کھلے گا
    setPressTimer(timer);
  };

  const handleAdminEnd = () => {
    clearTimeout(pressTimer);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <button onClick={() => setSidebarOpen(true)} style={styles.iconBtn}>☰</button>
        
        <div style={styles.logoContainer}>
          <img 
            src="/src/assets/logo.png" 
            alt="Tezro" 
            style={styles.logo} 
            onClick={() => navigate('/')} // لوگو پر کلک کرنے سے ہوم پیج
          />
          <span 
            onMouseDown={handleAdminStart} 
            onMouseUp={handleAdminEnd}
            onTouchStart={handleAdminStart}
            onTouchEnd={handleAdminEnd}
            style={styles.registeredMark}
          >
            ®
          </span>
        </div>

        <button style={styles.iconBtn}>🔔</button>
      </header>

      {/* Map Section (Leaflet) */}
      <div style={styles.mapWrapper}>
        <MapContainer center={[31.4504, 73.1350]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[31.4504, 73.1350]}>
            <Popup>Tezro Is Ready!</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Main Action Grid */}
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/ride')}>
          <span style={styles.cardIcon}>🚗</span>
          <p>Ride</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/food')}>
          <span style={styles.cardIcon}>🍔</span>
          <p>Food</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/shop')}>
          <span style={styles.cardIcon}>🛍️</span>
          <p>Shop</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/pay')}>
          <span style={styles.cardIcon}>💳</span>
          <p>Wallet</p>
        </div>
      </div>

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)}>
          <div style={styles.sidebar} onClick={e => e.stopPropagation()}>
            <h2 style={{color: '#00FF88'}}>Tezro Menu</h2>
            <ul style={styles.menuList}>
              <li style={styles.menuItem}>My Profile</li>
              <li style={styles.menuItem}>Ride History</li>
              <li style={styles.menuItem} onClick={() => navigate('/pay')}>Wallet</li>
              <li style={styles.menuItem}>Settings</li>
              <li style={{...styles.menuItem, color: 'red'}} onClick={() => navigate('/login')}>Logout</li>
            </ul>
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <footer style={styles.footer}>
        <button style={styles.footerBtn} onClick={() => navigate('/')}>🏠<br/>Home</button>
        <button style={styles.footerBtn} onClick={() => navigate('/ride')}>🚗<br/>Activity</button>
        <button style={styles.footerBtn} onClick={() => navigate('/pay')}>💰<br/>Wallet</button>
        <button style={styles.footerBtn}>👤<br/>Account</button>
      </footer>
    </div>
  );
};

const styles = {
  container: { background: '#000508', height: '100vh', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'Arial' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: '#0a151b' },
  logoContainer: { display: 'flex', alignItems: 'flex-start', cursor: 'pointer' },
  logo: { height: '35px', objectFit: 'contain' },
  registeredMark: { color: '#00FF88', fontSize: '10px', marginLeft: '2px', cursor: 'help', userSelect: 'none' },
  iconBtn: { background: 'none', border: 'none', color: '#00FF88', fontSize: '22px', cursor: 'pointer' },
  mapWrapper: { flex: 1, margin: '15px', borderRadius: '20px', overflow: 'hidden', border: '2px solid #111' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '0 20px 20px' },
  card: { background: '#0a151b', padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', border: '1px solid #111' },
  cardIcon: { fontSize: '30px', display: 'block', marginBottom: '10px' },
  sidebarOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100 },
  sidebar: { width: '280px', height: '100%', background: '#0a151b', padding: '30px', boxShadow: '5px 0 15px rgba(0,255,136,0.1)' },
  menuList: { listStyle: 'none', padding: 0, marginTop: '40px' },
  menuItem: { padding: '15px 0', borderBottom: '1px solid #111', fontSize: '18px', cursor: 'pointer' },
  footer: { display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#0a151b', borderTop: '1px solid #111' },
  footerBtn: { background: 'none', border: 'none', color: '#888', fontSize: '12px', cursor: 'pointer' }
};

export default HomeScreen;
