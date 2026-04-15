import React from 'react';
import { Menu, Mic, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { startVoiceRecognition } from '../../utils/VoiceEngine';
import SecurityStatus from '../home/SecurityStatus';

const Navbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <nav className="p-4 bg-black border-b border-zinc-900 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="text-white p-2 hover:bg-zinc-800 rounded-xl">
          <Menu size={24} />
        </button>
        <SecurityStatus />
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => startVoiceRecognition(navigate)}
          className="p-3 bg-[#D4AF37] text-black rounded-full shadow-lg shadow-yellow-900/20 active:scale-90 transition-all"
        >
          <Mic size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;





lcat <<EOT > src/components/home/SecurityStatus.jsx
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

const SecurityStatus = () => {
  const [isSecure, setIsSecure] = useState(false);

  useEffect(() => {
    // مصنوعی سیکیورٹی چیک
    setTimeout(() => setIsSecure(true), 2000);
  }, []);

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">
      <div className={isSecure ? "text-green-500" : "text-yellow-500 animate-pulse"}>
        {isSecure ? <ShieldCheck size={16} /> : <Lock size={16} />}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        {isSecure ? "Tezro Encrypted" : "Scanning Connection..."}
      </span>
    </div>
  );
};

export default SecurityStatus;
