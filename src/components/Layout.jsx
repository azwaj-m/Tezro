import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={styles.appWrapper}>
      {/* 1️⃣ FLOATING HEADER (Height: 64px) */}
      <header style={styles.header}>
        <button onClick={() => setSidebarOpen(true)} style={styles.iconBtn}>☰</button>
        <img src="/assets/logo.png" alt="Tezro" style={styles.logo} onClick={() => navigate('/')} />
        <button style={styles.iconBtn}>🔔</button>
      </header>

      {/* Main Page Content */}
      <main style={styles.main}>
        {children}
      </main>

      {/* 📂 SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 8️⃣ BOTTOM NAVIGATION (Mobile) */}
      <footer style={styles.footer}>
        {[
          { name: 'Home', path: '/', icon: '🏠' },
          { name: 'Ride', path: '/ride', icon: '🚗' },
          { name: 'Orders', path: '/food', icon: '📦' },
          { name: 'Profile', path: '/pay', icon: '👤' }
        ].map((item) => (
          <button 
            key={item.path}
            onClick={() => navigate(item.path)} 
            style={{
              ...styles.fBtn, 
              color: location.pathname === item.path ? '#00FF9D' : '#B0B7C3',
              opacity: location.pathname === item.path ? 1 : 0.6
            }}
          >
            <span style={location.pathname === item.path ? styles.activeIcon : {}}>{item.icon}</span>
            <p style={styles.fText}>{item.name}</p>
            {location.pathname === item.path && <div style={styles.activeUnderline}></div>}
          </button>
        ))}
      </footer>
    </div>
  );
};

const styles = {
  appWrapper: { background: '#0A0F19', minHeight: '100vh', color: '#FFFFFF' },
  header: { 
    height: '64px', position: 'fixed', top: 0, width: '100%', 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '0 20px', background: 'rgba(10, 15, 25, 0.6)', 
    backdropFilter: 'blur(15px)', borderBottom: '1px solid #00FF9D', 
    zIndex: 1000, boxSizing: 'border-box' 
  },
  logo: { height: '28px', cursor: 'pointer' },
  iconBtn: { background: 'none', border: 'none', color: '#00FF9D', fontSize: '22px', cursor: 'pointer' },
  main: { paddingTop: '80px', paddingBottom: '100px' },
  footer: { 
    height: '65px', position: 'fixed', bottom: 0, width: '100%', 
    display: 'flex', justifyContent: 'space-around', alignItems: 'center', 
    background: 'rgba(10, 15, 25, 0.9)', backdropFilter: 'blur(15px)', 
    borderTop: '1px solid rgba(255,255,255,0.05)', z_index: 1000 
  },
  fBtn: { background: 'none', border: 'none', textAlign: 'center', cursor: 'pointer', position: 'relative' },
  fText: { fontSize: '10px', marginTop: '4px', fontWeight: 'Medium' },
  activeIcon: { display: 'block', transform: 'translateY(-3px)', transition: '0.3s' },
  activeUnderline: { position: 'absolute', bottom: '-8px', left: '25%', width: '50%', height: '2px', background: '#00FF9D', boxShadow: '0 0 10px #00FF9D' }
};

export default Layout;
