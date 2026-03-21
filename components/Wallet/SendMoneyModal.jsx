import React, { useState } from 'react';
import { X, ShieldCheck, Search, ChevronRight, Landmark } from 'lucide-react';

const SendMoneyModal = ({ isOpen, onClose, onConfirm, balance }) => {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');

  // 🏦 پاکستان کے تمام بڑے بینکوں کی مکمل لسٹ (نام اور برانڈ کلرز کے ساتھ)
  const pakistanBanks = [
    { id: 'hbl', name: 'HBL - Habib Bank Ltd', code: 'HBL', color: '#00857c', type: 'Bank' },
    { id: 'meezan', name: 'Meezan Bank', code: 'MEZN', color: '#8b2031', type: 'Islamic Bank' },
    { id: 'uaf', name: 'UBL - United Bank Ltd', code: 'UBL', color: '#005596', type: 'Bank' },
    { id: 'mcb', name: 'MCB Bank Limited', code: 'MCB', color: '#007a33', type: 'Bank' },
    { id: 'alfalah', name: 'Bank Alfalah', code: 'BAFL', color: '#ed1c24', type: 'Bank' },
    { id: 'allied', name: 'Allied Bank Ltd', code: 'ABL', color: '#003a70', type: 'Bank' },
    { id: 'jazzcash', name: 'JazzCash (Mobilink)', code: 'JAZZ', color: '#ffcc00', type: 'Mobile Wallet' },
    { id: 'easypaisa', name: 'EasyPaisa (Telenor)', code: 'EP', color: '#3fb54f', type: 'Mobile Wallet' },
    { id: 'sadapay', name: 'SadaPay', code: 'SADA', color: '#ff7051', type: 'EMI' },
    { id: 'nayapay', name: 'NayaPay', code: 'NAYA', color: '#ff6b00', type: 'EMI' },
    { id: 'askari', name: 'Askari Bank', code: 'AKBL', color: '#004a99', type: 'Bank' },
    { id: 'faysal', name: 'Faysal Bank', code: 'FBL', color: '#7a2123', type: 'Bank' },
    { id: 'bankislami', name: 'BankIslami Pakistan', code: 'BIPL', color: '#114a32', type: 'Islamic Bank' },
    { id: 'bop', name: 'The Bank of Punjab', code: 'BOP', color: '#ceaa5d', type: 'Bank' },
    { id: 'scb', name: 'Standard Chartered', code: 'SCB', color: '#00945e', type: 'Bank' },
    { id: 'alhabib', name: 'Bank AL Habib', code: 'BAHL', color: '#004b23', type: 'Bank' },
    { id: 'soneri', name: 'Soneri Bank', code: 'SNBL', color: '#a32338', type: 'Bank' },
    { id: 'js', name: 'JS Bank', code: 'JSBL', color: '#1d3b7a', type: 'Bank' },
    { id: 'habibmetro', name: 'HabibMetro Bank', code: 'HMBL', color: '#1e3050', type: 'Bank' },
    { id: 'summit', name: 'Summit Bank', code: 'SMBL', color: '#d71920', type: 'Bank' },
    { id: 'samba', name: 'Samba Bank', code: 'Samba', color: '#002a54', type: 'Bank' },
    { id: 'nbp', name: 'National Bank of Pakistan', code: 'NBP', color: '#00522d', type: 'Bank' },
  ];

  // سرچ فلٹر
  const filteredBanks = pakistanBanks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          {step === 2 && <span onClick={() => setStep(1)} style={styles.backBtn}>←</span>}
          <h3 style={{ margin: 0, color: '#FFD700' }}>
            {step === 1 ? 'Select Bank / Wallet' : `Send to ${selectedBank.name}`}
          </h3>
          <X onClick={onClose} style={{ cursor: 'pointer' }} color="#888" />
        </div>

        {step === 1 ? (
          <>
            <div style={styles.searchBox}>
              <Search size={18} color="#555" />
              <input 
                style={styles.searchInput} 
                placeholder="Search Bank (HBL, JazzCash...)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={styles.bankGrid}>
              {filteredBanks.map((bank) => (
                <div key={bank.id} style={styles.bankItem} onClick={() => { setSelectedBank(bank); setStep(2); }}>
                  <div style={{...styles.bankAvatar, backgroundColor: bank.color}}>
                    {bank.name.substring(0, 1)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.bankName}>{bank.name}</div>
                    <div style={styles.bankType}>{bank.type}</div>
                  </div>
                  <ChevronRight size={16} color="#333" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ animation: 'fadeIn 0.2s' }}>
            <div style={{...styles.selectedBanner, borderLeftColor: selectedBank.color}}>
              <div style={{...styles.bankAvatarSmall, backgroundColor: selectedBank.color}}>
                {selectedBank.name.substring(0, 1)}
              </div>
              <div>
                <div style={{fontWeight: 'bold', fontSize: '1rem'}}>{selectedBank.name}</div>
                <div style={{fontSize: '0.7rem', color: '#888'}}>Interbank Funds Transfer (IBFT)</div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Account Number / IBAN</label>
              <input style={styles.input} placeholder="0000 0000 0000 0000" value={receiverId} onChange={(e)=>setReceiverId(e.target.value)} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Amount (PKR)</label>
              <input type="number" style={styles.input} placeholder="0.00" value={amount} onChange={(e)=>setAmount(e.target.value)} />
              <div style={styles.balanceTag}>Available: PKR {balance}</div>
            </div>

            <div style={styles.securitySeal}>
              <ShieldCheck size={14} color="#00ff00" />
              <span>Certified by SBP & 1Link Network</span>
            </div>

            <button style={styles.sendBtn} onClick={() => onConfirm(receiverId, amount, selectedBank.name)}>
              Proceed Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 4000, display: 'flex', alignItems: 'flex-end' },
  modal: { background: '#050505', width: '100%', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '25px', borderTop: '2px solid #FFD700', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  backBtn: { fontSize: '1.5rem', color: '#FFD700', marginRight: '15px' },
  searchBox: { background: '#111', borderRadius: '15px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', border: '1px solid #222' },
  searchInput: { background: 'none', border: 'none', color: '#fff', width: '100%', fontSize: '0.9rem', outline: 'none' },
  bankGrid: { overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '20px' },
  bankItem: { background: '#0a0a0a', padding: '12px 15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #111' },
  bankAvatar: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' },
  bankName: { color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' },
  bankType: { color: '#555', fontSize: '0.7rem' },
  selectedBanner: { background: '#111', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '5px solid' },
  bankAvatarSmall: { width: '35px', height: '35px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '8px', marginLeft: '5px' },
  input: { width: '100%', background: '#0a0a0a', border: '1px solid #222', padding: '15px', borderRadius: '12px', color: '#fff', fontSize: '1rem' },
  balanceTag: { textAlign: 'right', fontSize: '0.7rem', color: '#FFD700', marginTop: '5px' },
  securitySeal: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.65rem', color: '#00ff00', marginBottom: '20px', justifyContent: 'center', opacity: 0.8 },
  sendBtn: { width: '100%', background: 'linear-gradient(to right, #FFD700, #B8860B)', color: '#000', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }
};

export default SendMoneyModal;
