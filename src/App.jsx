import React from 'react';
import { Search, Mic, ShieldCheck, Home, CreditCard, Tag, History, User } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-[#001a0f] text-white selection:bg-[#FFD700] selection:text-black">
      
      {/* Header - EXACT IMAGE LOOK */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-[#001a0f] to-transparent">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-1">
            <span className="text-[#FFD700] text-3xl font-black italic tracking-tighter">T</span>
            <span className="text-white text-xl font-bold tracking-tight">Tezro</span>
          </div>
          <div className="w-11 h-11 rounded-full border-2 border-[#FFD700]/40 overflow-hidden shadow-lg">
            <img src="https://via.placeholder.com/150" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="bg-[#002b1a]/80 backdrop-blur-xl rounded-[1.5rem] border border-[#FFD700]/10 flex items-center px-5 py-3 shadow-2xl">
          <Search className="text-[#FFD700]/50 mr-3" size={18} />
          <input type="text" placeholder="Search Search Bar" className="bg-transparent border-none outline-none text-sm w-full" />
          <Mic className="text-[#FFD700]/50 ml-3" size={18} />
        </div>
        <div className="flex justify-end mt-2">
           <div className="flex items-center gap-1.5 bg-[#FFD700]/5 px-3 py-1 rounded-full border border-[#FFD700]/10">
             <span className="text-[9px] text-green-500 font-black uppercase tracking-widest">Cyber Security</span>
             <ShieldCheck size={10} className="text-green-500" />
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-48 pb-28 px-4 space-y-6 overflow-y-auto no-scrollbar max-w-md mx-auto">
        
        {/* Banner */}
        <div className="relative w-full h-44 rounded-[2.2rem] overflow-hidden border border-[#FFD700]/20">
          <img src="https://via.placeholder.com/600x400/002b1a/FFD700?text=Premium+Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-center">
            <h2 className="text-xl font-black text-white leading-tight uppercase">Integrated Services<br/>& Home Returns</h2>
            <button className="mt-4 bg-[#FFD700] text-black text-[10px] font-black px-6 py-2 rounded-full w-max uppercase">Shop Now</button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-gradient-to-br from-[#1a1a1a] to-black rounded-[1.8rem] border border-[#FFD700]/20 p-4 relative shadow-xl">
             <span className="text-[#FFD700] font-black italic text-[9px] tracking-[2px]">TEZRO</span>
             <p className="mt-6 text-sm font-mono tracking-[2px] text-white/80">**** 4038</p>
             <div className="absolute bottom-4 right-4 w-6 h-4 bg-orange-600/30 rounded-sm"></div>
          </div>
          <div className="h-32 bg-[#002b1a]/50 backdrop-blur-md rounded-[1.8rem] border border-white/5 p-4 flex flex-col justify-between">
             <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Balance</span>
             <p className="text-lg font-black text-[#FFD700] tracking-tighter">$ 5,358.00</p>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-[#FFD700]/30"></div>
             </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-40 rounded-[2.2rem] overflow-hidden border border-white/5 grayscale-[0.5] opacity-60">
          <img src="https://via.placeholder.com/500x300/001a0f/22c55e?text=Terminal+Map" className="w-full h-full object-cover" />
        </div>
      </main>

      {/* Footer - EXACT IMAGE LOOK */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#001a0f]/90 backdrop-blur-2xl border-t border-[#FFD700]/10 flex justify-around items-center px-6 z-50 rounded-t-[2.5rem]">
        <div className="flex flex-col items-center gap-1 text-[#FFD700]"><Home size={22} /><span className="text-[9px] font-bold">HOME</span></div>
        <div className="flex flex-col items-center gap-1 text-white/30"><CreditCard size={22} /><span className="text-[9px] font-bold">PAY</span></div>
        <div className="flex flex-col items-center gap-1 text-white/30"><Tag size={22} /><span className="text-[9px] font-bold">OFFERS</span></div>
        <div className="flex flex-col items-center gap-1 text-white/30"><History size={22} /><span className="text-[9px] font-bold">HISTORY</span></div>
        <div className="flex flex-col items-center gap-1 text-white/30"><User size={22} /><span className="text-[9px] font-bold">PROFILE</span></div>
      </nav>

    </div>
  );
};
export default App;
