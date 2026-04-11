import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { name: 'RIDE', icon: '🚕', path: '/ride', sub: 'Secure Travel' },
    { name: 'FOOD', icon: '🍲', path: '/food', sub: 'Premium Dining' },
    { name: 'PAY', icon: '💳', path: '/pay', sub: 'Fast Transfer' },
    { name: 'SHOP', icon: '🛒', path: '/shop', sub: 'Luxury Goods' },
    { name: 'BANK', icon: '🏦', path: '/banking', sub: 'Asset Vault' },
    { name: 'SERVICES', icon: '🛠️', path: '/services', sub: 'Expert Help' },
  ];

  return (
    <div className="grid grid-cols-3 gap-y-10 gap-x-4 py-6">
      {actions.map((item, index) => (
        <div key={index} onClick={() => navigate(item.path)} className="flex flex-col items-center group cursor-pointer">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#FFD700]/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.2)]">
             <span className="text-3xl">{item.icon}</span>
             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>
          <span className="text-[11px] font-black uppercase text-[#FFD700] mt-4 tracking-tight">{item.name}</span>
          <span className="text-[8px] text-white/40 uppercase font-medium mt-0.5">{item.sub}</span>
        </div>
      ))}
    </div>
  );
};
export default QuickActions;
