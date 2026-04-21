import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Video, MapPin, Activity, Heart, ChevronRight, Search } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dr. Sarah Ahmed', specialty: 'General Physician', img: '/assets/Doctor.jpg', status: 'Online' },
  { id: 2, name: 'Dr. Faisal Khan', specialty: 'Cardiologist', img: '/assets/Doctor.jpg', status: 'In Clinic' }
];

const HealthScreen = () => {
  const [sosActive, setSosActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-28">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black italic text-red-500">TEZRO <span className="text-white">HEALTH</span></h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">24/7 Medical Response</p>
        </div>
        <div className="h-10 w-10 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500">
          <Activity size={20} className="animate-pulse" />
        </div>
      </div>

      {/* Emergency SOS Section */}
      <div 
        onClick={() => setSosActive(!sosActive)}
        className={`p-8 rounded-[3rem] border-2 transition-all duration-500 mb-8 text-center cursor-pointer ${
          sosActive ? 'bg-red-600 border-white shadow-[0_0_50px_rgba(220,38,38,0.5)]' : 'bg-red-500/5 border-red-500/20'
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${sosActive ? 'bg-white text-red-600' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}>
          <ShieldAlert size={32} />
        </div>
        <h2 className={`text-xl font-black italic uppercase ${sosActive ? 'text-white' : 'text-red-500'}`}>
          {sosActive ? 'Calling Ambulance...' : 'Emergency SOS'}
        </h2>
        <p className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${sosActive ? 'text-white/80' : 'text-zinc-500'}`}>
          {sosActive ? 'Sharing live vitals with rescue 1122' : 'One-tap emergency assistance'}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-[2.5rem] flex flex-col items-center text-center group active:border-blue-500/40">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Video size={20} />
          </div>
          <span className="text-[10px] font-black uppercase">Video Consult</span>
        </div>
        <div className="bg-zinc-900/50 border border-white/5 p-5 rounded-[2.5rem] flex flex-col items-center text-center group active:border-[#FFD700]/40">
          <div className="w-12 h-12 bg-[#FFD700]/10 text-[#FFD700] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <PhoneCall size={20} />
          </div>
          <span className="text-[10px] font-black uppercase">Doctor On-Call</span>
        </div>
      </div>

      {/* Nearby Doctors */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Verified Doctors Nearby</h3>
          <Search size={14} className="text-zinc-500" />
        </div>

        {doctors.map(doc => (
          <div key={doc.id} className="bg-zinc-900/60 border border-white/5 p-4 rounded-[2.5rem] flex items-center gap-4 group hover:border-[#FFD700]/30 transition-all">
            <div className="relative w-16 h-16 shrink-0">
              <img src={doc.img} alt={doc.name} className="w-full h-full object-cover rounded-[1.5rem] grayscale group-hover:grayscale-0" />
              <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-sm text-white">{doc.name}</h4>
              <p className="text-[9px] text-zinc-500 font-bold uppercase">{doc.specialty}</p>
              <div className="flex items-center gap-2 mt-2">
                 <Heart size={10} className="text-red-500 fill-red-500" />
                 <span className="text-[8px] font-black text-white/50 uppercase">98% Success Rate</span>
              </div>
            </div>
            <ChevronRight className="text-zinc-800 group-hover:text-[#FFD700]" size={18} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthScreen;
