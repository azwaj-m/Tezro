import React from 'react';
import { Check, X, MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000d08] p-6 pt-32">
      <h2 className="text-[#FFD700] text-2xl font-black italic mb-6">درخواستیں (Requests)</h2>
      
      {/* رائیڈ کارڈ */}
      <div className="bg-[#FFD700]/5 border-2 border-[#FFD700]/30 rounded-[2.5rem] p-6 space-y-4 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] text-green-500 font-black uppercase">New Ride Found</span>
          </div>
          <span className="text-[#FFD700] font-black text-lg">Rs. 850</span>
        </div>

        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-[#FFD700] shrink-0" />
          <p className="text-xs text-white/80 font-bold">گلبرگ تھری، لاہور - 1.2km دور</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Check size={16} /> قبول کریں
          </button>
          <button className="flex-1 bg-red-600/10 text-red-500 py-4 rounded-2xl font-black text-xs uppercase border border-red-600/20 active:scale-95 transition-all">
            <X size={16} /> رد کریں
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
