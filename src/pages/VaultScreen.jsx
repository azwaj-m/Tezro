import React from 'react';
import { ShieldCheck, History } from 'lucide-react';
import ReceiptModal from '../components/vault/ReceiptModal';

const VaultScreen = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">VAULT</span></h1>
        <ShieldCheck className="text-[#D4AF37]" />
      </div>

      <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-zinc-800 mb-8">
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Total Secure Assets</p>
        <h2 className="text-3xl font-black">Rs. 45,250.00</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <History size={16} className="text-zinc-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Recent Transactions</h3>
        </div>
        
        {/* یہاں ٹرانزیکشن لسٹ آئے گی */}
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex justify-between items-center">
          <div>
            <p className="text-sm font-bold">Food Order</p>
            <p className="text-[10px] text-zinc-500">14 April 2026</p>
          </div>
          <p className="text-[#D4AF37] font-bold">- Rs. 850</p>
        </div>
      </div>
      
      {/* Receipt Modal یہاں کال ہوگا */}
    </div>
  );
};

export default VaultScreen;
