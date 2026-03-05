import React, { useState } from 'react';

/**
 * 🛡️ مستند امپورٹ: 
 * ہم RegistrationLogic کو بغیر بریکٹ کے امپورٹ کر رہے ہیں کیونکہ وہاں 'export default' ہے۔
 */
import RegLogic from '../../utils/RegLogic'; 
import { SecurityUtils } from '../../utils/SecurityUtils';

const UniversalAuthPopup = ({ serviceType, onConfirm, onClose }) => {
  
  // رجسٹریشن لاجک کا استعمال
  const requiredFields = RegLogic?.getRequiredFields ? 
                         RegLogic.getRequiredFields('BUYER') : [];
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    emergencyContacts: ['', ''],
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 🛡️ لاجک کا تحفظ: ڈیٹا سینیٹائز کرنا
    const secureData = RegLogic.sanitizeAfterVerification(formData);
    
    onConfirm({
      ...secureData,
      rawPhone: formData.phone,
      emergency: formData.emergencyContacts.filter(n => n !== ""),
      timestamp: new Date().toISOString()
    });
  };

  const updateEmergency = (index, value) => {
    const newContacts = [...formData.emergencyContacts];
    newContacts[index] = value;
    setFormData({ ...formData, emergencyContacts: newContacts });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ color: '#D4AF37', margin: 0 }}>🛡️ سیکیورٹی و رجسٹریشن</h3>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>
        
        <p style={styles.subText}>
          {serviceType === 'RIDE' ? 'رائیڈ بک کرنے' : 'خریداری مکمل کرنے'} کے لیے رجسٹریشن لازمی ہے۔
        </p>

        <form onSubmit={handleSubmit}>
          <input 
            required 
            placeholder="آپ کا مکمل نام" 
            style={styles.input} 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
          
          <input 
            required 
            type="tel" 
            placeholder="فون نمبر" 
            style={styles.input} 
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />

          <div style={styles.section}>
            <label style={styles.label}>ایمرجنسی نمبرز (لازمی):</label>
            {formData.emergencyContacts.map((contact, index) => (
              <input 
                key={index}
                required={index === 0} 
                placeholder={`نمبر ${index + 1}`} 
                style={styles.inputSmall}
                value={contact}
                onChange={(e) => updateEmergency(index, e.target.value)}
              />
            ))}
            {formData.emergencyContacts.length < 5 && (
              <button 
                type="button" 
                onClick={() => setFormData({...formData, emergencyContacts: [...formData.emergencyContacts, '']})}
                style={styles.addBtn}
              >+ مزید نمبر شامل کریں</button>
            )}
          </div>

          <textarea 
            required 
            placeholder="مکمل پتہ یا لوکیشن کی تفصیل" 
            style={{...styles.input, height: '60px'}} 
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />

          <button type="submit" style={styles.confirmBtn}>
            رجسٹریشن مکمل کریں اور آگے بڑھیں
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
  modal: { backgroundColor: '#1A0F0A', border: '1px solid #D4AF37', borderRadius: '20px', padding: '25px', width: '100%', maxWidth: '450px', maxHeight: '90vh', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  closeBtn: { background: 'none', border: 'none', color: '#D4AF37', fontSize: '24px', cursor: 'pointer' },
  subText: { color: '#F3E5AB', fontSize: '13px', marginBottom: '20px', opacity: 0.8 },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #444', backgroundColor: '#000', color: '#fff', fontSize: '14px', boxSizing: 'border-box' },
  label: { display: 'block', color: '#D4AF37', fontSize: '12px', marginBottom: '8px' },
  inputSmall: { width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#000', color: '#fff', fontSize: '13px', boxSizing: 'border-box' },
  addBtn: { background: 'none', border: '1px dashed #D4AF37', color: '#D4AF37', width: '100%', padding: '8px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', marginBottom: '15px' },
  confirmBtn: { width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#D4AF37', color: '#000', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
  section: { marginBottom: '15px' }
};

export default UniversalAuthPopup;
