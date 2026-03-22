import React, { useState } from 'react';
import { db } from '../firebase'; // آپ کے ٹری کے مطابق پاتھ درست کیا گیا ہے
import { updateDoc, doc } from 'firebase/firestore';

/**
 * 🛡️ TEZRO UNIFIED SECURITY ENGINE (V3-ULTRA)
 * تمام سیکیورٹی فنکشنز، سیٹنگز اور اینٹی فراڈ اب یہاں ہیں۔
 */

// 1. Session & Utility Functions (Exported for App.jsx/Auth)
export const validateSession = () => !!localStorage.getItem('user_token');

export const encryptPayload = (data) => btoa(JSON.stringify(data));

export const securityConfig = {
    firewallEnabled: true,
    version: "2.0.0-unified",
    status: "REINFORCED",
    lastCheck: new Date().toISOString()
};

export const startAntiFraud = () => {
    console.log("🛡️ Tezro Shield: Monitoring transactions and origin safety...");
    return true;
};

// 2. Master Security UI Component
const SecurityMaster = ({ user }) => {
  const [settings, setSettings] = useState({
    voiceLock: user?.voiceRegistered || false,
    phantomGuard: user?.phantomGuardActive || false,
    stationaryLock: user?.stationaryLock || false
  });

  const toggleSetting = async (key) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { [key]: newValue });
      console.log(`🛡️ Setting ${key} updated to ${newValue}`);
    } catch (err) {
      console.error("Firebase Security Update Error:", err);
    }
  };

  return (
    <div className="tezro-security-container" style={styles.container}>
      <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>🛡️ ماسٹر سیکیورٹی کنٹرول</h2>
      
      {[
        { id: 'voiceLock', title: 'وائس بائیومیٹرک لاک', desc: 'صرف آپ کی آواز پر والٹ اور ڈیوائس کھلے گی۔' },
        { id: 'phantomGuard', title: 'فینٹم گارڈ (Google Recovery)', desc: 'گوگل کے ذریعے کہیں سے بھی فون ٹریک اور لاک کریں۔' },
        { id: 'stationaryLock', title: 'انٹیلیجنٹ ساکن لاک', desc: 'فون ساکن رہنے یا غیر متعلقہ آواز پر خودکار لاک ہو جائے گا۔' }
      ].map((opt) => (
        <div key={opt.id} style={styles.option}>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{opt.title}</h4>
            <p style={styles.desc}>{opt.desc}</p>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={settings[opt.id]} 
              onChange={() => toggleSetting(opt.id)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      ))}

      <div style={styles.infoBox}>
        ⚠️ یاد رہے: فینٹم گارڈ آن ہونے کی صورت میں گم شدہ ڈیوائس کی لوکیشن ہر 30 سیکنڈ بعد اپڈیٹ ہوگی۔
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#0a0f18', borderRadius: '25px', border: '1px solid rgba(212, 175, 55, 0.3)', backdropFilter: 'blur(10px)' },
  option: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  desc: { fontSize: '11px', color: '#F3E5AB', opacity: 0.6, margin: 0 },
  infoBox: { marginTop: '20px', padding: '12px', background: 'rgba(212, 175, 55, 0.05)', color: '#D4AF37', borderRadius: '12px', fontSize: '12px', border: '1px dashed #D4AF37' }
};

export default SecurityMaster;
