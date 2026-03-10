import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const MerchantDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // نوٹ: آپ کے اسٹرکچر میں فائر بیس کنفیگ src/firebase/config.js میں ہے
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const markAsReady = async (id) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { 
        status: 'completed', 
        completedAt: serverTimestamp() 
      });
    } catch (err) {
      console.error("Firebase Update Error:", err);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#D4AF37', borderBottom: '1px solid #111', paddingBottom: '10px' }}>👨‍🍳 KITCHEN COMMAND</h2>
      <div style={{ marginTop: '20px' }}>
        {orders.length === 0 ? <p style={{color: '#444'}}>No active orders...</p> : 
          orders.map(order => (
            <div key={order.id} style={{ background: '#050505', border: '1px solid #111', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{order.item || 'Food Item'}</span>
                <span style={{ color: order.status === 'completed' ? '#00FF00' : '#FFD700', fontSize: '10px' }}>
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#666' }}>Order ID: {order.id.slice(0,8)}...</p>
              {order.status !== 'completed' && (
                <button 
                  onClick={() => markAsReady(order.id)}
                  style={{ width: '100%', marginTop: '10px', background: '#D4AF37', color: '#000', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  MARK AS READY
                </button>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MerchantDashboard;
