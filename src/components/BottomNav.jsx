import React from 'react';

const BottomNav = () => {
  const navs = [
    { name: 'Home', icon: '🏠', active: true },
    { name: 'Pay', icon: '💳', active: false },
    { name: 'Offers', icon: '🧧', active: false },
    { name: 'History', icon: '🕒', active: false },
    { name: 'Profile', icon: '👤', active: false }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#001a0d] border-t border-[#d4af37]/20 px-6 py-3 flex justify-between items-center">
      {navs.map((n, i) => (
        <div key={i} className={`flex flex-col items-center ${n.active ? 'text-[#d4af37]' : 'text-gray-500'}`}>
          <span className="text-xl">{n.icon}</span>
          <span className="text-[10px] font-bold mt-1">{n.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
