import React, { useState } from 'react';
import { ShieldCheck, History } from 'lucide-react';
import TezroReceiptModal from '../components/vault/TezroReceiptModal';

const VaultScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black italic tracking-tighter text-[#D4AF37]">TEZRO <span className="text-white">VAULT</span></h1>
        <div className="bg-[#D4AF37]/10 p-2 rounded-xl border border-[#D4AF37]/20">
          <ShieldCheck className="text-[#D4AF37]" size={20} />
        </div>
      </div>

      <div 
        className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-10 rounded-[3rem] border border-zinc-800 mb-10 cursor-pointer shadow-2xl relative overflow-hidden group transition-all hover:border-[#D4AF37]/40" 
        onClick={() => setIsModalOpen(true)}
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-all"></div>
        <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] mb-2">Secure Assets</p>
        <h2 className="text-4xl font-black italic tracking-tighter">Rs. 45,250<span className="text-[#D4AF37]">.00</span></h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2 px-2">
          <History size={16} className="text-[#D4AF37]" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Transaction Ledger</h3>
        </div>
        
        <div className="p-5 bg-zinc-900/40 rounded-[2rem] border border-zinc-800 flex justify-between items-center group hover:bg-zinc-900 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-black border border-zinc-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">Luxury Food Order</p>
              <p className="text-[10px] text-zinc-600 font-bold uppercase">14 April 2026</p>
            </div>
          </div>
          <p className="text-[#D4AF37] font-black italic tracking-tight">- Rs. 850</p>
        </div>
      </div>

      <TezroReceiptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={{amount: '850'}} />
    </div>
  );
};

export default VaultScreen;
