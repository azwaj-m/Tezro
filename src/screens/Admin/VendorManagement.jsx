import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const VendorManagement = () => {
  const { theme } = useTheme();
  const activeTheme = theme || { border: '#D4AF37', card: 'rgba(45,25,15,0.9)', text: '#F3E5AB' };

  // فرضی ڈیٹا: دکانیں، ہوٹل، اور سروسز
  const [vendors, setVendors] = useState([
    { id: 1, name: "شاہی ڈھابہ", type: "Dhaba", rating: 4.2, badReviews: 1, status: "Active", commission: "10%" },
    { id: 2, name: "لاہور شادی ہال", type: "Marquee", rating: 3.5, badReviews: 3, status: "Warning", commission: "15%" },
    { id: 3, name: "پنجاب ریسٹورنٹ", type: "Restaurant", rating: 2.8, badReviews: 5, status: "Suspended", commission: "12%" },
  ]);

  // آٹو میٹک ایکشن لاجک
  const checkQuality = (badReviews) => {
    if (badReviews >= 5) return { label: "BLOCKED", color: "#FF0000", msg: "Automatic Blocked due to Quality" };
    if (badReviews >= 3.7) return { label: "SUSPENDED", color: "#FFA500", msg: "Alert Sent: Low Quality" };
    return { label: "ACTIVE", color: "#00FF00", msg: "Standard Maintained" };
  };

  return (
    <div style={{ padding: '20px', color: activeTheme.text }}>
      <h3 style={{ color: activeTheme.border }}>🏪 Vendor & Service Quality Control</h3>
      <p style={{ fontSize: '12px', marginBottom: '20px' }}>
        رولز: 3.7+ بیڈ ریویوز پر ⚠️ الرٹ/سسپنڈ | 5 بیڈ ریویوز پر 🚫 آٹو بلاک
      </p>

      <div style={styles.listContainer}>
        {vendors.map(v => {
          const quality = checkQuality(v.badReviews);
          return (
            <div key={v.id} style={{ ...styles.card, background: activeTheme.card, borderColor: activeTheme.border }}>
              <div style={styles.row}>
                <div>
                  <h4 style={{ margin: 0 }}>{v.name} <small>({v.type})</small></h4>
                  <span style={{ fontSize: '12px', color: activeTheme.border }}>📍 Verified Location Locked</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: quality.color, fontWeight: 'bold', fontSize: '12px' }}>{quality.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>Rating: {v.rating} ⭐</div>
                </div>
              </div>

              {/* ریٹنگ تھریش ہولڈ بار */}
              <div style={styles.thresholdBar}>
                <div style={{ 
                  width: `${(v.badReviews / 5) * 100}%`, 
                  height: '100%', 
                  background: quality.color,
                  transition: '0.5s' 
                }} />
              </div>

              <div style={styles.actionRow}>
                <div style={styles.infoTag}>Commission: {v.commission}</div>
                <div style={styles.infoTag}>Bad Reviews: {v.badReviews}/5</div>
                <button style={styles.manageBtn}>Adjust Rates</button>
              </div>
              
              {v.badReviews >= 3.7 && (
                <p style={{ color: '#FF4444', fontSize: '10px', marginTop: '10px' }}>
                  🚨 System Note: {quality.msg}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  card: { padding: '15px', borderRadius: '15px', border: '1px solid', marginBottom: '15px' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  thresholdBar: { height: '6px', background: '#333', borderRadius: '3px', margin: '15px 0', overflow: 'hidden' },
  actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' },
  infoTag: { fontSize: '11px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '5px' },
  manageBtn: { background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }
};

export default VendorManagement;
