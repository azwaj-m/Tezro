import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, MicVocal } from 'lucide-react';

const SecurityStatus = () => {
  const [isSecure, setIsSecure] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 rounded-full border border-zinc-800 backdrop-blur-md">
        <div className={isSecure ? "text-[#D4AF37]" : "text-red-500 animate-pulse"}>
          {isSecure ? <ShieldCheck size={14} /> : <Lock size={14} />}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-white">
          {isSecure ? "Voice ID Active" : "System Locked"}
        </span>
        {voiceActive && (
          <div className="flex gap-0.5 ml-1">
            <span className="w-1 h-3 bg-[#D4AF37] animate-bounce"></span>
            <span className="w-1 h-2 bg-[#D4AF37] animate-pulse"></span>
            <span className="w-1 h-3 bg-[#D4AF37] animate-bounce"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityStatus;
