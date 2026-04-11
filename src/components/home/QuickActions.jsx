
import React from 'react';

import { useNavigate } from 'react-router-dom';



const QuickActions = () => {

  const navigate = useNavigate();



  const actions = [

    { name: 'Ride', icon: '🚕', path: '/ride', sub: 'Secure Travel' },

    { name: 'Food', icon: '🍲', path: '/food', sub: 'Premium Dining' },

    { name: 'Pay', icon: '💳', path: '/pay', sub: 'Fast Transfer' },

    { name: 'Shop', icon: '🛒', path: '/shop', sub: 'Luxury Goods' },

    { name: 'Bank', icon: '🏦', path: '/banking', sub: 'Asset Vault' },

    { name: 'Services', icon: '🛠️', path: '/services', sub: 'Expert Help' },

  ];



  return (

    <div className="grid grid-cols-3 gap-y-8 gap-x-4 py-4">

      {actions.map((item, index) => (

        <div 

          key={index} 

          onClick={() => navigate(item.path)}

          className="flex flex-col items-center group cursor-pointer"

        >

          <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#FFD700]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.1)] group-active:scale-90 transition-all duration-200">

             <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>

             {/* Glossy Overlay */}

             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>

          </div>

          <span className="text-[10px] font-black uppercase text-[#FFD700] mt-3 tracking-tighter">{item.name}</span>

          <span className="text-[7px] text-white/40 uppercase font-medium">{item.sub}</span>

        </div>

      ))}

    </div>

  );

};



export default QuickActions;



