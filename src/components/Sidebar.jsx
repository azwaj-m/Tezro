import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();

  return (
    <div style={{ 
      ...styles.sidebar, 
      left: isOpen ? 0 : '-280px', 
      background: theme.bg, 
      borderRight: `3px solid ${theme.border}`,
      boxShadow: theme.shadow 
    }}>
      <div style={{ ...styles.profile, borderBottom: `1px solid ${theme.border}33` }}>
        <div style={{ ...styles.avatar, border: `2px solid ${theme.border}` }}>👤</div>
        <h3 style={{ color: theme.text }}>User Name</h3>
        <p style={{ color: theme.border }}>Gold Member</p>
      </div>
      
      {['Profile', 'Wallet', 'Orders', 'Settings'].map(item => (
        <div key={item} style={{ 
          ...styles.menuItem, 
          color: theme.text, 
          borderBottom: `1px solid ${theme.border}11` 
        }}>
          {item}
        </div>
      ))}
    </div>
  );
};

const styles = {
  sidebar: { position: 'fixed', top: 0, width: '260px', height: '100%', zIndex: 2001, transition: '0.3s', padding: '40px 20px' },
  profile: { textAlign: 'center', marginBottom: '30px', paddingBottom: '20px' },
  avatar: { width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  menuItem: { padding: '15px 0', fontSize: '16px', fontWeight: 'bold' }
};

export default Sidebar;
