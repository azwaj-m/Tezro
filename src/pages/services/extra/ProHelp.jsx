import React from 'react';
import { 
  Zap, Droplets, Tool, Paintbrush, 
  Wind, ShieldCheck, Trash2, Truck, 
  Scissors, Leaf, Monitor, Camera 
} from 'lucide-react';

const ProHelp = () => {
  const serviceCategories = [
    { title: 'Electrician', icon: <Zap />, cat: 'Repair' },
    { title: 'Plumbing', icon: <Droplets />, cat: 'Repair' },
    { title: 'AC Service', icon: <Wind />, cat: 'Appliances' },
    { title: 'Carpentry', icon: <Tool />, cat: 'Repair' },
    { title: 'Cleaning', icon: <Trash2 />, cat: 'Cleaning' },
    { title: 'Pest Control', icon: <ShieldCheck />, cat: 'Safety' },
    { title: 'Moving', icon: <Truck />, cat: 'Logistics' },
    { title: 'Gardening', icon: <Leaf />, cat: 'Outdoor' },
    { title: 'CCTV Setup', icon: <Camera />, cat: 'Safety' },
    { title: 'Painting', icon: <Paintbrush />, cat: 'Decor' },
  ];

  return (
    <div className="min-h-screen bg-black p-5 pb-24 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#D4AF37] tracking-tighter italic">PRO <span className="text-white">HELP</span></h1>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">Expert Services at Your Doorstep</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {serviceCategories.map((s, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-3xl flex flex-col items-center justify-center hover:border-[#D4AF37] group transition-all duration-300">
            <div className="bg-zinc-800 p-3 rounded-2xl text-[#D4AF37] group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <span className="text-sm font-bold mt-3">{s.title}</span>
            <span className="text-[9px] text-zinc-600 uppercase mt-1 tracking-tighter">{s.cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProHelp;
