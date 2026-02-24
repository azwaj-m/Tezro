import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // یقینی بنائیں کہ یہ پاتھ ٹھیک ہے

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // رجسٹرڈ مارک (®) پر لانگ پریس کی لاجک
  let pressTimer;
  const startPress = () => pressTimer = setTimeout(() => navigate('/admin-control-center'), 3000);
  const endPress = () => clearTimeout(pressTimer);

  const services = [
    { name: 'Ride', icon: '🚗', path: '/ride', color: '#00FF88' },
    { name: 'Food', icon: '🍔', path: '/food', color: '#FFCC00' },
    { name: 'Shop', icon: '🛍️', path: '/shop', color: '#FF4444' },
    { name: 'Wallet', icon: '💰', path: '/pay', color: '#00D1FF' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => setSidebarOpen(true)} style={styles.menuBtn}>☰</button>
        <div style={styles.logoArea}>
          <img src="/assets/logo.png" alt="Tezro" style={styles.logo} onClick={() => navigate('/')} />
          <span onMouseDown={startPress} onMouseUp={endPress} onTouchStart={startPress} onTouchEnd={endPress} style={styles.reg}>®</span>
        </div>
        <button style={styles.bellBtn}>🔔</button>
      </header>

      {/* Welcome Section */}
      <div style={styles.welcome}>
        <h2>Welcome to <span style={{color: '#00FF88'}}>Tezro</span></h2>
        <p>What can we do for you today?</p>
      </div>

      {/* Fancy Grid */}
      <div style={styles.grid}>
        {services.map((s, i) => (
          <div key={i} style={{...styles.card, borderBottom: `4px solid ${s.color}`}} onClick={() => navigate(s.path)}>
            <span style={styles.cardIcon}>{s.icon}</span>
            <span style={styles.cardName}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        user={{name: "User", email: "user@tezro.com", balance: "2500", photo: "https://via.placeholder.com/100"}}
      />

      {/* Floating Footer (یہ ہر صفحے کے لیے الگ سے بھی ہو سکتا ہے) */}
      <footer style={styles.footer}>
        <button onClick={() => navigate('/')} style={styles.footerBtn}>🏠<br/>Home</button>
        <button onClick={() => navigate('/ride')} style={styles.footerBtn}>🚗<br/>Ride</button>
        <button onClick={() => navigate('/pay')} style={styles.footerBtn}>💳<br/>Pay</button>
      </footer>
    </div>
  );
};

const styles = {
  container: { background: '#000508', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: '#0a151b', borderBottom: '1px solid #111' },
  menuBtn: { background: 'none', border: 'none', color: '#00FF88', fontSize: '24px', cursor: 'pointer' },
  logo: { height: '30px', cursor: 'pointer' },
  logoArea: { display: 'flex', alignItems: 'flex-start' },
  reg: { fontSize: '8px', color: '#00FF88', marginLeft: '2px', cursor: 'pointer' },
  bellBtn: { background: 'none', border: 'none', color: '#00FF88', fontSize: '20px' },
  welcome: { padding: '30px 20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '0 20px' },
  card: { background: '#0a151b', padding: '25px', borderRadius: '15px', textAlign: 'center', transition: '0.3s', cursor: 'pointer' },
  cardIcon: { fontSize: '40px', display: 'block', marginBottom: '10px' },
  cardName: { fontWeight: 'bold', fontSize: '18px' },
  footer: { position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around', padding: '10px 0', background: '#0a151b', borderTop: '1px solid #111' },
  footerBtn: { background: 'none', border: 'none', color: '#888', fontSize: '12px', textAlign: 'center', cursor: 'pointer' }
};

export default HomeScreen;
