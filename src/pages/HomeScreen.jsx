import React from 'react';
import { Utensils, Hotel, Car, ShoppingBag, Heart, Zap, ShieldCheck } from 'lucide-react';

const services = [
  { name: 'Food', icon: Utensils },
  { name: 'Hotel', icon: Hotel },
  { name: 'Ride', icon: Car },
  { name: 'Mart', icon: ShoppingBag },
  { name: 'Health', icon: Heart },
  { name: 'Bills', icon: Zap }
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-[#000d08] p-6 pb-32 pt-20">
      <div className="mb-8">
        <h1 className="text-tezro-gold font-black tracking-[8px] text-2xl">TEZRO ULTRA</h1>
        <p className="text-zinc-500 text-xs font-bold mt-2 italic">The Future of Services</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((s) => (
          <button key={s.name} className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-zinc-900/30 border border-zinc-800 hover:border-tezro-gold/40 transition-all group">
            <s.icon className="text-tezro-gold mb-3 group-hover:scale-110 transition-transform" size={32} />
            <span className="text-tezro-gold text-[10px] font-black tracking-widest uppercase">{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
