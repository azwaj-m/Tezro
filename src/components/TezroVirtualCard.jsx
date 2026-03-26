import React from 'react';
const TezroVirtualCard = () => (
  <div className="gold-card rounded-[1.5rem] p-5 text-[#002d15] relative overflow-hidden h-44 shadow-2xl mb-4">
    <div className="flex justify-between items-start">
      <span className="font-black italic text-xl">Tezro</span>
      <span className="text-2xl">⚡</span>
    </div>
    <div className="mt-6 text-xl tracking-[0.2em] font-mono font-bold">1234 5678 9876 4038</div>
    <div className="mt-4 flex justify-between items-end">
      <div>
        <p className="text-[8px] uppercase font-bold opacity-70">Card Holder</p>
        <p className="text-sm font-bold">Tezro User</p>
      </div>
      <div className="text-right">
        <p className="text-[8px] uppercase font-bold opacity-70">Expires</p>
        <p className="text-sm font-bold">12/28</p>
      </div>
    </div>
  </div>
);
export default TezroVirtualCard;
