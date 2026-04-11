import React from 'react';

const QuickActions = () => {
  const actions = [
    { name: 'Ride', icon: '🚕', color: 'from-[#004d30]' },
    { name: 'Food', icon: '🍲', color: 'from-[#004d30]' },
    { name: 'Pay', icon: '💳', color: 'from-[#004d30]' },
    { name: 'Shop', icon: '🛒', color: 'from-[#004d30]' },
    { name: 'Bank', icon: '🏦', color: 'from-[#004d30]' },
    { name: 'Help', icon: '🛠️', color: 'from-[#004d30]' },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 py-4">
      {actions.map((item, index) => (
        <button key={index} className="flex flex-col items-center group">
          <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-b ${item.color} to-[#001a0f] border border-[#FFD700]/20 flex items-center justify-center shadow-xl group-active:scale-90 transition-all duration-200`}>
            <span className="text-3xl filter drop-shadow-lg">{item.icon}</span>
          </div>
          <span className="mt-3 text-[10px] font-black text-[#FFD700] uppercase tracking-[2px]">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
