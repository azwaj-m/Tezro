import React from 'react';

const AssetCard = ({ item }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl hover:border-[#D4AF37] transition-all group">
      <div className="aspect-square rounded-xl bg-gray-800 mb-4 overflow-hidden">
        <img src={item?.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Product" />
      </div>
      <h3 className="text-white font-bold text-sm truncate">{item?.name || 'Tezro Product'}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-[#D4AF37] font-black text-lg">Rs. {item?.price || '0'}</span>
        <button className="bg-[#D4AF37] text-black text-[10px] px-3 py-1 rounded-lg font-black uppercase">Buy</button>
      </div>
    </div>
  );
};

export default AssetCard;
