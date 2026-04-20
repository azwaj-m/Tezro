import React from 'react';
import { ShieldCheck, Download, Share2 } from 'lucide-react';

const TezroReceipt = ({ data }) => {
  return (
    <div className="max-w-sm mx-auto bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl mt-4">
      <div className="bg-[#D4AF37] p-6 text-tezro-gold text-center">
        <div className="flex justify-center mb-2"><ShieldCheck size={40} /></div>
        <h2 className="text-xl font-black uppercase italic">Tezro Official</h2>
        <p className="text-[10px] font-bold opacity-70">Verified Transaction</p>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between border-b border-zinc-800 pb-2 text-[10px]">
          <span className="text-zinc-500 uppercase font-bold">Transaction ID</span>
          <span className="text-white font-mono">{data?.txnId || "N/A"}</span>
        </div>
        <div className="border-t-2 border-dashed border-zinc-800 pt-4 flex justify-between items-center">
          <span className="text-[#D4AF37] font-black text-lg">TOTAL</span>
          <span className="text-white font-black text-lg text-right">{data?.amount || "0"}</span>
        </div>
      </div>
      <div className="px-8 pb-8 flex gap-2">
        <button className="flex-1 bg-zinc-800 text-white p-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2">
          <Download size={14} /> SAVE
        </button>
        <button className="flex-1 bg-zinc-800 text-white p-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2">
          <Share2 size={14} /> SHARE
        </button>
      </div>
    </div>
  );
};

export default TezroReceipt;
