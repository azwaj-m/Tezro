import React from 'react';
import { PlusCircle, ShoppingBag } from 'lucide-react';

const FoodDelivery = () => {
  return (
    <div className="min-h-screen bg-black text-white p-5 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-[#D4AF37]">Tezro <span className="text-white">Eats</span></h1>
        <a href="https://alingosuper.github.io/TezroWeb" className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-[10px] font-bold">
          <PlusCircle size={14} /> ADD DISH
        </a>
      </div>
      <div className="text-center text-zinc-600 mt-20 italic">Freshly cooked meals nearby...</div>
    </div>
  );
};
export default FoodDelivery;
