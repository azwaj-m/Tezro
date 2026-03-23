import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();

  const mainModules = [
    { id: 'ride', name: 'Ride', icon: '🚕', path: '/ride', desc: 'InDrive Style' },
    { id: 'food', name: 'Food', icon: '🍱', path: '/food', desc: 'Panda Style' },
    { id: 'shop', name: 'Shop', icon: '🛍️', path: '/shop', desc: 'Draz Style' },
    { id: 'parcel', name: 'Parcel', icon: '📦', path: '/parcel', desc: 'Secure Logi' },
    { id: 'pay', name: 'Wallet', icon: '💳', path: '/pay', desc: 'Fintech' },
    { id: 'bank', name: 'Bank', icon: '🏦', path: '/bank', desc: 'Tezro Hub' },
    { id: 'booking', name: 'Booking', icon: '📅', path: '/booking', desc: 'Services' },
    { id: 'emergency', name: 'SOS', icon: '🚨', path: '/emergency', desc: 'Safety' }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4AF37]">
      <Sidebar />
      
      {/* Dynamic Header */}
      <div className="p-6 pt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic">TEZRO <span className="text-[#D4AF37]">APP</span></h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-[4px]">Powered by Security Shield</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            🛡️
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {mainModules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => navigate(mod.path)}
              className="relative overflow-hidden group bg-white/5 border border-white/10 p-5 rounded-[2rem] text-left hover:border-[#D4AF37]/50 transition-all duration-500"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{mod.icon}</div>
              <h3 className="font-black text-sm uppercase tracking-wider">{mod.name}</h3>
              <p className="text-[8px] text-gray-500 uppercase font-bold">{mod.desc}</p>
              <div className="absolute -right-2 -bottom-2 text-white/5 text-5xl font-black italic group-hover:text-[#D4AF37]/10 transition-colors">
                {mod.id.toUpperCase()}
              </div>
            </button>
          ))}
        </div>

        {/* Quick Access Card */}
        <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Global Command Center</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse delay-75"></div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="w-full py-4 bg-[#D4AF37] text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors"
          >
            Open Business Portal →
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
