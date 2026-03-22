import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Mic, ShieldCheck, AlertTriangle } from 'lucide-react';
import { TezroFirewall } from '../../security/TezroFirewall';

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
    try {
      // 🛡️ فائر وال چیک (بیرونی حملوں سے بچاؤ)
      const check = await TezroFirewall.validateMerchantAction('MERCHANT_001', 'MARK_READY', {
        orderId,
        origin: window.location.hostname
      });

      if (check.action === "PROCEED") {
        setIsAuthenticating(true);
        // وائس بائیومیٹرک سمیلیشن
        setTimeout(async () => {
          await markAsReady(orderId);
          setIsAuthenticating(false);
        }, 1500);
      } else {
        alert(`ACCESS BLOCKED: ${check.reason}`);
      }
    } catch (err) {
      // 🚨 سیکیورٹی الرٹ (EXTERNAL_THREAT_DETECTED)
      alert(`⚠️ SECURITY ALERT: ${err.message}`);
    }
  };

  const markAsReady = async (id) => {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, { 
      status: 'completed', 
      completedAt: serverTimestamp(),
      verifiedBy: 'TezroFirewall_V3'
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>👨‍🍳 SECURE KITCHEN COMMAND</h2>
        <div style={styles.firewallBadge}><ShieldCheck size={12}/> FIREWALL ACTIVE</div>
      </div>
      
      {orders.length === 0 ? <p style={styles.empty}>No active orders in queue...</p> : 
        orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.cardLeft}>
              <span style={styles.orderId}>#{order.id.slice(-5)}</span>
              <p style={styles.itemName}>{order.item} (x{order.qty})</p>
            </div>
            
            {order.status !== 'completed' ? (
              <button 
                onClick={() => handleVoiceAuth(order.id)} 
                disabled={isAuthenticating}
                style={styles.authBtn}
              >
                {isAuthenticating ? "AUTHENTICATING..." : <><Mic size={14} /> READY</>}
              </button>
            ) : (
              <span style={styles.doneBadge}>DISPATCHED</span>
            )}
          </div>
        ))
      }
    </div>
  );
};

const styles = {
  container: { padding: '20px', background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #111', paddingBottom: '10px' },
  title: { color: '#D4AF37', margin: 0, fontSize: '1rem', letterSpacing: '1px' },
  firewallBadge: { fontSize: '8px', color: '#00FF00', border: '1px solid #00FF0033', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' },
  card: { background: '#050505', border: '1px solid #111', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft: { display: 'flex', flexDirection: 'column', gap: '5px' },
  orderId: { fontSize: '10px', color: '#444' },
  itemName: { margin: 0, fontWeight: 'bold', fontSize: '0.9rem' },
  authBtn: { background: '#D4AF37', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' },
  doneBadge: { color: '#00FF00', fontSize: '10px', fontWeight: 'bold', border: '1px solid #00FF0022', padding: '5px 10px', borderRadius: '4px' },
  empty: { textAlign: 'center', color: '#333', marginTop: '50px', fontSize: '12px' }
};

export default MerchantDashboard;
