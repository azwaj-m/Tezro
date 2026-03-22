import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../neon.css'; // وہ نئ اسٹائل شیٹ امپورٹ کریں

// اگر آپ کے پاس TEZRO کا لوگو اور سروسز کی تصاویر ہیں تو انہیں یہاں امپورٹ کریں
// import logoUrl from '../assets/logo.png';
// import carUrl from '../assets/car.png';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000308] text-white pb-24 font-sans overflow-x-hidden">
      
      {/* 1. TOP HEADER (Logo, Menu, Bell) */}
      <header className="p-5 pt-10 flex justify-between items-center">
        <button className="text-white/70">☰</button>
        {/* لوگو کی جگہ (اگر تصویر ہے تو <img> ٹیگ استعمال کریں) */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-[#10B981] rounded-full flex items-center justify-center text-[#10B981] font-bold text-2xl shadow-[0_0_15px_#10B981]">
            T
          </div>
          <span className="text-[9px] font-black uppercase tracking-[3px] mt-1 text-white/50">Tezro</span>
        </div>
        <button className="relative">
          <span className="text-xl">🔔</span>
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </header>

      {/* 2. MAP AREA (Glassmorphism over Dark Map) */}
      <div className="px-5 mb-5">
        <div className="tezro-card h-[200px] overflow-hidden relative group">
          {/* میپ کا بیک گراؤنڈ (Leaflet کے بغیر عارضی تصویر) */}
          <div className="absolute inset-0 bg-[#0a0f18] group-hover:scale-105 transition-transform duration-1000">
            {/* اگر Leaflet Map کام کر رہا ہے تو اسے یہاں رکھیں */}
          </div>
          
          {/* Neon Location Marker */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_20px_10px_rgba(16,185,129,0.4)] animate-pulse"></div>
          </div>
          
          {/* Map Overlay Buttons (Where to? / Ride Now) */}
          <div className="absolute bottom-4 inset-x-4 flex gap-2">
             <div className="flex-1 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/5 text-xs text-white/70 flex items-center gap-2">
               <span>📍 Where to?</span>
             </div>
             <button className="bg-[#10B981] text-black px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 transition-all">
               Ride Now &gt;
             </div>
          </div>
        </div>
      </div>

      {/* 3. QUICK LINKS (Set Pickup, Wallet, Promotions) */}
      <div className="px-5 mb-8 grid grid-cols-3 gap-3">
         {['Set Pickup', 'Wallet', 'Promotions'].map((link, idx) => (
           <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-xl text-center text-white/70 text-[10px] active:scale-95 transition-all">
             {link}
           </div>
         ))}
      </div>

      {/* 4. MAIN NEON SERVICE BUTTONS (The Big 4) */}
      <div className="px-5 mb-10 grid grid-cols-2 gap-5">
         
         {/* Ride Button (Green Glow) */}
         <button className="neon-btn btn-green p-6 h-40 rounded-[30px] flex flex-col justify-end" onClick={() => navigate('/ride')}>
            {/* تصویر کی جگہ (<img>) */}
            <div className="text-4xl mb-4 text-[#10B981]">🚗</div>
            <span className="font-black text-white text-lg tracking-tighter">Ride</span>
         </button>

         {/* Food Button (Orange Glow) */}
         <button className="neon-btn btn-orange p-6 h-40 rounded-[30px] flex flex-col justify-end" onClick={() => navigate('/food')}>
            <div className="text-4xl mb-4 text-[#F97316]">🍔</div>
            <span className="font-black text-white text-lg tracking-tighter">Food</span>
         </button>

         {/* Shop Button (Blue Glow) */}
         <button className="neon-btn btn-blue p-6 h-40 rounded-[30px] flex flex-col justify-end" onClick={() => navigate('/shop')}>
            <div className="text-4xl mb-4 text-[#0EA5E9]">🛒</div>
            <span className="font-black text-white text-lg tracking-tighter">Shop</span>
         </button>

         {/* Parcel Button (Green Glow) */}
         <button className="neon-btn btn-green p-6 h-40 rounded-[30px] flex flex-col justify-end" onClick={() => navigate('/parcel')}>
            <div className="text-4xl mb-4 text-[#10B981]">📦</div>
            <span className="font-black text-white text-lg tracking-tighter">Parcel</span>
         </button>
      </div>

      {/* 5. BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-xl border-t border-white/5 h-20 flex justify-around items-center px-6 z-[2000]">
         <div className="text-[#10B981] flex flex-col items-center gap-1 font-bold text-[10px]">
           <span>🏠</span> Home
         </div>
         <div className="text-white/50 flex flex-col items-center gap-1 text-[10px]">
           <span>🚗</span> Ride
         </div>
         <div className="text-white/50 flex flex-col items-center gap-1 text-[10px]">
           <span>📋</span> Orders
         </div>
         <div className="text-white/50 flex flex-col items-center gap-1 text-[10px]">
           <span>👤</span> Profile
         </div>
      </nav>

    </div>
  );
};

export default HomeScreen;
