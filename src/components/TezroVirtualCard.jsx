
import React from 'react';

import { Zap } from 'lucide-react';



const TezroVirtualCard = () => {

  return (

    <div className="relative w-full h-52 overflow-hidden rounded-[2rem] border border-[#FFD700]/40 shadow-[0_0_20px_rgba(255,215,0,0.2)]"

         style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}>

      

      {/* کارڈ کی چمک (Animated Glow) */}

      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/5 via-transparent to-transparent pointer-events-none"></div>

      

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">

        <div className="flex justify-between items-start">

          <div>

            <p className="text-[#FFD700] text-[10px] font-black tracking-[4px] uppercase opacity-60">Tezro Premium</p>

            <h2 className="text-[#FFD700] text-xl font-black italic tracking-tighter drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">MASTER ASSET</h2>

          </div>

          <Zap className="text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_10px_#FFD700]" size={28} />

        </div>



        <div className="space-y-1">

          <p className="text-white text-2xl font-mono tracking-[4px] drop-shadow-lg">1234 5678 9876 4038</p>

        </div>



        <div className="flex justify-between items-end">

          <div>

            <p className="text-[#FFD700]/40 text-[8px] uppercase font-bold">Card Holder</p>

            <p className="text-white text-sm font-bold tracking-widest uppercase">TEZRO USER</p>

          </div>

          <div className="text-right">

            <p className="text-[#FFD700]/40 text-[8px] uppercase font-bold">Expiry</p>

            <p className="text-white text-sm font-bold font-mono">12/28</p>

          </div>

        </div>

      </div>



      {/* شائن ایفیکٹ (CSS Animation کے ساتھ) */}

      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] animate-[shine_5s_infinite]"></div>

    </div>

  );

};



export default TezroVirtualCard;



