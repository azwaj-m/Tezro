import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { name: 'Ride', icon: '🚕', path: '/ride', desc: 'Secure Travel' },
    { name: 'Food', icon: '🍲', path: '/food', desc: 'Premium Dining' },
    { name: 'Pay', icon: '💳', path: '/pay', desc: 'Fast Transfer' },
    { name: 'Shop', icon: '🛒', path: '/shop', desc: 'Luxury Goods' },
    { name: 'Bank', icon: '🏦', path: '/banking', desc: 'Asset Vault' },
    { name: 'Biz', icon: '📊', path: '/vendor', desc: 'Command Center' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map((action, i) => (
        <div 
          key={i} 
          onClick={() => navigate(action.path)}
          className="bg-gradient-to-b from-white/10 to-transparent border border-white/5 p-4 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-all hover:border-[#d4af37]/40"
        >
          <span className="text-3xl mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{action.icon}</span>
          <p className="text-[10px] font-black text-white uppercase tracking-tighter">{action.name}</p>
          <p className="text-[7px] text-[#d4af37]/60 font-bold uppercase mt-1">{action.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
