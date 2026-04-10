import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#001f0f] text-white font-sans overflow-x-hidden pb-28">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 🟢 تصویر کے مطابق 3 حصوں والا ہیڈر */}
      <header className="flex justify-between items-center px-6 py-5 sticky top-0 bg-[#001f0f]/95 backdrop-blur-lg z-[1000] border-b border-[#d4af37]/10">
        <div className="cursor-pointer" onClick={() => setSidebarOpen(true)}>
          <div className="space-y-1 flex flex-col items-start">
            <div className="w-6 h-0.5 bg-[#d4af37]"></div>
            <div className="w-6 h-0.5 bg-[#d4af37]"></div>
            <div className="w-4 h-0.5 bg-[#d4af37]"></div>
          </div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.location.reload()}>
          <img src="/assets/logo.png" alt="Tezro" className="h-9 mb-1 shadow-lg" />
          <span className="text-[10px] font-black tracking-[0.4em] text-[#d4af37]">TEZRO</span>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-[#d4af37]/50 overflow-hidden shadow-xl cursor-pointer" onClick={() => navigate('/profile')}>
          <img src="https://via.placeholder.com/150" className="w-full h-full object-cover" alt="Profile" />
        </div>
      </header>

      {/* 💳 ورچوئل کارڈ (پہلے سے بہتر پریمیم فنش) */}
      <div className="px-6 mb-8 mt-5">
        <div className="w-full h-52 bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#8b6508] rounded-[3rem] p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between border border-white/10 transition-transform active:scale-95">
            <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-widest text-white/90">Tezro Virtual Card</span>
                <img src="/assets/logo.png" className="h-6 brightness-0 invert opacity-40" />
            </div>
            <div className="text-2xl font-mono tracking-[0.25em] text-white drop-shadow-lg">**** **** **** 4028</div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] uppercase opacity-60 mb-1">Total Available Balance</p>
                    <p className="text-3xl font-extrabold">$ 5,358.00</p>
                </div>
                <div className="flex -space-x-3.5">
                    <div className="w-11 h-11 rounded-full bg-red-600/95 shadow-xl"></div>
                    <div className="w-11 h-11 rounded-full bg-yellow-500/95 shadow-xl border border-white/20"></div>
                </div>
            </div>
        </div>
      </div>

      {/* 🗺️ میپ ویو (بغیر گرے سکیل، فل کلر) */}
      <div className="px-6 mb-8">
        <div className="h-44 rounded-[3rem] overflow-hidden border border-[#d4af37]/20 shadow-inner relative z-10">
          <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/67.0011,24.8607,13/600x400?access_token=YOUR_TOKEN" className="w-full h-full object-cover" alt="Map" />
          <div className="absolute top-4 right-4 z-[500] bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 text-xl">
             🚖
          </div>
        </div>
      </div>

      {/* 🚀 تصویر کے مطابق بڑے سروس کارڈز کا سلائیڈر */}
      <div className="px-6 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-extrabold tracking-tight">Explore Tezro Universe</h2>
        <span className="text-[11px] text-[#d4af37] font-black uppercase tracking-wider cursor-pointer hover:border-b border-[#d4af37]/30 pb-1">View All</span>
      </div>

      <div className="flex space-x-6 overflow-x-auto px-6 no-scrollbar pb-10">
        {[
          { name: 'Marketplace', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400', path: '/shop', txt: 'Integrated Services' },
          { name: 'Food Menu', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400', path: '/food', txt: 'Delicious Meals' },
          { name: 'Ride Options', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400', path: '/ride', txt: 'Fast Transit' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="min-w-[190px] h-64 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer active:scale-95 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <img src={item.img} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-5 right-5 text-center flex flex-col items-center">
                <p className="text-[9px] text-[#d4af37] font-black uppercase tracking-[0.3em] mb-1.5">{item.txt}</p>
                <p className="text-[12px] font-black uppercase tracking-tighter text-white/90">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomeScreen;
