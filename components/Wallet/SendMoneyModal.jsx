import React, { useState, useMemo } from 'react';
import { X, Search, ChevronRight, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { db } from '../firebase/config'; 
import { doc, updateDoc, collection, addDoc, serverTimestamp, increment } from 'firebase/firestore';

const SendMoneyModal = ({ isOpen, onClose, balance, currentUser }) => {
  const [step, setStep] = useState(1); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txnId, setTxnId] = useState('');

  // 🏦 پاکستان کے تمام بینکوں کی مکمل اور جامع لسٹ
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
    { id: 'js', name: 'JS Bank', color: '#1d3b7a', type: 'Bank' },
    { id: 'summit', name: 'Summit Bank', color: '#ee3124', type: 'Bank' },
    { id: 'samba', name: 'Samba Bank', color: '#004a99', type: 'Bank' },
    { id: 'soneri', name: 'Soneri Bank', color: '#0054a6', type: 'Bank' },
    { id: 'silk', name: 'Silk Bank', color: '#000000', type: 'Bank' },
    { id: 'albaraka', name: 'Al Baraka Bank', color: '#9d8146', type: 'Islamic Bank' }
  ], []);

  const filteredBanks = pakistanBanks.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const triggerSuccessEffects = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    audio.play().catch(() => {});
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFFFFF', '#B8860B']
    });
  };

  const handleFinalConfirm = async () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return alert("Enter valid amount");
    if (numericAmount > balance) return alert("Insufficient balance");
    if (!currentUser?.uid) return alert("Please login first");

    setIsProcessing(true);
    try {
      const generatedTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxnId);

      await addDoc(collection(db, "transactions"), {
        userId: currentUser.uid,
        receiverId: receiverId,
        receiverBank: selectedBank.name,
        amount: numericAmount,
        type: 'send',
        status: 'success',
        transactionId: generatedTxnId,
        timestamp: serverTimestamp()
      });

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        balance: increment(-numericAmount)
      });

      triggerSuccessEffects();
      setStep(4);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Transaction failed!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {step < 4 && (
          <div style={styles.header}>
            {step > 1 && <span onClick={() => setStep(step - 1)} style={styles.backBtn}>←</span>}
            <h3 style={styles.title}>{step === 1 ? 'Destination' : step === 2 ? 'Details' : 'Review'}</h3>
            <X onClick={onClose} size={20} color="#888" style={{ cursor: 'pointer' }} />
          </div>
        )}

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

        {step === 2 && (
          <div style={styles.fade}>
            <div style={{ ...styles.banner, borderLeftColor: selectedBank.color }}>
              <span style={styles.bannerTxt}>{selectedBank.name}</span>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Account / IBAN</label>
              <input style={styles.input} placeholder="Enter account details" value={receiverId} onChange={e => setReceiverId(e.target.value)} />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Amount (PKR)</label>
              <input type="number" style={styles.input} placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              <span style={styles.hint}>Balance: PKR {balance}</span>
            </div>
            <button style={styles.btn} onClick={() => setStep(3)}>Continue</button>
          </div>
        )}

        {step === 3 && (
          <div style={styles.fade}>
            <div style={styles.reviewBox}>
              <div style={styles.row}><span>To:</span><b>{receiverId}</b></div>
              <div style={styles.row}><span>Bank:</span><b>{selectedBank.name}</b></div>
              <div style={styles.row}><span>Amount:</span><b style={{ color: '#FFD700' }}>PKR {amount}</b></div>
            </div>
            <div style={styles.warn}>
              <AlertTriangle size={12} color="#ffa500" />
              <span>Verify details. Transactions are permanent.</span>
            </div>
            <button style={styles.confirmBtn} onClick={handleFinalConfirm} disabled={isProcessing}>
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : "Pay Securely Now"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div style={styles.successContainer}>
            <CheckCircle size={80} color="#00ff00" />
            <h2 style={{ color: '#fff', margin: '15px 0' }}>Success!</h2>
            <p style={{ color: '#888', textAlign: 'center' }}>PKR {amount} sent successfully.</p>
            <div style={styles.receiptBrief}>
              <span>Txn ID:</span><span style={{color: '#FFD700'}}>{txnId}</span>
            </div>
            <button style={styles.doneBtn} onClick={() => { onClose(); setStep(1); }}>Done</button>
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
  btn: { width: '100%', background: '#FFD700', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '10px' },
  confirmBtn: { width: '100%', background: 'linear-gradient(to right, #FFD700, #B8860B)', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '15px', display: 'flex', justifyContent: 'center' },
  successContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', animation: 'fadeIn 0.5s ease-out' },
  receiptBrief: { background: '#111', padding: '12px 20px', borderRadius: '12px', display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#666', marginTop: '15px' },
  doneBtn: { width: '100%', background: '#fff', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '40px' },
  fade: { animation: 'fadeIn 0.3s ease-in' }
};

export default SendMoneyModal;
