import React from 'react';

const QuickActions = () => {
  const actions = [
    { id: 1, title: 'Food', urdu: 'کھانا', icon: '🍲' },
    { id: 2, title: 'Ride', urdu: 'رائیڈ', icon: '🚗' },
    { id: 3, title: 'Shop', urdu: 'شاپ', icon: '🛒' },
    { id: 4, title: 'Services', urdu: 'سروسز', icon: '🛠️' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions && actions.length > 0 ? actions.map((item) => (
        <button
          key={item.id}
          className="bg-gradient-to-b from-[#f3cf7a] to-[#b8860b] p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-[#ffd700]/30 active:scale-95 transition-transform"
        >
          <div className="text-3xl mb-1">{item.icon}</div>
          <div className="text-[#002d15] font-bold text-lg leading-tight">{item.title}</div>
          <div className="text-[#002d15]/80 text-[10px] font-bold">{item.urdu}</div>
        </button>
      )) : <p className="text-[#d4af37]">Loading Actions...</p>}
    </div>
  );
};

export default QuickActions;
