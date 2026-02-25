import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
// 1. فائر بیس پاتھ درست کر دیا گیا (تاکہ بلیک اسکرین نہ آئے)
import { db, auth } from '../../firebase-config'; 
import { doc, updateDoc, increment, onSnapshot, setDoc, getDoc } from "firebase/firestore";

const PayHome = () => {
  const theme = useTheme() || { bg: '#000508', border: '#00FF88', text: '#FFFFFF' };
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. لائیو بیلنس سننا (Real-time Balance Listener)
  useEffect(() => {
    if (!auth.currentUser) {
        console.log("PayHome: No user logged in yet.");
        return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setBalance(docSnap.data().balance || 0);
      } else {
        // اگر یوزر کا ڈیٹا بیس میں ریکارڈ نہیں ہے تو زیرو بیلنس کے ساتھ بنا دیں
        setDoc(userRef, { 
            balance: 0, 
            email: auth.currentUser.email,
            createdAt: new Date() 
        });
      }
    }, (error) => {
        console.error("Firestore Snapshot Error:", error);
    });

    return () => unsubscribe();
  }, []);

  // 3. ٹاپ اپ ہینڈلر
  const handleTopUp = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 100) {
      alert("کم از کم 100 روپے اپ لوڈ کیے جا سکتے ہیں۔");
      return;
    }

    if (!auth.currentUser) {
      alert("براہ کرم پہلے لاگ ان کریں!");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const newId = 'TZ-PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // فائر بیس میں بیلنس بڑھائیں (Atomic Increment)
      await updateDoc(userRef, {
        balance: increment(numAmount),
        lastTransaction: newId,
        lastUpdate: new Date()
      });

      setTransactionId(newId);
      setShowReceipt(true);
      setAmount('');
      
    } catch (error) {
      console.error("Top-up Error:", error);
      alert("سسٹم میں خرابی! کیا آپ نے Vercel پر کیز سیٹ کی ہیں؟");
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = () => {
    alert("رسید آپ کے فون میں محفوظ ہو رہی ہے...");
  };

  return (
    <div style={{ ...styles.page, background: theme.bg }}>
      <header style={styles.header}>
        <h2 style={{ color: theme.border }}>Tezro Digital Wallet</h2>
      </header>

      {/* بیلنس کارڈ */}
      <div style={{ ...styles.balanceCard, borderColor: theme.border }}>
        <p style={{ color: theme.text, opacity: 0.8, margin: 0 }}>Available Balance</p>
        <h1 style={{ color: theme.border, fontSize: '38px', margin: '10px 0' }}>
          Rs. {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h1>
        <div style={{ ...styles.badge, background: theme.border }}>Verified Account</div>
      </div>

      {!showReceipt ? (
        <div style={styles.actionArea}>
          <h3 style={{ color: theme.text }}>Quick Top-up</h3>
          <p style={{ color: theme.text, fontSize: '12px', opacity: 0.6 }}>رقم براہ راست آپ کے اکاؤنٹ میں جمع ہوگی۔</p>
          
          <div style={styles.inputWrapper}>
            <span style={styles.currencyPrefix}>Rs.</span>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button 
            onClick={handleTopUp} 
            style={{ 
              ...styles.payBtn, 
              background: loading ? '#333' : theme.border,
              color: '#000',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upload via SadaPay / EasyPaisa'}
          </button>
        </div>
      ) : (
        /* رسید سلپ */
        <div style={{ ...styles.receiptBox, borderColor: theme.border }}>
          <div style={styles.receiptHeader}>
            <h3 style={{ color: theme.border }}>Tezro Official Receipt</h3>
            <p style={{ color: '#fff', fontSize: '10px' }}>{new Date().toLocaleString()}</p>
          </div>
          <hr style={{ borderColor: '#333', margin: '15px 0' }} />
          
          <div style={styles.receiptRow}><span>Transaction ID:</span> <span>{transactionId}</span></div>
          <div style={styles.receiptRow}><span>Status:</span> <span style={{color: '#00ff00'}}>Success</span></div>
          <div style={styles.receiptRow}><span>Receiver:</span> <span>Tezro Admin</span></div>
          
          <button onClick={downloadReceipt} style={styles.downloadBtn}>Download Slip</button>
          <button onClick={() => setShowReceipt(false)} style={styles.closeBtn}>Back to Wallet</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: '20px', paddingTop: '80px', minHeight: '100vh', fontFamily: 'sans-serif' },
  header: { textAlign: 'center', marginBottom: '30px' },
  balanceCard: { padding: '30px', borderRadius: '30px', border: '1px solid', textAlign: 'center', background: 'linear-gradient(180deg, rgba(0,255,136,0.05) 0%, rgba(0,0,0,1) 100%)', position: 'relative', overflow: 'hidden' },
  badge: { position: 'absolute', top: '10px', right: '10px', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', color: '#000', fontWeight: 'bold' },
  actionArea: { marginTop: '30px' },
  inputWrapper: { position: 'relative', marginBottom: '20px' },
  currencyPrefix: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888', fontWeight: 'bold' },
  input: { width: '100%', padding: '18px 18px 18px 45px', background: '#111', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontSize: '18px', boxSizing: 'border-box' },
  payBtn: { width: '100%', padding: '18px', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px' },
  receiptBox: { background: '#0a0a0a', padding: '30px', borderRadius: '25px', border: '2px solid', textAlign: 'left' },
  receiptRow: { display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '12px', fontSize: '13px' },
  downloadBtn: { width: '100%', background: '#fff', color: '#000', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' },
  closeBtn: { width: '100%', background: 'transparent', color: '#888', border: '1px solid #333', padding: '12px', borderRadius: '10px', marginTop: '10px', cursor: 'pointer' }
};

export default PayHome;
