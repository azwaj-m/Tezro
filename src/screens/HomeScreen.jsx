import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'ride', name: 'Ride', icon: '🚕', path: '/ride', sub: 'InDrive' },
    { id: 'food', name: 'Food', icon: '🍔', path: '/food', sub: 'Panda' },
    { id: 'shop', name: 'Shop', icon: '🛍️', path: '/shop', sub: 'Bazaar' },
    { id: 'parcel', name: 'Parcel', icon: '📦', path: '/parcel', sub: 'Logistics' },
    { id: 'wallet', name: 'Wallet', icon: '💳', path: '/pay', sub: 'Fintech' },
    { id: 'bank', name: 'Bank', icon: '🏦', path: '/bank', sub: 'Universal' },
    { id: 'booking', name: 'Booking', icon: '📅', path: '/booking', sub: 'Services' },
    { id: 'emergency', name: 'SOS', icon: '🚨', path: '/emergency', sub: 'Safety' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pb-28 selection:bg-[#D4AF37]">
      <Sidebar />
      
      {/* Header Section */}
      <div className="p-6 pt-16 flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[5px] mb-1">Tezro Universe</h2>
          <h1 className="text-4xl font-black tracking-tighter italic leading-none">COMMAND <span className="text-white/20">CENTER</span></h1>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex gap-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
            <span className="w-2 h-2 rounded-full bg-green-500/20"></span>
          </div>
          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Shield v3.2 Active</span>
        </div>
      </div>

      {/* Wallet Card - Compact & Glassy */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/10 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
             <div className="bg-[#D4AF37] text-black text-[8px] font-black px-3 py-1 rounded-full uppercase">Verified Gold</div>
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Available Liquidity</p>
          <div className="flex items-baseline gap-2">
            <span className="text-gray-400 font-bold text-lg italic">Rs.</span>
            <h3 className="text-3xl font-black tracking-tighter">1,250,500.00</h3>
          </div>
          <div className="mt-4 flex gap-3">
             <button onClick={() => navigate('/pay')} className="bg-white text-black text-[9px] font-black px-5 py-2 rounded-xl uppercase hover:bg-[#D4AF37] transition-colors">Add Funds</button>
             <button onClick={() => navigate('/bank')} className="bg-white/5 border border-white/10 text-white text-[9px] font-black px-5 py-2 rounded-xl uppercase hover:bg-white/10 transition-colors">Vault Details</button>
          </div>
          <div className="absolute -right-6 -bottom-6 text-white/5 text-8xl font-black italic select-none">TEZRO</div>
        </div>
      </div>

      {/* Modern Grid Design */}
      <div className="px-6 grid grid-cols-2 gap-4">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => navigate(s.path)}
            className="bg-[#111] border border-white/5 p-5 rounded-[2rem] flex flex-col items-start gap-3 hover:border-[#D4AF37]/40 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#D4AF37]/10 transition-transform">
              {s.icon}
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">{s.name}</h4>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">{s.sub}</p>
            </div>
            <div className="absolute top-4 right-4 text-white/5 group-hover:text-[#D4AF37]/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </div>
          </button>
        ))}
      </div>

      {/* Global Command Center Button */}
      <div className="px-6 mt-8">
         <button 
           onClick={() => navigate('/admin')}
           className="w-full py-5 bg-[#D4AF37] text-black rounded-3xl font-black text-xs uppercase tracking-[3px] shadow-[0_10px_30px_rgba(212,175,55,0.3)] active:scale-95 transition-all"
         >
           Open Business Portal
         </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
