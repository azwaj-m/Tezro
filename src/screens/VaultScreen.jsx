import React, { useState } from 'react';
import { ShieldCheck, Landmark, Receipt, QrCode, ArrowLeft } from 'lucide-react';
import BankSelector from '../components/vault/BankSelector';
import ReceiptModal from '../components/vault/ReceiptModal';
import { calculateFee } from '../utils/feeCalculator';

const VaultScreen = () => {
  const [showBankSelect, setShowBankSelect] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if(!amount || !selectedBank) return alert("براہ کرم بینک اور رقم درج کریں");
    
    setIsProcessing(true);
    // ملٹری گریڈ انکرپشن اور قلیل سازی کا ڈمی ویٹ
    setTimeout(() => {
      setIsProcessing(false);
      setShowReceipt(true);
    }, 2000);
  };

  const fee = calculateFee(amount, selectedBank?.category);

  return (
    <div className="min-h-screen bg-[#001a0f] pt-32 pb-32 px-5 text-right">
      <div className="gold-border rounded-[2.5rem] p-6 mb-8 bg-black/40 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Landmark size={80} className="text-[#FFD700]" />
        </div>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">کل اثاثہ جات</p>
        <h2 className="text-3xl font-black shiny-gold tracking-tighter text-left font-mono mt-2">Rs 125,500.50</h2>
      </div>

      <div className="space-y-6">
        {/* بینک کا انتخاب */}
        <button 
          onClick={() => setShowBankSelect(true)}
          className="w-full glass-iranian p-6 rounded-[2rem] border border-[#FFD700]/20 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <ChevronLeft className="text-[#FFD700]/40" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-white/40 uppercase font-black">بینک منتخب کریں</p>
              <p className="text-xs text-[#FFD700] font-black uppercase">{selectedBank ? selectedBank.name : 'انتخاب کریں'}</p>
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              {selectedBank ? <img src={selectedBank.logo} className="w-6 h-6 object-contain" /> : <Landmark className="text-[#FFD700]/40" />}
            </div>
          </div>
        </button>

        {/* رقم کا اندراج */}
        <div className="glass-iranian p-6 rounded-[2rem] border border-[#FFD700]/20">
          <p className="text-[10px] text-white/40 uppercase font-black mb-4">رقم درج کریں</p>
          <div className="flex items-center gap-2 border-b border-[#FFD700]/20 pb-2">
             <span className="text-[#FFD700] font-black">PKR</span>
             <input 
               type="number" 
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               className="bg-transparent text-white text-2xl font-black outline-none w-full text-right"
               placeholder="0.00"
             />
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-red-500 font-bold text-[9px]">Rs {fee}</span>
            <span className="text-white/20 text-[9px] uppercase font-bold">سرکاری ٹیکس و فیس</span>
          </div>
        </div>

        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-[#FFD700] text-black font-black py-6 rounded-3xl uppercase tracking-[4px] shadow-[0_15px_40px_rgba(255,215,0,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          {isProcessing ? 'سیکیورٹی اسکین جاری ہے...' : 'محفوظ ادائیگی کریں'}
        </button>
      </div>

      <BankSelector 
        isOpen={showBankSelect} 
        onClose={() => setShowBankSelect(false)} 
        onSelect={(bank) => { setSelectedBank(bank); setShowBankSelect(false); }}
      />

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => setShowReceipt(false)}
        transaction={{ amount, bankName: selectedBank?.name }}
      />
    </div>
  );
};

const ChevronLeft = ({className}) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;

export default VaultScreen;
