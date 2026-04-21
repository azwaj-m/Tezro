import React from 'react';
import { ShieldCheck, Download, Share2, Link } from 'lucide-react';

const TezroReceipt = ({ data }) => {
  return (
    <div className="max-w-sm mx-auto bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="bg-[#D4AF37] p-8 text-black text-center relative">
        <div className="absolute top-2 right-4 opacity-20"><ShieldCheck size={60} /></div>
        <h2 className="text-2xl font-black uppercase italic italic leading-none">Tezro Ledger</h2>
        <p className="text-[8px] font-black uppercase tracking-[0.2em] mt-2">Verified Blockchain Node</p>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-zinc-500 font-black uppercase">Status</span>
          <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[8px] font-black uppercase animate-pulse">
            {data?.status || 'Escrow_Hold'}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Transaction Hash</p>
          <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
            <Link size={12} className="text-[#D4AF37]" />
            <span className="text-[8px] font-mono text-zinc-400 break-all leading-tight">
              {data?.hash || '0x71c9...8e42'}
            </span>
          </div>
        </div>

        <div className="border-t border-dashed border-zinc-800 pt-6 flex justify-between items-end">
          <div>
            <p className="text-[8px] text-zinc-500 font-black uppercase">Final Amount</p>
            <h3 className="text-2xl font-black text-white italic">Rs. {data?.amount || '2,500'}</h3>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-zinc-500 font-black uppercase">Node Fee</p>
            <p className="text-[10px] font-black text-[#D4AF37]">Included</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button className="flex-1 bg-white/5 hover:bg-white/10 p-4 rounded-2xl text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all">
            <Download size={14} /> Download
          </button>
          <button className="flex-1 bg-[#D4AF37] text-black p-4 rounded-2xl text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#D4AF37]/10">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default TezroReceipt;
