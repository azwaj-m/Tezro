import React from 'react';

const TezroVirtualCard = () => (
  <div className="space-y-4">
    {/* Promo Banner */}
    <div className="relative w-full h-44 rounded-3xl overflow-hidden border border-[#FFD700]/20">
      <img src="https://via.placeholder.com/400x200/002b1a/FFD700?text=Integrated+Services" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-6 flex flex-col justify-center">
        <h2 className="text-xl font-bold leading-tight">Integrated Services<br/>& Home Returns</h2>
        <button className="mt-4 bg-[#FFD700] text-black text-[10px] font-black px-6 py-2 rounded-full w-max uppercase">Shop Now</button>
      </div>
    </div>

    {/* Dual Cards Row */}
    <div className="grid grid-cols-2 gap-3">
      <div className="h-32 bg-gradient-to-br from-[#1a1a1a] to-[#000] rounded-2xl border border-[#FFD700]/20 p-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-2 text-[#FFD700]/20 font-black italic text-xs">Tezro</div>
         <div className="mt-8 text-xs tracking-widest">**** 4038</div>
         <div className="mt-4 flex justify-between items-center">
            <div className="w-6 h-4 bg-orange-500/50 rounded-sm"></div>
         </div>
      </div>
      <div className="h-32 glass-effect rounded-2xl border border-[#FFD700]/10 p-4">
         <p className="text-[8px] text-white/40 uppercase">Balance</p>
         <p className="text-sm font-bold text-[#FFD700] mt-1">5,358.00</p>
         <div className="mt-4 space-y-1">
            <div className="h-1 w-full bg-white/5 rounded-full"></div>
            <div className="h-1 w-2/3 bg-[#FFD700]/20 rounded-full"></div>
         </div>
      </div>
    </div>
  </div>
);
export default TezroVirtualCard;
