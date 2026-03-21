import React, { useState } from 'react';
import { X, Send, ShieldCheck, Landmark, Smartphone, Globe, ChevronRight } from 'lucide-react';

const SendMoneyModal = ({ isOpen, onClose, onConfirm, balance }) => {
  const [step, setStep] = useState(1); // 1: Select Method, 2: Enter Details
  const [selectedBank, setSelectedBank] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // مشہور بینکوں اور والٹس کی لسٹ
  const paymentMethods = [
    { id: 'jazzcash', name: 'JazzCash', icon: '📱', color: '#ff4444' },
    { id: 'easypaisa', name: 'EasyPaisa', icon: '🟢', color: '#00ff00' },
    { id: 'hbl', name: 'HBL', icon: '🏦', color: '#00857c' },
    { id: 'meezan', name: 'Meezan Bank', icon: '🕌', color: '#8b2031' },
    { id: 'alfalah', name: 'Bank Alfalah', icon: '🔴', color: '#ed1c24' },
    { id: 'uaf', name: 'UBL', icon: '🔵', color: '#005596' }
  ];

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!receiverId || !amount || amount <= 0) {
      alert("براہ کرم تمام معلومات درست درج کریں۔");
      return;
    }
    setIsProcessing(true);
    // یہاں ہم گیٹ وے کی معلومات بھی بھیجیں گے
    await onConfirm(receiverId, parseFloat(amount), selectedBank.name);
    setIsProcessing(false);
    onClose();
    setStep(1); // واپس پہلے سٹیپ پر لے جائیں
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {step === 2 && <span onClick={() => setStep(1)} style={styles.backBtn}>←</span>}
            <h3 style={{ margin: 0, color: '#FFD700' }}>
              {step === 1 ? 'Select Payment Method' : `Transfer to ${selectedBank.name}`}
            </h3>
          </div>
          <X onClick={onClose} style={{ cursor: 'pointer' }} color="#888" />
        </div>

        {step === 1 ? (
          /* --- Step 1: Banking Selection --- */
          <div style={styles.bankGrid}>
            {paymentMethods.map((bank) => (
              <div 
                key={bank.id} 
                style={styles.bankItem} 
                onClick={() => { setSelectedBank(bank); setStep(2); }}
              >
                <div style={{...styles.bankLogo, borderColor: bank.color}}>{bank.icon}</div>
                <span style={styles.bankName}>{bank.name}</span>
                <ChevronRight size={14} color="#333" />
              </div>
            ))}
            <div style={styles.moreNote}>+ 40 more banks connected via 1Link</div>
          </div>
        ) : (
          /* --- Step 2: Transaction Details --- */
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <div style={styles.selectedBankBanner}>
              <span style={{fontSize: '1.5rem'}}>{selectedBank.icon}</span>
              <div>
                <div style={{fontWeight: 'bold'}}>{selectedBank.name}</div>
                <div style={{fontSize: '0.7rem', color: '#888'}}>Real-time Bank Transfer</div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Account Number / IBAN / Phone</label>
              <input 
                style={styles.input} 
                placeholder={`Enter ${selectedBank.name} Details...`} 
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
              <span style={styles.balanceHint}>Balance: PKR {balance}</span>
            </div>

            <div style={styles.securityNote}>
              <ShieldCheck size={16} color="#00ff00" />
              <span>End-to-End Encrypted via Tezro Secure Bridge</span>
            </div>

            <button 
              style={{...styles.sendBtn, opacity: isProcessing ? 0.6 : 1}} 
              onClick={handleSend}
              disabled={isProcessing}
            >
              {isProcessing ? "Connecting Bank..." : `Transfer to ${selectedBank.name}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', alignItems: 'flex-end' },
  modal: { background: '#0a0a0a', width: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '25px', borderTop: '2px solid #FFD700' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' },
  backBtn: { fontSize: '1.5rem', color: '#FFD700', marginRight: '10px', cursor: 'pointer' },
  
  // Bank Grid Styles
  bankGrid: { display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' },
  bankItem: { background: '#111', padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #1a1a1a', cursor: 'pointer' },
  bankLogo: { width: '40px', height: '40px', borderRadius: '10px', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid' },
  bankName: { flex: 1, color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' },
  moreNote: { textAlign: 'center', color: '#444', fontSize: '0.7rem', padding: '10px' },

  // Transaction Detail Styles
  selectedBankBanner: { background: '#111', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '4px solid #FFD700' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px' },
  input: { width: '100%', background: '#1a1a1a', border: '1px solid #333', padding: '15px', borderRadius: '12px', color: '#fff', fontSize: '1rem' },
  balanceHint: { fontSize: '0.7rem', color: '#FFD700', marginTop: '5px', display: 'block' },
  securityNote: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#00ff00', marginBottom: '25px', background: 'rgba(0,255,0,0.05)', padding: '10px', borderRadius: '8px' },
  sendBtn: { width: '100%', background: '#FFD700', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: '900', fontSize: '1rem' }
};

export default SendMoneyModal;
