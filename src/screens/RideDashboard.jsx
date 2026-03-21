import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Clock, MapPin, Search } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useLiveTracking } from '../hooks/useLiveTracking';
import { auth } from '../firebase-config';
import { SecurityEngine } from '../Tezro_Vault/SecurityEngine';
import RideMap from '../components/RideMap';

const RideDashboard = () => {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const { requestRide, loading } = useRide();
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bookingState, setBooking] = useState({ pickup: 'DHA Phase 6', drop: '', type: 'Premium' });

  const rideOptions = [
    { id: 'Economy', price: 450, time: '3 min', icon: '🚗' },
    { id: 'Premium', price: 720, time: '5 min', icon: '🚙' },
    { id: 'Elite', price: 1150, time: '2 min', icon: '🖤' },
  ];

  const handleBooking = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (balance < 100) {
      alert("Security Alert: Insufficient Balance in Vault.");
      return;
    }

    // Tezro Security Audit
    const audit = SecurityEngine.generateAuditTrail(auth.currentUser?.uid || "GUEST", "RIDE_INIT", 0);
    const res = await requestRide(bookingState);
    
    if (res.success) {
      alert(`Dispatch Confirmed! \nAudit ID: ${audit.logId}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* 🗺️ Live Map Integration */}
      <div style={styles.mapArea}>
        <RideMap />
        
        {/* Header Overlay */}
        <div style={styles.headerOverlay}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ArrowLeft size={24} color="#000" />
          </button>
          <div style={styles.vaultBadge}>
            <p style={styles.vaultLabel}>VAULT</p>
            <p style={styles.vaultAmount}>Rs. {balance.toLocaleString()}</p>
          </div>
        </div>

        {/* Security Indicator */}
        <div style={styles.safetyIndicator}>
          <ShieldCheck size={12} color="#00FF00" />
          <span>ENCRYPTED DISPATCH</span>
        </div>
      </div>

      {/* 📍 Booking Sheet */}
      <div style={styles.selectionSheet}>
        <div style={styles.dragHandle}></div>
        
        <h2 style={styles.sheetTitle}>Secure Dispatch</h2>

        <div style={styles.locationContainer}>
          <div style={styles.locRow}>
            <div style={{...styles.dot, background: '#00FF00'}}></div>
            <p style={styles.locText}>{bookingState.pickup}</p>
          </div>
          <div style={styles.line}></div>
          <div style={styles.locRow}>
            <div style={{...styles.dot, background: '#D4AF37'}}></div>
            <input 
              style={styles.input} 
              placeholder="Enter destination" 
              onChange={(e) => setBooking({...bookingState, drop: e.target.value})}
            />
          </div>
        </div>

        <div style={styles.rideGrid}>
          {rideOptions.map(ride => (
            <button 
              key={ride.id}
              onClick={() => setBooking({...bookingState, type: ride.id})}
              style={{
                ...styles.rideCard,
                borderColor: bookingState.type === ride.id ? '#D4AF37' : '#222',
                background: bookingState.type === ride.id ? 'rgba(212,175,55,0.05)' : 'transparent'
              }}
            >
              <span style={{fontSize: '20px'}}>{ride.icon}</span>
              <p style={styles.rideType}>{ride.id}</p>
              <p style={styles.rideCost}>Rs. {ride.price}</p>
            </button>
          ))}
        </div>

        <button 
          disabled={loading}
          onClick={handleBooking}
          style={styles.confirmBtn}
        >
          {loading ? 'ENCRYPTING...' : `CONFIRM ${bookingState.type.toUpperCase()}`}
        </button>
      </div>

      {/* Auth Modal (Premium) */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={{fontSize: '40px', marginBottom: '15px'}}>🛡️</div>
            <h3 style={{color: '#D4AF37', margin: '0 0 10px 0'}}>IDENTITY REQUIRED</h3>
            <p style={{color: '#888', fontSize: '0.8rem', marginBottom: '20px'}}>Verify your identity to access Tezro Vault.</p>
            <button style={styles.googleBtn}>Continue with Google</button>
            <button onClick={() => setShowLoginModal(false)} style={styles.cancelBtn}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { background: '#000', height: '100vh', display: 'flex', flexDirection: 'column' },
  mapArea: { flex: 1, position: 'relative' },
  headerOverlay: { position: 'absolute', top: '25px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', zIndex: 10 },
  backBtn: { background: '#fff', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  vaultBadge: { background: 'rgba(0,0,0,0.8)', padding: '10px 18px', borderRadius: '18px', border: '1px solid #D4AF37', textAlign: 'right' },
  vaultLabel: { fontSize: '8px', color: '#D4AF37', letterSpacing: '2px', margin: 0 },
  vaultAmount: { color: '#fff', fontWeight: 'bold', margin: 0 },
  safetyIndicator: { position: 'absolute', bottom: '60px', right: '20px', background: '#000', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '9px', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #222' },
  selectionSheet: { background: '#050505', borderRadius: '40px 40px 0 0', padding: '25px', marginTop: '-40px', zIndex: 20, borderTop: '1px solid #222' },
  dragHandle: { width: '40px', height: '4px', background: '#222', borderRadius: '2px', margin: '0 auto 20px' },
  sheetTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#fff', textAlign: 'center', marginBottom: '25px', letterSpacing: '-1px' },
  locationContainer: { background: '#0a0a0a', padding: '15px', borderRadius: '20px', border: '1px solid #111', marginBottom: '20px' },
  locRow: { display: 'flex', alignItems: 'center', gap: '15px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%' },
  locText: { color: '#fff', fontSize: '0.9rem', margin: 0 },
  line: { width: '1px', height: '15px', background: '#222', marginLeft: '3.5px', margin: '5px 0' },
  input: { background: 'transparent', border: 'none', color: '#D4AF37', outline: 'none', width: '100%' },
  rideGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '30px' },
  rideCard: { padding: '15px 5px', borderRadius: '18px', border: '1px solid #222', cursor: 'pointer', transition: '0.3s' },
  rideType: { fontSize: '0.7rem', color: '#888', margin: '5px 0', fontWeight: 'bold' },
  rideCost: { fontSize: '0.8rem', color: '#fff', fontWeight: 'bold' },
  confirmBtn: { width: '100%', padding: '20px', borderRadius: '20px', background: 'linear-gradient(45deg, #D4AF37, #F3E5AB)', border: 'none', color: '#000', fontWeight: '900', fontSize: '1rem', letterSpacing: '1px' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { background: '#0d120d', border: '1px solid #D4AF37', padding: '40px', borderRadius: '35px', textAlign: 'center', width: '85%' },
  googleBtn: { width: '100%', padding: '15px', borderRadius: '15px', background: '#fff', border: 'none', fontWeight: 'bold', marginBottom: '15px' },
  cancelBtn: { background: 'none', border: 'none', color: '#555', fontWeight: 'bold', fontSize: '0.7rem' }
};

export default RideDashboard;
