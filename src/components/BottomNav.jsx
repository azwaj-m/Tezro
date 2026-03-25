import React from 'react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#001a0d]/90 backdrop-blur-md border-t border-[#d4af37]/30 px-6 py-3 flex justify-between items-center z-50">
      <div className="flex flex-col items-center text-[#d4af37]">
        <span className="text-xl">🏠</span>
        <span className="text-[10px] font-bold">Home</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl">💳</span>
        <span className="text-[10px]">Pay</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl">🧧</span>
        <span className="text-[10px]">Offers</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl">🕒</span>
        <span className="text-[10px]">History</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <span className="text-xl">👤</span>
        <span className="text-[10px]">Profile</span>
      </div>
    </div>
  );
};

export default BottomNav;
