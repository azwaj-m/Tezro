import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  const activeTheme = theme || { bg: '#1A0F0A', border: '#D4AF37', card: 'rgba(45,25,15,0.9)', text: '#F3E5AB' };

  // ایڈمن کے اختیارات کی لسٹ
  const menuItems = [
    { id: 'Overview', icon: '📊', label: 'Overview' },
    { id: 'Users', icon: '👥', label: 'User Mgmt' },
    { id: 'Vendors', icon: '🏪', label: 'Vendor/CMS' },
    { id: 'Rides', icon: '🚗', label: 'Ride Control' },
    { id: 'Orders', icon: '📦', label: 'Orders' },
    { id: 'Finance', icon: '💰', label: 'Finance' }
  ];

  return (
    <div style={{ ...styles.container, background: activeTheme.bg }}>
      
      {/* 1. TOP COMMAND BAR */}
      <div style={{ ...styles.topBar, borderBottom: `2px solid ${activeTheme.border}` }}>
        <h2 style={{ color: activeTheme.border, margin: 0 }}>🛡️ Tezro Admin</h2>
        <div style={styles.headerActions}>
          <button style={styles.emergencyBtn}>SOS Mode</button>
          <button onClick={() => navigate('/')} style={styles.exitBtn}>Exit</button>
        </div>
      </div>

      {/* 2. NAVIGATION TABS (Horizontal Scrollable) */}
      <div style={styles.tabContainer}>
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            style={{
              ...styles.tab,
              borderColor: activeTab === item.id ? activeTheme.border : 'transparent',
              color: activeTab === item.id ? activeTheme.border : activeTheme.text,
              background: activeTab === item.id ? `${activeTheme.border}22` : 'transparent'
            }}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>

      {/* 3. DYNAMIC CONTENT AREA */}
      <div style={{ ...styles.contentArea, background: activeTheme.card, borderColor: activeTheme.border }}>
        {activeTab === 'Overview' && <OverviewStats theme={activeTheme} />}
        {activeTab === 'Users' && <UserManagement theme={activeTheme} />}
        {activeTab === 'Vendors' && <VendorControl theme={activeTheme} />}
        {activeTab === 'Rides' && <RideControl theme={activeTheme} />}
        {activeTab === 'Finance' && <FinanceReport theme={activeTheme} />}
      </div>
    </div>
  );
};

// --- چھوٹے کمپوننٹس (صفائی کے لیے) ---

const OverviewStats = ({ theme }) => (
  <div style={styles.grid}>
    {[
      { label: 'Today Revenue', val: 'PKR 145k', up: '+12%' },
      { label: 'Active Drivers', val: '86', up: 'Live' },
      { label: 'Pending Vendors', val: '04', up: 'Action Req' },
      { label: 'System Health', val: '99.9%', up: 'Stable' }
    ].map((s, i) => (
      <div key={i} style={{ ...styles.statBox, border: `1px solid ${theme.border}44` }}>
        <p style={{ color: theme.border, fontSize: '12px' }}>{s.label}</p>
        <h2 style={{ color: theme.text, margin: '5px 0' }}>{s.val}</h2>
        <span style={{ color: '#00ff00', fontSize: '10px' }}>{s.up}</span>
      </div>
    ))}
  </div>
);

const UserManagement = ({ theme }) => (
  <div>
    <h4 style={{ color: theme.border }}>Manage Users (Activate/Ban)</h4>
    {['Ali Ahmed (User)', 'Khan Traders (Vendor)', 'Zia (Rider)'].map(u => (
      <div key={u} style={styles.listRow}>
        <span style={{ color: theme.text }}>{u}</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={styles.miniBtnAction}>Role</button>
          <button style={{ ...styles.miniBtnAction, color: 'red' }}>Ban</button>
        </div>
      </div>
    ))}
  </div>
);

const VendorControl = ({ theme }) => (
  <div>
    <h4 style={{ color: theme.border }}>Vendor & CMS Control</h4>
    <p style={{ color: theme.text, fontSize: '12px' }}>📍 Geo-Lock: Active (Devices locked to shop coordinates)</p>
    <button style={styles.actionBtnWide}>Edit Home Banner</button>
    <button style={styles.actionBtnWide}>Set Commission Rate</button>
  </div>
);

const RideControl = ({ theme }) => (
  <div>
    <h4 style={{ color: theme.border }}>AlinGo Ride Rates</h4>
    <div style={styles.listRow}>
      <span style={{ color: theme.text }}>Standard Fare</span>
      <input defaultValue="PKR 45/km" style={styles.input} />
    </div>
    <div style={styles.listRow}>
      <span style={{ color: theme.text }}>Weather Surcharge</span>
      <input defaultValue="1.5x" style={styles.input} />
    </div>
  </div>
);

const FinanceReport = ({ theme }) => (
  <div>
    <h4 style={{ color: theme.border }}>Monthly Revenue Summary</h4>
    <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
      {[40, 70, 45, 90, 65].map((h, i) => (
        <div key={i} style={{ height: `${h}%`, flex: 1, background: theme.border, opacity: 0.6 }}></div>
      ))}
    </div>
  </div>
);

// --- اسٹائلز ---

const styles = {
  container: { minHeight: '100vh', padding: '15px', paddingTop: '80px' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', marginBottom: '15px' },
  emergencyBtn: { background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' },
  exitBtn: { background: 'transparent', color: 'white', border: '1px solid #444', padding: '5px 10px', borderRadius: '5px' },
  tabContainer: { display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px', paddingBottom: '10px' },
  tab: { padding: '10px 15px', borderRadius: '10px', border: '1px solid', whiteSpace: 'nowrap', cursor: 'pointer', transition: '0.3s', fontSize: '13px' },
  contentArea: { padding: '20px', borderRadius: '20px', border: '1px solid', minHeight: '300px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  statBox: { padding: '15px', borderRadius: '15px', textAlign: 'center' },
  listRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #333' },
  miniBtnAction: { background: 'rgba(255,255,255,0.05)', border: '1px solid #444', color: 'white', padding: '3px 8px', borderRadius: '5px', fontSize: '11px' },
  actionBtnWide: { width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid #555', color: '#D4AF37', borderRadius: '10px', marginBottom: '10px', textAlign: 'left' },
  input: { background: '#000', border: '1px solid #444', color: '#D4AF37', padding: '5px', borderRadius: '5px', width: '80px', textAlign: 'center' }
};

export default AdminDashboard;
