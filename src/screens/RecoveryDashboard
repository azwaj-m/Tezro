import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

const RecoveryDashboard = ({ lostUserId }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // گم شدہ فون کی لائیو لوکیشن گوگل میپ پر دکھانا
    const unsubscribe = onSnapshot(doc(db, "lost_locations", lostUserId), (doc) => {
      setLocation(doc.data());
    });
    return () => unsubscribe();
  }, [lostUserId]);

  return (
    <div style={styles.container}>
      <h2>🔍 ٹیزرو ڈیوائس ریکوری</h2>
      {location ? (
        <div style={styles.mapBox}>
          <p>آخری لوکیشن: {new Date(location.lastSeen).toLocaleTimeString()}</p>
          <a 
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`} 
            target="_blank" 
            style={styles.mapBtn}
          >
            گوگل میپس پر دیکھیں
          </a>
        </div>
      ) : (
        <p>ڈیوائس سے رابطہ کرنے کی کوشش کی جا رہی ہے...</p>
      )}
      <button onClick={() => triggerStolenMode(lostUserId)} style={styles.lockBtn}>
        فوری لاک کریں (Remote Lock)
      </button>
    </div>
  );
};
