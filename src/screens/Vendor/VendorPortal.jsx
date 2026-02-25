import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const VendorPortal = () => {
  const theme = useTheme() || { bg: '#1A0F0A', border: '#D4AF37', text: '#F3E5AB' };
  
  // فرضی ڈیٹا (یہ بعد میں API سے آئے گا)
  const [stats] = useState({
    totalEarnings: 85400,
    commissionPaid: 12810, // 15% کٹا ہوا کمیشن
    netBalance: 72590,     // وینڈر کا خالص حصہ
    completedOrders: 142
  });

  const [recentOrders] = useState([
    { id: 'ORD-552', customer: 'Ali Khan', amount: 1200, date: '2024-02-20', status: 'Completed' },
    { id: 'ORD-558', customer: 'Sara Malik', amount: 3500, date: '2024-02-21', status: 'Completed' },
    { id: 'ORD-560', customer: 'Usman J.', amount: 850, date: '2024-02-22', status: 'In Review' },
  ]);

  // PDF رپورٹ ڈاؤن لوڈ کرنے کا فنکشن
  const generatePDFReport = () => {
    alert("تیار ہو رہا ہے...\nTezro Business Report\nVendor ID: VND-786\nPeriod: Feb 2024\nStatus: Verified");
    // یہاں ہم 'jspdf' لائبریری استعمال کر کے اصل فائل ڈاؤن لوڈ کروا سکتے ہیں
  };

  return (
    <div style={{ ...styles.page, background: theme.bg }}>
      <header style={styles.header}>
        <h2 style={{ color: theme.border }}>Vendor Dashboard</h2>
        <span style={styles.vendorId}>ID: VND-7860</span>
      </header>

      {/* مانیٹری کارڈز */}
      <div style={styles.grid}>
        <div style={{ ...styles.statCard, border: `1px solid ${theme.border}44` }}>
          <p style={styles.label}>Total Sales</p>
          <h3 style={{ color: theme.text }}>Rs. {stats.totalEarnings.toLocaleString()}</h3>
        </div>
        <div style={{ ...styles.statCard, border: `1px solid ${theme.border}44` }}>
          <p style={styles.label}>Commission Paid</p>
          <h3 style={{ color: '#ff4d4d' }}>- Rs. {stats.commissionPaid.toLocaleString()}</h3>
        </div>
        <div style={{ ...styles.statCard, background: `${theme.border}11`, border: `2px solid ${theme.border}` }}>
          <p style={styles.label}>Net Balance (Payable)</p>
          <h2 style={{ color: theme.border }}>Rs. {stats.netBalance.toLocaleString()}</h2>
        </div>
      </div>

      {/* ڈاؤن لوڈ بٹن */}
      <button onClick={generatePDFReport} style={{ ...styles.downloadBtn, borderColor: theme.border, color: theme.border }}>
        📄 Download Monthly Statement (PDF)
      </button>

      {/* آرڈر ہسٹری */}
      <div style={styles.orderSection}>
        <h4 style={{ color: theme.text, borderBottom: `1px solid ${theme.border}33`, paddingBottom: '10px' }}>
          Recent Transactions & Orders
        </h4>
        {recentOrders.map(order => (
          <div key={order.id} style={styles.orderRow}>
            <div style={{ flex: 1 }}>
              <span style={{ color: '#fff', display: 'block', fontSize: '14px' }}>{order.customer}</span>
              <small style={{ color: '#888' }}>{order.date} | {order.id}</small>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: theme.border, fontWeight: 'bold' }}>Rs. {order.amount}</span>
              <small style={{ 
                display: 'block', 
                color: order.status === 'Completed' ? '#00ff00' : '#ffa500',
                fontSize: '10px'
              }}>
                ● {order.status}
              </small>
            </div>
          </div>
        ))}
      </div>

      <p style={styles.footerNote}>* کمیشن کی کٹوتی ایڈمن کے طے کردہ ریٹ کے مطابق کی گئی ہے۔</p>
    </div>
  );
};

const styles = {
  page: { padding: '20px', paddingTop: '80px', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  vendorId: { background: '#D4AF3722', color: '#D4AF37', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', border: '1px solid #D4AF3744' },
  grid: { display: 'grid', gap: '15px', marginBottom: '25px' },
  statCard: { padding: '20px', borderRadius: '18px', background: 'rgba(255,255,255,0.03)' },
  label: { margin: 0, fontSize: '12px', opacity: 0.7, color: '#fff' },
  downloadBtn: { width: '100%', padding: '15px', borderRadius: '12px', background: 'transparent', border: '1px solid', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' },
  orderSection: { marginTop: '20px' },
  orderRow: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #222', alignItems: 'center' },
  footerNote: { fontSize: '10px', color: '#666', textAlign: 'center', marginTop: '30px', fontStyle: 'italic' }
};

export default VendorPortal;
