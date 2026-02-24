import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Ride Now', icon: '⚡', path: '/ride', desc: 'Fast & Secure' },
    { name: 'Order Food', icon: '🍕', path: '/food', desc: 'Delicious Meals' },
    { name: 'Tezro Shop', icon: '🛒', path: '/shop', desc: 'Latest Gadgets' },
    { name: 'Send Money', icon: '💎', path: '/pay', desc: 'Instant Pay' }
  ];

  return (
    <div style={{ padding: '20px', paddingBottom: '100px' }}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Tezro <span style={styles.neonText}>Services</span></h1>
        <p style={styles.subtitle}>Future of Super Apps is here.</p>
      </div>

      <div style={styles.grid}>
        {services.map((s, i) => (
          <div key={i} style={styles.glassCard} onClick={() => navigate(s.path)}>
            <div style={styles.glowOverlay}></div>
            <div style={styles.iconCircle}>{s.icon}</div>
            <h3 style={styles.cardTitle}>{s.name}</h3>
            <p style={styles.cardDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  hero: { marginBottom: '40px', marginTop: '20px', textAlign: 'left' },
  title: { fontSize: '32px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' },
  neonText: { 
    color: '#00FF88', 
    textShadow: '0 0 15px rgba(0, 255, 136, 0.7)',
    fontStyle: 'italic'
  },
  subtitle: { color: '#666', fontSize: '14px', marginTop: '5px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  glassCard: { 
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)', 
    border: '1px solid rgba(0, 255, 136, 0.15)', 
    borderRadius: '28px', 
    padding: '25px 15px', 
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(10px)',
  },
  glowOverlay: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none'
  },
  iconCircle: { 
    fontSize: '32px', 
    marginBottom: '15px', 
    background: 'rgba(0, 255, 136, 0.1)', 
    width: '65px', 
    height: '65px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '22px', 
    margin: '0 auto',
    boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)',
    border: '1px solid rgba(0, 255, 136, 0.3)'
  },
  cardTitle: { fontSize: '17px', fontWeight: '800', margin: '10px 0', color: '#fff' },
  cardDesc: { 
    fontSize: '9px', 
    color: '#00FF88', 
    fontWeight: 'bold', 
    textTransform: 'uppercase', 
    letterSpacing: '1px',
    opacity: 0.8
  }
};

export default HomeScreen;
