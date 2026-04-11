import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Target, TrendingUp, KeyRound, ArrowRight } from 'lucide-react';

const TezroVirtualCard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Promo Banner: Match Image Layout */}
      <div className="relative w-full h-52 rounded-[2.8rem] overflow-hidden border-2 border-[#FFD700]/30 shadow-2xl bg-[#121212]">
        <img src="https://via.placeholder.com/700x500/121212/FFD700?text=INTEGRATED+SERVICES" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Integrated Services<br/>& Home Returns</h2>
          <button className="mt-5 bg-[#FFD700] text-black text-[10px] font-black px-8 py-3 rounded-full w-max uppercase shadow-xl hover:scale-105 active:scale-95 transition-all">Shop Now</button>
        </div>
      </div>

      {/* Row: Master Card & Balance Box */}
      <div className="grid grid-cols-2 gap-4">
        {/* Iranian Islamic Master Card */}
        <div 
          onClick={() => navigate('/transactions')}
          className="relative h-44 rounded-[2.2rem] p-6 overflow-hidden border border-[#FFD700]/25 shadow-2xl bg-gradient-to-br from-[#1c1c1c] to-black cursor-pointer transform active:scale-[0.98] transition-all"
        >
          <div className="absolute inset-0 islamic-pattern pointer-events-none opacity-20"></div>
          <div className="relative z-10 flex justify-between">
            <span className="shiny-gold font-black italic text-[10px] tracking-[3px]">TEZRO ROYAL</span>
            <Target size={18} className="text-[#FFD700]" />
          </div>
          <p className="relative z-10 mt-10 text-xl font-mono tracking-[4px] text-white/90 drop-shadow-lg">**** 4038</p>
          <ShieldCheck size={20} className="relative z-10 mt-6 text-green-500 shadow-xl" />
        </div>

        {/* Balance & Security Grid (The missing golden buttons area) */}
        <div className="h-44 space-y-3">
          {/* Balance Box */}
          <div className="h-[calc(100%-60px)] glass-iranian rounded-[2rem] border border-white/5 p-5 flex flex-col justify-center gap-1">
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Balance</p>
            <p className="text-2xl font-black shiny-gold tracking-tighter">$ 5,358.00</p>
          </div>
          {/* Services Row */}
          <div className="grid grid-cols-2 gap-3 h-[48px]">
            <button className="gold-border rounded-xl flex items-center justify-center p-2 bg-[#FFD700]/5 active:scale-90 transition-all"><TrendingUp size={18} className="text-[#FFD700]" /></button>
            <button className="gold-border rounded-xl flex items-center justify-center p-2 bg-[#FFD700]/5 active:scale-90 transition-all"><KeyRound size={18} className="text-[#FFD700]" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TezroVirtualCard;
