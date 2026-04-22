import React from 'react';
import { Bell, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

const NotificationScreen = () => {
  const notifications = [
    { id: 1, type: 'security', title: 'Security Shield Active', time: '2m ago', icon: <ShieldCheck className="text-[#D4AF37]" /> },
    { id: 2, type: 'finance', title: 'Payment Confirmed', time: '1h ago', icon: <CheckCircle2 className="text-green-500" /> },
    { id: 3, type: 'fleet', title: 'Driver assigned to your parcel', time: '3h ago', icon: <Clock className="text-zinc-500" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">ALERTS <span className="text-white">CENTER</span></h1>
        <Bell className="text-zinc-500" size={20} />
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-[2rem] flex items-start gap-4 hover:border-[#D4AF37]/30 transition-all">
            <div className="p-3 bg-zinc-900 rounded-2xl">{n.icon}</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">{n.title}</h3>
              <p className="text-[10px] text-zinc-500 uppercase mt-1 tracking-widest">{n.time}</p>
            </div>
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-[2.5rem] text-center">
        <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest">Quantum Encryption Enabled</p>
      </div>
    </div>
  );
};

export default NotificationScreen;
