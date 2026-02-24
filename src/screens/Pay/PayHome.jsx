import React, { useState, useEffect } from 'react';

const PayHome = () => {
  const [balance, setBalance] = useState(2500.00); // یوزر کا موجودہ بیلنس
  const [amount, setAmount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // بیلنس ختم ہونے کا نوٹیفکیشن
  useEffect(() => {
    if (balance <= 100) {
      alert("نوٹیفکیشن: آپ کا بیلنس ختم ہونے والا ہے! براہ کرم مزید بیلنس اپ لوڈ کریں۔");
    }
  }, [balance]);

  const handlePayment = () => {
    if (amount < 100) {
      alert("کم از کم 100 روپے اپ لوڈ کیے جا سکتے ہیں۔");
      return;
    }

    // آٹومیٹک سسٹم لاجک (بغیر ایڈمن اپروول)
    const newId = 'TZ-' + Math.floor(Math.random() * 1000000);
    setTransactionId(newId);
    setBalance(prev => prev + parseFloat(amount));
    setShowReceipt(true);
    
    // یہاں وہ لاجک آئے گی جو رقم آپ کے اکاؤنٹ میں بھیجے گی
    console.log(`${amount} روپے ایڈمن اکاؤنٹ میں منتقل کر دیے گئے۔`);
  };

  const downloadReceipt = () => {
    alert("رسید (JPG/PDF) آپ کی گیلری میں محفوظ کی جا رہی ہے...");
    // یہاں ہم html2canvas یا ایسی لائبریری استعمال کریں گے جو رسید کی تصویر بنائے گی
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backBtn}>←</button>
        <h2>Tezro Wallet</h2>
      </header>

      {/* Wallet Card */}
      <div style={styles.balanceCard}>
        <p>Current Balance</p>
        <h1>Rs. {balance.toFixed(2)}</h1>
        <p style={{fontSize: '12px'}}>User ID: TZ-9988</p>
      </div>

      {!showReceipt ? (
        <div style={styles.inputArea}>
          <h3>Quick Top-up</h3>
          <input 
            type="number" 
            placeholder="Enter Amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />
          <button onClick={handlePayment} style={styles.payBtn}>Upload Balance</button>
        </div>
      ) : (
        /* رسید (Receipt Slip) کا ڈیزائن */
        <div id="receipt" style={styles.receiptBox}>
          <h2 style={{color: '#00FF88'}}>Tezro Official Receipt</h2>
          <hr style={{borderColor: '#222'}} />
          <p><strong>Transaction ID:</strong> {transactionId}</p>
          <p><strong>Amount Added:</strong> Rs. {amount}</p>
          <p><strong>New Balance:</strong> Rs. {balance}</p>
          <p><strong>Status:</strong> Success (Auto-Approved)</p>
          <p style={{fontSize: '10px', marginTop: '10px'}}>رقم براہ راست Tezro کے آفیشل اکاؤنٹ میں جمع ہو گئی ہے۔</p>
          
          <button onClick={downloadReceipt} style={styles.downloadBtn}>Download Slip (JPG/PDF)</button>
          <button onClick={() => setShowReceipt(false)} style={styles.closeBtn}>Done</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { background: '#000508', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'Arial' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', color: '#00FF88', fontSize: '24px' },
  balanceCard: { background: 'linear-gradient(135deg, #00FF88 0%, #005533 100%)', padding: '25px', borderRadius: '20px', color: 'black', fontWeight: 'bold' },
  inputArea: { marginTop: '30px', background: '#0a151b', padding: '20px', borderRadius: '15px' },
  input: { width: '100%', padding: '15px', background: '#111', border: '1px solid #222', borderRadius: '10px', color: 'white', marginBottom: '15px', boxSizing: 'border-box' },
  payBtn: { width: '100%', padding: '15px', background: '#00FF88', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  receiptBox: { marginTop: '20px', background: '#111', padding: '25px', borderRadius: '20px', border: '2px solid #00FF88', textAlign: 'center' },
  downloadBtn: { width: '100%', background: 'white', color: 'black', border: 'none', padding: '10px', borderRadius: '8px', marginTop: '15px', fontWeight: 'bold', cursor: 'pointer' },
  closeBtn: { width: '100%', background: 'transparent', color: '#888', border: '1px solid #333', padding: '10px', borderRadius: '8px', marginTop: '10px', cursor: 'pointer' }
};

export default PayHome;

