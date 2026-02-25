import React, { useState } from 'react';

const EmergencyProtocol = ({ onConfirm }) => {
  const [contacts, setContacts] = useState([""]);

  const addField = () => {
    if (contacts.length < 5) setContacts([...contacts, ""]);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>⚠️ ایمرجنسی پروٹوکول</h3>
        <p>رائیڈ شروع کرنے سے پہلے کم از کم ایک اور زیادہ سے زیادہ 5 ایمرجنسی نمبرز درج کریں:</p>
        
        {contacts.map((c, i) => (
          <input 
            key={i}
            placeholder={`ایمرجنسی نمبر ${i+1}`}
            style={styles.input}
            onChange={(e) => {
              const newContacts = [...contacts];
              newContacts[i] = e.target.value;
              setContacts(newContacts);
            }}
          />
        ))}

        <button onClick={addField} style={styles.addBtn}>+ نمبر شامل کریں</button>
        <button 
          disabled={contacts[0].length < 10}
          onClick={() => onConfirm(contacts)} 
          style={styles.confirmBtn}
        >
          محفوظ کریں اور رائیڈ بک کریں
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modal: { background: '#1A0F0A', padding: '25px', borderRadius: '20px', border: '2px solid #D4AF37', width: '90%', maxWidth: '400px', color: '#F3E5AB' },
  input: { width: '100%', padding: '12px', marginBottom: '10px', background: '#000', border: '1px solid #D4AF37', color: '#fff', borderRadius: '8px' },
  addBtn: { background: 'none', border: '1px dashed #D4AF37', color: '#D4AF37', padding: '10px', width: '100%', marginBottom: '10px' },
  confirmBtn: { background: '#D4AF37', color: '#000', fontWeight: 'bold', padding: '15px', width: '100%', border: 'none', borderRadius: '10px' }
};

export default EmergencyProtocol;
