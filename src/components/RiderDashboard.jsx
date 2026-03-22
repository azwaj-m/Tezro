import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useRiderLocation } from '../hooks/useRiderLocation'; // لوکیشن انجن

const RiderDashboard = ({ riderId }) => {
  const [newOrder, setNewOrder] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);

  // --- 🛰️ Live Location Sync ---
  // جب آرڈر ایکسیپٹ ہوگا، یہ ہک خود بخود GPS آن کر دے گا
  useRiderLocation(activeDelivery?.id, !!activeDelivery);

  // 1. Listen for nearby pending orders
  useEffect(() => {
    const q = query(
      collection(db, 'food_orders'), 
      where('status', '==', 'pending'),
      where('riderId', '==', null) 
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty && !activeDelivery) {
        const orderData = snapshot.docs[0].data();
        setNewOrder({ id: snapshot.docs[0].id, ...orderData });
        playAlertSound(); 
      }
    });

    return () => unsubscribe();
  }, [activeDelivery]);

  const playAlertSound = () => {
    const audio = new Audio('/assets/order_alert.mp3');
    audio.play().catch(e => console.log("Sound blocked by browser"));
  };

  // 2. Accept Order Logic
  const acceptOrder = async () => {
    const orderRef = doc(db, 'food_orders', newOrder.id);
    await updateDoc(orderRef, {
      status: 'rider_accepted',
      riderId: riderId,
      acceptedAt: new Date().toISOString()
    });
    setActiveDelivery(newOrder);
    setNewOrder(null);
  };

  // 3. Mark as Delivered
  const markAsDelivered = async () => {
    if (!window.confirm("Confirm Order Delivery?")) return;
    
    const orderRef = doc(db, 'food_orders', activeDelivery.id);
    await updateDoc(orderRef, {
      status: 'delivered',
      deliveredAt: new Date().toISOString()
    });
    setActiveDelivery(null); // رائیڈر دوبارہ فارغ ہو جائے گا
    alert("Great job! Payment added to your wallet.");
  };

  return (
    <div style={styles.riderApp}>
      <header style={styles.header}>
        <h3>Tezro Rider 🏍️</h3>
        <span style={styles.statusBadge}>Online</span>
      </header>

      {/* NEW ORDER NOTIFICATION */}
      {newOrder && (
        <div style={styles.orderPopup}>
          <div style={styles.popupCard}>
            <h4 style={{margin: 0}}>New Order Alert! 🔥</h4>
            <p style={{color: '#aaa'}}>{newOrder.restaurantName}</p>
            <div style={styles.priceRow}>
              <span style={{fontSize: '20px', fontWeight: 'bold'}}>PKR {newOrder.deliveryFee}</span>
              <p style={{fontSize: '10px', color: '#666'}}>Estimated Earning</p>
            </div>
            <button onClick={acceptOrder} style={styles.acceptBtn}>Accept & Start</button>
            <button onClick={() => setNewOrder(null)} style={styles.rejectBtn}>Ignore</button>
          </div>
        </div>
      )}

      {/* ACTIVE DELIVERY TRACKING VIEW */}
      {activeDelivery ? (
        <div style={styles.deliveryCard}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <h4 style={{color: '#D4AF37', margin: 0}}>Active Delivery</h4>
             <span style={styles.liveIndicator}>● LIVE GPS</span>
          </div>
          
          <div style={styles.step}>
            <small style={styles.label}>PICKUP</small>
            <p style={styles.address}>{activeDelivery.restaurantName}</p>
          </div>

          <div style={styles.step}>
            <small style={styles.label}>DROP-OFF</small>
            <p style={styles.address}>{activeDelivery.customerAddress}</p>
          </div>

          <button 
            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${activeDelivery.lat},${activeDelivery.lng}`)}
            style={styles.mapBtn}
          >
            Open Navigation 📍
          </button>
          
          <button onClick={markAsDelivered} style={styles.completeBtn}>
            Order Delivered ✅
          </button>
        </div>
      ) : (
        <div style={styles.waitingState}>
          <div style={styles.radar}></div>
          <p>Searching for nearby orders...</p>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const styles = {
  riderApp: { minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '15px', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  statusBadge: { background: '#27ae60', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' },
  orderPopup: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  popupCard: { background: '#1a1a1a', padding: '30px', borderRadius: '25px', textAlign: 'center', width: '80%', border: '1px solid #D4AF37' },
  priceRow: { margin: '20px 0', padding: '15px', background: '#222', borderRadius: '15px' },
  acceptBtn: { width: '100%', padding: '16px', background: '#D4AF37', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px' },
  rejectBtn: { width: '100%', padding: '10px', background: 'transparent', color: '#666', border: 'none', marginTop: '10px' },
  deliveryCard: { background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #333' },
  liveIndicator: { color: '#27ae60', fontSize: '10px', fontWeight: 'bold', animation: 'blink 1s infinite' },
  step: { margin: '20px 0' },
  label: { color: '#666', letterSpacing: '1px' },
  address: { margin: '5px 0', fontSize: '14px', fontWeight: '500' },
  mapBtn: { width: '100%', padding: '14px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '12px', marginBottom: '10px', fontWeight: 'bold' },
  completeBtn: { width: '100%', padding: '14px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold' },
  waitingState: { textAlign: 'center', marginTop: '150px' },
  radar: { width: '60px', height: '60px', border: '2px solid #D4AF37', borderRadius: '50%', margin: '0 auto 20px', animation: 'pulse 2s infinite' }
};

export default RiderDashboard;
