import React, { useState } from 'react';
import { ShieldCheck, Landmark, Receipt, QrCode, X, Search } from 'lucide-react';
import { billProviders, banks } from '../utils/bankData';
import ReceiptModal from '../components/vault/ReceiptModal';

const VaultScreen = () => {
  const [activePopup, setActivePopup] = useState(null); // 'billType', 'provider', 'bank'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(null); // Selected Bank or Provider
  const [showReceipt, setShowReceipt] = useState(false);
  const [amount, setAmount] = useState('');

  const billCategories = Object.keys(billProviders);

  return (
    <div className="min-h-screen bg-[#001a0f] pt-32 pb-32 px-5 text-right font-sans">
      
      {/* Balance Display */}
      <div className="gold-border rounded-[2.5rem] p-6 mb-8 bg-black/40 backdrop-blur-md">
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">موجودہ بیلنس</p>
        <h2 className="text-3xl font-black shiny-gold text-left font-mono">Rs 125,500.50</h2>
      </div>

      {/* Main Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setActivePopup('bank')} className="glass-iranian p-8 rounded-[2.5rem] border border-[#FFD700]/20 flex flex-col items-center gap-3 active:scale-95 transition-all shadow-2xl">
          <Landmark className="text-[#FFD700]" size={32} />
          <span className="text-[10px] text-white font-black uppercase tracking-widest">فنڈز ٹرانسفر</span>
        </button>
        <button onClick={() => setActivePopup('billType')} className="glass-iranian p-8 rounded-[2.5rem] border border-[#FFD700]/20 flex flex-col items-center gap-3 active:scale-95 transition-all shadow-2xl">
          <Receipt className="text-[#FFD700]" size={32} />
          <span className="text-[10px] text-white font-black uppercase tracking-widest">بلز کی ادائیگی</span>
        </button>
      </div>

      {/* 1. Bill Category Selection Popup */}
      {activePopup === 'billType' && (
        <div className="fixed inset-0 z-[300] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setActivePopup(null)}></div>
          <div className="relative w-full bg-[#001a0f] border-t-2 border-[#FFD700]/30 rounded-t-[3rem] p-8 animate-slide-up">
            <h3 className="text-[#FFD700] text-xl font-black mb-6 text-center">بل کی قسم منتخب کریں</h3>
            <div className="grid grid-cols-2 gap-4">
              {billCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setActivePopup('provider'); }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs hover:bg-[#FFD700]/10"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Provider/Bank Grid Popup (Common UI) */}
      {(activePopup === 'provider' || activePopup === 'bank') && (
        <div className="fixed inset-0 z-[300] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setActivePopup(null)}></div>
          <div className="relative w-full h-[80vh] bg-[#001a0f] border-t-2 border-[#FFD700]/30 rounded-t-[3.5rem] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setActivePopup(null)} className="p-2 text-[#FFD700]"><X /></button>
              <h3 className="text-[#FFD700] font-black uppercase">{activePopup === 'bank' ? 'بینک منتخب کریں' : selectedCategory}</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 overflow-y-auto no-scrollbar pb-10">
              {(activePopup === 'bank' ? banks : billProviders[selectedCategory]).map(item => (
                <button 
                  key={item.id}
                  onClick={() => { setSelectedEntity(item); setActivePopup(null); }}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-[2rem] border border-white/5 active:scale-90 transition-all"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-lg">
                    <img src={item.logo} alt={item.shortName} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] text-white font-black uppercase tracking-tighter">{item.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selection Summary & Pay Button */}
      {selectedEntity && (
        <div className="mt-10 space-y-4 animate-fade-in">
           <div className="p-6 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-[2.5rem] flex items-center justify-between">
              <div className="w-12 h-12 bg-white rounded-xl p-2"><img src={selectedEntity.logo} className="w-full h-full object-contain" /></div>
              <div className="text-right">
                <p className="text-[10px] text-[#FFD700] font-black uppercase">{selectedEntity.shortName}</p>
                <p className="text-[8px] text-white/40 uppercase">Verified Destination</p>
              </div>
           </div>
           <input 
              type="number" 
              placeholder="رقم درج کریں" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white text-xl font-black text-right outline-none focus:border-[#FFD700]/40"
              onChange={(e) => setAmount(e.target.value)}
           />
           <button 
            onClick={() => setShowReceipt(true)}
            className="w-full bg-[#FFD700] text-black font-black py-6 rounded-[2rem] shadow-2xl active:scale-95 transition-all uppercase tracking-[4px]"
           >
             ادائیگی مکمل کریں
           </button>
        </div>
      )}

      <ReceiptModal 
        isOpen={showReceipt} 
        onClose={() => setShowReceipt(false)}
        transaction={{ amount, bankName: selectedEntity?.shortName }}
      />
    </div>
  );
};

export default VaultScreen;
