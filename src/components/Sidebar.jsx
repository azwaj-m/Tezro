import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const activeTheme = theme || { bg: '#1A0F0A', border: '#D4AF37', text: '#F3E5AB' };

  return (
    <>
      {/* بیک گراؤنڈ پر کلک کرنے سے بند ہو جائے گا */}
      {isOpen && <div onClick={onClose} style={styles.overlay}></div>}
      
      <div style={{ 
        ...styles.sidebar, 
        left: isOpen ? 0 : '-300px', 
        background: activeTheme.bg, 
        borderRight: `3px solid ${activeTheme.border}`,
      }}>
        <div style={{ ...styles.profile, borderBottom: `1px solid ${activeTheme.border}33` }}>
          <div style={{ ...styles.avatar, border: `2px solid ${activeTheme.border}`, color: activeTheme.border }}>👤</div>
          <h3 style={{ color: activeTheme.text, marginTop: '10px' }}>User Name</h3>
          <p style={{ color: activeTheme.border, fontSize: '12px' }}>Premium Gold Member</p>
        </div>
        
        <div style={styles.menuList}>
          {['Profile', 'My Rides', 'Wallet', 'Settings', 'Support'].map(item => (
            <div key={item} style={{ 
              ...styles.menuItem, 
              color: activeTheme.text, 
              borderBottom: `1px solid ${activeTheme.border}11` 
            }} onClick={onClose}>
              {item}
            </div>
          ))}
        </div>
        
        <button onClick={onClose} style={{...styles.closeBtn, color: activeTheme.border}}>✕ Close</button>
      </div>
    </>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000 },
  sidebar: { position: 'fixed', top: 0, width: '280px', height: '100%', zIndex: 2001, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: '40px 20px' },
  profile: { textAlign: 'center', marginBottom: '30px', paddingBottom: '20px' },
  avatar: { width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' },
  menuList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  menuItem: { padding: '15px 10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' },
  closeBtn: { marginTop: '40px', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%' }
};

export default Sidebar;
