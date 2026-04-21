import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

const SecurityStatus = () => {
  return (
    <div className="flex items-center gap-4 bg-[#000d08] px-6 py-3 rounded-full border border-white/5 shadow-2xl">
      <div className="flex items-center gap-2">
        <ShieldCheck size={14} className="text-[#D4AF37] animate-pulse" />
        <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Quantum Shield</span>
      </div>
      <div className="h-4 w-[1px] bg-white/10" />
      <div className="flex items-center gap-2">
        <Cpu size={12} className="text-green-500" />
        <span className="text-[8px] font-bold text-zinc-500 uppercase">Nodes: Active</span>
      </div>
    </div>
  );
};

export default SecurityStatus;
