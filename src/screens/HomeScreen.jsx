import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileRecharge from '../components/MobileRecharge';
import TransactionsList from '../components/TransactionsList';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">
      {/* Top Header Space */}
      <div className="h-20"></div>

      <div className="p-5">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-white">Welcome, Chief</h1>
            <p className="text-[#39FF14] text-[10px] font-bold tracking-widest uppercase">● System Online</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#111]"></div>
        </div>

        {/* Golden Balance Card */}
        <div className="bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#8B6508] p-6 rounded-[30px] shadow-2xl mb-8 text-black">
          <p className="text-[10px] font-black uppercase opacity-70 mb-1">Total Vault Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold">Rs.</span>
            <h2 className="text-3xl font-black tracking-tight">1,250,500</h2>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="bg-black/20 px-4 py-2 rounded-full text-[10px] font-bold backdrop-blur-sm">Send Money</button>
            <button className="bg-black/20 px-4 py-2 rounded-full text-[10px] font-bold backdrop-blur-sm">Add Funds</button>
          </div>
        </div>

        {/* Quick Services Grid */}
        <div className="grid grid-cols-4 gap-3 mb-8">
           {[
             {n: 'Ride', i: '🚗'}, {n: 'Food', i: '🍔'}, 
             {n: 'Pay', i: '💳'}, {n: 'More', i: '⚡'}
           ].map((s, idx) => (
             <div key={idx} className="bg-[#111] p-4 rounded-2xl border border-white/5 flex flex-col items-center">
               <span className="text-xl mb-1">{s.i}</span>
               <span className="text-[9px] font-bold uppercase opacity-60">{s.n}</span>
             </div>
           ))}
        </div>

        {/* Recharge Module Container */}
        <div className="bg-[#111] rounded-[30px] p-6 border border-white/5 mb-8">
           <h3 className="text-[#D4AF37] text-xs font-black uppercase mb-4 tracking-widest">Tezro Quick Recharge</h3>
           <MobileRecharge />
        </div>

        {/* Recent Activity */}
        <div className="bg-[#111] rounded-[30px] p-2 border border-white/5">
           <h3 className="text-gray-500 text-[10px] font-black uppercase p-4 tracking-widest">Recent Activity</h3>
           <TransactionsList />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
