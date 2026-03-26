import React from 'react';

const LiveTracking = () => {
  return (
    <div className="w-full h-full bg-[#000d06] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#d4af37] text-[10px] mt-4 font-bold tracking-widest uppercase">Initializing Radar...</p>
    </div>
  );
};

export default LiveTracking;
