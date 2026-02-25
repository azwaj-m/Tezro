import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const activeTheme = theme || { bg: '#1A0F0A', border: '#D4AF37', text: '#F3E5AB' };

  // پرانے آپشنز اور نئے بزنس لنکس کا مجموعہ
  const menuItems = [
    { label: 'Profile', path: '/profile' },
    { label: 'My Rides', path: '/rides' },
    { label: 'Wallet', path: '/wallet' },
    { label: 'Tezro Business 💼', path: '/business-portal', isSpecial: true },
    { label: 'Partner with Us', path: '/business-portal', isSpecial: true },
    { label: 'Settings', path: '/settings' },
    { label: 'Support', path: '/support' },
  ];

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

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
        {/* پروفائل سیکشن */}
        <div style={{ ...styles.profile, borderBottom: `1px solid ${activeTheme.border}33` }}>
          <div style={{ ...styles.avatar, border: `2px solid ${activeTheme.border}`, color: activeTheme.border }}>👤</div>
          <h3 style={{ color: activeTheme.text, marginTop: '10px' }}>User Name</h3>
          <p style={{ color: activeTheme.border, fontSize: '12px' }}>Premium Gold Member</p>
        </div>
        
        {/* مینو لسٹ */}
        <div style={styles.menuList}>
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                ...styles.menuItem, 
                color: item.isSpecial ? activeTheme.border : activeTheme.text, 
                borderBottom: `1px solid ${activeTheme.border}11`,
                background: item.isSpecial ? `${activeTheme.border}08` : 'transparent'
              }} 
              onClick={() => handleNav(item.path)}
            >
              {item.label}
              {item.isSpecial && <span style={styles.newBadge}>PRO</span>}
            </div>
          ))}
        </div>
        
        {/* کلوز بٹن */}
        <button onClick={onClose} style={{...styles.closeBtn, color: activeTheme.border}}>
          ✕ Close
        </button>

        {/* سیکیورٹی فوٹر */}
        <div style={{...styles.securityFooter, color: activeTheme.border + '88'}}>
          🛡️ Zero-Knowledge Security Active
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000 },
  sidebar: { position: 'fixed', top: 0, width: '280px', height: '100%', zIndex: 2001, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: '40px 20px', display: 'flex', flexDirection: 'column' },
  profile: { textAlign: 'center', marginBottom: '30px', paddingBottom: '20px' },
  avatar: { width: '70px', height: '70px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' },
  menuList: { display: 'flex', flexDirection: 'column', gap: '5px', overflowY: 'auto' },
  menuItem: { 
    padding: '15px 12px', 
    fontSize: '15px', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    transition: '0.2s', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderRadius: '8px'
  },
  newBadge: { fontSize: '10px', background: '#D4AF37', color: '#000', padding: '2px 6px', borderRadius: '4px' },
  closeBtn: { marginTop: 'auto', padding: '20px', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%', textAlign: 'center' },
  securityFooter: { textAlign: 'center', fontSize: '10px', marginTop: '10px', letterSpacing: '1px' }
};

export default Sidebar;
