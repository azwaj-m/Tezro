import React from 'react';
import { Zap } from 'lucide-react';

const TezroVirtualCard = () => {
  return (
    <div className="relative w-full h-52 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] rounded-[2.5rem] p-6 border border-[#FFD700]/40 shadow-[0_20px_50px_rgba(0,0,0,1)] overflow-hidden">
      <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent skew-x-[-25deg] animate-[shine_5s_infinite]"></div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-[3px] text-[#FFD700]/70 font-black">Tezro Premium</p>
          <h2 className="text-xl font-black italic text-[#FFD700]">MASTER ASSET</h2>
        </div>
        <Zap className="text-[#FFD700] fill-[#FFD700]" size={28} />
      </div>
      <div className="mt-8">
        <p className="text-2xl font-mono tracking-[4px] text-white">1234 5678 9876 4038</p>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="text-[8px] uppercase text-[#FFD700]/50 font-bold">Card Holder</p>
          <p className="text-sm font-bold text-white uppercase">Tezro User</p>
        </div>
        <div className="bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/20 text-[#FFD700] text-xs font-black">12/28</div>
      </div>
    </div>
  );
};
export default TezroVirtualCard;
