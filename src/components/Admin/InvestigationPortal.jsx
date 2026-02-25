import React, { useState } from 'react';
import { SecurityEngine } from '../../utils/SecurityEngine';

const InvestigationPortal = ({ theme }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleQuickCheck = () => {
    // صرف یہ چیک کرنا کہ کیا یوزر موجود ہے
    const found = true; // ڈیٹا بیس سرچ لاجک
    setResult(found ? "✅ User Registered in System" : "❌ No Record Found");
  };

  const getFullForensics = () => {
    const key = prompt("درخواست گزار ادارے کا ریفرنس اور اپنی مینجنگ کی (Managing Key) درج کریں:");
    if (key === "7860-SECURE") {
      setIsAuthorized(true);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#000', borderRadius: '15px', border: `2px solid red` }}>
      <h3 style={{ color: 'red' }}>🚨 Forensic Investigation Cell</h3>
      
      <input 
        placeholder="فون نمبر، گاڑی نمبر یا کارڈ نمبر درج کریں..."
        onChange={(e) => setQuery(e.target.value)}
        style={styles.searchBox}
      />
      <button onClick={handleQuickCheck} style={styles.btn}>Quick Status Check</button>

      {result && <div style={styles.statusBox}>{result}</div>}

      <button onClick={getFullForensics} style={styles.forensicBtn}>
        Request Full Tracking (Legal Only)
      </button>

      {isAuthorized && (
        <div style={styles.liveData}>
          <p>📍 Current Location: 31.5204° N, 74.3587° E (Live)</p>
          <p>🏠 Address Hash: {SecurityEngine.generateSecureHash("Lahore, Pakistan")}</p>
          <p>📞 Emergency Contacts: Notified via SMS</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  searchBox: { width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '8px' },
  btn: { marginTop: '10px', padding: '10px', width: '100%', background: '#444', color: '#fff', border: 'none', borderRadius: '8px' },
  statusBox: { marginTop: '15px', padding: '10px', textAlign: 'center', background: '#222', borderRadius: '5px' },
  forensicBtn: { marginTop: '20px', padding: '12px', width: '100%', background: 'red', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '8px' },
  liveData: { marginTop: '20px', borderTop: '1px solid red', paddingTop: '10px', color: '#fff' }
};

export default InvestigationPortal;
