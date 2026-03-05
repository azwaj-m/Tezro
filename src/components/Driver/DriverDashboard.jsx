/**
 * TEZRO DRIVER SMART DASHBOARD
 * پیتھ: src/components/Driver/DriverDashboard.jsx
 */

import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const DriverDashboard = ({ driverId }) => {
  const [activeRide, setActiveRide] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // 1. لائیو رائیڈ ریکوسٹ سننا (AI Matching کے ذریعے جو رائیڈ اسے ملے گی)
    const unsubscribe = onSnapshot(doc(db, "drivers", driverId), (snapshot) => {
      const data = snapshot.data();
      setIsOnline(data?.isOnline);
      if (data?.currentRideId) {
        fetchRideDetails(data.currentRideId);
      }
    });
    return () => unsubscribe();
  }, [driverId]);

  const fetchRideDetails = (rideId) => {
    onSnapshot(doc(db, "rides", rideId), (doc) => {
      setActiveRide(doc.data());
    });
  };

  return (
    <div style={styles.container}>
      {/* آن لائن / آف لائن سوئچ */}
      <header style={styles.header}>
        <div style={isOnline ? styles.onlineDot : styles.offlineDot} />
        <h3>{isOnline ? "آپ آن لائن ہیں" : "آپ آف لائن ہیں"}</h3>
        <button onClick={() => updateDoc(doc(db, "drivers", driverId), { isOnline: !isOnline })} style={styles.toggleBtn}>
          {isOnline ? "آف لائن ہوں" : "کام شروع کریں"}
        </button>
      </header>

      {/* ایکٹیو رائیڈ کارڈ */}
      {activeRide ? (
        <div style={styles.rideCard}>
          <div style={styles.badge}>نئی رائیڈ موصول ہوئی! 🚖</div>
          <h4>کسٹمر: {activeRide.customerName}</h4>
          <p>📍 پک اپ: {activeRide.pickupAddress}</p>
          
          <div style={styles.actionRow}>
            {/* گوگل میپس نیویگیشن بٹن */}
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeRide.pickupLat},${activeRide.pickupLng}`}
              target="_blank"
              style={styles.navBtn}
            >
              راستہ دیکھیں (Google Maps)
            </a>
            
            <button style={styles.arriveBtn}>میں پہنچ گیا ہوں</button>
          </div>
        </div>
      ) : (
        <div style={styles.idleState}>
          <p>نئی سواری کا انتظار ہے...</p>
          <div style={styles.pulseScanner} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#000', minHeight: '100vh', color: '#fff' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px' },
  onlineDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 10px #00FF88' },
  offlineDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#ff4444' },
  rideCard: { background: '#1A1A1A', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #00FF88' },
  badge: { background: '#00FF88', color: '#000', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' },
  actionRow: { display: 'flex', gap: '10px', marginTop: '15px' },
  navBtn: { flex: 1, background: '#D4AF37', color: '#000', padding: '12px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' },
  arriveBtn: { flex: 1, background: '#fff', color: '#000', padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none' },
  idleState: { textAlign: 'center', marginTop: '100px', opacity: 0.5 },
  pulseScanner: { width: '80px', height: '80px', border: '2px solid #00FF88', borderRadius: '50%', margin: '20px auto', animation: 'pulse 2s infinite' },
  toggleBtn: { background: '#333', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px' }
};

export default DriverDashboard;
