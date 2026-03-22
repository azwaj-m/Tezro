import React, { useState, useMemo } from 'react';
import { X, Search, ChevronRight, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { auth, db, storage } from '../../firebase'; 
import { doc, updateDoc, collection, addDoc, serverTimestamp, increment } from 'firebase/firestore';

const SendMoneyModal = ({ isOpen, onClose, balance, currentUser }) => {
  const [step, setStep] = useState(1); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txnId, setTxnId] = useState('');

  // 🏦 تمام 23 بینکوں کی مکمل لسٹ (لوگو لنکس کے آپشن کے ساتھ)
  const pakistanBanks = useMemo(() => [
    { id: 'hbl', name: 'HBL - Habib Bank Ltd', color: '#00857c', type: 'Bank', logo: 'https://i.ibb.co/v4mYmYm/hbl.png' },
    { id: 'meezan', name: 'Meezan Bank', color: '#8b2031', type: 'Islamic Bank', logo: 'https://i.ibb.co/0n6Y6Ym/meezan.png' },
    { id: 'jazzcash', name: 'JazzCash (Mobilink)', color: '#ffcc00', type: 'Wallet', logo: 'https://i.ibb.co/L6XmYmY/jazzcash.png' },
    { id: 'easypaisa', name: 'EasyPaisa (Telenor)', color: '#3fb54f', type: 'Wallet', logo: 'https://i.ibb.co/R6XmYmY/easypaisa.png' },
    { id: 'sadapay', name: 'SadaPay', color: '#ff7051', type: 'EMI', logo: 'https://i.ibb.co/N6XmYmY/sadapay.png' },
    { id: 'nayapay', name: 'NayaPay', color: '#ff6b00', type: 'EMI', logo: 'https://i.ibb.co/M6XmYmY/nayapay.png' },
    { id: 'uaf', name: 'UBL - United Bank Ltd', color: '#005596', type: 'Bank', logo: 'https://i.ibb.co/T6XmYmY/ubl.png' },
    { id: 'mcb', name: 'MCB Bank Limited', color: '#007a33', type: 'Bank', logo: 'https://i.ibb.co/S6XmYmY/mcb.png' },
    { id: 'alfalah', name: 'Bank Alfalah', color: '#ed1c24', type: 'Bank', logo: 'https://i.ibb.co/P6XmYmY/alfalah.png' },
    { id: 'allied', name: 'Allied Bank Ltd', color: '#003a70', type: 'Bank', logo: 'https://i.ibb.co/Q6XmYmY/allied.png' },
    { id: 'askari', name: 'Askari Bank', color: '#004a99', type: 'Bank' },
    { id: 'faysal', name: 'Faysal Bank', color: '#7a2123', type: 'Bank' },
    { id: 'bankislami', name: 'BankIslami', color: '#114a32', type: 'Bank' },
    { id: 'bop', name: 'Bank of Punjab', color: '#ceaa5d', type: 'Bank' },
    { id: 'scb', name: 'Standard Chartered', color: '#00945e', type: 'Bank' },
    { id: 'alhabib', name: 'Bank AL Habib', color: '#004b23', type: 'Bank' },
    { id: 'nbp', name: 'National Bank', color: '#00522d', type: 'Bank' },
    { id: 'js', name: 'JS Bank', color: '#1d3b7a', type: 'Bank', logo: 'https://i.ibb.co/B6XmYmY/js.png' },
    { id: 'summit', name: 'Summit Bank', color: '#ee3124', type: 'Bank' },
    { id: 'samba', name: 'Samba Bank', color: '#004a99', type: 'Bank' },
    { id: 'soneri', name: 'Soneri Bank', color: '#0054a6', type: 'Bank' },
    { id: 'silk', name: 'Silk Bank', color: '#000000', type: 'Bank' },
    { id: 'albaraka', name: 'Al Baraka Bank', color: '#9d8146', type: 'Islamic Bank' }
  ], []);

  const filteredBanks = pakistanBanks.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    if (!currentUser?.uid) return alert("Please login to continue");

    setIsProcessing(true);
    try {
      const generatedTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnId(generatedTxnId);

      // 1. کلیکشن میں ٹرانزیکشن کا اندراج
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

      // 2. یوزر کا بیلنس اپڈیٹ کرنا
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        balance: increment(-numericAmount)
      });

      triggerSuccessEffects();
      setStep(4);
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Transaction failed! Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        {step < 4 && (
          <div style={styles.header}>
            {step > 1 && <span onClick={() => setStep(step - 1)} style={styles.backBtn}>←</span>}
            <h3 style={styles.title}>
              {step === 1 ? 'Select Destination' : step === 2 ? 'Details' : 'Review Transfer'}
            </h3>
            <X onClick={onClose} size={20} color="#888" style={{ cursor: 'pointer' }} />
          </div>
        )}

        {/* STEP 1: Search & Bank List */}
        {step === 1 && (
          <>
            <div style={styles.searchWrap}>
              <Search size={16} color="#555" />
              <input 
                style={styles.searchInput} 
                placeholder="Search bank or wallet..." 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            <div style={styles.scrollList}>
              {filteredBanks.map(bank => (
                <div key={bank.id} style={styles.item} onClick={() => { setSelectedBank(bank); setStep(2); }}>
                  <div style={{ ...styles.avatar, backgroundColor: bank.logo ? '#fff' : bank.color }}>
                    {bank.logo ? (
                      <img src={bank.logo} alt="" style={styles.logoImg} onError={(e) => e.target.style.display='none'} />
                    ) : (
                      <span style={styles.avatarTxt}>{bank.name[0]}</span>
                    )}
                  </div>
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

        {/* STEP 2: Input Details */}
        {step === 2 && (
          <div style={styles.fade}>
            <div style={{ ...styles.banner, borderLeftColor: selectedBank.color }}>
              {selectedBank.logo && <img src={selectedBank.logo} style={{width: '24px', marginRight: '10px'}} alt=""/>}
              <span style={styles.bannerTxt}>{selectedBank.name}</span>
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Account Number / IBAN</label>
              <input style={styles.input} placeholder="0000 0000 0000..." value={receiverId} onChange={e => setReceiverId(e.target.value)} />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Amount (PKR)</label>
              <input type="number" style={styles.input} placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              <span style={styles.hint}>Available: PKR {balance}</span>
            </div>
            <button style={styles.btn} onClick={() => setStep(3)} disabled={!amount || !receiverId}>Continue</button>
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
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : "Pay Securely Now"}
            </button>
          </div>
        )}

        {/* STEP 4: Success Screen */}
        {step === 4 && (
          <div style={styles.successContainer}>
            <CheckCircle size={80} color="#00ff00" />
            <h2 style={{ color: '#fff', margin: '15px 0', fontSize: '1.4rem' }}>Transfer Successful</h2>
            <p style={{ color: '#888', textAlign: 'center', fontSize: '0.9rem' }}>
              PKR <b>{amount}</b> has been sent to <br/> <b>{receiverId}</b>
            </p>
            <div style={styles.receiptBrief}>
              <span>Transaction ID:</span>
              <span style={{color: '#FFD700'}}>{txnId}</span>
            </div>
            <button style={styles.doneBtn} onClick={() => { onClose(); setStep(1); setAmount(''); setReceiverId(''); }}>Return Home</button>
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
  title: { color: '#FFD700', margin: 0, fontSize: '1.1rem', fontWeight: 'bold' },
  backBtn: { fontSize: '1.2rem', color: '#FFD700', marginRight: '10px', cursor: 'pointer' },
  searchWrap: { background: '#111', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', border: '1px solid #222' },
  searchInput: { background: 'none', border: 'none', color: '#fff', fontSize: '0.9rem', width: '100%', outline: 'none' },
  scrollList: { overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  item: { display: 'flex', alignItems: 'center', padding: '12px', background: '#0c0c0c', borderRadius: '15px', gap: '12px', border: '1px solid #111' },
  avatar: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  avatarTxt: { color: '#fff', fontWeight: 'bold', fontSize: '1.2rem' },
  logoImg: { width: '100%', height: '100%', objectFit: 'contain', padding: '5px' },
  name: { color: '#eee', fontSize: '0.85rem', fontWeight: 'bold' },
  type: { color: '#555', fontSize: '0.65rem' },
  banner: { background: '#111', padding: '15px', borderRadius: '12px', marginBottom: '15px', borderLeft: '4px solid', display: 'flex', alignItems: 'center' },
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
  successContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0' },
  receiptBrief: { background: '#111', padding: '12px 20px', borderRadius: '12px', display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#666', marginTop: '15px' },
  doneBtn: { width: '100%', background: '#fff', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', marginTop: '40px' },
  fade: { animation: 'fadeIn 0.3s ease-in' }
};

export default SendMoneyModal;
