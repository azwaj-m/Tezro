import React, { useEffect } from 'react';
import LiveTracking from '../../components/home/LiveMap';
import { TezroMasterEngine } from '../../utils/TezroMasterEngine';
import { ShieldAlert } from 'lucide-react';

const RideBooking = () => {
  useEffect(() => {
    // سواری شروع ہوتے ہی گارڈین مانیٹرنگ شروع کر دیں
    startGuardianMonitor("Multan Clock Tower", ["03001234567"]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black italic text-[#D4AF37]">SAFE <span className="text-white">RIDE</span></h1>
        <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full border border-red-500/20">
           <ShieldAlert size={14} className="animate-pulse" />
           <span className="text-[10px] font-bold">Guardian AI Active</span>
        </div>
      </div>

      <LiveTracking />

      <div className="mt-8 bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800">
        <h3 className="text-sm font-bold mb-2">Security Note:</h3>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          آپ کی سواری Tezro Guardian AI کے زیر اثر ہے۔ کسی بھی ناخوشگوار آواز یا بحث کی صورت میں سسٹم خود بخود آپ کی لوکیشن قریبی تھانے اور ایمرجنسی نمبرز پر بھیج دے گا۔
        </p>
      </div>
    </div>
  );
};

export default RideBooking;
