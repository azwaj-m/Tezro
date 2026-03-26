import React from 'react';

const BottomNav = () => {
  const navItems = [
    { label: 'Home', icon: '🏠', active: true },
    { label: 'Pay', icon: '💳', active: false },
    { label: 'Offers', icon: '🧧', active: false },
    { label: 'History', icon: '🕒', active: false },
    { label: 'Profile', icon: '👤', active: false }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#001a0d]/95 backdrop-blur-lg border-t border-[#d4af37]/20 px-4 py-2 flex justify-between items-center z-50">
      {navItems.map((item, idx) => (
        <div key={idx} className={`flex flex-col items-center ${item.active ? 'text-[#d4af37]' : 'text-gray-500'}`}>
          <span className="text-xl">{item.icon}</span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
