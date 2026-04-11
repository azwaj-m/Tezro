import React from 'react';

const QuickActions = () => {
  const actions = [
    { name: 'RIDE', icon: '🚕', sub: 'Secure' },
    { name: 'FOOD', icon: '🍲', sub: 'Dining' },
    { name: 'PAY', icon: '💳', sub: 'Transfer' },
    { name: 'SHOP', icon: '🛒', sub: 'Luxury' },
    { name: 'BANK', icon: '🏦', sub: 'Vault' },
    { name: 'SERVICES', icon: '🛠️', sub: 'Expert' },
  ];

  return (
    <div className="grid grid-cols-3 gap-y-8 gap-x-4 py-4 w-full">
      {actions.map((item, index) => (
        <div key={index} className="flex flex-col items-center group cursor-pointer">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#003d26] to-[#001a0f] border-2 border-[#FFD700]/50 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-active:scale-95 transition-all">
             <span className="text-3xl drop-shadow-md">{item.icon}</span>
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-30"></div>
          </div>
          <span className="text-[11px] font-black text-[#FFD700] mt-3 uppercase tracking-wider">{item.name}</span>
          <span className="text-[8px] text-white/40 font-bold uppercase">{item.sub}</span>
        </div>
      ))}
    </div>
  );
};
export default QuickActions;
