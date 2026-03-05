/**
 * TEZRO MASTER SECURITY SETTINGS
 * پیتھ: src/components/Settings/SecurityMaster.jsx
 */

import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

const SecurityMaster = ({ user }) => {
  const [settings, setSettings] = useState({
    voiceLock: user?.voiceRegistered || false,
    phantomGuard: user?.phantomGuardActive || false,
    stationaryLock: user?.stationaryLock || false
  });

  const toggleSetting = async (key) => {
    const newValue = !settings[key];
    setSettings({ ...settings, [key]: newValue });
    
    // فائر بیس میں سیٹنگ اپڈیٹ کرنا
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { [key]: newValue });
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#D4AF37' }}>🛡️ ماسٹر سیکیورٹی کنٹرول</h2>
      
      {/* وائس لاک کنٹرول */}
      <div style={styles.option}>
        <div>
          <h4>وائس بائیومیٹرک لاک</h4>
          <p style={styles.desc}>صرف آپ کی آواز پر والٹ اور ڈیوائس کھلے گی۔</p>
        </div>
        <input type="checkbox" checked={settings.voiceLock} onChange={() => toggleSetting('voiceLock')} />
      </div>

      {/* فینٹم گارڈ (Remote Tracking) */}
      <div style={styles.option}>
        <div>
          <h4>فینٹم گارڈ (Google Recovery)</h4>
          <p style={styles.desc}>گوگل کے ذریعے کہیں سے بھی فون ٹریک اور لاک کریں۔</p>
        </div>
        <input type="checkbox" checked={settings.phantomGuard} onChange={() => toggleSetting('phantomGuard')} />
      </div>

      {/* اسٹیشنری لاک */}
      <div style={styles.option}>
        <div>
          <h4>انٹیلیجنٹ ساکن لاک</h4>
          <p style={styles.desc}>فون ساکن رہنے یا غیر متعلقہ آواز پر خودکار لاک ہو جائے گا۔</p>
        </div>
        <input type="checkbox" checked={settings.stationaryLock} onChange={() => toggleSetting('stationaryLock')} />
      </div>

      <div style={styles.infoBox}>
        ⚠️ یاد رہے: فینٹم گارڈ آن ہونے کی صورت میں گم شدہ ڈیوائس کی لوکیشن ہر 30 سیکنڈ بعد اپڈیٹ ہوگی۔
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#1A0F0A', borderRadius: '15px', border: '1px solid #D4AF37' },
  option: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #333' },
  desc: { fontSize: '11px', color: '#F3E5AB', opacity: 0.7, margin: 0 },
  infoBox: { marginTop: '20px', padding: '10px', background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', borderRadius: '8px', fontSize: '12px' }
};

export default SecurityMaster;
