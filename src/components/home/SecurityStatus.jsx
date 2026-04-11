import React from 'react';
import { ShieldCheck, Cpu, Zap } from 'lucide-react';

const SecurityStatus = () => {
  return (
    <div className="mx-5 mb-8 p-4 glass-iranian rounded-3xl border border-[#FFD700]/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
            <ShieldCheck size={20} className="text-green-500 animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD700] rounded-full border-2 border-[#001a0f] animate-ping"></div>
        </div>
        <div>
          <p className="text-[10px] font-black text-white/80 uppercase tracking-tighter">AI Fraud Scan: Active</p>
          <p className="text-[8px] text-white/30 uppercase font-bold">Encrypted Sharding Enabled</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Cpu size={14} className="text-[#FFD700]/40" />
        <Zap size={14} className="text-[#FFD700]/40" />
      </div>
    </div>
  );
};
export default SecurityStatus;
