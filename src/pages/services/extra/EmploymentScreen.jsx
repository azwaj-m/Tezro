import React, { useState } from 'react';
import { Briefcase, MapPin, Mic, ShieldCheck, Search, Star } from 'lucide-react';

const jobs = [
  { id: 1, title: 'Bike Rider', company: 'Tezro Fleet', location: 'Multan, Cantt', pay: 'Rs. 35k-45k', type: 'Full Time' },
  { id: 2, title: 'Home Maintenance', company: 'ProHelp', location: 'Gulgasht', pay: 'Commission Based', type: 'Gig' }
];

const EmploymentScreen = () => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black italic text-[#FFD700]">TEZRO <span className="text-white">JOBS</span></h1>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
           <ShieldCheck size={12} className="text-green-500" />
           <span className="text-[10px] text-green-500 font-bold uppercase">Verified Roles</span>
        </div>
      </div>

      <div className="bg-zinc-900/40 p-8 rounded-[3rem] border border-white/5 text-center mb-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 transition-all ${isSearching ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "border-[#FFD700]/20 bg-[#FFD700]/10"}`}>
          <Mic className={isSearching ? "text-red-500 animate-pulse" : "text-[#FFD700]"} size={32} />
        </div>
        <h2 className="text-lg font-black uppercase italic italic text-white">Voice Search</h2>
        <p className="text-zinc-500 text-[10px] mt-2 font-bold uppercase tracking-widest leading-relaxed">
          اپنی زبان میں بولیں: <br/> "مجھے پلمبنگ کا کام چاہیے"
        </p>

        <button
          onMouseDown={() => setIsSearching(true)}
          onMouseUp={() => setIsSearching(false)}
          className="mt-6 w-full bg-[#FFD700] text-black font-black py-4 rounded-2xl active:scale-95 transition-all text-xs uppercase shadow-lg shadow-[#FFD700]/10"
        >
          Hold to Speak
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Live Opportunities</h3>
          <Search size={14} className="text-zinc-500" />
        </div>
        
        {jobs.map(job => (
          <div key={job.id} className="bg-zinc-900/60 border border-white/5 p-5 rounded-[2.5rem] flex justify-between items-center group active:border-[#FFD700]/40 transition-colors">
            <div>
              <h4 className="font-black text-sm text-white group-hover:text-[#FFD700] transition-colors">{job.title}</h4>
              <div className="flex items-center gap-2 text-zinc-500 text-[9px] font-bold uppercase mt-1">
                <MapPin size={10} className="text-[#FFD700]" /> <span>{job.location}</span>
                <span className="text-white/20">|</span>
                <span>{job.type}</span>
              </div>
              <p className="text-[#FFD700] text-[10px] font-black mt-2 italic">{job.pay}</p>
            </div>
            <button className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-[9px] font-black uppercase hover:bg-[#FFD700] hover:text-black transition-all">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmploymentScreen;
