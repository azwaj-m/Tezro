import React, { useState } from 'react';
import QuickAuthPopup from '../components/Auth/QuickAuthPopup';

const ServiceHome = ({ serviceType }) => {
  const [cart, setCart] = useState([]);
  const [showAuth, setShowAuth] = useState(false);

  // جب صارف 'Confirm' یا 'Book Now' دبائے گا
  const handleFinalConfirm = () => {
    if (cart.length > 0 || serviceType === 'RIDE') {
      setShowAuth(true); // سیکیورٹی پاپ اپ دکھائیں
    } else {
      alert("براہ کرم پہلے کچھ سلیکٹ کریں!");
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={{ color: '#D4AF37' }}>{serviceType} Marketplace</h2>
      
      {/* آئٹمز کی لسٹ (مثال) */}
      <div style={styles.itemCard} onClick={() => setCart([...cart, 'Item 1'])}>
        <span>🛍️ Sample Product / Room</span>
        <button style={styles.addBtn}>Add to Basket</button>
      </div>

      {/* کنفرمیشن بٹن جو ہیڈر یا فوٹر میں ہو سکتا ہے */}
      <div style={styles.checkoutBar}>
        <div style={{color: '#fff'}}>Items: {cart.length}</div>
        <button style={styles.confirmBtn} onClick={handleFinalConfirm}>
          Confirm Selection ❯
        </button>
      </div>

      {/* آپ کا مخصوص سیکیورٹی لاگ ان پاپ اپ */}
      {showAuth && (
        <QuickAuthPopup 
          serviceType={serviceType} 
          onConfirm={(userData) => {
            console.log("Verified User Data:", userData);
            setShowAuth(false);
            alert("آرڈر کنفرم ہو گیا اور سیکیورٹی ڈیٹا محفوظ کر لیا گیا!");
          }}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
};

const styles = {
  page: { padding: '20px', background: '#1A0F0A', minHeight: '100vh', paddingTop: '80px' },
  itemCard: { background: '#2D190F', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', border: '1px solid #D4AF3733' },
  addBtn: { background: '#D4AF37', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' },
  checkoutBar: { position: 'fixed', bottom: '80px', left: '20px', right: '20px', background: '#D4AF37', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' },
  confirmBtn: { background: '#000', color: '#D4AF37', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }
};

export default ServiceHome;
