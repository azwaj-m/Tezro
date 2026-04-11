import React, { useState } from 'react';
import { ShieldCheck, Landmark, Receipt, X, ChevronLeft } from 'lucide-react';
import { billProviders, banks } from '../utils/bankData';
import ReceiptModal from '../components/vault/ReceiptModal';

const VaultScreen = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <div className="min-h-screen bg-[#001a0f] pt-32 pb-32 px-5 text-right">
      {/* Balance Card */}
      <div className="gold-border rounded-[2.5rem] p-6 mb-8 bg-black/40 backdrop-blur-md border border-[#FFD700]/20 shadow-2xl shadow-yellow-500/5">
        <div className="flex justify-between items-center mb-4">
           <ShieldCheck className="text-green-500" size={18} />
           <p className="text-white/40 text-[9px] uppercase font-black tracking-widest">موجودہ بیلنس</p>
        </div>
        <h2 className="text-3xl font-black shiny-gold text-left font-mono">Rs 125,500.50</h2>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setActivePopup('bank')} className="glass-iranian p-8 rounded-[2.5rem] border border-[#FFD700]/20 flex flex-col items-center gap-3 active:scale-95 transition-all">
          <Landmark className="text-[#FFD700]" size={32} />
          <span className="text-[10px] text-white font-black uppercase tracking-widest">بینک ٹرانسفر</span>
        </button>
        <button onClick={() => setActivePopup('billType')} className="glass-iranian p-8 rounded-[2.5rem] border border-[#FFD700]/20 flex flex-col items-center gap-3 active:scale-95 transition-all">
          <Receipt className="text-[#FFD700]" size={32} />
          <span className="text-[10px] text-white font-black uppercase tracking-widest">بلز ادائیگی</span>
        </button>
      </div>

      {/* Popups (Same as before but with Fixed Data) */}
      {(activePopup === 'provider' || activePopup === 'bank') && (
        <div className="fixed inset-0 z-[300] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setActivePopup(null)}></div>
          <div className="relative w-full h-[85vh] bg-[#001a0f] border-t-2 border-[#FFD700]/30 rounded-t-[3.5rem] p-8 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <button onClick={() => setActivePopup(null)} className="p-2 bg-white/5 rounded-full text-[#FFD700]"><X size={20}/></button>
              <h3 className="text-[#FFD700] font-black uppercase text-sm tracking-widest">{activePopup === 'bank' ? 'منتخب بینک' : selectedCategory}</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 overflow-y-auto no-scrollbar pb-20">
              {(activePopup === 'bank' ? banks : billProviders[selectedCategory]).map(item => (
                <button 
                  key={item.id}
                  onClick={() => { setSelectedEntity(item); setActivePopup(null); }}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-[2rem] border border-white/5 hover:border-[#FFD700]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-inner flex items-center justify-center overflow-hidden">
                    <img src={item.logo} alt={item.shortName} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[9px] text-white font-black uppercase text-center leading-tight tracking-tighter">{item.shortName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Amount & Payment */}
      {selectedEntity && (
        <div className="mt-8 space-y-4 animate-fade-in">
           <div className="p-6 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-[2rem] flex items-center justify-between">
              <div className="w-12 h-12 bg-white rounded-xl p-2"><img src={selectedEntity.logo} className="w-full h-full object-contain" /></div>
              <div className="text-right">
                <p className="text-[10px] text-[#FFD700] font-black uppercase">{selectedEntity.shortName}</p>
                <p className="text-[8px] text-white/40 font-bold">SECURE CHANNEL ACTIVE</p>
              </div>
           </div>
           <input 
              type="number" 
              placeholder="0.00" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-6 text-white text-3xl font-mono font-black text-right outline-none focus:border-[#FFD700]/40 transition-all shadow-inner"
              onChange={(e) => setAmount(e.target.value)}
           />
           <button onClick={() => setShowReceipt(true)} className="w-full bg-[#FFD700] text-black font-black py-6 rounded-[2rem] shadow-[0_20px_40px_rgba(255,215,0,0.2)] active:scale-95 transition-all uppercase tracking-[4px]">ادائیگی مکمل کریں</button>
        </div>
      )}

      {/* Other Modals (billType logic here) */}
      {activePopup === 'billType' && (
        <div className="fixed inset-0 z-[300] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setActivePopup(null)}></div>
          <div className="relative w-full bg-[#001a0f] border-t-2 border-[#FFD700]/30 rounded-t-[3rem] p-10 animate-slide-up">
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(billProviders).map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setActivePopup('provider'); }}
                  className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-[#FFD700] font-black uppercase text-xs tracking-widest hover:bg-[#FFD700]/10 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
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
