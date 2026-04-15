import React from 'react';
import { 
  Zap, Droplets, Wrench, Paintbrush, 
  Wind, ShieldCheck, Trash2, Truck, 
  Scissors, Leaf, Monitor, Camera, MapPin, Star
} from 'lucide-react';

const ProHelp = () => {
  const categories = [
    { id: 1, title: 'Electrician', icon: <Zap className="text-yellow-500" />, desc: 'Power fixes & wiring' },
    { id: 2, title: 'Plumber', icon: <Droplets className="text-blue-500" />, desc: 'Leakage & pipes' },
    { id: 3, title: 'Mechanic', icon: <Wrench className="text-zinc-400" />, desc: 'Vehicle & machines' },
    { id: 4, title: 'Painter', icon: <Paintbrush className="text-pink-500" />, desc: 'Wall & home decor' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">PRO <span className="text-white">HELP</span></h1>
        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">On-Demand Experts</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-[2.5rem] flex items-center gap-5 hover:border-[#D4AF37]/30 transition-all group">
            <div className="p-4 bg-zinc-900 rounded-2xl group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{cat.title}</h3>
              <p className="text-[10px] text-zinc-500 mt-1">{cat.desc}</p>
            </div>
            <button className="bg-white/5 p-3 rounded-xl text-[10px] font-bold">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProHelp;
