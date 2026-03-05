/**
 * SECURITY LOG VIEWER (Admin Only)
 * مقصد: ہیکنگ کی کوششوں کو نقشے اور تفصیل کے ساتھ دیکھنا
 */

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const SecurityLogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // صرف حالیہ 20 لاگز منگوانا (ڈیٹا بچانے کے لیے)
    const q = query(collection(db, "Security_Logs"), orderBy("time", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={{color: '#ff4444'}}>🚨 لائیو سیکیورٹی الرٹس</h2>
      {logs.map(log => (
        <div key={log.id} style={styles.logCard}>
          <div style={styles.header}>
            <strong>⚠️ {log.reason.replace(/_/g, ' ')}</strong>
            <span style={styles.badge}>{log.severity}</span>
          </div>
          <p>👤 <b>کون:</b> User ID: {log.uid.slice(0, 8)}...</p>
          <p>📍 <b>کہاں:</b> <a href={`https://maps.google.com/?q=${log.location.lat},${log.location.lng}`} target="_blank">نقشہ دیکھیں</a></p>
          <p>📱 <b>کیسے:</b> {log.device}</p>
          <small>⏰ {log.time?.toDate().toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: '15px', background: '#121212', borderRadius: '12px' },
  logCard: { background: '#1a1a1a', padding: '15px', marginBottom: '10px', borderRadius: '8px', borderLeft: '4px solid #ff4444' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  badge: { background: '#ff4444', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }
};

export default SecurityLogViewer;
