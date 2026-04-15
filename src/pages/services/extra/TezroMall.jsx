import React, { useState } from 'react';
import { Search, ShoppingCart, Smartphone, Shirt, Home, Sparkles, Watch, Baby, Dumbbell } from 'lucide-react';

const TezroMall = () => {
  const categories = [
    { name: 'Electronics', icon: <Smartphone size={20}/> },
    { name: 'Fashion', icon: <Shirt size={20}/> },
    { name: 'Home & Living', icon: <Home size={20}/> },
    { name: 'Beauty', icon: <Sparkles size={20}/> },
    { name: 'Luxury', icon: <Watch size={20}/> },
    { name: 'Baby Care', icon: <Baby size={20}/> },
    { name: 'Sports', icon: <Dumbbell size={20}/> },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header & Search */}
      <div className="p-5 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">MALL</span></h1>
          <div className="relative">
            <ShoppingCart className="text-white" />
            <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">0</span>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search millions of products..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-12 pr-4 text-sm focus:border-[#D4AF37] outline-none"
          />
        </div>
      </div>

      {/* Horizontal Categories */}
      <div className="flex gap-4 overflow-x-auto p-5 no-scrollbar">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
            <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer">
              {cat.icon}
            </div>
            <span className="text-[10px] font-medium text-zinc-400 text-center">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Trending Now</h2>
          <span className="text-[#D4AF37] text-xs font-bold">See All</span>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden group">
              <div className="h-40 bg-zinc-800 relative">
                 <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full">
                    <Sparkles size={12} className="text-[#D4AF37]" />
                 </div>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Brand Name</p>
                <h3 className="text-sm font-bold text-white mt-1 truncate">Premium Product Title</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#D4AF37] font-black text-sm">Rs. 4,999</span>
                  <button className="bg-zinc-800 p-2 rounded-lg group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TezroMall;
