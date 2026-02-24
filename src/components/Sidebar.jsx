import React from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuSections = [
    { title: 'ACCOUNT', items: ['Profile', 'Settings', 'Wallet'] },
    { title: 'ACTIVITY', items: ['My Rides', 'Orders', 'Parcel Tracking', 'Booking History'] },
    { title: 'SUPPORT', items: ['Help Center', 'Safety'] },
    { title: 'EXTRAS', items: ['Promotions', 'Notifications'] }
  ];

  return (
    <>
      {isOpen && <div style={styles.overlay} onClick={onClose}></div>}
      <div style={{...styles.sidebar, left: isOpen ? '0' : '-300px'}}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>👤</div>
          <h2 style={styles.name}>Tezro User</h2>
          <div style={styles.wallet}>Balance: <span style={{color: '#00FF9D'}}>Rs. 0.00</span></div>
          <div style={styles.tierBadge}>Gold Member</div>
        </div>

        <div style={styles.menuScroll}>
          {menuSections.map((section, idx) => (
            <div key={idx} style={styles.section}>
              <p style={styles.sectionTitle}>{section.title}</p>
              {section.items.map(item => (
                <div key={item} style={styles.menuItem}>{item}</div>
              ))}
            </div>
          ))}
          <div style={{...styles.menuItem, color: '#FF4444', marginTop: '20px'}}>Logout</div>
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1001 },
  sidebar: { 
    position: 'fixed', top: 0, width: '280px', height: '100%', 
    background: '#0A0F19', zIndex: 1002, transition: '350ms ease-in-out', 
    padding: '30px 20px', borderRight: '1px solid #00FF9D', overflowY: 'auto' 
  },
  profileHeader: { textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' },
  avatar: { width: '70px', height: '70px', background: '#162030', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', border: '2px solid #00FF9D' },
  name: { fontSize: '20px', fontWeight: 'SemiBold', margin: '5px 0' },
  wallet: { fontSize: '14px', marginBottom: '8px' },
  tierBadge: { fontSize: '10px', background: '#00FF9D', color: '#0A0F19', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', fontWeight: 'bold' },
  menuScroll: { textAlign: 'left' },
  section: { marginBottom: '20px' },
  sectionTitle: { fontSize: '12px', color: '#B0B7C3', marginBottom: '10px', letterSpacing: '1px' },
  menuItem: { padding: '12px 0', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer', transition: '0.2s' }
};

export default Sidebar;
