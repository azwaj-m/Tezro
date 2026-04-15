import React, { useEffect, useState } from 'react';
import { ShieldCheck, Wallet } from 'lucide-react';
import { encryptTezroData } from '../utils/SecurityEngine';

const FinanceHub = () => {
  const [secureKey, setSecureKey] = useState('');

  useEffect(() => {
    // بیلنس کو فوری طور پر انکرپٹ کر کے محفوظ کرنا
    encryptTezroData("150000").then(res => setSecureKey(res));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] relative overflow-hidden">
        <div className="flex justify-between items-start mb-10">
          <Wallet className="text-[#D4AF37]" size={32} />
          <div className="bg-green-500/10 text-green-500 text-[8px] px-2 py-1 rounded-full border border-green-500/20 font-black uppercase">
            Live Encrypted
          </div>
        </div>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Secure Balance ID</p>
        <h2 className="text-xs font-mono text-zinc-400 mt-2 break-all">{secureKey}</h2>
        
        <div className="mt-8 flex items-center gap-2 text-[#D4AF37]">
           <ShieldCheck size={16} />
           <span className="text-[10px] font-bold tracking-tighter uppercase text-white">Quantum Shield Active</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceHub;
