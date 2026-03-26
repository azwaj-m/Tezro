import React from 'react';
const WalletDashboard = () => (
  <div className="luxury-card rounded-[2.5rem] p-7 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] font-bold text-[#d4af37]/60 uppercase tracking-widest mb-1">Total Balance</p>
          <h2 className="text-4xl font-black text-white tracking-tighter">PKR 3,335.00</h2>
        </div>
        <div className="bg-[#d4af37] text-[#002d15] p-2 rounded-xl font-black text-xs">VISA</div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 btn-gold py-3 rounded-2xl text-xs uppercase tracking-tighter active:scale-95 transition-all">Add Money</button>
        <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-2xl text-xs font-bold uppercase tracking-tighter hover:bg-white/10 transition-all">Send</button>
      </div>
    </div>
  </div>
);
export default WalletDashboard;
