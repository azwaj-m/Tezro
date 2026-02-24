import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // 📧 ای میل شو/ہائیڈ کرنے کی اسٹیٹ
  const [showEmail, setShowEmail] = useState(true);

  const activeTheme = theme || { bg: '#1A0F0A', border: '#D4AF37', card: 'rgba(45,25,15,0.9)', text: '#F3E5AB' };

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

      {/* 2. NAVIGATION TABS */}
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
        {/* یہاں ہم نے شو ای میل کی اسٹیٹ پاس کر دی ہے */}
        {activeTab === 'Vendors' && <VendorControl theme={activeTheme} showEmail={showEmail} setShowEmail={setShowEmail} />}
        {activeTab === 'Rides' && <RideControl theme={activeTheme} />}
        {activeTab === 'Finance' && <FinanceReport theme={activeTheme} />}
      </div>
    </div>
  );
};

// --- چھوٹے کمپوننٹس ---

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

const VendorControl = ({ theme, showEmail, setShowEmail }) => (
  <div>
    <h4 style={{ color: theme.border }}>Vendor & CMS Control</h4>
    <p style={{ color: theme.text, fontSize: '12px' }}>📍 Geo-Lock: Active</p>
    <button style={styles.actionBtnWide}>Edit Home Banner</button>
    <button style={styles.actionBtnWide}>Set Commission Rate</button>
    
    {/* ✉️ ای میل کنٹرول سیکشن */}
    <div style={{ ...styles.emailToggleCard, border: `1px dashed ${theme.border}55` }}>
      <h5 style={{ color: theme.border, margin: '0 0 10px 0' }}>Support Email Settings</h5>
      <div style={styles.listRow}>
        <div style={{ flex: 1 }}>
          <span style={{ color: theme.text, display: 'block', fontSize: '13px' }}>Tezrosuper@tezro.com</span>
          <small style={{ color: theme.text + '88', fontSize: '10px' }}>Visible to users in help section</small>
        </div>
        <button 
          onClick={() => setShowEmail(!showEmail)}
          style={{ 
            ...styles.toggleBtn, 
            background: showEmail ? '#2ecc71' : '#e74c3c' 
          }}
        >
          {showEmail ? 'ON (Shown)' : 'OFF (Hidden)'}
        </button>
      </div>
    </div>
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
  input: { background: '#000', border: '1px solid #444', color: '#D4AF37', padding: '5px', borderRadius: '5px', width: '80px', textAlign: 'center' },
  // نئے اسٹائلز
  emailToggleCard: { marginTop: '20px', padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' },
  toggleBtn: { border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', minWidth: '85px' }
};

export default AdminDashboard;
