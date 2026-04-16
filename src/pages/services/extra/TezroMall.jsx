import React from 'react';
import { ShoppingCart, PlusCircle, Search } from 'lucide-react';

const TezroMall = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="p-5 flex items-center justify-between sticky top-0 bg-black/90 z-20">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">MALL</span></h1>
        <a href="https://alingosuper.github.io/TezroWeb" className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all hover:bg-[#D4AF37] hover:text-tezro-gold">
          <PlusCircle size={14} /> SELL ITEM
        </a>
      </div>
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input type="text" placeholder="Search products..." className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-[#D4AF37] outline-none" />
        </div>
        <p className="text-center text-zinc-600 text-xs italic mt-10">Premium marketplace items loading...</p>
      </div>
    </div>
  );
};
export default TezroMall;
