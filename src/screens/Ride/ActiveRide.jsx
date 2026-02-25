import React, { useEffect, useState } from 'react';
import { SecurityEngine } from '../../utils/SecurityEngine';
import { AlertSystem } from '../../utils/AlertSystem';

const ActiveRide = ({ rideData }) => {
  // فرضی کرنٹ لوکیشن اور فاصلہ (یہاں اصل GPS ڈیٹا آئے گا)
  const [currentDist, setCurrentDist] = useState(0); 
  const [safetyStatus, setSafetyStatus] = useState({ isSafe: true, status: "✅ On Track" });

  useEffect(() => {
    // ہر 10 سیکنڈ بعد سیکیورٹی لاجک چلے گی
    const watchInterval = setInterval(() => {
      checkSecurity();
    }, 10000);

    return () => clearInterval(watchInterval);
  }, [currentDist]);

  const checkSecurity = () => {
    // 1. نئے سیکیورٹی انجن کا 10% گنجائش والا فارمولا استعمال کریں
    const result = SecurityEngine.checkRouteSafety(rideData.plannedDistance, currentDist);
    
    setSafetyStatus(result);

    // 2. اگر سیکیورٹی رسک (Danger) ہے تو خودکار الرٹ سسٹم چلائیں
    if (!result.isSafe) {
      AlertSystem.triggerEmergency(rideData);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{color: '#D4AF37'}}>Ride in Progress...</h2>
      
      {/* میپ ایریا */}
      <div style={styles.mapMock}>🗺️ لائیو میپ یہاں نظر آئے گا</div>
      
      <div style={styles.statusCard}>
        {/* سیکیورٹی انجن کا maskName استعمال کرتے ہوئے ڈرائیور کا آدھا نام دکھانا */}
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Driver: {SecurityEngine.maskName(rideData.driverName)}
        </p>
        
        {/* لائیو سیکیورٹی اسٹیٹس */}
        <p style={{ color: safetyStatus.isSafe ? '#00ff00' : '#ff4444', fontWeight: 'bold' }}>
          Status: {safetyStatus.status}
        </p>

        {/* اگر راستہ بھٹکا ہے تو فاصلہ بھی دکھائے گا */}
        {!safetyStatus.isSafe && (
          <p style={{ color: 'red', fontSize: '12px' }}>
            Warning: {safetyStatus.deviation.toFixed(2)} km off-route!
          </p>
        )}
      </div>

      {/* ایمرجنسی ایس او ایس بٹن */}
      <button 
        style={styles.sosBtn} 
        onClick={() => AlertSystem.triggerEmergency(rideData)}
      >
        Manual SOS (Send to {rideData.emergencyContacts.length} Contacts)
      </button>

      {/* سسٹم سیکیورٹی آئی ڈی (خفیہ ہیش کوڈ) */}
      <div style={{ marginTop: '20px', fontSize: '10px', color: '#555' }}>
        Encryption Hash: {SecurityEngine.generateSecureHash(rideData.id)}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center', background: '#1A0F0A', minHeight: '100vh', color: '#F3E5AB' },
  mapMock: { height: '250px', background: '#333', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', border: '1px solid #444' },
  statusCard: { marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid #D4AF3744' },
  sosBtn: { marginTop: '30px', padding: '15px', background: 'linear-gradient(45deg, #ff0000, #990000)', color: 'white', border: 'none', borderRadius: '50px', width: '100%', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255,0,0,0.3)', cursor: 'pointer' }
};

export default ActiveRide;
