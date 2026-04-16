import React from 'react';
import { ShieldCheck, History, TrendingUp } from 'lucide-react';

const VaultScreen = () => {
  return (
    <div className="min-h-screen bg-[#000d08] p-6 pb-32">
      <header className="mt-12 mb-8">
        <h1 className="text-tezro-gold font-black tracking-[6px] text-2xl">TEZRO VAULT</h1>
      </header>

      {/* Assets Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-tezro-gold/20 rounded-[2.5rem] p-8 mb-8 relative overflow-hidden shadow-2xl">
        <ShieldCheck className="text-tezro-gold/20 absolute -right-4 -top-4" size={120} />
        <p className="text-zinc-500 font-bold tracking-[2px] text-xs mb-2">TOTAL SECURE ASSETS</p>
        <h2 className="text-3xl font-black text-tezro-gold italic">Rs. 45,250.00</h2>
      </div>

      {/* Transactions Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-tezro-gold/60 border-b border-tezro-gold/10 pb-2">
          <History size={16} />
          <h3 className="font-bold tracking-[3px] text-xs uppercase">Recent Transactions</h3>
        </div>

        <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50 flex justify-between items-center">
          <div>
            <p className="text-tezro-gold font-bold">Food Order</p>
            <p className="text-zinc-500 text-[10px]">14 April 2026</p>
          </div>
          <p className="text-red-500 font-black">- Rs. 850</p>
        </div>
      </div>
    </div>
  );
};
export default VaultScreen;
