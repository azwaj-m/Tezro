import React, { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Mic, X, Map as MapIcon, Home, User, CreditCard, History, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// میپ کو اپ ڈیٹ کرنے کے لیے ہیلپر کمپوننٹ
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainServices = [
    { name: 'Ride', path: '/ride', icon: '🚗' },
    { name: 'Food', path: '/food', icon: '🍔' },
    { name: 'Bill', path: '/services/extra/UtilityBills', icon: '🧾' },
    { name: 'Health', path: '/services/extra/HealthScreen', icon: '🏥' }
  ];

  const [cards, setCards] = useState([
    { id: 1, title: 'Luxury Ride', img: '/assets/V-vip.JPG', path: '/ride', rot: -5, x: -20 },
    { id: 2, title: 'Expert Doctor', img: '/assets/Doctor.jpg', path: '/services/extra/HealthScreen', rot: 0, x: 0 },
    { id: 3, title: 'Pro Mechanic', img: '/assets/Mechanic.jpg', path: '/services/extra/ProHelp', rot: 5, x: 20 },
    { id: 4, title: 'AC Services', img: '/assets/AC-Technition.jpg', path: '/services/extra/ProHelp', rot: 10, x: 40 },
  ]);

  const handleSwipe = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white overflow-x-hidden pb-32 font-sans">
      
      {/* 1. شاہانہ گولڈن ہیڈر */}
      <header className="fixed top-0 w-full z-[2000] px-6 py-5 royal-gold-shiny rounded-b-[40px] flex justify-between items-center shadow-2xl">
        <button onClick={() => setIsSidebarOpen(true)} className="active:scale-90 transition-transform">
          <Menu size={32} className="text-[#4b3c00]" strokeWidth={2.5} />
        </button>
        <img src="/assets/logo.png" className="h-14 w-14 object-contain drop-shadow-md" alt="Tezro" />
        <Bell size={32} className="text-[#4b3c00]" strokeWidth={2.5} />
      </header>

      <main className="pt-28 px-5">
        
        {/* 2. سرچ انجن (ہیڈر کے نیچے) */}
        <div className="relative mb-6 z-10">
          <div className="flex items-center bg-white/10 border-2 border-gold/30 rounded-full px-4 py-2 backdrop-blur-xl shadow-inner">
            <Search className="text-gold" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your destination..." 
              className="flex-1 bg-transparent px-3 py-3 outline-none text-white text-sm"
            />
            <Mic className="text-gold cursor-pointer" size={20} />
          </div>
        </div>

        {/* 3. میپ سیکشن (فل اسکرین بٹن کے ساتھ) */}
        <div className={`relative mb-8 transition-all duration-700 ease-in-out ${isMapFull ? 'fixed inset-0 z-[3000] h-screen w-screen rounded-0' : 'h-60 w-full rounded-[45px] overflow-hidden border-4 border-gold/20 shadow-2xl'}`}>
          <MapContainer center={[30.1575, 71.5249]} zoom={13} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={[30.1575, 71.5249]} />
          </MapContainer>
          
          {/* میپ کے اوپر سرچ بٹن اور کلوز بٹن */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[3001]">
             {isMapFull && (
               <div className="flex-1 mr-4 bg-white/90 rounded-full px-4 flex items-center shadow-2xl">
                 <Search className="text-black" size={20} />
                 <input type="text" placeholder="Where to go?" className="w-full bg-transparent p-4 text-black outline-none font-bold" />
               </div>
             )}
             <button onClick={() => setIsMapFull(!isMapFull)} className="bg-gold p-4 rounded-full text-black shadow-2xl raised-element border-2 border-white/50">
               {isMapFull ? <X size={30} strokeWidth={3} /> : <MapIcon size={30} />}
             </button>
          </div>
        </div>

        {/* 4. میپ کے نیچے 5 بٹنز (4 چھوٹے، 1 بڑا) */}
        <div className="flex gap-4 mb-12 h-36">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 flex-1">
            {mainServices.map((s, i) => (
              <button key={i} onClick={() => navigate(s.path)} className="royal-gold-shiny rounded-2xl flex items-center justify-center text-xl shadow-lg active:scale-95 transition-all">
                {s.icon}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-1/3 royal-gold-shiny rounded-[30px] flex flex-col items-center justify-center shadow-xl border-b-8 border-gold/50 active:translate-y-1"
          >
            <LayoutGrid size={35} className="text-[#4b3c00] mb-2" />
            <span className="text-[10px] font-black text-[#4b3c00] uppercase">More</span>
          </button>
        </div>

        {/* 5. آڑھے ٹیڑھے سوئپ کارڈز (Stacked & Fanned) */}
        <div className="relative h-96 w-full flex justify-center items-center mt-10">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                animate={{ 
                  scale: 1 - index * 0.05, 
                  x: index * 20, // تھوڑا سا سائیڈ پر تاکہ کنارے نظر آئیں
                  rotate: index * 4, // آڑھا ترچھا ایفیکٹ
                  zIndex: cards.length - index,
                  opacity: 1 - index * 0.2
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full rounded-[50px] overflow-hidden border-2 border-gold/40 bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-pointer"
                onClick={handleSwipe}
              >
                <img src={card.img} className="w-full h-3/5 object-cover" alt={card.title} />
                <div className="h-2/5 p-6 bg-gradient-to-t from-black via-zinc-900 to-transparent flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-gold italic uppercase tracking-tighter">{card.title}</h3>
                  </div>
                  
                  {/* براہ راست سروس حاصل کرنے کا بٹن */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(card.path); }}
                    className="w-full py-4 royal-gold-shiny rounded-2xl text-black font-black text-sm uppercase shadow-[0_5px_15px_rgba(212,175,55,0.4)]"
                  >
                    براہ راست سروس حاصل کریں
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* 6. شاہانہ فوٹر */}
      <footer className="fixed bottom-0 w-full h-24 royal-gold-shiny rounded-t-[50px] flex justify-between items-center px-10 z-[2000] border-t-2 border-white/20">
        <Home size={32} className="text-[#4b3c00]" />
        <CreditCard size={32} className="text-[#4b3c00]/40" />
        <div className="w-24 h-24 bg-white rounded-full -translate-y-12 border-[10px] border-[#000d08] p-3 shadow-2xl raised-element">
          <img src="/assets/logo.png" className="w-full h-full object-contain" alt="Home" />
        </div>
        <History size={32} className="text-[#4b3c00]/40" />
        <User size={32} className="text-[#4b3c00]/40" />
      </footer>
    </div>
  );
};

export default HomeScreen;
