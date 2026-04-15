import React from 'react';
import { Zap, Droplets, Wrench, Paintbrush, ShieldCheck } from 'lucide-react';

const ProHelp = () => {
  const categories = [
    { id: 1, title: 'Electrician', icon: <Zap className="text-yellow-500" />, desc: 'Power fixes' },
    { id: 2, title: 'Plumber', icon: <Droplets className="text-blue-500" />, desc: 'Pipes & Leaks' },
    { id: 3, title: 'Mechanic', icon: <Wrench className="text-zinc-400" />, desc: 'Vehicle help' },
    { id: 4, title: 'Painter', icon: <Paintbrush className="text-pink-500" />, desc: 'Home decor' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <h1 className="text-2xl font-black italic text-[#D4AF37] mb-8 text-left uppercase">Pro Help</h1>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-[2rem] flex items-center gap-4">
            <div className="p-3 bg-black rounded-xl">{cat.icon}</div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-sm">{cat.title}</h3>
              <p className="text-[10px] text-zinc-500">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProHelp;
