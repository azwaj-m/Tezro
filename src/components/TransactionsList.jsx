import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';

const TransactionsList = ({ currentUser }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.uid) return;

    // فائر بیس سے ڈیٹا لانے کی کیوری
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(txs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) return <div style={{color: '#888', textAlign: 'center', padding: '20px'}}>Loading History...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Recent Activity</h3>
        <span style={styles.viewAll}>See All</span>
      </div>

      <div style={styles.list}>
        {transactions.length === 0 ? (
          <div style={styles.empty}>No transactions yet.</div>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} style={styles.card}>
              <div style={{
                ...styles.iconBox, 
                background: tx.type === 'send' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(81, 207, 102, 0.1)'
              }}>
                {tx.type === 'send' ? 
                  <ArrowUpRight size={18} color="#ff6b6b" /> : 
                  <ArrowDownLeft size={18} color="#51cf66" />
                }
              </div>

              <div style={styles.info}>
                <div style={styles.row}>
                  <span style={styles.target}>{tx.receiverBank || 'Transfer'}</span>
                  <span style={{
                    ...styles.amount, 
                    color: tx.type === 'send' ? '#fff' : '#51cf66'
                  }}>
                    {tx.type === 'send' ? '-' : '+'}PKR {tx.amount}
                  </span>
                </div>
                
                <div style={styles.row}>
                  <span style={styles.subText}>{tx.receiverId}</span>
                  <span style={styles.time}>
                    {tx.timestamp?.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { marginTop: '25px', padding: '0 5px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  title: { color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 },
  viewAll: { color: '#FFD700', fontSize: '0.8rem', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: { 
    background: '#0c0c0c', 
    padding: '15px', 
    borderRadius: '18px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px',
    border: '1px solid #111'
  },
  iconBox: { width: '40px', height: '40px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  target: { color: '#eee', fontSize: '0.9rem', fontWeight: '500' },
  amount: { fontSize: '0.95rem', fontWeight: 'bold' },
  subText: { color: '#555', fontSize: '0.75rem' },
  time: { color: '#444', fontSize: '0.7rem' },
  empty: { color: '#444', textAlign: 'center', padding: '40px', fontSize: '0.9rem' }
};

export default TransactionsList;
