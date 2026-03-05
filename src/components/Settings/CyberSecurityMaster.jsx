import React, { useState } from 'react';

const CyberSecurityMaster = () => {
  const [shieldActive, setShieldActive] = useState(true);

  return (
    <div style={styles.card}>
      <h3 style={{color: '#00FF88'}}>⚔️ تیزرو سائبر شیلڈ</h3>
      <p style={{fontSize: '12px'}}>ہیکنگ، فشنگ اور مشکوک لنکس سے مکمل تحفظ</p>
      
      <div style={styles.row}>
        <span>اینٹی فشنگ (Anti-Phishing)</span>
        <input type="checkbox" checked={shieldActive} onChange={() => setShieldActive(!shieldActive)} />
      </div>

      <div style={styles.row}>
        <span>میسج فلٹرنگ (Scam Protection)</span>
        <input type="checkbox" defaultChecked />
      </div>

      <div style={styles.alertBox}>
        {shieldActive ? "🛡️ آپ کی ڈیوائس محفوظ ہے" : "⚠️ ڈیوائس خطرے میں ہے!"}
      </div>
    </div>
  );
};

const styles = {
  card: { background: '#1A0F0A', padding: '20px', borderRadius: '15px', border: '1px solid #00FF88', marginTop: '15px' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333' },
  alertBox: { marginTop: '15px', textAlign: 'center', fontWeight: 'bold', color: '#00FF88' }
};

export default CyberSecurityMaster;
