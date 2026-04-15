import React, { useState } from 'react';
import { Wallet, QrCode, ShieldCheck } from 'lucide-react';
import TezroScanner from '../components/utils/TezroScanner';

const FinanceHub = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">FINANCE <span className="text-white">HUB</span></h1>
        <button onClick={() => setIsScannerOpen(true)} className="p-3 bg-[#D4AF37] text-black rounded-2xl shadow-lg active:scale-90 transition-all">
          <QrCode size={20} />
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] text-center">
        <p className="text-zinc-500 text-[10px] uppercase font-black mb-2">Ready to Pay Utility Bills?</p>
        <button onClick={() => setIsScannerOpen(true)} className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-xs font-bold hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all">
          Scan Bill QR Code
        </button>
      </div>

      <TezroScanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </div>
  );
};

export default FinanceHub;
