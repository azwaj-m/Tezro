import React from 'react';
import { ShoppingBag, Utensils, CarFront, ArrowRight } from 'lucide-react';

const categories = [
  { id: 1, title: 'Marketplace', sub: 'TezroMarivetear.jsx', icon: <ShoppingBag size={24} />, img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=200' },
  { id: 2, title: 'Food Menu', sub: 'Food Menu دوکان', icon: <Utensils size={24} />, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=200' },
  { id: 3, title: 'Ride Options', sub: 'Rider Options.jsx', icon: <CarFront size={24} />, img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=200' }
];

const ExploreUniverse = () => (
  <div className="mt-8 mb-10 px-1">
    <div className="flex justify-between items-end mb-6 px-1">
      <div>
        <h3 className="text-xl font-black text-white tracking-tight">Explore Tezro Universe</h3>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Category slider دوکان دیکھیں</p>
      </div>
      <button className="flex items-center gap-1.5 text-[#FFD700] text-[10px] font-black uppercase tracking-widest">
        View All <ArrowRight size={12} />
      </button>
    </div>

    <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
      {categories.map((item) => (
        <div key={item.id} className="min-w-[170px] group transition-transform active:scale-95">
          <div className="relative h-52 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl card-dark">
            <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-5 flex flex-col justify-end">
              <div className="bg-[#FFD700] text-black w-10 h-10 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                {item.icon}
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-tighter">{item.title}</h4>
              <p className="text-[9px] text-white/40 font-medium truncate mt-1">{item.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ExploreUniverse;
