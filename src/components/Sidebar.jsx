import React from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const sections = [
    { title: 'ACCOUNT', items: ['Profile', 'Wallet', 'Settings'] },
    { title: 'ACTIVITY', items: ['My Rides', 'Orders', 'Tracking'] }
  ];

  return (
    <>
      {isOpen && <div style={styles.overlay} onClick={onClose}></div>}
      <div style={{...styles.sidebar, left: isOpen ? '0' : '-260px'}}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>USER</div>
          <h2 style={styles.name}>TEZRO USER</h2>
          <div style={styles.wallet}>Rs. 2,540.00</div>
        </div>

        <div style={styles.menu}>
          {sections.map((sec, i) => (
            <div key={i} style={{marginBottom: '25px'}}>
              <p style={styles.sectionTitle}>{sec.title}</p>
              {sec.items.map(item => (
                <div key={item} style={styles.menuItem}>{item}</div>
              ))}
            </div>
          ))}
          <div style={{...styles.menuItem, color: '#FF4D4D', border: 'none'}}>LOGOUT</div>
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', zIndex: 2000 },
  sidebar: { position: 'fixed', top: 0, width: '250px', height: '100%', background: '#05080A', zIndex: 2001, transition: '300ms cubic-bezier(0.4, 0, 0.2, 1)', borderRight: '1px solid #00FF9D', padding: '40px 20px' },
  profileHeader: { textAlign: 'center', marginBottom: '40px' },
  avatar: { width: '60px', height: '60px', background: '#0D1117', border: '2px solid #00FF9D', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: '#00FF9D' },
  name: { fontSize: '18px', fontWeight: '900', color: '#fff', letterSpacing: '1px' },
  wallet: { color: '#00FF9D', fontSize: '14px', fontWeight: 'bold', marginTop: '5px' },
  sectionTitle: { fontSize: '11px', color: '#555', letterSpacing: '2px', marginBottom: '15px' },
  menuItem: { padding: '12px 0', fontSize: '14px', fontWeight: '800', color: '#fff', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)' },
};

export default Sidebar;
