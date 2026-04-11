
import React from 'react';

import { CreditCard, Zap, ShieldCheck } from 'lucide-react';



const TezroVirtualCard = () => {

  return (

    <div className="relative w-full h-52 golden-card p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)]">

      {/* Background Decorative Elements */}

      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl"></div>

      

      <div className="flex justify-between items-start z-10">

        <div className="flex flex-col">

          <span className="text-[10px] uppercase tracking-[3px] text-[#FFD700]/60 font-bold">Tezro Premium</span>

          <h2 className="text-lg font-black italic text-[#FFD700] tracking-tighter">MASTER ASSET</h2>

        </div>

        <Zap className="text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_8px_#FFD700]" size={24} />

      </div>



      <div className="z-10">

        <p className="text-2xl font-mono tracking-[4px] text-white drop-shadow-md">

          1234 5678 9876 4038

        </p>

      </div>



      <div className="flex justify-between items-end z-10">

        <div>

          <p className="text-[8px] uppercase text-[#FFD700]/50 font-bold">Card Holder</p>

          <p className="text-sm font-bold text-white uppercase tracking-widest">Tezro User</p>

        </div>

        <div className="text-right">

          <p className="text-[8px] uppercase text-[#FFD700]/50 font-bold">Expiry</p>

          <p className="text-sm font-bold text-white font-mono">12/28</p>

        </div>

        {/* Contactless Icon */}

        <div className="flex gap-1 opacity-50">

           <div className="w-[1px] h-4 bg-[#FFD700]"></div>

           <div className="w-[1px] h-4 bg-[#FFD700]"></div>

           <div className="w-[1px] h-4 bg-[#FFD700]"></div>

        </div>

      </div>

    </div>

  );

};



export default TezroVirtualCard;

