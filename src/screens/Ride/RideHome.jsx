import React, { useState } from 'react';

const RideHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // عارضی اسٹیٹ
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookRide = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // اگر لاگ ان نہیں ہے تو پاپ اپ دکھاؤ
    } else {
      alert("Ride Booked!");
    }
  };

  const autoLogin = () => {
    // یہاں گوگل آٹو لاگ ان کی لاجک آئے گی
    alert("Google سے خود بخود لاگ ان کیا جا رہا ہے...");
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div style={{color: 'white', padding: '20px'}}>
      <h2>Book a Ride</h2>
      {/* ... باقی ڈیزائن ... */}
      <button onClick={handleBookRide} style={styles.confirmBtn}>Confirm Ride</button>

      {/* Login Popup Modal */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Login Required</h3>
            <p>سروس حاصل کرنے کے لیے لاگ ان کریں</p>
            <button onClick={autoLogin} style={styles.googleBtn}>
              Continue with Google (Auto)
            </button>
            <button onClick={() => setShowLoginModal(false)} style={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#0a151b', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #00FF88', width: '80%' },
  googleBtn: { background: 'white', color: 'black', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', width: '100%', cursor: 'pointer', marginBottom: '10px' },
  closeBtn: { background: 'transparent', color: '#888', border: 'none', cursor: 'pointer' },
  confirmBtn: { width: '100%', background: '#00FF88', color: 'black', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold' }
};

export default RideHome;
