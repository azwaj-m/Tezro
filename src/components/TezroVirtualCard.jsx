import React from 'react';
import { Lock, TrendingUp, Landmark } from 'lucide-react';

const TezroVirtualCard = () => (
  <div className="space-y-6">
    {/* Promo Banner - Fixed Design */}
    <div className="relative w-full h-52 card-dark rounded-[2.5rem] overflow-hidden border border-[#FFD700]/15 shadow-2xl">
      <img src="https://via.placeholder.com/700x500/121212/FFD700?text=INTEGRATED+SERVICES" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-black leading-tight text-white uppercase tracking-tighter">INTEGRATED SERVICES<br/>& HOME RETURNS</h2>
        <button className="mt-6 bg-[#FFD700] text-black text-[11px] font-black px-10 py-3.5 rounded-full w-max uppercase shadow-2xl hover:scale-105 transition-all">Shop Now</button>
      </div>
    </div>

    {/* Verified Virtual Card & Balance Row */}
    <div className="grid grid-cols-2 gap-4">
      {/* Tezro Card - Pure Image Style */}
      <div className="h-40 bg-gradient-to-br from-[#1c1c1c] to-black rounded-[2rem] border-2 border-[#FFD700]/30 p-6 relative shadow-2xl">
         <div className="flex justify-between items-start">
           <span className="text-[#FFD700] font-black italic text-[10px] tracking-[3px] uppercase">Tezro</span>
           <div className="w-9 h-6 bg-yellow-600/30 rounded-md border border-[#FFD700]/10 flex items-center justify-center"><Lock size={12} className="text-[#FFD700]/50" /></div>
         </div>
         <p className="mt-10 text-xl font-mono tracking-[4px] text-white/90">**** 4038</p>
         <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#FFD700]/5 px-3 py-1 rounded-full border border-[#FFD700]/10">
           <Landmark size={12} className="text-green-400" />
           <span className="text-[8px] text-green-400 font-bold uppercase tracking-wider">Verified Asset</span>
         </div>
      </div>

      {/* Balance Card - Pure Image Style */}
      <div className="h-40 card-dark rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between border-2 border-white/5">
         <div>
           <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Balance</p>
           <p className="text-2xl font-black text-[#FFD700] tracking-tighter mt-1.5">$ 5,358.00</p>
         </div>
         <div className="space-y-2">
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-[#FFD700]/40"></div></div>
           <div className="h-1 w-1/2 bg-white/5 rounded-full"></div>
         </div>
      </div>
    </div>
  </div>
);
export default TezroVirtualCard;
