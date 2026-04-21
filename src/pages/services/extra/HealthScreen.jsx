import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, Video, Activity, Heart, ChevronRight, Search } from 'lucide-react';
import { TezroMasterEngine } from '../../../utils/TezroMasterEngine';

const doctors = [
  { id: 'dr1', name: 'Dr. Sarah Ahmed', specialty: 'General Physician', img: '/assets/Doctor.jpg' },
  { id: 'dr2', name: 'Dr. Faisal Khan', specialty: 'Cardiologist', img: '/assets/Doctor.jpg' }
];

const HealthScreen = () => {
  const [sosActive, setSosActive] = useState(false);

  const handleSOS = async () => {
    setSosActive(true);
    await TezroMasterEngine.triggerEmergency("Multan Sector A");
    setTimeout(() => {
        alert("Rescue 1122 کو آپ کی لوکیشن بھیج دی گئی ہے۔");
        setSosActive(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-28">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black italic text-red-500">TEZRO <span className="text-white">HEALTH</span></h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Quantum Secure Response</p>
        </div>
        <div className="h-10 w-10 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500">
          <Activity size={20} className={sosActive ? "animate-ping" : "animate-pulse"} />
        </div>
      </div>

      <div
        onClick={handleSOS}
        className={`p-8 rounded-[3.5rem] border-2 transition-all duration-700 mb-8 text-center cursor-pointer relative overflow-hidden ${
          sosActive ? 'bg-red-600 border-white shadow-[0_0_80px_rgba(220,38,38,0.6)] scale-95' : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform ${sosActive ? 'scale-125 bg-white text-red-600' : 'bg-red-500 text-white'}`}>
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-xl font-black italic uppercase tracking-tighter">
          {sosActive ? 'Emergency Active' : 'Emergency SOS'}
        </h2>
        <p className="text-[9px] mt-2 font-bold uppercase opacity-60">
          {sosActive ? 'Broadcasting live location...' : 'Tap for immediate rescue'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[ {icon: <Video/>, label: 'Video Consult'}, {icon: <PhoneCall/>, label: 'Doctor Call'} ].map((act, i) => (
          <div key={i} className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] flex flex-col items-center group active:scale-95 transition-all">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-3 group-hover:text-red-500 transition-colors">
              {act.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{act.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Verified Medical Nodes</h3>
        {doctors.map(doc => (
          <div key={doc.id} className="bg-zinc-900/60 border border-white/5 p-4 rounded-[3rem] flex items-center gap-4 group transition-all active:border-red-500/30">
            <img src={doc.img} alt={doc.name} className="w-14 h-14 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all" />
            <div className="flex-1">
              <h4 className="font-black text-sm">{doc.name}</h4>
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-tighter">{doc.specialty}</p>
            </div>
            <div className="bg-green-500/10 p-2 rounded-full border border-green-500/20">
               <Heart size={14} className="text-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthScreen;
