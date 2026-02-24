import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar'; // یقینی بنائیں کہ یہ فائل موجود ہے

const Layout = ({ children }) => {
  const theme = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // محفوظ تھیم ہینڈلنگ
  const activeTheme = theme || { bg: '#1A0F0A', border: '#D4AF37', card: 'rgba(45,25,15,0.9)', text: '#F3E5AB' };

  return (
    <div style={{ background: activeTheme.bg, minHeight: '100vh', transition: '0.4s' }}>
      
      {/* 1️⃣ Floating Header */}
      <header style={{ 
        ...styles.header, 
        background: activeTheme.card, 
        borderBottom: `1px solid ${activeTheme.border}66`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.4)` 
      }}>
        {/* مینیو بٹن اب ایکٹیو ہے */}
        <button onClick={() => setIsSidebarOpen(true)} style={{ color: activeTheme.border, ...styles.menuBtn }}>
          ☰
        </button>
        <h2 style={{ color: activeTheme.border, ...styles.logo }}>TEZRO</h2>
        <button onClick={() => theme.setDarkMode(!theme.darkMode)} style={styles.themeToggle}>
          {theme.darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* 2️⃣ Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main>{children}</main>

      {/* 3️⃣ Bottom Navigation */}
      <footer style={{ ...styles.footer, background: activeTheme.card, borderTop: `2px solid ${activeTheme.border}` }}>
        {['🏠', '🚗', '📦', '👤'].map((icon, i) => (
          <div key={i} style={{ color: activeTheme.border, fontSize: '24px', cursor: 'pointer' }}>{icon}</div>
        ))}
      </footer>
    </div>
  );
};

const styles = {
  header: { height: '64px', position: 'fixed', top: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', zIndex: 1000, backdropFilter: 'blur(10px)' },
  logo: { fontSize: '20px', fontWeight: '900', letterSpacing: '2px', margin: 0 },
  menuBtn: { background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer' },
  themeToggle: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' },
  footer: { height: '70px', position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 },
};

export default Layout;
