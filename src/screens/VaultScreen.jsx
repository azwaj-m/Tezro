import React, { useState } from 'react';
import { ShieldCheck, Search, Hash, ChevronRight } from 'lucide-react';
import { billProviders, banks } from '../utils/bankData';
import { processPayment, fetchBillAmount } from '../utils/WalletEngine';
import SecurityScan from '../components/vault/SecurityScan';
import ReceiptModal from '../components/vault/ReceiptModal';

const VaultScreen = () => {
  const [activeTab, setActiveTab] = useState('bills');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [step, setStep] = useState(1); // 1: ID Input, 2: Confirmation
  const [amount, setAmount] = useState('');
  const [destId, setDestId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentTxn, setCurrentTxn] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNextStep = () => {
    if (destId.length < 5) return alert("درست شناختی نمبر درج کریں");
    if (activeTab === 'bills') {
        setAmount(fetchBillAmount(selectedEntity.id));
        setStep(2);
    } else {
        setStep(2); // بینک ٹرانسفر میں رقم خود لکھی جائے گی
    }
  };

  const handleFinalPay = () => {
    setIsScanning(true);
    setTimeout(() => {
      const receipt = processPayment(selectedEntity, amount, destId);
      setCurrentTxn(receipt);
      setIsScanning(false);
      setShowReceipt(true);
    }, 2500);
  };

  const allItems = activeTab === 'bills' ? Object.values(billProviders).flat() : banks;

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-[#FFD700]">VAULT</h1>
        <ShieldCheck className="text-green-500" />
      </div>

      {/* Search Bar - Fixed Z-Index */}
      <div className="relative z-10 mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4" />
        <input 
          type="text" 
          placeholder="تلاش کریں..." 
          className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#FFD700]/50"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs - Fixed Layout */}
      <div className="flex gap-2 mb-6 relative z-0">
        <button onClick={() => setActiveTab('bills')} className={`flex-1 py-3 rounded-xl font-bold ${activeTab === 'bills' ? 'bg-[#FFD700] text-black' : 'bg-white/5 text-gray-400'}`}>یوٹیلیٹی بلز</button>
        <button onClick={() => setActiveTab('banks')} className={`flex-1 py-3 rounded-xl font-bold ${activeTab === 'banks' ? 'bg-[#FFD700] text-black' : 'bg-white/5 text-gray-400'}`}>بینک ٹرانسفر</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {allItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
          <button key={item.id} onClick={() => setSelectedEntity(item)} className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex flex-col items-center">
            <img src={item.logo} className="w-10 h-10 mb-2 object-contain" onError={(e) => e.target.src='/assets/logo.png'} />
            <span className="text-[8px] font-bold text-gray-400 uppercase">{item.shortName}</span>
          </button>
        ))}
      </div>

      {selectedEntity && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#00150c] border border-[#FFD700]/20 rounded-[2.5rem] p-8">
            <img src={selectedEntity.logo} className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-center text-xl font-bold">{selectedEntity.name}</h2>
            
            {step === 1 ? (
              <div className="mt-6 space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <label className="text-[10px] text-gray-500 block mb-2 uppercase tracking-widest">Consumer / Account Number</label>
                  <input type="text" value={destId} onChange={(e)=>setDestId(e.target.value)} className="w-full bg-transparent text-xl font-bold outline-none" placeholder="درج کریں..." />
                </div>
                {activeTab === 'banks' && (
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <label className="text-[10px] text-gray-500 block mb-2 uppercase tracking-widest">رقم (PKR)</label>
                    <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full bg-transparent text-xl font-bold outline-none text-[#FFD700]" placeholder="0.00" />
                   </div>
                )}
                <button onClick={handleNextStep} className="w-full bg-[#FFD700] text-black py-4 rounded-2xl font-black">آگے بڑھیں</button>
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 p-6 rounded-3xl text-center">
                    <p className="text-gray-400 text-xs uppercase">واجب الادا رقم</p>
                    <h3 className="text-4xl font-black text-[#FFD700]">Rs {amount}</h3>
                    <p className="text-[10px] text-gray-500 mt-2">Consumer: {destId}</p>
                </div>
                <button onClick={handleFinalPay} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-green-900/20">ادائیگی کنفرم کریں</button>
              </div>
            )}
            <button onClick={() => {setSelectedEntity(null); setStep(1); setDestId('');}} className="w-full mt-4 text-gray-500 text-xs font-bold uppercase">کینسل</button>
          </div>
        </div>
      )}

      <SecurityScan isActive={isScanning} />
      {currentTxn && <ReceiptModal isOpen={showReceipt} transaction={currentTxn} onClose={() => {setShowReceipt(false); setSelectedEntity(null); setStep(1);}} />}
    </div>
  );
};

export default VaultScreen;
