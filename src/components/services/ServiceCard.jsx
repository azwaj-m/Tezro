import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ChevronRight } from 'lucide-react';

const ServiceCard = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/ride')} 
      className="p-5 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] flex items-center justify-between group active:scale-95 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#FFD700]/10 rounded-2xl flex items-center justify-center text-[#FFD700]">
          <Car size={24} />
        </div>
        <div>
          <h3 className="font-black italic text-sm text-white uppercase">{title}</h3>
          <p className="text-[8px] text-zinc-500 uppercase font-bold">Secure Transport</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-zinc-700 group-hover:text-[#FFD700]" />
    </div>
  );
};

export default ServiceCard;
