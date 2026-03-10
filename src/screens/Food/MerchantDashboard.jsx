import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Mic, ShieldCheck } from 'lucide-react';

const MerchantDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleVoiceAuth = async (orderId) => {
    setIsAuthenticating(true);
    // یہاں ہم فرض کر رہے ہیں کہ آواز کی تصدیق ہو رہی ہے
    setTimeout(async () => {
      await markAsReady(orderId);
      setIsAuthenticating(false);
    }, 1500);
  };

  const markAsReady = async (id) => {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, { 
      status: 'completed', 
      completedAt: serverTimestamp(),
      verifiedBy: 'VoiceGuardian'
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👨‍🍳 SECURE KITCHEN COMMAND</h2>
      {orders.map(order => (
        <div key={order.id} style={styles.card}>
          <div style={styles.cardInfo}>
            <p style={styles.itemName}>{order.item} (x{order.qty})</p>
            <p style={styles.status}>Status: {order.status}</p>
          </div>
          {order.status !== 'completed' && (
            <button 
              onClick={() => handleVoiceAuth(order.id)} 
              disabled={isAuthenticating}
              style={styles.authBtn}
            >
              {isAuthenticating ? "Verifying..." : <><Mic size={14} /> AUTHORIZE READY</>}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' },
  title: { color: '#D4AF37', borderBottom: '1px solid #111', paddingBottom: '10px' },
  card: { background: '#050505', border: '1px solid #111', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { margin: 0, fontWeight: 'bold' },
  status: { margin: 0, fontSize: '10px', color: '#555' },
  authBtn: { background: '#D4AF37', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }
};

export default MerchantDashboard;
