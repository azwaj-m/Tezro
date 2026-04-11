import React from 'react';

const TezroVirtualCard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-4">
      {/* Iranian Islamic Gold Card */}
      <div className="relative h-52 w-full rounded-[2.5rem] p-7 overflow-hidden border-2 border-[#FFD700]/40 shadow-[0_0_30px_rgba(255,215,0,0.2)] bg-[#121212]">
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')`}}></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex flex-col">
            <span className="shiny-gold font-black italic text-xs tracking-widest">TEZRO ROYAL</span>
            <div className="mt-1 h-0.5 w-10 bg-[#FFD700]"></div>
          </div>
          <div className="w-12 h-8 bg-gradient-to-tr from-[#FFD700] to-[#FFF8E1] rounded-lg shadow-lg flex items-center justify-center font-bold text-[8px] text-black">CHIP</div>
        </div>

        <div className="relative z-10 mt-10">
          <p className="text-2xl font-mono tracking-[6px] text-white/90 shadow-sm">4038 9921 0084</p>
          <div className="flex justify-between items-end mt-6">
            <div>
              <p className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Valid Thru</p>
              <p className="text-xs font-bold text-white">12/28</p>
            </div>
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-600/80 backdrop-blur-sm border border-white/10"></div>
              <div className="w-10 h-10 rounded-full bg-yellow-500/80 backdrop-blur-sm border border-white/10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Royal Balance Box */}
      <div className="glass-iranian rounded-[2rem] p-6 flex justify-between items-center gold-border">
        <div>
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Available Balance</p>
          <p className="text-3xl font-black shiny-gold mt-1">$ 5,358.00</p>
        </div>
        <div className="bg-[#FFD700]/10 p-3 rounded-2xl border border-[#FFD700]/20">
           <div className="w-10 h-10 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  </div>
);
export default TezroVirtualCard;
