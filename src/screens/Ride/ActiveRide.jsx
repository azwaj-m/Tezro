import React, { useEffect, useState } from 'react';
import { SecurityEngine } from '../../utils/SecurityEngine';
import { AlertSystem } from '../../utils/AlertSystem';

const ActiveRide = ({ rideData }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // 1. ہر 10 سیکنڈ بعد لوکیشن چیک کرنے والا سسٹم
    const watchInterval = setInterval(() => {
      checkSecurity();
    }, 10000);

    return () => clearInterval(watchInterval);
  }, [currentLocation]);

  const checkSecurity = () => {
    // 2. انجن سے پوچھیں کہ کیا راستہ ٹھیک ہے؟
    const dangerDetected = SecurityEngine.isDeviated(rideData.plannedPath, currentLocation);

    if (dangerDetected) {
      // 3. اگر راستہ غلط ہے تو الرٹ سسٹم چلائیں
      AlertSystem.triggerEmergency(rideData);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{color: '#D4AF37'}}>Ride in Progress...</h2>
      <div style={styles.mapMock}>🗺️ لائیو میپ یہاں نظر آئے گا</div>
      
      <div style={styles.statusCard}>
        <p>Driver: {rideData.driverName}</p>
        <p>Status: <span style={{color: '#00ff00'}}>🛡️ Security Active</span></p>
      </div>

      <button style={styles.sosBtn} onClick={() => AlertSystem.triggerEmergency(rideData)}>
        Manual SOS
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center', background: '#1A0F0A', minHeight: '100vh' },
  mapMock: { height: '300px', background: '#333', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' },
  statusCard: { marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#F3E5AB' },
  sosBtn: { marginTop: '30px', padding: '15px', background: 'red', color: 'white', border: 'none', borderRadius: '50px', width: '100%', fontWeight: 'bold' }
};

export default ActiveRide;
