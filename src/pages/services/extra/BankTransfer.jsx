import React, { useState } from 'react';
import { banks } from '../../utils/bankData';
import { ShieldCheck, ArrowRightLeft } from 'lucide-react';

const BankTransfer = () => {
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28">
      <div className="dark-gold-shiny p-6 rounded-[30px] flex items-center justify-between mb-8">
        <div>
          <h2 className="text-black font-black uppercase text-lg">Bank Transfer</h2>
          <p className="text-black/60 text-[10px] font-bold uppercase">1LINK / MNET Secure Gateway</p>
        </div>
        <ShieldCheck size={40} className="text-black/40" />
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">بینک منتخب کریں</label>
        <div className="grid grid-cols-4 gap-3">
          {banks.slice(0, 12).map((bank) => (
            <button 
              key={bank.id}
              onClick={() => setSelectedBank(bank)}
              className={`p-2 rounded-2xl border flex flex-col items-center gap-2 transition-all ${selectedBank?.id === bank.id ? 'border-gold bg-gold/10' : 'border-white/5 bg-white/5'}`}
            >
              <img src={bank.logo} className="w-8 h-8 rounded-full object-contain bg-white p-1" />
              <span className="text-[8px] font-bold truncate w-full text-center">{bank.shortName}</span>
            </button>
          ))}
        </div>
        
        {selectedBank && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <input type="number" placeholder="اکاؤنٹ نمبر یا IBAN" className="w-full bg-white/5 p-5 rounded-3xl border border-white/10 outline-none focus:border-gold" />
            <input type="number" placeholder="رقم (PKR)" className="w-full bg-white/5 p-5 rounded-3xl border border-white/10 outline-none focus:border-gold" />
            <button className="w-full py-5 royal-gold-shiny rounded-[30px] text-black font-black uppercase tracking-widest flex items-center justify-center gap-3">
              <ArrowRightLeft size={20} /> تصدیق اور منتقلی
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankTransfer;
