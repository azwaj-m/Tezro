import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';
import logoImg from '../../assets/logo.png'; 

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pressTimer, setPressTimer] = useState(null);

  // تھیم کی حفاظت
  const activeTheme = theme || { 
    bg: '#1A0F0A', 
    border: '#D4AF37', 
    card: 'rgba(45,25,15,0.9)', 
    text: '#F3E5AB' 
  };

  // 🔐 ایڈمن لانگ پریس لاجک
  const handleStartPress = (e) => {
    // موبائل پر ڈیفالٹ مینو کو روکنا
    const timer = setTimeout(() => {
      const code = prompt("Tezro Admin Access - مخصوص کوڈ درج کریں:");
      if (code === "7860") { 
        navigate('/admin-control-center');
      } else if (code !== null) {
        alert("رسائی ممنوع ہے! غلط کوڈ۔");
      }
    }, 2000); 
    setPressTimer(timer);
  };

  const handleReleasePress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <div style={{ background: activeTheme.bg, minHeight: '100vh', transition: '0.4s ease' }}>
      
      {/* ⚡ الیکٹرک ہیڈر */}
      <header style={{ 
        ...styles.header, 
        background: activeTheme.card, 
        borderBottom: `2px solid ${activeTheme.border}44`,
        boxShadow: `0 4px 15px rgba(0,0,0,0.5)`
      }}>
        
        {/* سائیڈ بار بٹن */}
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          style={{ color: activeTheme.border, ...styles.menuBtn }}
        >
          ☰
        </button>
        
        {/* 🚀 اسمارٹ لوگو بٹن مع رجسٹریشن مارک */}
        <div 
          style={styles.logoWrapper} 
          onClick={() => navigate('/')}
          onMouseDown={handleStartPress}
          onMouseUp={handleReleasePress}
          onTouchStart={handleStartPress}
          onTouchEnd={handleReleasePress}
          onContextMenu={(e) => e.preventDefault()} // لانگ پریس پر مینو بلاک
        >
          <img 
            src={logoImg} 
            alt="TEZRO" 
            style={{ 
              ...styles.logoImg, 
              filter: `drop-shadow(0 0 8px ${activeTheme.border}aa) sepia(1) saturate(5) hue-rotate(${theme.darkMode ? '0deg' : '250deg'})` 
            }} 
            onError={(e) => e.target.style.display = 'none'} // اگر تصویر نہ ملے تو کریش نہ ہو
          />
          <span style={{ ...styles.registered, color: activeTheme.border }}>®</span>
        </div>

        {/* تھیم ٹوگلر */}
        <button 
          onClick={() => theme.setDarkMode(!theme.darkMode)} 
          style={{ ...styles.themeToggle, color: activeTheme.border }}
        >
          {theme.darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* سائیڈ بار کمپوننٹ */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* مین مواد (Main Content) */}
      <main style={styles.mainContent}>
        {children}
      </main>

    </div>
  );
};

const styles = {
  header: { 
    height: '75px', 
    position: 'fixed', 
    top: 0, 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '0 20px', 
    zIndex: 1100, 
    backdropFilter: 'blur(12px)' 
  },
  logoWrapper: { 
    display: 'flex', 
    alignItems: 'flex-start', 
    cursor: 'pointer', 
    position: 'relative',
    userSelect: 'none',
    WebkitUserSelect: 'none'
  },
  logoImg: { height: '38px', width: 'auto', transition: '0.4s ease' },
  registered: { fontSize: '9px', fontWeight: 'bold', marginLeft: '1px', marginTop: '-5px' },
  menuBtn: { background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', transition: '0.2s active' },
  themeToggle: { background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '10px' },
  mainContent: { paddingTop: '80px', minHeight: '100vh' }
};

export default Layout;
