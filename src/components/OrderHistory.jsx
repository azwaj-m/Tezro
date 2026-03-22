import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL'); // Default filter
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query based on Filter Selection
    let q = query(
      collection(db, 'orders'), 
      where('customerId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    // If a specific category is selected
    if (filter !== 'ALL') {
      q = query(q, where('type', '==', filter.toLowerCase()));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, filter]);

  const categories = [
    { id: 'ALL', icon: '📋' },
    { id: 'RIDE', icon: '🚗' },
    { id: 'FOOD', icon: '🍕' },
    { id: 'HOTEL', icon: '🏨' },
    { id: 'SHOP', icon: '🛍️' }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h3 style={{margin: 0}}>Activity History 📜</h3>
      </header>

      {/* 🔘 Filter Options (استعمالات کے آپشنز) */}
      <div style={styles.filterRow}>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            style={{
              ...styles.filterBtn,
              background: filter === cat.id ? '#D4AF37' : '#222',
              color: filter === cat.id ? '#000' : '#fff'
            }}
          >
            {cat.icon} {cat.id}
          </button>
        ))}
      </div>

      {/* 📜 History List */}
      <div style={styles.listContainer}>
        {loading ? (
          <p style={styles.statusText}>Loading your records...</p>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.cardTop}>
                <span style={styles.typeTag}>{order.type.toUpperCase()}</span>
                <span style={styles.date}>{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</span>
              </div>
              <div style={styles.cardMid}>
                <p style={styles.itemName}>{order.itemName || order.destination}</p>
                <h4 style={styles.amount}>PKR {order.total}</h4>
              </div>
              <div style={styles.cardBottom}>
                <span style={{...styles.status, color: order.status === 'delivered' ? '#27ae60' : '#f39c12'}}>
                  ● {order.status}
                </span>
                <button style={styles.detailsBtn}>Details</button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.statusText}>No history found for {filter}.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#000', color: '#fff', padding: '15px' },
  header: { marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' },
  filterRow: { display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '25px', paddingBottom: '5px' },
  filterBtn: { 
    border: 'none', padding: '8px 15px', borderRadius: '12px', 
    fontSize: '11px', fontWeight: 'bold', display: 'flex', 
    alignItems: 'center', gap: '5px', cursor: 'pointer', whiteSpace: 'nowrap' 
  },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  orderCard: { background: '#111', borderRadius: '18px', padding: '15px', border: '1px solid #222' },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  typeTag: { fontSize: '10px', background: '#333', padding: '3px 8px', borderRadius: '5px', color: '#D4AF37' },
  date: { fontSize: '11px', color: '#666' },
  itemName: { margin: '0 0 5px 0', fontSize: '14px', color: '#ccc' },
  amount: { margin: 0, fontSize: '18px' },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #222' },
  status: { fontSize: '11px', fontWeight: 'bold', textTransform: 'capitalize' },
  detailsBtn: { background: 'transparent', border: '1px solid #444', color: '#fff', padding: '5px 12px', borderRadius: '8px', fontSize: '10px' },
  statusText: { textAlign: 'center', color: '#666', marginTop: '50px' }
};

export default OrderHistory;
