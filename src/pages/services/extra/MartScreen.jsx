import React from 'react';
import FoodMenu from '../../../components/FoodMenu';

const MartScreen = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="p-6 bg-yellow-500/10 border-b border-yellow-500/20">
        <h1 className="text-2xl font-black text-yellow-500 italic uppercase">Tezro Mart</h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Premium Grocery Delivery</p>
      </div>
      <FoodMenu />
    </div>
  );
};

export default MartScreen;
