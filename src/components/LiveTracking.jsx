import React from 'react';

const LiveTracking = () => {
  return (
    <div className="w-full h-full min-h-[150px] bg-[#001a0d] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" 
           style={{backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', size: '20px 20px'}}>
      </div>
      <div className="z-10 text-center">
        <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-[#d4af37] text-[10px] font-bold tracking-widest uppercase">GPS Live Tracking Active</p>
      </div>
    </div>
  );
};

export default LiveTracking;
