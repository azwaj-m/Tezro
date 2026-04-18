import React, { useState } from 'react';
import { Briefcase, MapPin, Mic, ShieldCheck } from 'lucide-react';
 // import { findJobMatch } from '../../../utils/TezroMasterEngine';

const EmploymentScreen = () => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">JOBS</span></h1>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
           <ShieldCheck size={12} className="text-green-500" />
           <span className="text-[10px] text-green-500 font-bold uppercase">Verified Roles</span>
        </div>
      </div>

      <div className="bg-zinc-900/50 p-8 rounded-[3rem] border border-zinc-800 text-center mb-6">
        <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20">
          <Mic className={isSearching ? "text-red-500 animate-pulse" : "text-[#D4AF37]"} size={32} />
        </div>
        <h2 className="text-lg font-bold">اپنی زبان میں کام تلاش کریں</h2>
        <p className="text-zinc-500 text-xs mt-2 italic">بولیں: "مجھے ڈرائیور کی نوکری چاہیے" یا "Delivery Job"</p>
        
        <button 
          onClick={() => { setIsSearching(true); findJobMatch(); }}
          className="mt-6 bg-[#D4AF37] text-tezro-gold font-black px-8 py-3 rounded-2xl active:scale-95 transition-all text-sm uppercase"
        >
          Start Voice Search
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">قریبی مواقع (Nearby)</h3>
        {/* مثال کے طور پر ایک جاب کارڈ */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] flex justify-between items-center">
          <div>
            <h4 className="font-bold text-sm">Bike Rider - Tezro Fleet</h4>
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] mt-1">
              <MapPin size={10} /> <span>Multan, Cantt (2.5 km away)</span>
            </div>
          </div>
          <button className="bg-zinc-900/50/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold">View</button>
        </div>
      </div>
    </div>
  );
};

export default EmploymentScreen;
