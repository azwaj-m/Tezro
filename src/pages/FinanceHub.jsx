import React, { useState } from 'react';
import { Wallet, QrCode, ShieldCheck, CheckCircle } from 'lucide-react';
import TezroScanner from '../components/utils/TezroScanner';
import TezroReceipt from '../components/finance/TezroReceipt';

const FinanceHub = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const handlePaymentComplete = () => {
    setIsScannerOpen(false);
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      {!showReceipt ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black italic text-[#D4AF37]">FINANCE <span className="text-white">HUB</span></h1>
            <button onClick={() => setIsScannerOpen(true)} className="p-3 bg-[#D4AF37] text-black rounded-2xl shadow-lg">
              <QrCode size={20} />
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] text-center mb-6">
            <CheckCircle className="mx-auto text-[#D4AF37] mb-4" size={40} />
            <h2 className="font-bold text-lg">Utility Bills</h2>
            <p className="text-zinc-500 text-[10px] uppercase mt-1 mb-6">Scan your bill for instant payment</p>
            <button onClick={() => setIsScannerOpen(true)} className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest">
              Scan & Pay
            </button>
          </div>
        </>
      ) : (
        <div className="animate-in fade-in zoom-in duration-500">
          <TezroReceipt />
          <button 
            onClick={() => setShowReceipt(false)}
            className="w-full mt-6 py-4 text-zinc-500 font-bold text-xs uppercase tracking-[0.3em]"
          >
            Done / Go Back
          </button>
        </div>
      )}

      <TezroScanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} onScanResult={handlePaymentComplete} />
    </div>
  );
};

export default FinanceHub;
