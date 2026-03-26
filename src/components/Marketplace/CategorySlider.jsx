import React from 'react';

const CategorySlider = () => {
  const categories = [
    { id: 1, name: 'Marketplace', img: 'https://placehold.co/100x100/004d25/d4af37?text=Shop' },
    { id: 2, name: 'Food Menu', img: 'https://placehold.co/100x100/004d25/d4af37?text=Food' },
    { id: 3, name: 'Ride Options', img: 'https://placehold.co/100x100/004d25/d4af37?text=Ride' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto px-4 no-scrollbar pb-4">
      {categories?.map((cat) => (
        <div key={cat.id} className="min-w-[120px] bg-black/20 rounded-xl p-2 border border-[#d4af37]/10 text-center">
          <img src={cat.img} alt={cat.name} className="w-full h-20 object-cover rounded-lg mb-2" />
          <p className="text-[10px] font-bold text-[#d4af37]">{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;
