import React from 'react';

const CategorySlider = () => {
  const categories = [
    { id: 1, name: 'Marketplace', img: 'https://placehold.co/150x100/004d25/d4af37?text=Market' },
    { id: 2, name: 'Food Menu', img: 'https://placehold.co/150x100/004d25/d4af37?text=Food' },
    { id: 3, name: 'Ride Options', img: 'https://placehold.co/150x100/004d25/d4af37?text=Rides' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-6">
      {categories && categories.length > 0 ? categories.map((cat) => (
        <div key={cat.id} className="min-w-[140px] bg-black/20 rounded-2xl overflow-hidden border border-[#d4af37]/10 shadow-xl">
          <img src={cat.img} alt={cat.name} className="w-full h-24 object-cover" />
          <div className="p-2 text-center">
            <p className="text-[10px] font-bold text-[#d4af37] uppercase">{cat.name}</p>
          </div>
        </div>
      )) : null}
    </div>
  );
};

export default CategorySlider;
