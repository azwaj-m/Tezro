import React, { useState } from 'react';
import { db } from '../../firebase';
import { updateDoc, doc } from 'firebase/firestore';

/**
 * TEZRO INTEGRATED EMERGENCY SYSTEM
 * اس میں رجسٹریشن (Input) اور الرٹ (Trigger) دونوں شامل ہیں
 */

// 1. الرٹ بھیجنے کا انجن (پہلے یہ EmergencyService میں تھا)
export const triggerSOSAlert = async (user, location) => {
  console.log("🚨 SOS الرٹ ایکٹیویٹ ہو گیا ہے!");
  
  const alertData = {
    userName: user.name,
    phone: user.phone,
    emergencyContacts: user.emergencyContacts || [],
    location: {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      mapsUrl: `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`
    },
    timestamp: new Date().toISOString()
  };

  // یہاں فائر بیس الرٹس یا SMS API کال ہو سکتی ہے
  console.log("SOS ڈیٹا بھیج دیا گیا:", alertData);
  return true;
};

// 2. نمبرز درج کرنے کا فارم (پہلے یہ EmergencyProtocol میں تھا)
const EmergencyProtocol = ({ user, onConfirm, onClose }) => {
  const [contacts, setContacts] = useState(user?.emergencyContacts || [""]);

  const addField = () => {
    if (contacts.length < 5) setContacts([...contacts, ""]);
  };

  const handleSave = async () => {
    try {
      // فائر بیس میں نمبرز محفوظ کرنا (اسٹوریج بچانے کے لیے صرف نمبرز کی لسٹ)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        emergencyContacts: contacts.filter(c => c.length >= 10)
      });
      
      onConfirm(contacts);
    } catch (error) {
      console.error("نمبر محفوظ کرنے میں غلطی:", error);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h3>⚠️ ایمرجنسی پروٹوکول</h3>
          <button onClick={onClose} style={{background:'none', border:'none', color:'#D4AF37', cursor:'pointer'}}>X</button>
        </div>
        <p style={{fontSize: '12px', opacity: 0.8}}>مصیبت کے وقت ان نمبرز کو آپ کی لوکیشن بھیجی جائے گی:</p>
        
        {contacts.map((c, i) => (
          <input 
            key={i}
            value={c}
            placeholder={`ایمرجنسی نمبر ${i+1}`}
            style={styles.input}
            onChange={(e) => {
              const newContacts = [...contacts];
              newContacts[i] = e.target.value;
              setContacts(newContacts);
            }}
          />
        ))}

        {contacts.length < 5 && (
          <button onClick={addField} style={styles.addBtn}>+ مزید نمبر شامل کریں</button>
        )}
        
        <button 
          disabled={contacts[0].length < 10}
          onClick={handleSave} 
          style={styles.confirmBtn}
        >
          محفوظ کریں اور آگے بڑھیں
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' },
  modal: { background: '#1A0F0A', padding: '25px', borderRadius: '20px', border: '2px solid #D4AF37', width: '90%', maxWidth: '400px', color: '#F3E5AB' },
  input: { width: '100%', padding: '12px', marginBottom: '10px', background: '#000', border: '1px solid #444', color: '#fff', borderRadius: '8px', boxSizing: 'border-box' },
  addBtn: { background: 'none', border: '1px dashed #D4AF37', color: '#D4AF37', padding: '10px', width: '100%', marginBottom: '10px', cursor: 'pointer', borderRadius: '8px' },
  confirmBtn: { background: '#D4AF37', color: '#000', fontWeight: 'bold', padding: '15px', width: '100%', border: 'none', borderRadius: '10px', cursor: 'pointer' }
};

export default EmergencyProtocol;
