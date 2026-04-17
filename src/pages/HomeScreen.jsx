import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Mic, X, Map as MapIcon, Home, CreditCard, History, User, ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  
  // سوئپ کارڈز کا ڈیٹا - آپ کے اثاثوں سے لنکڈ
  const [cards, setCards] = useState([
    { id: 1, title: 'Easy Access', img: '/assets/easypaysa.png', desc: 'Secure Payments Anywhere' },
    { id: 2, title: 'Smart Banking', img: '/assets/hbl.png', desc: 'Connect with HBL Services' },
    { id: 3, title: 'Telecom Plus', img: '/assets/jazz.png', desc: 'Top-up & Packages' },
  ]);

  const handleSwipe = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-gold select-none relative" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
      
      {/* شاہانہ ہیڈر */}
      <header className="fixed top-0 w-full z-[1000] px-5 py-4 royal-shiny-panel flex justify-between items-center rounded-b-[40px] raised-element">
        <button onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }}>
          <Menu size={32} className="text-[#8B4513]" />
        </button>
        <img src="/assets/logo.png" alt="Tezro" className="h-12 w-12 cursor-pointer" onClick={() => window.location.reload()} />
        <Bell size={32} className="text-[#8B4513]" />
      </header>

      <main className="pt-28 px-5 pb-32">
        {/* ایڈوانسڈ سرچ */}
        <div className="flex items-center bg-white/10 border-2 border-gold/40 rounded-3xl p-2 mb-8">
          <Search className="ml-3 text-gold" size={24} />
          <input type="text" placeholder="Search villages, roads, services..." className="w-full bg-transparent p-3 text-white outline-none" />
          <Mic className="mr-2 text-gold" size={24} />
        </div>

        {/* میپ سیکشن */}
        <div className={`relative mb-8 transition-all duration-500 ${isMapFull ? 'fixed inset-0 z-[2000] h-screen' : 'h-64 rounded-[40px] overflow-hidden border-4 border-gold/30 shadow-2xl'}`}>
          <MapContainer center={[30.3753, 69.3451]} zoom={5} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          <button onClick={() => setIsMapFull(!isMapFull)} className="absolute top-4 right-4 z-[2001] bg-gold p-4 rounded-full text-black">
            {isMapFull ? <X size={24} /> : <MapIcon size={24} />}
          </button>
        </div>

        {/* بڑے سوئپ کارڈز (Stack Effect) */}
        <div className="relative h-72 mb-10" onClick={handleSwipe}>
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div 
                key={card.id}
                animate={{ scale: 1 - index * 0.05, y: index * -15, zIndex: cards.length - index, opacity: 1 - index * 0.2 }}
                className="absolute w-full h-64 rounded-[40px] overflow-hidden border-2 border-gold/30 shadow-2xl bg-zinc-900"
              >
                <img src={card.img} className="w-full h-full object-contain p-10 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-gold">{card.title}</h3>
                  <p className="text-sm text-white/70">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* شاہانہ فوٹر */}
      <footer className="fixed bottom-0 w-full h-24 royal-shiny-panel rounded-t-[50px] flex justify-between items-center px-10 z-[1000]">
        <Home size={30} className="text-[#8B4513]" />
        <CreditCard size={30} className="text-[#8B4513]/40" />
        <div className="w-20 h-20 bg-white rounded-full -translate-y-8 border-8 border-[#000d08] p-2 shadow-2xl">
           <img src="/assets/logo.png" className="w-full h-full object-contain" />
        </div>
        <History size={30} className="text-[#8B4513]/40" />
        <User size={30} className="text-[#8B4513]/40" />
      </footer>
    </div>
  );
};

export default HomeScreen;
