import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Cpu } from 'lucide-react';

const TezroVirtualCard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* کارڈ پر کلک کرنے سے ٹرانزیکشن اسکرین کھلے گی */}
      <div 
        onClick={() => navigate('/transactions')}
        className="relative h-56 w-full rounded-[2.8rem] p-8 overflow-hidden border-2 border-[#FFD700]/40 shadow-[0_0_50px_rgba(255,215,0,0.2)] bg-[#121212] cursor-pointer active:scale-[0.98] transition-all"
      >
        <div className="absolute inset-0 islamic-pattern pointer-events-none"></div>
        <div className="relative z-10 flex justify-between">
          <span className="shiny-gold font-black italic text-sm tracking-[4px]">TEZRO ISLAMIC</span>
          <Cpu size={32} className="text-[#FFD700] opacity-60" />
        </div>
        <div className="relative z-10 mt-12">
          <p className="text-2xl font-mono tracking-[5px] text-white/90">4038 9921 0084 5562</p>
          <div className="flex justify-between items-end mt-8">
            <p className="text-xs font-bold text-[#FFD700]">SYED TEZRO</p>
            <ShieldCheck size={28} className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TezroVirtualCard;
