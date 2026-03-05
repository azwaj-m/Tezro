import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const RecoveryDashboard = ({ lostUserId }) => {
  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    // 1. فائر بیس سے گم شدہ فون کا ڈیٹا لائیو سننا
    const unsubscribe = onSnapshot(doc(db, "lost_locations", lostUserId), (snapshot) => {
      setDeviceData(snapshot.data());
    });
    return () => unsubscribe();
  }, [lostUserId]);

  if (!deviceData) return <div style={styles.loading}>ڈیوائس سے رابطہ ہو رہا ہے... 📡</div>;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📍 لائیو لوکیشن ٹریکر</h3>
      
      <div style={styles.mapCard}>
        {/* گوگل میپس کا ویژول حصہ */}
        <div style={styles.visualMap}>
          <img 
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${deviceData.lat},${deviceData.lng}&zoom=15&size=400x200&markers=color:red%7C${deviceData.lat},${deviceData.lng}&key=YOUR_API_KEY`} 
            alt="Map Location"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        <div style={styles.info}>
          <p><b>آخری بار دیکھا گیا:</b> {new Date(deviceData.lastSeen).toLocaleTimeString()}</p>
          <p><b>حالت:</b> <span style={{color: '#ff4444'}}>ساکن / حرکت میں</span></p>
        </div>

        {/* براہ راست گوگل میپس ایپ میں کھولنے کا بٹن */}
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${deviceData.lat},${deviceData.lng}`}
          target="_blank"
          rel="noreferrer"
          style={styles.mapBtn}
        >
          گوگل میپس پر لائیو ٹریک کریں
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#000', minHeight: '100vh', color: '#fff' },
  title: { color: '#00FF88', textAlign: 'center' },
  mapCard: { background: '#1A1A1A', padding: '15px', borderRadius: '15px', border: '1px solid #333' },
  visualMap: { marginBottom: '15px', border: '2px solid #00FF88', borderRadius: '12px', overflow: 'hidden' },
  mapBtn: { 
    display: 'block', textAlign: 'center', background: '#00FF88', color: '#000', 
    padding: '12px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' 
  },
  info: { fontSize: '14px', marginBottom: '15px' },
  loading: { color: '#00FF88', textAlign: 'center', marginTop: '50px' }
};

export default RecoveryDashboard;
