import React from 'react';
import { Car, Utensils, CreditCard, ShoppingBag, Truck, UserPlus, Zap, ShieldCheck } from 'lucide-react';

const services = [
  { name: 'Ride', icon: Car },
  { name: 'Food', icon: Utensils },
  { name: 'Pay', icon: CreditCard },
  { name: 'Shop', icon: ShoppingBag },
  { name: 'Deliver', icon: Truck },
  { name: 'Doctor', icon: UserPlus },
  { name: 'Pharmacy', icon: Zap },
  { name: 'Services', icon: ShieldCheck }
];

const HomeScreen = () => {
  return (
    <div className="min-h-screen p-6 pb-32 pt-24 space-y-8 persian-pattern">
      {/* سروسز گریڈ - تصویر 3 کے مطابق */}
      <div className="card-dark relative">
        <div className="absolute top-4 right-4 text-emerald-500 flex items-center gap-1.5 text-[10px] font-bold glow-green">
            <ShieldCheck size={14} className="animate-pulse"/> Cyber Security Active
        </div>
        <div className="grid grid-cols-4 gap-3 pt-6">
          {services.map((s) => (
            <button key={s.name} className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#FFD700] to-[#B8860B] aspect-square shadow-lg group transition-all hover:shadow-[0_0_20px_#FFD700]">
              <s.icon className="text-black mb-1.5" size={24} strokeWidth={2.5} />
              <span className="text-black text-[9px] font-black tracking-tight uppercase leading-none">{s.name}</span>
              <span className="text-black/50 text-[7px] lowercase">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* پریمیم سروسز سیکشن */}
      <div className="space-y-4">
        <h3 className="text-tezro-gold font-bold tracking-[3px] text-xs uppercase glow-green">Premium Services</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="card-dark h-40 flex items-end p-4 border-tezro-gold/20 hover:border-tezro-gold/50 transition-all"><span className="text-white font-bold text-xs uppercase tracking-widest">Marketplace</span></div>
            <div className="card-dark h-40 flex items-end p-4 border-tezro-gold/20 hover:border-tezro-gold/50 transition-all"><span className="text-white font-bold text-xs uppercase tracking-widest">Food & Dining</span></div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
