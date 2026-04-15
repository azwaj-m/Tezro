import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const SecurityStatus = () => {
  return (
    <div className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
      <ShieldCheck size={14} className="text-[#D4AF37]" />
      <span className="text-[10px] font-black text-white uppercase tracking-widest">Quantum Shield Active</span>
    </div>
  );
};

export default SecurityStatus;
