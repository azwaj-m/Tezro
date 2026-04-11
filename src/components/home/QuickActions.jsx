
import React from 'react';



const actions = [

  { label: 'RIDE', icon: '🚕', sub: 'SECURE TRAVEL' },

  { label: 'FOOD', icon: '🍲', sub: 'PREMIUM DINING' },

  { label: 'PAY', icon: '💳', sub: 'FAST TRANSFER' },

  { label: 'SHOP', icon: '🛒', sub: 'LUXURY GOODS' },

  { label: 'BANK', icon: '🏦', sub: 'ASSET VAULT' },

  { label: 'SERVICES', icon: '🛠️', sub: 'EXPERT HELP' }

];



const QuickActions = () => {

  return (

    <div className="grid grid-cols-3 gap-6 py-4">

      {actions.map((act, i) => (

        <div key={i} className="flex flex-col items-center group cursor-pointer">

          <div className="w-16 h-16 rounded-full border-2 border-[#FFD700]/30 bg-black flex items-center justify-center relative shadow-[0_0_15px_rgba(255,215,0,0.1)] group-hover:border-[#FFD700] transition-all duration-300">

            <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">{act.icon}</span>

            {/* گولڈن رنگ (Glow) */}

            <div className="absolute inset-0 rounded-full bg-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          </div>

          <p className="text-[#FFD700] text-[10px] font-black mt-3 tracking-tighter">{act.label}</p>

          <p className="text-white/30 text-[7px] font-bold uppercase">{act.sub}</p>

        </div>

      ))}

    </div>

  );

};



export default QuickActions;

