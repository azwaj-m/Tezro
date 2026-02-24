import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={styles.appWrapper}>
      {/* الیکٹرک ہیڈر */}
      <header style={styles.header}>
        <button onClick={() => setSidebarOpen(true)} style={styles.menuIcon}>☰</button>
        <div style={styles.logoContainer} onClick={() => navigate('/')}>
          <span style={styles.logoText}>TEZRO</span>
          <span style={styles.electricDot}></span>
        </div>
        <button style={styles.bellIcon}>🔔</button>
      </header>

      {/* مین مواد */}
      <main style={styles.mainContent}>
        {children}
      </main>

      {/* سائیڈ بار */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* گلاس فوٹر */}
      <footer style={styles.footer}>
        <button onClick={() => navigate('/')} style={{...styles.fBtn, color: location.pathname === '/' ? '#00FF88' : '#555'}}>
          <span style={location.pathname === '/' ? styles.activeGlow : {}}>🏠</span>
          <p style={styles.fText}>Home</p>
        </button>
        <button onClick={() => navigate('/ride')} style={{...styles.fBtn, color: location.pathname === '/ride' ? '#00FF88' : '#555'}}>
          <span style={location.pathname === '/ride' ? styles.activeGlow : {}}>🚗</span>
          <p style={styles.fText}>Ride</p>
        </button>
        <button onClick={() => navigate('/shop')} style={{...styles.fBtn, color: location.pathname === '/shop' ? '#00FF88' : '#555'}}>
          <span style={location.pathname === '/shop' ? styles.activeGlow : {}}>🛍️</span>
          <p style={styles.fText}>Shop</p>
        </button>
        <button onClick={() => navigate('/pay')} style={{...styles.fBtn, color: location.pathname === '/pay' ? '#00FF88' : '#555'}}>
          <span style={location.pathname === '/pay' ? styles.activeGlow : {}}>💰</span>
          <p style={styles.fText}>Wallet</p>
        </button>
      </footer>
    </div>
  );
};

const styles = {
  appWrapper: { background: '#000508', minHeight: '100vh', position: 'relative' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: 'rgba(10, 21, 27, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0, 255, 136, 0.2)', position: 'sticky', top: 0, zIndex: 1000 },
  logoText: { color: '#fff', fontSize: '22px', fontWeight: '900', letterSpacing: '2px' },
  electricDot: { height: '8px', width: '8px', background: '#00FF88', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #00FF88', marginLeft: '5px' },
  menuIcon: { background: 'none', border: 'none', color: '#00FF88', fontSize: '24px', cursor: 'pointer' },
  footer: { position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around', padding: '10px 0', background: 'rgba(10, 21, 27, 0.9)', backdropFilter: 'blur(15px)', borderTop: '1px solid rgba(0, 255, 136, 0.1)', zIndex: 1000 },
  fBtn: { background: 'none', border: 'none', textAlign: 'center', cursor: 'pointer', transition: '0.3s' },
  fText: { fontSize: '10px', marginTop: '4px', fontWeight: 'bold' },
  activeGlow: { textShadow: '0 0 15px #00FF88', fontSize: '20px' },
  mainContent: { paddingBottom: '90px' }
};

export default Layout;
