import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Search, ScrollText, User } from 'lucide-react';

const AppShell = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { id: 'Home', icon: <LayoutDashboard size={20}/>, label: 'Home' },
    { id: 'Search', icon: <Search size={20}/>, label: 'Search' },
    { id: 'Orders', icon: <ScrollText size={20}/>, label: 'Orders' },
    { id: 'Profile', icon: <User size={20}/>, label: 'Profile' }
  ];

  return (
    <div style={styles.shellContainer}>
      {/* 📱 Main Content Area - یہاں Outlet استعمال ہو رہا ہے جو Router سے جڑا ہے */}
      <div style={styles.mainScroll}>
        <header style={styles.header}>
          <span style={{ color: '#FFD700', fontWeight: 'bold' }}>TEZRO SUPER APP</span>
          <div style={styles.onlineStatus}>● Online</div>
        </header>
        
        <Outlet />
      </div>

      {/* 🧭 Professional Bottom Navigation Bar */}
      <nav style={styles.bottomNav}>
        {navItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            style={{
              ...styles.navItem,
              color: activeTab === item.id ? '#FFD700' : '#888'
            }}
          >
            {item.icon}
            <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: activeTab === item.id ? 'bold' : 'normal' }}>
              {item.label}
            </span>
            {activeTab === item.id && <div style={styles.activeIndicator} />}
          </div>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  shellContainer: { height: '100vh', display: 'flex', flexDirection: 'column', background: '#000', color: '#fff', fontFamily: 'sans-serif', overflow: 'hidden' },
  header: { padding: '15px 20px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#050505' },
  onlineStatus: { color: '#00FF00', fontSize: '0.7rem', border: '1px solid #00FF00', padding: '2px 8px', borderRadius: '10px' },
  mainScroll: { flex: 1, overflowY: 'auto', paddingBottom: '80px' },
  bottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, height: '70px', background: 'rgba(10, 10, 10, 0.98)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid #1a1a1a', zIndex: 2000 },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'relative', width: '25%', transition: 'all 0.3s' },
  activeIndicator: { position: 'absolute', top: '-12px', width: '20px', height: '2px', background: '#FFD700', boxShadow: '0 0 10px #FFD700' }
};

export default AppShell;
