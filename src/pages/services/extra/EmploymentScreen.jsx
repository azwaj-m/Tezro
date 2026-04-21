import React from 'react';
import { Briefcase, MapPin, DollarSign, Zap } from 'lucide-react';

const jobs = [
  { id: 1, title: 'AI System Auditor', company: 'Tezro Corp', location: 'Remote', salary: 'Rs. 150k - 200k' },
  { id: 2, title: 'Fleet Manager', company: 'Logistics Pro', location: 'Multan', salary: 'Rs. 80k - 100k' },
  { id: 3, title: 'Security Consultant', company: 'Guardian Safe', location: 'Lahore', salary: 'Rs. 120k - 160k' }
];

const EmploymentScreen = () => {
  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28 pb-32">
      <h1 className="text-2xl font-black italic text-[#D4AF37] mb-2">TEZRO <span className="text-white">JOBS</span></h1>
      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-8">Future of Work</p>

      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-zinc-900/50 border border-white/5 p-6 rounded-[2.5rem] active:border-[#D4AF37] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-black text-sm uppercase mb-1">{job.title}</h3>
                <p className="text-[10px] text-[#D4AF37] font-bold">{job.company}</p>
              </div>
              <Zap size={16} className="text-[#D4AF37]" />
            </div>
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-1 text-zinc-500 text-[10px]">
                <MapPin size={12} /> {job.location}
              </div>
              <div className="flex items-center gap-1 text-zinc-500 text-[10px]">
                <DollarSign size={12} /> {job.salary}
              </div>
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-[#D4AF37] hover:text-black rounded-2xl text-[10px] font-black uppercase transition-all">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmploymentScreen;
