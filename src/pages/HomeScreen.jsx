import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Menu, Bell, Mic, X, Map as MapIcon, Home, 
  User, CreditCard, History, LayoutGrid, LogOut, ChevronRight,
  Stethoscope, Zap, Wrench, Scissors, Pencil, Droplets, 
  PaintRoller, AirVent, Shovel, HardHat, GraduationCap, Car, 
  Utensils, ShoppingBag, ShieldCheck, Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);

  // 1. میپ کے نیچے والے 4 بنیادی بٹنز
  const quickServices = [
    { name: 'Ride', path: '/ride', icon: <Car size={28} /> },
    { name: 'Food', path: '/food', icon: <Utensils size={28} /> },
    { name: 'Bills', path: '/bills', icon: <History size={28} /> },
    { name: 'Shop', path: '/mall', icon: <ShoppingBag size={28} /> }
  ];

  // 2. سائیڈ بار (بڑے بٹن) کے پیچھے چھپی تمام سروسز
  const professionalServices = [
    { name: 'Doctor', path: '/health', icon: <Stethoscope size={22}/> },
    { name: 'Carpenter', path: '/pro-help', icon: <Pencil size={22}/> },
    { name: 'Painter', path: '/pro-help', icon: <PaintRoller size={22}/> },
    { name: 'Plumber', path: '/pro-help', icon: <Droplets size={22}/> },
    { name: 'Mason (Mistri)', path: '/pro-help', icon: <HardHat size={22}/> },
    { name: 'Auto Electrician', path: '/pro-help', icon: <Zap size={22}/> },
    { name: 'Home Electrician', path: '/pro-help', icon: <Zap size={22}/> },
    { name: 'Auto Mechanic', path: '/pro-help', icon: <Wrench size={22}/> },
    { name: 'Barber', path: '/pro-help', icon: <Scissors size={22}/> },
    { name: 'Gardner', path: '/pro-help', icon: <Shovel size={22}/> },
    { name: 'AC Technician', path: '/pro-help', icon: <AirVent size={22}/> },
    { name: 'Tutor', path: '/pro-help', icon: <GraduationCap size={22}/> }
  ];

  const [cards] = useState([
    { id: 1, title: 'V-VIP Ride', img: '/assets/V-vip.JPG', path: '/ride' },
    { id: 2, title: 'Health Care', img: '/assets/Doctor.jpg', path: '/health' },
    { id: 3, title: 'Mechanic', img: '/assets/Mechanic.jpg', path: '/pro-help' },
  ]);

  const [cardIndex, setCardIndex] = useState(0);
  const handleSwipe = () => setCardIndex((prev) => (prev + 1) % cards.length);

  return (
    <div className="min-h-screen pt-24 pb-24 bg-[#000d08] text-white overflow-hidden pb-20">
      
      {/* ہیڈر */}
      <header className="fixed top-0 left-0 w-full z-[5000] z-[5000] w-full z-[2000] px-6 py-2 dark-gold-shiny rounded-b-[40px] flex justify-between items-center shadow-2xl">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:scale-90"><Menu size={32} className="text-[#4b3c00]" /></button>
        <div onClick={() => navigate('/')} className="cursor-pointer active:scale-95">
          <img src="/assets/logo.png" className="h-14 w-14 object-contain" alt="Home" />
        </div>
        <button onClick={() => navigate('/NotificationScreen')} className="p-2 active:scale-90"><Bell size={32} className="text-[#4b3c00]" /></button>
      </header>

      <main className="pt-20 px-5 h-screen overflow-y-auto no-scrollbar">
        
        {/* سرچ انجن */}
        <div className="relative mb-6">
          <div className="flex items-center bg-white/10 border-2 border-gold/30 rounded-full px-4 py-2 backdrop-blur-md">
            <Search className="text-gold" size={20} />
            <input type="text" placeholder="Where to go?" className="flex-1 bg-[#000d08] px-3 py-3 outline-none text-white" />
            <Mic className="text-gold" size={20} />
          </div>
        </div>

        {/* میپ سیکشن */}
        <div className={`relative mb-8 transition-all duration-700 ${isMapFull ? 'fixed inset-0 z-[3000] h-screen' : 'h-60 rounded-[45px] overflow-hidden border-4 border-gold/20'}`}>
          <MapContainer center={[30.1575, 71.5249]} zoom={13} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          <button onClick={() => setIsMapFull(!isMapFull)} className="absolute top-6 right-6 z-[3001] bg-gold p-4 rounded-full text-black shadow-xl">
            {isMapFull ? <X size={30} /> : <MapIcon size={30} />}
          </button>
        </div>

        {/* میپ کے نیچے 5 بٹنز کا سیٹ اپ */}
        <div className="flex gap-4 mb-10 h-40">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 flex-1">
            {quickServices.map((s, i) => (
              <button key={i} onClick={() => navigate(s.path)} className="dark-gold-shiny rounded-2xl flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all">
                <span className="text-[#4b3c00]">{s.icon}</span>
                <span className="text-[10px] font-bold text-[#4b3c00] mt-1 uppercase">{s.name}</span>
              </button>
            ))}
          </div>
          {/* بڑا "More Services" بٹن */}
          <button onClick={() => setIsSidebarOpen(true)} className="w-1/3 dark-gold-shiny rounded-[35px] flex flex-col items-center justify-center shadow-2xl border-b-4 border-gold/50 active:translate-y-1">
            <LayoutGrid size={40} className="text-[#4b3c00] mb-2" />
            <span className="text-[11px] font-black text-[#4b3c00] tracking-tighter uppercase">Services</span>
          </button>
        </div>

        {/* فینڈ (آڑھے ٹیڑھے) سوئپ کارڈز */}
        <div className="relative h-80 w-full flex justify-center items-center mt-6" onClick={handleSwipe}>
          <AnimatePresence>
            {[0, 1, 2].map((i) => {
              const index = (cardIndex + i) % cards.length;
              return (
                <motion.div
                  key={cards[index].id}
                  animate={{ scale: 1 - i * 0.05, x: i * 30, rotate: i * 6, zIndex: 10 - i, opacity: 1 - i * 0.3 }}
                  className="absolute w-full h-full rounded-[50px] overflow-hidden border-2 border-gold/40 bg-zinc-900 shadow-2xl"
                >
                  <img src={cards[index].img} className="w-full h-3/5 object-cover" />
                  <div className="h-auto py-6 p-5 flex flex-col justify-between bg-[#000d08]/80">
                    <h3 className="text-2xl font-black text-gold italic uppercase">{cards[index].title}</h3>
                    <button onClick={(e) => { e.stopPropagation(); navigate(cards[index].path); }} className="w-full py-2 dark-gold-shiny rounded-2xl text-black font-black text-sm uppercase">
                      براہ راست سروس حاصل کریں
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* فوٹر (5 بٹنز) */}
      <footer className="fixed bottom-0 left-0 w-full z-[5000] z-[5000] w-full h-16 dark-gold-shiny rounded-t-[50px] flex justify-between items-center px-8 z-[2000] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button onClick={() => navigate('/VaultScreen')} className="flex flex-col items-center opacity-40 active:opacity-100">
          <User size={28} className="text-[#4b3c00]" /><span className="text-[8px] font-bold text-[#4b3c00]">PROFILE</span>
        </button>
        <button onClick={() => navigate('/NotificationScreen')} className="flex flex-col items-center opacity-40 active:opacity-100">
          <History size={28} className="text-[#4b3c00]" /><span className="text-[8px] font-bold text-[#4b3c00]">HISTORY</span>
        </button>
        
        {/* بڑا ہوم بٹن */}
        <div onClick={() => navigate('/')} className="w-24 h-16 bg-white rounded-full translate-y-0 border-[10px] border-[#000d08] p-3 shadow-2xl active:scale-90 transition-all cursor-pointer">
          <img src="/assets/logo.png" className="w-full h-full object-contain" alt="Home" />
        </div>

        <button onClick={() => navigate('/FinanceHub')} className="flex flex-col items-center opacity-40 active:opacity-100">
          <Wallet size={28} className="text-[#4b3c00]" /><span className="text-[8px] font-bold text-[#4b3c00]">WALLET</span>
        </button>
        <button onClick={() => navigate('/VaultScreen')} className="flex flex-col items-center">
          <ShieldCheck size={28} className="text-[#4b3c00]" /><span className="text-[8px] font-bold text-[#4b3c00]">VAULT</span>
        </button>
      </footer>

      {/* سائیڈ بار (بڑے بٹن والی تمام سروسز) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-[#000d08]/90 z-[3000] backdrop-blur-md" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-80 dark-gold-shiny z-[3001] rounded-r-[50px] flex flex-col shadow-2xl">
              <div className="p-8 border-b border-[#4b3c00]/20 flex items-center gap-4">
                <div className="w-16 h-16 bg-[#000d08]/10 rounded-full border-2 border-[#4b3c00] flex items-center justify-center"><User size={32} className="text-[#4b3c00]" /></div>
                <div><h2 className="text-xl font-black text-[#4b3c00]">Tezro Services</h2><p className="text-[9px] text-[#4b3c00]/60 uppercase">Professional Solutions</p></div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar">
                {professionalServices.map((service, i) => (
                  <div key={i} onClick={() => { navigate(service.path); setIsSidebarOpen(false); }} className="flex justify-between items-center p-4 bg-[#000d08]/5 rounded-2xl border border-white/10 text-[#4b3c00] font-bold active:bg-gold/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">{service.icon} <span className="text-xs uppercase tracking-tighter">{service.name}</span></div>
                    <ChevronRight size={18} />
                  </div>
                ))}
              </div>
              <div className="p-8 border-t border-[#4b3c00]/20"><button onClick={() => window.location.reload()} className="w-full flex items-center gap-3 text-red-800 font-black uppercase text-[10px]"><LogOut size={20} /> Close Session</button></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
