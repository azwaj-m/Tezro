import React from 'react';
import { Tool, Zap, Droplets, Paintbrush } from 'lucide-react';

const ProHelp = () => {
  const pros = [
    { title: 'Electrician', icon: <Zap /> },
    { title: 'Plumbing', icon: <Droplets /> },
    { title: 'Carpentry', icon: <Tool /> },
    { title: 'Painting', icon: <Paintbrush /> }
  ];

  return (
    <div className="min-h-screen bg-black p-6 pb-24 text-white">
      <h1 className="text-2xl font-bold text-[#D4AF37] mb-6 tracking-tighter uppercase">Home Services</h1>
      <div className="grid grid-cols-2 gap-4">
        {pros.map((p, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col items-center text-center hover:border-[#D4AF37] transition-all">
            <div className="text-[#D4AF37] mb-3">{p.icon}</div>
            <span className="text-xs font-bold">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProHelp;
