import React from 'react';

const TezroVirtualCard = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#8b6508] p-5 rounded-2xl shadow-2xl h-44 border border-white/20">
      {/* Decorative Circles */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[#002d15] font-black text-xl italic tracking-tighter">Tezro</h3>
          <p className="text-[#002d15]/60 text-[10px] uppercase font-bold">Virtual Card</p>
        </div>
        <div className="w-10 h-8 bg-[#002d15]/10 rounded-md backdrop-blur-md flex items-center justify-center border border-white/10">
           <span className="text-xs">💳</span>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-[#002d15] font-mono text-lg tracking-[0.2em] shadow-sm">
          1234 5678 9876 4038
        </p>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div className="text-[#002d15]/80 text-[10px]">
          <p className="font-bold">VALID THRU</p>
          <p className="font-mono">12/28</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-red-600 rounded-full opacity-80"></div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full -ml-3 opacity-80"></div>
        </div>
      </div>
    </div>
  );
};

export default TezroVirtualCard;
