
import React from 'react';

import { X, Download, ShieldCheck } from 'lucide-react';



const TezroReceiptModal = ({ isOpen, onClose, data }) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden">

        <div className="bg-[#D4AF37] p-6 text-black text-center relative">

          <button onClick={onClose} className="absolute right-4 top-4"><X size={20} /></button>

          <ShieldCheck size={40} className="mx-auto mb-2" />

          <h2 className="font-black uppercase italic">Tezro Vault</h2>

        </div>

        <div className="p-8 text-center">

          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Stored Receipt</p>

          <h3 className="text-2xl font-black text-white mb-6">₨ {data?.amount || '0.00'}</h3>

          <div className="space-y-4 border-t border-zinc-800 pt-4">

            <button className="w-full py-4 bg-zinc-800 rounded-2xl font-bold flex items-center justify-center gap-2 text-white">

              <Download size={18} /> DOWNLOAD

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};



export default TezroReceiptModal;

