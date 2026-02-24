import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';
import logoImg from '../assets/logo.png'; // لوگو امپورٹ کیا

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);

  const activeTheme = theme || { border: '#D4AF37', card: 'rgba(45,25,15,0.9)', text: '#F3E5AB' };

  // لوگو پر لمبا پریس (Long Press) کرنے کا فنکشن
  const handleStartPress = () => {
    const timer = setTimeout(() => {
      const code = prompt("ایڈمن کوڈ درج کریں:");
      if (code === "1234") { // آپ اپنا مخصوص کوڈ یہاں بدل سکتے ہیں
        navigate('/admin-control-center');
      } else {
        alert("غلط کوڈ!");
      }
    }, 2000); // 2 سیکنڈ تک پریس رکھنے پر
    setPressTimer(timer);
  };

  const handleReleasePress = () => {
    clearTimeout(pressTimer);
  };

  return (
    <div style={{ background: activeTheme.bg, minHeight: '100vh' }}>
      <header style={{ ...styles.header, background: activeTheme.card, borderBottom: `1px solid ${activeTheme.border}66` }}>
        <button onClick={() => setIsSidebarOpen(true)} style={{ color: activeTheme.border, ...styles.menuBtn }}>☰</button>
        
        {/* لوگو بٹن مع رجسٹریشن مارک */}
        <div 
          style={styles.logoWrapper} 
          onClick={() => navigate('/')}
          onMouseDown={handleStartPress}
          onMouseUp={handleReleasePress}
          onTouchStart={handleStartPress}
          onTouchEnd={handleReleasePress}
        >
          <img 
            src={logoImg} 
            alt="Logo" 
            style={{ ...styles.logoImg, filter: `drop-shadow(0 0 5px ${activeTheme.border}) sepia(1) saturate(5) hue-rotate(${theme.darkMode ? '0deg' : '250deg'})` }} 
          />
          <span style={{ ...styles.registered, color: activeTheme.border }}>®</span>
        </div>

        <button onClick={() => theme.setDarkMode(!theme.darkMode)} style={styles.themeToggle}>
          {theme.darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main>{children}</main>
    </div>
  );
};

const styles = {
  header: { height: '70px', position: 'fixed', top: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', zIndex: 1000, backdropFilter: 'blur(10px)' },
  logoWrapper: { display: 'flex', alignItems: 'flex-start', cursor: 'pointer', position: 'relative' },
  logoImg: { height: '40px', width: 'auto', transition: '0.3s' },
  registered: { fontSize: '10px', fontWeight: 'bold', marginLeft: '2px' },
  menuBtn: { background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer' },
  themeToggle: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }
};

export default Layout;
