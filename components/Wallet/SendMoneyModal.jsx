import React, { useState, useMemo } from 'react';
import { X, ShieldCheck, Search, ChevronRight, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const SendMoneyModal = ({ isOpen, onClose, onConfirm, balance }) => {
  const [step, setStep] = useState(1); // 1: Select, 2: Details, 3: Review, 4: Success
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 🏦 تمام بینکوں کا ڈیٹا بیس (مکمل اور مربوط)
  const pakistanBanks = useMemo(() => [
    { id: 'hbl', name: 'HBL - Habib Bank Ltd', color: '#00857c', type: 'Bank' },
    { id: 'meezan', name: 'Meezan Bank', color: '#8b2031', type: 'Islamic Bank' },
    { id: 'uaf', name: 'UBL - United Bank Ltd', color: '#005596', type: 'Bank' },
    { id: 'mcb', name: 'MCB Bank Limited', color: '#007a33', type: 'Bank' },
    { id: 'alfalah', name: 'Bank Alfalah', color: '#ed1c24', type: 'Bank' },
    { id: 'allied', name: 'Allied Bank Ltd', color: '#003a70', type: 'Bank' },
    { id: 'jazzcash', name: 'JazzCash (Mobilink)', color: '#ffcc00', type: 'Wallet' },
    { id: 'easypaisa', name: 'EasyPaisa (Telenor)', color: '#3fb54f', type: 'Wallet' },
    { id: 'sadapay', name: 'SadaPay', color: '#ff7051', type: 'EMI' },
    { id: 'nayapay', name: 'NayaPay', color: '#ff6b00', type: 'EMI' },
    { id: 'askari', name: 'Askari Bank', color: '#004a99', type: 'Bank' },
    { id: 'faysal', name: 'Faysal Bank', color: '#7a2123', type: 'Bank' },
    { id: 'bankislami', name: 'BankIslami', color: '#114a32', type: 'Bank' },
    { id: 'bop', name: 'Bank of Punjab', color: '#ceaa5d', type: 'Bank' },
    { id: 'scb', name: 'Standard Chartered', color: '#00945e', type: 'Bank' },
    { id: 'alhabib', name: 'Bank AL Habib', color: '#004b23', type: 'Bank' },
    { id: 'nbp', name: 'National Bank', color: '#00522d', type: 'Bank' },
    { id: 'js', name: 'JS Bank', color: '#1d3b7a', type: 'Bank' }
  ], []);

  const filteredBanks = pakistanBanks.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // 🎉 جشن اور آواز کے فنکشنز
  const triggerSuccessEffects = () => {
    // ساؤنڈ
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.play().catch(() => {});
    // کنفیٹی
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFFFFF', '#B8860B']
    });
  };

  const handleFinalConfirm = async () => {
    if (!amount || amount <= 0) return alert("Enter valid amount");
    setIsProcessing(true);
    const result = await onConfirm(receiverId, amount, selectedBank.name);
    setIsProcessing(false);
    
    if (result?.success) {
      triggerSuccessEffects();
      setStep(4);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header - Success اسکرین پر چھپ جائے گا */}
        {step < 4 && (
          <div style={styles.header}>
            {step > 1 && <span onClick={() => setStep(step - 1)} style={styles.backBtn}>←</span>}
            <h3 style={styles.title}>
              {step === 1 ? 'Select Bank' : step === 2 ? 'Details' : 'Confirm Transfer'}
            </h3>
            <X onClick={onClose} size={20} color="#888" style={{ cursor: 'pointer' }} />
          </div>
        )}

        {/* STEP 1: Bank Selection */}
        {step === 1 && (
          <>
            <div style={styles.searchWrap}>
              <Search size={16} color="#555" />
              <input style={styles.searchInput} placeholder="Search bank or wallet..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div style={styles.scrollList}>
              {filteredBanks.map(bank => (
                <div key={bank.id} style={styles.item} onClick={() => { setSelectedBank(bank); setStep(2); }}>
                  <div style={{ ...styles.avatar, backgroundColor: bank.color }}>{bank.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.name}>{bank.name}</div>
                    <div style={styles.type}>{bank.type}</div>
                  </div>
                  <ChevronRight size={14} color="#333" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 2: Details Input */}
        {step === 2 && (
          <div style={styles.fade}>
            <div style={{ ...styles.banner, borderLeftColor: selectedBank.color }}>
              <span style={styles.bannerTxt}>{selectedBank.name}</span>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Account Number / IBAN</label>
              <input style={styles.input} placeholder="0000 0000 0000..." value={receiverId} onChange={e => setReceiverId(e.target.value)} />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Amount (PKR)</label>
              <input type="number" style={styles.input} placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              <span style={styles.hint}>Limit: PKR {balance}</span>
            </div>
            <button style={styles.btn} onClick={() => setStep(3)}>Continue to Review</button>
          </div>
        )}

        {/* STEP 3: Final Review */}
        {step === 3 && (
          <div style={styles.fade}>
            <div style={styles.reviewBox}>
              <div style={styles.row}><span>To:</span><b>{receiverId}</b></div>
              <div style={styles.row}><span>Bank:</span><b>{selectedBank.name}</b></div>
              <div style={styles.row}><span>Amount:</span><b style={{ color: '#FFD700' }}>PKR {amount}</b></div>
              <div style={styles.row}><span>Fee:</span><b style={{ color: '#00ff00' }}>FREE</b></div>
            </div>
            <div style={styles.warn}>
              <AlertTriangle size={12} color="#ffa500" />
              <span>Verify details. Transactions cannot be reversed.</span>
            </div>
            <button style={styles.confirmBtn} onClick={handleFinalConfirm} disabled={isProcessing}>
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : "Confirm & Pay Now"}
            </button>
          </div>
        )}

        {/* STEP 4: SUCCESS SCREEN */}
        {step === 4 && (
          <div style={styles.successContainer}>
            <div style={styles.checkWrapper}>
              <CheckCircle size={80} color="#00ff00" />
            </div>
            <h2 style={{ color: '#fff', margin: '10px 0', fontSize: '1.4rem' }}>Transfer Successful</h2>
            <p style={{ color: '#888', textAlign: 'center', fontSize: '0.9rem', lineHeight: '1.5' }}>
              PKR <b>{amount}</b> has been sent to <br/> <b>{receiverId}</b>
            </p>
            <div style={styles.receiptBrief}>
              <span>Transaction ID:</span>
              <span style={{color: '#FFD700'}}>TXN-{Math.floor(Math.random() * 999999)}</span>
            </div>
            <button style={styles.doneBtn} onClick={() => { onClose(); setStep(1); }}>Return Home</button>
            <button style={styles.shareBtn}>Download Receipt</button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 5000, display: 'flex', alignItems: 'flex-end' },
  modal: { background: '#050505', width: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '25px', borderTop: '2px solid #FFD700', maxHeight: '85vh', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  title: { color: '#FFD700', margin: 0, fontSize: '1rem', fontWeight: 'bold' },
  backBtn: { fontSize: '1.2rem', color: '#FFD700', marginRight: '10px', cursor: 'pointer' },
  searchWrap: { background: '#111', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', border: '1px solid #222' },
  searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '0.9rem', width: '100%', outline: 'none' },
  scrollList: { overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  item: { display: 'flex', alignItems: 'center', padding: '12px', background: '#0c0c0c', borderRadius: '15px', gap: '12px', border: '1px solid #111' },
  avatar: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold' },
  name: { color: '#eee', fontSize: '0.85rem', fontWeight: 'bold' },
  type: { color: '#555', fontSize: '0.65rem' },
  banner: { background: '#111', padding: '15px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid' },
  bannerTxt: { color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' },
  group: { marginBottom: '15px' },
  label: { fontSize: '0.75rem', color: '#666', marginBottom: '8px', display: 'block' },
  input: { width: '100%', background: '#111', border: '1px solid #222', padding: '15px', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' },
  hint: { fontSize: '0.7rem', color: '#FFD700', float: 'right', marginTop: '5px' },
  reviewBox: { background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222' },
  row: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.85rem', color: '#888' },
  warn: { display: 'flex', gap: '8px', padding: '15px', background: 'rgba(255,165,0,0.05)', borderRadius: '12px', marginTop: '15px', fontSize: '0.7rem', color: '#aaa' },
  btn: { width: '100%', background: '#FFD700', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' },
  confirmBtn: { width: '100%', background: 'linear-gradient(to right, #FFD700, #B8860B)', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '15px', display: 'flex', justifyContent: 'center', cursor: 'pointer' },
  successContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', animation: 'fadeIn 0.5s ease-out' },
  checkWrapper: { marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(0,255,0,0.2))' },
  receiptBrief: { background: '#111', padding: '12px 20px', borderRadius: '12px', display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#666', marginTop: '15px' },
  doneBtn: { width: '100%', background: '#fff', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '40px' },
  shareBtn: { width: '100%', background: 'transparent', color: '#FFD700', border: '1px solid #FFD700', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '12px' },
  fade: { animation: 'fadeIn 0.3s ease-in' }
};

export default SendMoneyModal;
