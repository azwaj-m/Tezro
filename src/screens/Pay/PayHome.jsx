import React, { useState } from 'react';

const PayHome = () => {
  // لاجک: یہ بیلنس والیٹ میں شو ہوگا
  const [walletBalance, setWalletBalance] = useState(2500.00);
  const [topUpAmount, setTopUpAmount] = useState('');

  const handleTopUp = () => {
    if(topUpAmount > 0) {
      alert(`رقم آپ کے فراہم کردہ اکاؤنٹ میں بھیجی جا رہی ہے...\nوالٹ میں ${topUpAmount} روپے کا اضافہ کر دیا گیا ہے۔`);
      setWalletBalance(walletBalance + parseFloat(topUpAmount));
      setTopUpAmount('');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backBtn}>←</button>
        <h2>Tezro Wallet</h2>
      </header>

      {/* Wallet Card */}
      <div style={styles.balanceCard}>
        <p style={{margin: 0, opacity: 0.8}}>Available Balance</p>
        <h1 style={{fontSize: '36px', margin: '10px 0'}}>Rs. {walletBalance.toLocaleString()}</h1>
        <div style={styles.chip}>Tezro Pay</div>
      </div>

      {/* Top Up Section */}
      <div style={styles.actionSection}>
        <h3>Add Money</h3>
        <p style={{fontSize: '12px', color: '#888'}}>رقم براہ راست ایڈمن اکاؤنٹ میں منتقل ہوگی</p>
        
        <input 
          type="number" 
          placeholder="Enter Amount" 
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(e.target.value)}
          style={styles.input} 
        />
        
        <button onClick={handleTopUp} style={styles.payBtn}>Top Up Now</button>
      </div>

      {/* Transactions History */}
      <div style={{marginTop: '30px'}}>
        <h4>Recent Transactions</h4>
        <div style={styles.transaction}>
          <span>Ride Payment</span>
          <span style={{color: '#ff4444'}}>- Rs. 450</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#000508', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'Arial' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' },
  backBtn: { background: 'none', border: 'none', color: '#00FF88', fontSize: '24px' },
  balanceCard: { background: 'linear-gradient(135deg, #00FF88 0%, #008855 100%)', padding: '30px', borderRadius: '25px', color: 'black', fontWeight: 'bold' },
  chip: { background: 'rgba(0,0,0,0.1)', display: 'inline-block', padding: '5px 12px', borderRadius: '10px', fontSize: '12px' },
  actionSection: { marginTop: '40px', background: '#0a151b', padding: '20px', borderRadius: '20px' },
  input: { width: '100%', background: '#111', border: '1px solid #222', padding: '15px', borderRadius: '10px', color: 'white', marginBottom: '15px', boxSizing: 'border-box' },
  payBtn: { width: '100%', background: '#00FF88', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  transaction: { display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#0a151b', borderRadius: '12px', marginBottom: '10px' }
};

export default PayHome;
