import React from 'react';
const QuickActions = () => {
  const actions = [
    { name: 'RIDE', icon: '🚕', sub: 'TRAVEL' },
    { name: 'FOOD', icon: '🍲', sub: 'DINING' },
    { name: 'PAY', icon: '💳', sub: 'TRANSFER' },
    { name: 'SHOP', icon: '🛒', sub: 'GOODS' },
    { name: 'BANK', icon: '🏦', sub: 'VAULT' },
    { name: 'SERVICES', icon: '🛠️', sub: 'HELP' }
  ];
  return (
    <div className="grid grid-cols-3 gap-y-8 py-4">
      {actions.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#FFD700] bg-black flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)]">
             <span className="text-3xl">{item.icon}</span>
          </div>
          <span className="text-[11px] font-black text-[#FFD700] mt-2">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
export default QuickActions;
