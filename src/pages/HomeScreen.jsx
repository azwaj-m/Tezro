import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Menu, Bell, Mic, X, Map as MapIcon, Home, 
  User, CreditCard, History, LayoutGrid, LogOut, ChevronRight,
  Stethoscope, Settings, Car, Utensils, Zap, Wrench, Scissors,
  Pencil, Droplets, PaintRoller, AirVent, Shovel, HardHat, GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);

  // سائیڈ بار کے لیے 16 سروسز کی لسٹ
  const allServices = [
    { name: 'Ride Booking', path: '/ride', icon: <Car size={20}/> },
    { name: 'Food Delivery', path: '/food', icon: <Utensils size={20}/> },
    { name: 'Doctor', path: '/services/extra/HealthScreen', icon: <Stethoscope size={20}/> },
    { name: 'Electrician', path: '/services/extra/ProHelp', icon: <Zap size={20}/> },
    { name: 'Plumber', path: '/services/extra/ProHelp', icon: <Droplets size={20}/> },
    { name: 'Mechanic', path: '/services/extra/ProHelp', icon: <Wrench size={20}/> },
    { name: 'AC Technician', path: '/services/extra/ProHelp', icon: <AirVent size={20}/> },
    { name: 'Carpenter', path: '/services/extra/ProHelp', icon: <Pencil size={20}/> },
    { name: 'Painter', path: '/services/extra/ProHelp', icon: <PaintRoller size={20}/> },
    { name: 'Mason (Mistri)', path: '/services/extra/ProHelp', icon: <HardHat size={20}/> },
    { name: 'Tutor', path: '/services/extra/ProHelp', icon: <GraduationCap size={20}/> },
    { name: 'Barber', path: '/services/extra/ProHelp', icon: <Scissors size={20}/> },
    { name: 'Gardner', path: '/services/extra/ProHelp', icon: <Shovel size={20}/> },
    { name: 'Utility Bills', path: '/services/extra/UtilityBills', icon: <History size={20}/> },
    { name: 'Tezro Mall', path: '/services/extra/TezroMall', icon: <LayoutGrid size={20}/> },
    { name: 'Employment', path: '/services/extra/EmploymentScreen', icon: <User size={20}/> },
  ];

  const [cards, setCards] = useState([
    { id: 1, title: 'Luxury Ride', img: '/assets/V-vip.JPG', path: '/ride' },
    { id: 2, title: 'Medical Expert', img: '/assets/Doctor.jpg', path: '/services/extra/HealthScreen' },
    { id: 3, title: 'Pro Mechanic', img: '/assets/Mechanic.jpg', path: '/services/extra/ProHelp' },
  ]);

  const handleSwipe = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white overflow-hidden pb-32">
      
      {/* --- ہیڈر (لوگو ہوم بٹن کے طور پر) --- */}
      <header className="fixed top-0 w-full z-[2000] px-6 py-4 royal-gold-shiny rounded-b-[40px] flex justify-between items-center shadow-2xl">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:scale-90 transition-transform">
          <Menu size={32} className="text-[#4b3c00]" />
        </button>
        
        {/* درمیان میں لوگو جو ہوم پیج پر ریفریش/نیویگیٹ کرے گا */}
        <div onClick={() => navigate('/')} className="cursor-pointer active:scale-95 transition-transform">
          <img src="/assets/logo.png" className="h-14 w-14 object-contain" alt="Home" />
        </div>

        <button onClick={() => navigate('/NotificationScreen')} className="p-2 active:scale-90 transition-transform">
          <Bell size={32} className="text-[#4b3c00]" />
        </button>
      </header>

      <main className="pt-28 px-5 h-screen overflow-y-auto no-scrollbar">
        
        {/* سرچ انجن */}
        <div className="relative mb-6">
          <div className="flex items-center bg-white/10 border-2 border-gold/30 rounded-full px-4 py-2 backdrop-blur-md">
            <Search className="text-gold" size={20} />
            <input type="text" placeholder="Search for destination..." className="flex-1 bg-transparent px-3 py-3 outline-none text-white" />
            <Mic className="text-gold" size={20} />
          </div>
        </div>

        {/* میپ سیکشن */}
        <div className={`relative mb-8 transition-all duration-700 ${isMapFull ? 'fixed inset-0 z-[3000] h-screen' : 'h-60 rounded-[45px] overflow-hidden border-4 border-gold/20'}`}>
          <MapContainer center={[30.1575, 71.5249]} zoom={13} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          <button onClick={() => setIsMapFull(!isMapFull)} className="absolute top-6 right-6 z-[3001] bg-gold p-4 rounded-full text-black shadow-2xl">
            {isMapFull ? <X size={30} /> : <MapIcon size={30} />}
          </button>
        </div>

        {/* 5 اسمارٹ بٹنز */}
        <div className="flex gap-4 mb-10 h-36">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 flex-1">
            {allServices.slice(0, 4).map((s, i) => (
              <button key={i} onClick={() => navigate(s.path)} className="royal-gold-shiny rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all">
                {s.icon}
              </button>
            ))}
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="w-1/3 royal-gold-shiny rounded-[30px] flex flex-col items-center justify-center shadow-xl">
            <LayoutGrid size={35} className="text-[#4b3c00]" />
            <span className="text-[10px] font-black text-[#4b3c00]">MORE</span>
          </button>
        </div>

        {/* سوئپ کارڈز */}
        <div className="relative h-80 w-full flex justify-center items-center" onClick={handleSwipe}>
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                animate={{ scale: 1 - index * 0.05, x: index * 25, rotate: index * 5, zIndex: cards.length - index, opacity: 1 - index * 0.2 }}
                className="absolute w-full h-full rounded-[45px] overflow-hidden border-2 border-gold/40 bg-zinc-900 shadow-2xl"
              >
                <img src={card.img} className="w-full h-3/5 object-cover" />
                <div className="h-2/5 p-4 flex flex-col justify-between bg-black/60">
                  <h3 className="text-xl font-black text-gold italic uppercase">{card.title}</h3>
                  <button onClick={(e) => { e.stopPropagation(); navigate(card.path); }} className="w-full py-3 royal-gold-shiny rounded-xl text-black font-black text-xs uppercase">
                    براہ راست سروس حاصل کریں
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- فوٹر (تمام بٹنز ایکٹیو) --- */}
      <footer className="fixed bottom-0 w-full h-24 royal-gold-shiny rounded-t-[50px] flex justify-between items-center px-10 z-[2000] border-t-2 border-white/20">
        <button onClick={() => navigate('/')} className="active:scale-90 transition-transform">
          <Home size={32} className="text-[#4b3c00]" />
        </button>
        <button onClick={() => navigate('/FinanceHub')} className="active:scale-90 transition-transform">
          <CreditCard size={32} className="text-[#4b3c00]/40" />
        </button>
        <div onClick={() => navigate('/')} className="w-24 h-24 bg-white rounded-full -translate-y-12 border-[10px] border-[#000d08] p-3 shadow-2xl active:scale-95 transition-all">
          <img src="/assets/logo.png" className="w-full h-full object-contain" />
        </div>
        <button onClick={() => navigate('/NotificationScreen')} className="active:scale-90 transition-transform">
          <History size={32} className="text-[#4b3c00]/40" />
        </button>
        <button onClick={() => navigate('/VaultScreen')} className="active:scale-90 transition-transform">
          <User size={32} className="text-[#4b3c00]/40" />
        </button>
      </footer>

      {/* --- سائیڈ بار (تمام 16 سروسز + پروفائل + لاگ آؤٹ) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/80 z-[3000] backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-80 royal-gold-shiny z-[3001] rounded-r-[40px] shadow-2xl flex flex-col">
              
              {/* سائیڈ بار ہیڈر */}
              <div className="p-8 border-b border-[#4b3c00]/20 flex items-center gap-4">
                <div className="w-16 h-16 bg-black/10 rounded-full border-2 border-[#4b3c00] flex items-center justify-center">
                  <User size={32} className="text-[#4b3c00]" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#4b3c00]">Tezro User</h2>
                  <p className="text-[10px] text-[#4b3c00]/60">Premium Member</p>
                </div>
              </div>

              {/* سروسز لسٹ */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar">
                {allServices.map((service, i) => (
                  <div key={i} onClick={() => { navigate(service.path); setIsSidebarOpen(false); }} className="flex justify-between items-center p-4 bg-black/5 rounded-2xl border border-white/10 text-[#4b3c00] font-bold active:bg-gold/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">{service.icon} <span className="text-sm uppercase tracking-tighter">{service.name}</span></div>
                    <ChevronRight size={18} />
                  </div>
                ))}
              </div>

              {/* سائیڈ بار فوٹر */}
              <div className="p-8 border-t border-[#4b3c00]/20 space-y-3">
                <button onClick={() => navigate('/VaultScreen')} className="w-full flex items-center gap-3 text-[#4b3c00] font-black uppercase text-xs">
                  <Settings size={20} /> Settings
                </button>
                <button onClick={() => window.location.reload()} className="w-full flex items-center gap-3 text-red-800 font-black uppercase text-xs mt-4">
                  <LogOut size={20} /> Log Out
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
