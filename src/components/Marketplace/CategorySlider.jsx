import React from 'react';

const categories = [
  { id: 1, name: 'Gadgets', icon: '📱' },
  { id: 2, name: 'Fashion', icon: '👕' },
  { id: 3, name: 'Home', icon: '🏠' },
  { id: 4, name: 'Food', icon: '🍔' },
  { id: 5, name: 'Cars', icon: '🚗' }
];

const CategorySlider = () => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
      {categories.map(cat => (
        <div key={cat.id} className="flex-shrink-0 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#D4AF37]/20 flex items-center justify-center text-2xl shadow-lg hover:bg-[#D4AF37]/10 transition-all cursor-pointer">
            {cat.icon}
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;
