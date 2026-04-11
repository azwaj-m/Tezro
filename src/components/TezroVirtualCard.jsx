import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

const TezroVirtualCard = () => (
  <div className="space-y-6">
    <div className="relative h-56 w-full rounded-[2.5rem] p-8 overflow-hidden border-2 border-[#FFD700]/40 shadow-[0_0_40px_rgba(255,215,0,0.2)] bg-gradient-to-br from-[#121212] to-[#001a0f]">
      <div className="absolute inset-0 islamic-pattern"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <span className="shiny-gold font-black italic text-sm tracking-[4px]">TEZRO ISLAMIC</span>
          <div className="h-0.5 w-12 bg-[#FFD700] mt-1"></div>
        </div>
        <Cpu size={32} className="text-[#FFD700] opacity-80" />
      </div>

      <div className="relative z-10 mt-12">
        <p className="text-2xl font-mono tracking-[6px] text-white/90 drop-shadow-lg">4038 9921 0084 5562</p>
        <div className="flex justify-between items-end mt-8">
          <div>
            <p className="text-[9px] text-white/40 uppercase font-bold tracking-[2px]">Royal Member</p>
            <p className="text-sm font-bold text-[#FFD700]">SYED TEZRO</p>
          </div>
          <ShieldCheck size={28} className="text-green-500 shadow-xl" />
        </div>
      </div>
    </div>

    <div className="bg-[#FFD700]/5 backdrop-blur-md rounded-[2rem] p-6 border border-[#FFD700]/20 flex justify-between items-center">
      <div>
        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Global Balance</p>
        <p className="text-3xl font-black shiny-gold mt-1">$ 5,358.00</p>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-[#FFD700] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);
export default TezroVirtualCard;
