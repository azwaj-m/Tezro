import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Navigation, Coffee, Package, CreditCard, ChevronRight, Bell, Search } from 'lucide-react';
import MobileRecharge from '../components/MobileRecharge';
import TransactionsList from '../components/TransactionsList';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32 font-sans overflow-x-hidden">
      
      {/* 1. ULTRA-GLASS HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-black/40 backdrop-blur-2xl border-b border-white/5 p-5 pt-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Shield size={22} className="text-black" />
          </div>
          <div>
            <h2 className="text-[#D4AF37] font-black tracking-[3px] text-[10px] uppercase">Tezro Gold</h2>
            <p className="text-white text-xs font-bold">Good Evening, Chief</p>
          </div>
        </div>
        <div className="relative">
          <Bell size={20} className="text-gray-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></div>
        </div>
      </header>

      <div className="p-5 pt-32">
        
        {/* 2. THE WALLET VAULT CARD (THE STAR OF THE SHOW) */}
        <div className="relative group overflow-hidden bg-gradient-to-br from-[#111] via-[#0a0a0a] to-black p-8 rounded-[40px] border border-white/10 shadow-2xl mb-10">
          {/* Animated Background Glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full group-hover:bg-[#D4AF37]/20 transition-all duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
               <span className="text-[10px] font-black uppercase tracking-[3px] text-[#D4AF37]">Available Balance</span>
               <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[9px] font-bold">ACTIVE VAULT</div>
            </div>
            <div className="flex items-baseline gap-2 mb-8">
               <span className="text-xl font-bold text-gray-500">PKR</span>
               <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37]">
                 1,250,500
               </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button className="bg-[#D4AF37] text-black py-4 rounded-2xl font-black text-[11px] uppercase tracking-wider shadow-[0_10px_30px_rgba(212,175,55,0.2)] active:scale-95 transition-all">Send Money</button>
               <button className="bg-white/5 border border-white/10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all">Add Funds</button>
            </div>
          </div>
        </div>

        {/* 3. NEON SERVICES GRID */}
        <h3 className="text-[10px] font-black uppercase tracking-[4px] text-gray-600 mb-6 px-2">Core Services</h3>
        <div className="grid grid-cols-4 gap-4 mb-10">
           {[
             {n: 'Ride', i: <Navigation size={20} />, c: 'from-blue-500/20'},
             {n: 'Food', i: <Coffee size={20} />, c: 'from-orange-500/20'},
             {n: 'Shop', i: <Zap size={20} />, c: 'from-[#39FF14]/20'},
             {n: 'Pay', i: <CreditCard size={20} />, c: 'from-purple-500/20'}
           ].map((s, idx) => (
             <div key={idx} className="flex flex-col items-center gap-3">
               <div className={`w-16 h-16 bg-gradient-to-b ${s.c} to-black/40 rounded-3xl border border-white/5 flex items-center justify-center text-white shadow-xl active:scale-90 transition-all`}>
                 {s.i}
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{s.n}</span>
             </div>
           ))}
        </div>

        {/* 4. PREMIUM MODULES */}
        <div className="space-y-6">
           <div className="bg-[#111]/50 backdrop-blur-md rounded-[35px] p-6 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-[2px]">Quick Recharge</h3>
                <Zap size={14} className="text-[#D4AF37]" />
              </div>
              <MobileRecharge />
           </div>

           <div className="bg-gradient-to-r from-[#111] to-black rounded-[35px] p-2 border border-white/5">
              <h3 className="text-gray-500 text-[9px] font-black uppercase p-5 tracking-[4px]">Live Activity</h3>
              <TransactionsList />
              <button className="w-full py-5 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
                Full Financial Ledger
              </button>
           </div>
        </div>
      </div>

      {/* 5. FLOATING GLASS NAVIGATION */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-black/60 backdrop-blur-3xl rounded-[30px] border border-white/10 flex justify-around items-center px-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[2000]">
         <div className="p-3 bg-[#D4AF37] text-black rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
           <Navigation size={24} />
         </div>
         <div className="p-3 text-gray-500 hover:text-white transition-all"><Package size={24} /></div>
         <div className="p-3 text-gray-500 hover:text-white transition-all"><CreditCard size={24} /></div>
         <div className="p-3 text-gray-500 hover:text-white transition-all"><Shield size={24} /></div>
      </nav>

    </div>
  );
};

export default HomeScreen;
