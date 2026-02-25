import React, { useState } from 'react';
import UniversalAuthPopup from '../components/Auth/UniversalAuthPopup'; // 👈 نام تبدیل کر دیا گیا

const ServiceHome = ({ serviceType }) => {
  const [cart, setCart] = useState([]);
  const [showAuth, setShowAuth] = useState(false);

  // جب صارف 'Confirm' یا 'Book Now' دبائے گا
  const handleFinalConfirm = () => {
    // رائیڈ کے لیے باسکٹ کی ضرورت نہیں، باقی سروسز کے لیے باسکٹ چیک کریں گے
    if (serviceType === 'RIDE' || cart.length > 0) {
      setShowAuth(true); // سمارٹ پاپ اپ دکھائیں
    } else {
      alert("براہ کرم پہلے کچھ سلیکٹ کریں!");
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={{ color: '#D4AF37', textTransform: 'capitalize' }}>{serviceType} Marketplace</h2>
      
      {/* آئٹمز کی لسٹ (مثال کے طور پر) */}
      <div 
        style={styles.itemCard} 
        onClick={() => setCart([...cart, `${serviceType} Item ${cart.length + 1}`])}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#F3E5AB', fontWeight: 'bold' }}>🛍️ Sample {serviceType}</span>
          <span style={{ color: '#D4AF37', fontSize: '12px' }}>Safe & Verified Service</span>
        </div>
        <button style={styles.addBtn}>Add to Basket</button>
      </div>

      {/* کنفرمیشن بار */}
      <div style={styles.checkoutBar}>
        <div style={{ color: '#000', fontWeight: 'bold' }}>
          {serviceType === 'RIDE' ? 'Ready to Go?' : `Items: ${cart.length}`}
        </div>
        <button style={styles.confirmBtn} onClick={handleFinalConfirm}>
          {serviceType === 'RIDE' ? 'Book Ride Now ❯' : 'Confirm Order ❯'}
        </button>
      </div>

      {/* مرج شدہ یونیورسل سیکیورٹی پاپ اپ */}
      {showAuth && (
        <UniversalAuthPopup 
          serviceType={serviceType} 
          orderData={{ total: cart.length * 100 }} // یہاں آپ اپنی قیمت کا لاجک لگا سکتے ہیں
          onConfirm={(secureData) => {
            console.log("Verified User Data:", secureData);
            setShowAuth(false);
            alert(`${serviceType} کنفرم ہو گیا! سیکیورٹی ڈیٹا محفوظ ہے۔`);
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

const styles = {
  page: { padding: '20px', background: '#1A0F0A', minHeight: '100vh', paddingTop: '80px', paddingBottom: '160px' },
  itemCard: { 
    background: '#2D190F', 
    padding: '18px', 
    borderRadius: '18px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '12px', 
    border: '1px solid #D4AF3733',
    cursor: 'pointer'
  },
  addBtn: { background: '#D4AF37', border: 'none', borderRadius: '8px', padding: '8px 15px', cursor: 'pointer', fontWeight: 'bold' },
  checkoutBar: { 
    position: 'fixed', 
    bottom: '90px', 
    left: '20px', 
    right: '20px', 
    background: '#D4AF37', 
    padding: '18px', 
    borderRadius: '20px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
    zIndex: 900 
  },
  confirmBtn: { 
    background: '#000', 
    color: '#D4AF37', 
    border: 'none', 
    padding: '12px 22px', 
    borderRadius: '12px', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default ServiceHome;
