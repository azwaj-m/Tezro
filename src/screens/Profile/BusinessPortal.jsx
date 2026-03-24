import React, { useState } from 'react';
import { SecurityEngine } from '@/utils/security/SecurityEngine';

const BusinessPortal = () => {
  const [activeTab, setActiveTab] = useState(null); // DRIVER, VENDOR, HOTEL, DELIVERY
  const [isSubmitted, setIsSubmitted] = useState(false);

  // رجسٹریشن فارم کا ہینڈلر
  const renderForm = (type) => {
    
    return (
      <div style={styles.formContainer}>
        <button onClick={() => setActiveTab(null)} style={styles.backBtn}>← پیچھے مڑیں</button>
        <h3 style={{ color: '#D4AF37' }}>{type} رجسٹریشن پورٹل</h3>
        <p style={styles.infoText}>براہ کرم تمام اصل دستاویزات کی واضح تصویر اپ لوڈ کریں۔ تصدیق کے بعد ڈیٹا تلف کر دیا جائے گا۔</p>
        
        <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
          {Object.entries(fields).map(([key, field]) => (
            <div key={key} style={styles.inputGroup}>
              <label style={styles.label}>{field.label}</label>
              {field.type === 'file' || field.type === 'camera' ? (
                <div style={styles.fileInput}>
                  <input type="file" required={field.required} />
                  <small>تصویر اپ لوڈ کریں</small>
                </div>
              ) : field.type === 'select' ? (
                <select style={styles.input}>
                  <option>انتخاب کریں</option>
                  <option>کار / ٹیکسی</option>
                  <option>رکشہ</option>
                  <option>موٹر سائیکل</option>
                </select>
              ) : (
                <input 
                  type={field.type} 
                  required={field.required} 
                  placeholder={field.label} 
                  style={styles.input} 
                />
              )}
            </div>
          ))}
          
          <button type="submit" style={styles.submitBtn}>رجسٹریشن اور فیس جمع کریں</button>
        </form>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div style={styles.successScreen}>
        <div style={styles.successIcon}>🛡️</div>
        <h2>درخواست موصول ہوگئی!</h2>
        <p>آپ کا ڈیٹا AI تصدیق کے عمل سے گزر رہا ہے۔ 24 گھنٹوں میں آپ کا اکاؤنٹ ایکٹیو کر دیا جائے گا۔</p>
        <button onClick={() => setIsSubmitted(false)} style={styles.backBtn}>ہوم پیج پر جائیں</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {activeTab ? (
        renderForm(activeTab)
      ) : (
        <div style={styles.mainMenu}>
          <h2 style={styles.mainTitle}>Tezro Business 💼</h2>
          <p style={styles.mainSub}>اپنا کاروبار رجسٹر کریں اور کمائی شروع کریں</p>
          
          <div style={styles.grid}>
            <div style={styles.card} onClick={() => setActiveTab('DRIVER')}>
              <span style={styles.icon}>🚗</span>
              <h4>ڈرائیور بنیں</h4>
              <p>کار، رکشہ یا بائیک رجسٹر کریں</p>
            </div>

            <div style={styles.card} onClick={() => setActiveTab('VENDOR')}>
              <span style={styles.icon}>🏪</span>
              <h4>وینڈر / دکاندار</h4>
              <p>دکان یا اسٹور رجسٹر کریں</p>
            </div>

            <div style={styles.card} onClick={() => setActiveTab('HOTEL')}>
              <span style={styles.icon}>🏨</span>
              <h4>ہوٹل مینیجر</h4>
              <p>ہوٹل یا شادی ہال رجسٹر کریں</p>
            </div>

            <div style={styles.card} onClick={() => setActiveTab('DELIVERY')}>
              <span style={styles.icon}>📦</span>
              <h4>ڈلیوری پارٹنر</h4>
              <p>ڈلیوری بوائے کے طور پر رجسٹر ہوں</p>
            </div>
          </div>

          <div style={styles.securityNote}>
            🔒 آپ کی سیکیورٹی ہماری ترجیح ہے۔ تمام دستاویزات تصدیق کے بعد ڈیلیٹ کر دی جاتی ہیں۔
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', minHeight: '100vh', background: '#000', color: '#F3E5AB' },
  mainMenu: { textAlign: 'center', paddingTop: '40px' },
  mainTitle: { color: '#D4AF37', fontSize: '28px', marginBottom: '10px' },
  mainSub: { opacity: 0.7, marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  card: { background: '#1A0F0A', border: '1px solid #D4AF3733', padding: '20px', borderRadius: '15px', cursor: 'pointer', textAlign: 'center' },
  icon: { fontSize: '30px', marginBottom: '10px', display: 'block' },
  formContainer: { background: '#1A0F0A', padding: '20px', borderRadius: '20px', border: '1px solid #D4AF37' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', fontSize: '13px', color: '#D4AF37', marginBottom: '5px' },
  input: { width: '100%', padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '10px', color: '#fff' },
  fileInput: { background: '#000', border: '1px dashed #D4AF37', padding: '20px', borderRadius: '10px', textAlign: 'center' },
  submitBtn: { width: '100%', padding: '15px', background: '#D4AF37', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '12px', marginTop: '20px', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', marginBottom: '20px' },
  infoText: { fontSize: '11px', opacity: 0.6, marginBottom: '20px' },
  successScreen: { textAlign: 'center', paddingTop: '100px' },
  successIcon: { fontSize: '60px', marginBottom: '20px' },
  securityNote: { marginTop: '40px', fontSize: '10px', opacity: 0.5 }
};

export default BusinessPortal;
