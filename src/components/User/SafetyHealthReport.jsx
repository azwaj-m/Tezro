/**
 * TEZRO SAFETY & TRUST REPORT
 * پیتھ: src/components/User/SafetyHealthReport.jsx
 */

import React from 'react';

const SafetyHealthReport = ({ userStats }) => {
  // فرضی ڈیٹا برائے ڈیمو
  const stats = userStats || {
    securityScore: 95,
    voiceMatchAccuracy: "98%",
    safeRides: 42,
    sosStatus: "Active",
    phantomGuard: "Enabled"
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={{ color: '#00FF88', margin: 0 }}>🛡️ آپ کی سیکیورٹی رپورٹ</h2>
        <div style={styles.scoreCircle}>
          <span style={styles.scoreText}>{stats.securityScore}</span>
          <small>ہیلتھ اسکور</small>
        </div>
      </header>

      <div style={styles.reportGrid}>
        {/* وائس لاک کی صحت */}
        <div style={styles.statCard}>
          <h4>🎤 وائس بائیومیٹرک</h4>
          <p style={{ color: '#00FF88' }}>درستگی: {stats.voiceMatchAccuracy}</p>
          <small>آپ کی آواز کا سگنیچر اپ ٹو ڈیٹ ہے۔</small>
        </div>

        {/* محفوظ سفر کا ریکارڈ */}
        <div style={styles.statCard}>
          <h4>🚖 محفوظ سفر</h4>
          <p style={{ color: '#D4AF37' }}>{stats.safeRides} مکمل رائیڈز</p>
          <small>تمام سفر سیکیورٹی پروٹوکول کے تحت رہے۔</small>
        </div>

        {/* فینٹم گارڈ اسٹیٹس */}
        <div style={styles.statCard}>
          <h4>🔍 فینٹم گارڈ</h4>
          <p style={{ color: stats.phantomGuard === "Enabled" ? '#00FF88' : '#ff4444' }}>
            {stats.phantomGuard}
          </p>
          <small>گوگل ریکوری موڈ ایکٹیو ہے۔</small>
        </div>

        {/* ایمرجنسی پروٹوکول */}
        <div style={styles.statCard}>
          <h4>🆘 SOS کانٹیکٹس</h4>
          <p style={{ color: '#fff' }}>5 نمبرز محفوظ ہیں</p>
          <small>ایمرجنسی الرٹ سسٹم نارمل ہے۔</small>
        </div>
      </div>

      <div style={styles.footerInfo}>
        <p>💡 <b>ٹپ:</b> اپنی آواز کا سگنیچر ہر 3 ماہ بعد اپڈیٹ کریں تاکہ سیکیورٹی مزید بہتر رہے۔</p>
        <button style={styles.updateBtn}>سیکیورٹی چیک اپ شروع کریں</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '25px', background: '#121212', borderRadius: '20px', border: '1px solid #333', color: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  scoreCircle: { 
    width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #00FF88', 
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    background: 'rgba(0, 255, 136, 0.1)'
  },
  scoreText: { fontSize: '24px', fontWeight: 'bold', color: '#00FF88' },
  reportGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  statCard: { background: '#1A1A1A', padding: '15px', borderRadius: '15px', border: '1px solid #222' },
  footerInfo: { marginTop: '30px', padding: '15px', background: '#1a1a1a', borderRadius: '12px', textAlign: 'center' },
  updateBtn: { background: '#00FF88', color: '#000', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }
};

export default SafetyHealthReport;
