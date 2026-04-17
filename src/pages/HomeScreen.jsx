import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Mic, Map as MapIcon, Home, User, CreditCard, History, PlusCircle, Car, Utensils, Zap, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // تمام سروسز کے کارڈز - آپ کی پراجیکٹ فائلوں اور اثاثوں سے لنکڈ
  const [services, setServices] = useState([
    { id: 1, title: 'Ride Master', img: '/assets/V-vip.JPG', path: '/ride', desc: 'Book Luxury Transport' },
    { id: 2, title: 'Food Delivery', img: '/assets/Food.jpg', path: '/food', desc: 'Elite Cuisines to Your Door' },
    { id: 3, title: 'Health Care', img: '/assets/Doctor.jpg', path: '/health', desc: 'Consult Expert Doctors' },
    { id: 4, title: 'Pro Help', img: '/assets/Mechanic.jpg', path: '/pro-help', desc: 'Professional Home Services' },
    { id: 5, title: 'Tezro Mall', img: '/assets/Mart.jpg', path: '/mall', desc: 'Premium Shopping Experience' },
  ]);

  const handleSwipe = () => {
    setServices((prev) => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white">
      
      {/* شاہانہ ہیڈر */}
      <header className="fixed top-0 w-full z-[1000] px-6 py-5 royal-gold-shiny rounded-b-[40px] flex justify-between items-center shadow-2xl">
        <button onClick={() => setIsSidebarOpen(true)}><Menu size={30} className="text-[#4b3c00]" /></button>
        <img src="/assets/logo.png" className="h-12 w-12 object-contain" alt="Logo" />
        <Bell size={30} className="text-[#4b3c00]" />
      </header>

      <main className="pt-28 px-5 pb-32">
        
        {/* سرچ انجن */}
        <div className="flex items-center bg-white/10 border-2 border-gold/30 rounded-full px-4 py-1 mb-6 backdrop-blur-md">
          <Search className="text-gold" size={20} />
          <input type="text" placeholder="Search for anything..." className="flex-1 bg-transparent px-3 py-3 outline-none text-white" />
          <Mic className="text-gold" size={20} />
        </div>

        {/* میپ سیکشن */}
        <div className="h-52 w-full rounded-[40px] overflow-hidden border-4 border-gold/20 shadow-xl mb-6">
          <MapContainer center={[30.3753, 69.3451]} zoom={5} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>

        {/* میپ کے نیچے 5 اہم بٹنز */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          <button onClick={() => navigate('/ride')} className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 royal-gold-shiny rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
              <Car size={24} className="text-[#4b3c00]" />
            </div>
            <span className="text-[10px] font-bold text-gold uppercase">Ride</span>
          </button>
          <button onClick={() => navigate('/food')} className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 royal-gold-shiny rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
              <Utensils size={24} className="text-[#4b3c00]" />
            </div>
            <span className="text-[10px] font-bold text-gold uppercase">Food</span>
          </button>
          <button onClick={() => navigate('/bills')} className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 royal-gold-shiny rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
              <Zap size={24} className="text-[#4b3c00]" />
            </div>
            <span className="text-[10px] font-bold text-gold uppercase">Bills</span>
          </button>
          <button onClick={() => navigate('/health')} className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 royal-gold-shiny rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
              <HeartPulse size={24} className="text-[#4b3c00]" />
            </div>
            <span className="text-[10px] font-bold text-gold uppercase">Health</span>
          </button>
          {/* بڑا "More" بٹن */}
          <button onClick={() => setIsSidebarOpen(true)} className="flex flex-col items-center gap-1 group">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg border-2 border-gold group-active:scale-90 transition-transform">
              <PlusCircle size={24} className="text-gold" />
            </div>
            <span className="text-[10px] font-bold text-white uppercase">More</span>
          </button>
        </div>

        {/* اسٹیکڈ سوئپ کارڈز (مکمل حالت میں) */}
        <div className="relative h-[450px] w-full" onClick={handleSwipe}>
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1 - index * 0.04, 
                  y: index * -18, 
                  zIndex: services.length - index,
                  opacity: index > 2 ? 0 : 1 
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-x-0 h-[420px] rounded-[50px] overflow-hidden bg-zinc-900 border-2 border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <img src={service.img} className="w-full h-3/5 object-cover" alt={service.title} />
                <div className="p-8 h-2/5 flex flex-col justify-between bg-gradient-to-b from-black/80 to-black">
                  <div>
                    <h3 className="text-3xl font-black text-gold italic uppercase tracking-tighter">{service.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{service.desc}</p>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(service.path); }}
                    className="w-full py-5 royal-gold-shiny rounded-[25px] text-black font-black text-sm uppercase shadow-xl active:scale-95 transition-transform"
                  >
                    براہ راست سروس حاصل کریں
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* شاہانہ فوٹر */}
      <footer className="fixed bottom-0 w-full h-24 royal-gold-shiny rounded-t-[50px] flex justify-between items-center px-10 z-[1000]">
        <Home size={32} className="text-[#4b3c00]" />
        <CreditCard size={32} className="text-[#4b3c00]/40" />
        <div className="w-20 h-20 bg-white rounded-full -translate-y-10 border-[8px] border-[#000d08] p-2 shadow-2xl flex items-center justify-center">
          <img src="/assets/logo.png" className="w-full h-full object-contain" alt="Logo" />
        </div>
        <History size={32} className="text-[#4b3c00]/40" />
        <User size={32} className="text-[#4b3c00]/40" />
      </footer>

      {/* سائیڈ بار مینیو */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/90 z-[2000] backdrop-blur-md" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-80 royal-gold-shiny z-[2001] rounded-r-[50px] p-8 shadow-2xl">
              <h2 className="text-3xl font-black text-[#4b3c00] mb-8 italic border-b border-[#4b3c00]/20 pb-4 uppercase">All Services</h2>
              <div className="space-y-4 h-[70vh] overflow-y-auto no-scrollbar">
                {['AC Technician', 'Auto Electrician', 'Barber', 'Carpenter', 'Gardener', 'Mason', 'Mechanic', 'Plumber', 'Tutor'].map((item) => (
                  <div key={item} onClick={() => navigate('/pro-help')} className="flex justify-between items-center p-5 bg-black/10 rounded-2xl border border-white/5 text-[#4b3c00] font-black uppercase text-xs tracking-widest cursor-pointer active:bg-gold/20">
                    {item} <ChevronRight size={18} />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
