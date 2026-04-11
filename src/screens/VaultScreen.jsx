import React, { useState } from 'react';
import { ShieldCheck, Landmark, Receipt, QrCode, X, Search, ChevronRight } from 'lucide-react';

const VaultScreen = () => {
  const [showBillType, setShowBillType] = useState(false);
  const [showCompanySelect, setShowCompanySelect] = useState(false);
  const [selectedBill, setSelectedBill] = useState('');
  const [billId, setBillId] = useState('');

  const billTypes = [
    { name: 'بجلی', icon: '⚡' }, { name: 'پانی', icon: '💧' },
    { name: 'گیس', icon: '🔥' }, { name: 'انٹرنیٹ', icon: '🌐' },
    { name: 'ٹیلی فون', icon: '📞' }, { name: 'چالان', icon: '📜' }
  ];

  const companies = ["MEPCO", "SNGPL", "WASA", "PTCL", "FBR"];

  return (
    <div className="min-h-screen bg-[#001a0f] pt-32 pb-32 px-5 text-right font-sans">
      {/* Header Summary (Image Inspired) */}
      <div className="gold-border rounded-[2.5rem] p-6 mb-8 bg-black/40 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
          <ShieldCheck className="text-green-500" size={20} />
          <p className="text-white/40 text-[10px] uppercase tracking-widest">موجودہ بیلنس</p>
        </div>
        <h2 className="text-3xl font-black shiny-gold tracking-tighter text-left">Rs 125,500.50</h2>
      </div>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="glass-iranian p-6 rounded-[2rem] border border-[#FFD700]/20 flex flex-col items-center gap-2 group active:scale-95 transition-all">
          <div className="bg-[#FFD700]/10 p-3 rounded-xl group-hover:bg-[#FFD700]/20"><Landmark className="text-[#FFD700]" /></div>
          <span className="text-[11px] text-white font-black">فنڈز ٹرانسفر</span>
        </button>
        <button 
          onClick={() => setShowBillType(true)}
          className="glass-iranian p-6 rounded-[2rem] border border-[#FFD700]/20 flex flex-col items-center gap-2 group active:scale-95 transition-all"
        >
          <div className="bg-[#FFD700]/10 p-3 rounded-xl group-hover:bg-[#FFD700]/20"><Receipt className="text-[#FFD700]" /></div>
          <span className="text-[11px] text-white font-black">بلز کی ادائیگی</span>
        </button>
      </div>

      {/* Bill Type Selection Popup */}
      {showBillType && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowBillType(false)}></div>
          <div className="relative w-full bg-[#001a0f] border-t-2 border-[#FFD700]/30 rounded-t-[3rem] p-8 animate-slide-up">
            <h3 className="text-[#FFD700] text-xl font-black mb-6 text-center">بل کی قسم منتخب کریں</h3>
            <div className="grid grid-cols-3 gap-4">
              {billTypes.map((type) => (
                <button 
                  key={type.name}
                  onClick={() => { setSelectedBill(type.name); setShowBillType(false); setShowCompanySelect(true); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-[#FFD700]/10"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-[10px] text-white font-bold">{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Company & ID Entry Popup */}
      {showCompanySelect && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCompanySelect(false)}></div>
          <div className="relative w-full bg-[#001a0f] border-t-2 border-[#FFD700]/30 rounded-t-[3rem] p-8 animate-slide-up h-[70vh]">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setShowCompanySelect(false)}><X className="text-[#FFD700]" /></button>
              <h3 className="text-[#FFD700] text-xl font-black">{selectedBill} کی ادائیگی</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] text-white/40 mb-2">کمپنی منتخب کریں</p>
                <select className="bg-transparent text-white w-full outline-none font-bold">
                  {companies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                <input 
                  type="text" 
                  placeholder="بل آئی ڈی نمبر درج کریں" 
                  className="bg-transparent text-white w-full outline-none text-right font-bold"
                />
                <QrCode className="text-[#FFD700] cursor-pointer" />
              </div>

              <button className="w-full bg-[#FFD700] text-black font-black py-5 rounded-2xl uppercase tracking-[3px] shadow-xl active:scale-95 transition-all">
                بل بھرنے کا عمل مکمل کریں
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity (Image 12 Inspiration) */}
      <div className="mt-10">
        <h3 className="text-[#FFD700] text-sm font-black mb-4 tracking-widest">حالیہ سرگرمی</h3>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-red-500 font-bold text-xs">- Rs 5,800</span>
              <div className="text-right">
                <p className="text-white text-xs font-black uppercase">MEPCO Bill</p>
                <p className="text-white/20 text-[9px]">21-11-2024</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaultScreen;
