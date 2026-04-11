import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import TezroVirtualCard from '../components/TezroVirtualCard';
import LiveMap from '../components/home/LiveMap';
import ExploreUniverse from '../components/home/ExploreUniverse';
import SecurityStatus from '../components/home/SecurityStatus';

const HomeScreen = () => {
  return (
    <div className="pt-40 px-4 space-y-4">
      <TezroVirtualCard />
      <SecurityStatus />
      <div className="gold-border rounded-[2.5rem] overflow-hidden h-64 shadow-2xl relative">
        <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[8px] text-[#FFD700] font-black uppercase tracking-widest">Live Security Feed</span>
        </div>
        <LiveMap />
      </div>
      <ExploreUniverse />
    </div>
  );
};
export default HomeScreen;
