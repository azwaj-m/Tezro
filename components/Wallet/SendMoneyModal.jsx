import React, { useState } from 'react';
import { X, Send, ShieldCheck, AlertCircle } from 'lucide-react';

const SendMoneyModal = ({ isOpen, onClose, onConfirm, balance }) => {
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!receiverId || !amount || amount <= 0) {
      alert("براہ کرم درست معلومات درج کریں۔");
      return;
    }
    if (amount > balance) {
      alert("آپ کا بیلنس ناکافی ہے۔");
      return;
    }

    setIsProcessing(true);
    await onConfirm(receiverId, parseFloat(amount));
    setIsProcessing(false);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0, color: '#FFD700' }}>Send Money</h3>
          <X onClick={onClose} style={{ cursor: 'pointer' }} color="#888" />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Receiver ID / Wallet Address</label>
          <input 
            style={styles.input} 
            placeholder="Enter ID..." 
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Amount (PKR)</label>
          <input 
            type="number" 
            style={styles.input} 
            placeholder="0.00" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span style={styles.balanceHint}>Max: PKR {balance}</span>
        </div>

        <div style={styles.securityNote}>
          <ShieldCheck size={16} color="#00ff00" />
          <span>Secured by Tezro Vault & Audit Trail</span>
        </div>

        <button 
          style={{...styles.sendBtn, opacity: isProcessing ? 0.6 : 1}} 
          onClick={handleSend}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Confirm Transaction"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', alignItems: 'flex-end' },
  modal: { background: '#0a0a0a', width: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '25px', borderTop: '2px solid #FFD700', animation: 'slideUp 0.3s ease-out' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px' },
  input: { width: '100%', background: '#1a1a1a', border: '1px solid #333', padding: '15px', borderRadius: '12px', color: '#fff', fontSize: '1rem' },
  balanceHint: { fontSize: '0.7rem', color: '#FFD700', marginTop: '5px', display: 'block' },
  securityNote: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#00ff00', marginBottom: '25px', background: 'rgba(0,255,0,0.05)', padding: '10px', borderRadius: '8px' },
  sendBtn: { width: '100%', background: '#FFD700', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer' }
};

export default SendMoneyModal;
