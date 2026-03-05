/**
 * TEZRO MASTER EMERGENCY MONITOR (Priority First)
 * پیتھ: src/components/Admin/EmergencyMonitor.jsx
 */

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

const EmergencyMonitor = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    // 1. صرف ایکٹیو ایمرجنسی الرٹس کو لائیو سننا
    const q = query(
      collection(db, "emergency_alerts"),
      where("status", "==", "ACTIVE"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeAlerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlerts(activeAlerts);
      
      // اگر نیا الرٹ آئے تو فورا آواز (Siren) بجائیں
      if (activeAlerts.length > 0) {
        playEmergencySiren();
      }
    });

    return () => unsubscribe();
  }, []);

  const playEmergencySiren = () => {
    const audio = new Audio('/emergency_siren.mp3');
    audio.play();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.pulseTitle}>🚨 لائیو ایمرجنسی کنٹرول سنٹر</h1>
        <div style={styles.stats}>ایکٹیو الرٹس: {alerts.length}</div>
      </header>

      <div style={styles.mainLayout}>
        {/* بائیں طرف: الرٹس کی لسٹ */}
        <div style={styles.alertList}>
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              onClick={() => setSelectedAlert(alert)}
              style={{...styles.alertCard, borderLeft: alert.type === 'VOICE_DETECTION' ? '8px solid #ff4444' : '8px solid #ffa500'}}
            >
              <h4>{alert.type === 'VOICE_DETECTION' ? "🎤 آواز سے الرٹ (Passenger Help)" : "📱 موبائل SOS"}</h4>
              <p><b>ڈرائیور:</b> {alert.driverName}</p>
              <p><b>مقام:</b> {alert.locationName}</p>
              <small>{new Date(alert.timestamp).toLocaleTimeString()}</small>
            </div>
          ))}
          {alerts.length === 0 && <p style={styles.noAlerts}>تمام حالات پرسکون ہیں... ✅</p>}
        </div>

        {/* دائیں طرف: نقشہ اور ایکشنز */}
        <div style={styles.mapArea}>
          {selectedAlert ? (
            <div style={styles.details}>
              <h3>📍 لائیو ٹریکنگ: {selectedAlert.customerName}</h3>
              <div style={styles.visualMap}>
                <iframe
                  title="Emergency Map"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  src={`https://maps.google.com/maps?q=${selectedAlert.lat},${selectedAlert.lng}&z=15&output=embed`}
                />
              </div>
              <div style={styles.actionButtons}>
                <button style={styles.callPolice}>پولیس کو مطلع کریں 👮</button>
                <button style={styles.callDriver}>ڈرائیور سے رابطہ کریں 📞</button>
                <button style={styles.resolveBtn}>مسئلہ حل ہو گیا (Resolve)</button>
              </div>
            </div>
          ) : (
            <div style={styles.placeholder}>کسی الرٹ پر کلک کریں تاکہ لائیو لوکیشن نظر آئے</div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '20px' },
  pulseTitle: { color: '#ff4444', animation: 'blink 1s infinite', margin: 0 },
  stats: { background: '#ff4444', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' },
  mainLayout: { display: 'flex', gap: '20px', marginTop: '20px' },
  alertList: { flex: 1, overflowY: 'auto', maxHeight: '80vh' },
  alertCard: { background: '#1a1a1a', padding: '15px', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', transition: '0.3s' },
  mapArea: { flex: 2, background: '#151515', borderRadius: '20px', padding: '20px', border: '1px solid #333' },
  visualMap: { borderRadius: '15px', overflow: 'hidden', border: '2px solid #ff4444', marginBottom: '20px' },
  actionButtons: { display: 'flex', gap: '10px' },
  callPolice: { flex: 1, background: '#ff4444', color: '#fff', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  callDriver: { flex: 1, background: '#ffa500', color: '#000', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  resolveBtn: { flex: 1, background: '#00FF88', color: '#000', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  placeholder: { textAlign: 'center', marginTop: '100px', opacity: 0.5 },
  noAlerts: { textAlign: 'center', color: '#00FF88', marginTop: '50px' }
};

export default EmergencyMonitor;
