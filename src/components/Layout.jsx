import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { verifyAndExecute } from '../firebase/voiceAuth';
import { CommandResolver } from '../utils/CommandResolver';
import SuperSearchBar from './SuperSearchBar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  
  const { user, logout, verifyAdminKeys } = useAuth();
  const { theme, darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // 🎤 یونیورسل وائس کمانڈ لاجک (سیکیورٹی + ملٹی لینگویج)
  const startUniversalVoice = async () => {
    setIsVoiceActive(true);
    setVoiceStatus("سن رہا ہوں...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        
        // 1. سیکیورٹی چیک (صرف مالک کی آواز کا ویکٹر موازنہ)
        const auth = await verifyAndExecute(audioBlob, user?.voiceSignature);

        if (auth.authorized) {
          // 2. اسپیچ ٹو ٹیکسٹ (براؤزر کی مفت API استعمال کرتے ہوئے)
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.lang = user?.preferredLang || 'ur-PK';

          recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceStatus(`کمانڈ: ${transcript}`);
            
            // 3. کمانڈ ریزولو کرنا (بنگالی، عربی، اردو، انگلش سب یہاں ہینڈل ہوں گے)
            const result = await CommandResolver.execute(audioBlob, transcript, user?.voiceSignature);
            handleVoiceAction(result);
          };
          recognition.start();
        } else {
          setVoiceStatus("❌ آواز میچ نہیں ہوئی!");
          setTimeout(() => setIsVoiceActive(false), 2000);
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000); // 3 سیکنڈ کی لسننگ
    } catch (err) {
      setVoiceStatus("مائیکروفون ایرر!");
      setIsVoiceActive(false);
    }
  };

  // 🚀 وائس ایکشنز کو نیویگیٹ کرنا
  const handleVoiceAction = (res) => {
    if (res.success) {
      if (res.action === 'BOOK_RIDE') navigate('/');
      if (res.action === 'CHECK_BALANCE') navigate('/pay');
      if (res.action === 'EMERGENCY') alert("🚨 ایمرجنسی الرٹ بھیج دیا گیا ہے!");
    }
    setTimeout(() => setIsVoiceActive(false), 2000);
  };

  const handleSecretClick = async () => {
    const newCount = adminClicks + 1;
    setAdminClicks(newCount);
    if (newCount === 15) {
      setAdminClicks(0);
      const secretKey = prompt("🔒 ENTER ADMIN ACCESS KEY:");
      if (secretKey) {
        const isAuthorized = await verifyAdminKeys(secretKey);
        if (isAuthorized) navigate('/admin');
        else alert("ACCESS DENIED!");
      }
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', path: '/' },
    { id: 'wallet', label: 'Payments & Wallet', icon: '💳', path: '/pay' },
    { id: 'history', label: 'Orders / Rides', icon: '🕒', path: '/history' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100vh', transition: '0.3s', position: 'relative' }}>
      
      {/* ☰ Sidebar (وہی لاجک) */}
      <div style={{
        position: 'fixed', top: 0, left: isSidebarOpen ? 0 : '-320px',
        width: '320px', height: '100%', background: theme.card,
        zIndex: 2000, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '25px', boxShadow: isSidebarOpen ? '10px 0 50px rgba(0,0,0,0.5)' : 'none',
        display: 'flex', flexDirection: 'column', borderRight: `1px solid ${theme.border}`
      }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <img src={user?.photo || "https://via.placeholder.com/80"} 
               style={{ width: '70px', height: '70px', borderRadius: '50%', border: `2px solid ${theme.accent}` }} alt="u" />
          <h4 style={{ margin: '10px 0 0 0' }}>{user?.name || "Tezro User"}</h4>
          <small style={{ color: theme.accent, fontSize: '10px' }}>PRO MEMBER</small>
        </div>

        <div style={{ flex: 1 }}>
          {menuItems.map(item => (
            <div key={item.id} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              style={{
                padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px',
                cursor: 'pointer', marginBottom: '8px', background: location.pathname === item.path ? 'rgba(0,255,136,0.1)' : 'transparent'
              }}
            >
              <span>{item.icon}</span>
              <span style={{ fontWeight: '500' }}>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '15px' }}>
          <button onClick={setDarkMode} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(128,128,128,0.1)', color: theme.text, border: 'none', marginBottom: '10px' }}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={logout} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ff4444', color: '#ff4444', background: 'none' }}>
            Sign Out
          </button>
        </div>
      </div>

      {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} style={styles.backdrop} />}

      {/* 🎙️ Floating Voice UI (صرف جب ایکٹیو ہو) */}
      {isVoiceActive && (
        <div style={styles.voiceOverlay}>
          <div style={styles.voicePulse}>🎤</div>
          <p>{voiceStatus}</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <header style={{ ...styles.header, background: theme.card, borderBottom: `1px solid ${theme.border}` }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', fontSize: '24px', color: theme.text }}>☰</button>
          
          <div style={{ position: 'relative' }}>
            <span onClick={handleSecretClick} style={styles.secretBtn}>®</span>
            <div onClick={() => navigate('/')} style={{ fontWeight: '900', color: theme.accent, fontSize: '20px', letterSpacing: '2px', cursor: 'pointer' }}>
              TEZRO
            </div>
          </div>

          <div onClick={() => navigate('/profile')} style={styles.profileCircle}>
            <img src={user?.photo || "https://via.placeholder.com/40"} style={{ width: '100%' }} alt="p" />
          </div>
        </header>

        {location.pathname === '/' && <SuperSearchBar onSearch={(type, val) => console.log(type, val)} />}

        <main style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {children}
        </main>

        {/* 🧭 فوٹر میں وائس بٹن کی شمولیت */}
        <footer style={{ ...styles.footer, background: theme.card, borderTop: `1px solid ${theme.border}` }}>
          <div onClick={() => navigate('/')} style={{ color: location.pathname === '/' ? theme.accent : theme.text, fontSize: '22px', cursor: 'pointer' }}>🏠</div>
          <div onClick={() => navigate('/pay')} style={{ opacity: location.pathname === '/pay' ? 1 : 0.4, color: theme.text, fontSize: '22px', cursor: 'pointer' }}>💳</div>
          
          {/* مین وائس بٹن */}
          <div onClick={startUniversalVoice} style={styles.mainMic}>🎤</div>
          
          <div onClick={() => navigate('/notifications')} style={{ opacity: 0.4, color: theme.text, fontSize: '22px', cursor: 'pointer' }}>🔔</div>
          <div onClick={() => setSidebarOpen(true)} style={{ opacity: 0.4, color: theme.text, fontSize: '22px', cursor: 'pointer' }}>👤</div>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  header: { padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 },
  secretBtn: { position: 'absolute', top: '-8px', right: '-12px', fontSize: '8px', color: 'rgba(128,128,128,0.2)', cursor: 'default', userSelect: 'none' },
  profileCircle: { width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #00FF88', overflow: 'hidden', cursor: 'pointer' },
  footer: { padding: '15px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'sticky', bottom: 0 },
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1500 },
  mainMic: { 
    width: '55px', height: '55px', background: '#00FF88', borderRadius: '50%', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', 
    marginTop: '-30px', boxShadow: '0 4px 15px rgba(0,255,136,0.4)', cursor: 'pointer', color: '#000' 
  },
  voiceOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000,
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#00FF88'
  },
  voicePulse: {
    fontSize: '50px', marginBottom: '20px', animation: 'pulse 1.5s infinite'
  }
};

export default Layout;
