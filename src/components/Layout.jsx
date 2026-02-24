import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', transition: '0.4s' }}>
      {/* 1️⃣ Floating Header */}
      <header style={{ 
        ...styles.header, 
        background: theme.card, 
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: theme.shadow 
      }}>
        <button onClick={() => {}} style={{ color: theme.border, ...styles.menuBtn }}>☰</button>
        <h2 style={{ color: theme.border, ...styles.logo }}>TEZRO</h2>
        <button onClick={() => theme.setDarkMode(!theme.darkMode)} style={styles.themeToggle}>
          {theme.darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main style={{ paddingTop: '80px', paddingBottom: '90px' }}>{children}</main>

      {/* 8️⃣ Bottom Navigation */}
      <footer style={{ ...styles.footer, background: theme.card, borderTop: `2px solid ${theme.border}` }}>
        {['🏠', '🚗', '📦', '👤'].map((icon, i) => (
          <div key={i} style={{ color: theme.border, fontSize: '24px' }}>{icon}</div>
        ))}
      </footer>
    </div>
  );
};

const styles = {
  header: { height: '64px', position: 'fixed', top: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', zIndex: 1000, backdropFilter: 'blur(10px)' },
  logo: { fontSize: '20px', fontWeight: '900', letterSpacing: '2px' },
  menuBtn: { background: 'none', border: 'none', fontSize: '24px' },
  themeToggle: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' },
  footer: { height: '70px', position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 },
};

export default Layout;
