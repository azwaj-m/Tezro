import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

const TezroVirtualCard = () => {
  return (
    <div className="relative w-full h-56 bg-gradient-to-br from-[#1a1a1a] via-[#002b1a] to-[#0a0a0a] rounded-[2.5rem] p-8 border border-[#FFD700]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden group">
      {/* سکیورٹی اینیمیٹڈ لیئر */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#FFD700]/5 to-transparent skew-x-[-25deg] group-hover:left-full transition-all duration-[1.5s]"></div>
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-[4px] text-[#FFD700]/60 font-black">Tezro Universe</p>
          <h2 className="text-xl font-black italic text-[#FFD700] tracking-tighter">PREMIUM ASSET</h2>
        </div>
        <div className="bg-[#FFD700]/10 p-2 rounded-2xl border border-[#FFD700]/20">
          <Zap className="text-[#FFD700] fill-[#FFD700]" size={24} />
        </div>
      </div>

      <div className="mt-10">
        <p className="text-2xl font-mono tracking-[4px] text-white drop-shadow-md">**** **** **** 4038</p>
        <div className="flex items-center gap-2 mt-1">
          <ShieldCheck size={12} className="text-green-500" />
          <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Encrypted Terminal</span>
        </div>
      </div>

      <div className="flex justify-between items-end mt-6">
        <div>
          <p className="text-[8px] uppercase text-white/30 font-bold tracking-widest">Asset Holder</p>
          <p className="text-sm font-bold text-white uppercase tracking-tight">Verified Tezro User</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] uppercase text-white/30 font-bold tracking-widest">Expiry</p>
          <p className="text-xs font-black text-[#FFD700]">12 / 28</p>
        </div>
      </div>
    </div>
  );
};

export default TezroVirtualCard;
