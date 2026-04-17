import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Search, Menu, Bell, Mic, X, Map as MapIcon, Home, CreditCard, History, User, ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const SwipeCard = ({ card, removeCard }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: card.id }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) removeCard(card.id);
      }}
      className="absolute w-full h-full rounded-[40px] overflow-hidden border-2 border-gold/40 shadow-2xl bg-zinc-900 cursor-grab active:cursor-grabbing"
    >
      <img src={card.img} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{card.title}</h3>
        <p className="text-gold font-bold">{card.desc}</p>
      </div>
    </motion.div>
  );
};

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  const [cards, setCards] = useState([
    { id: 3, title: 'Luxury Rides', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', desc: 'Travel in Style' },
    { id: 2, title: 'Elite Food', img: 'https://images.unsplash.com/photo-1514355315815-2b64b0216b14?w=800', desc: 'Premium Cuisines' },
    { id: 1, title: 'Global Mall', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', desc: 'Shop the Best' },
  ]);

  const removeCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (cards.length === 1) {
       // جب کارڈز ختم ہوں تو دوبارہ لوڈ کر دیں
       setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-gold relative overflow-hidden" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
      
      {/* شاہانہ سنگل ہیڈر */}
      <header className="fixed top-0 w-full z-[1000] px-5 py-5 royal-shiny-panel flex justify-between items-center rounded-b-[45px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <button onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }}>
          <Menu size={32} className="text-[#8B4513]" strokeWidth={2.5} />
        </button>
        <img src="/assets/logo.png" alt="Logo" className="h-14 w-14 drop-shadow-lg" />
        <Bell size={32} className="text-[#8B4513]" strokeWidth={2.5} />
      </header>

      <main className="pt-32 px-5 pb-40">
        {/* سرچ بار */}
        <div className="flex items-center bg-white/5 border-2 border-gold/30 rounded-[25px] p-1 shadow-inner mb-8">
          <Search className="ml-4 text-gold/50" size={24} />
          <input type="text" placeholder="Search services..." className="w-full bg-transparent p-4 text-white outline-none placeholder:text-zinc-600" />
          <button className="bg-gold p-4 rounded-[20px] text-black shadow-lg"><Mic size={24} /></button>
        </div>

        {/* میپ سیکشن */}
        <div className={`relative mb-10 transition-all duration-700 ${isMapFull ? 'fixed inset-0 z-[2000] h-screen' : 'h-72 rounded-[50px] overflow-hidden border-4 border-gold/20'}`}>
          <MapContainer center={[30.1575, 71.5249]} zoom={13} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          <button onClick={() => setIsMapFull(!isMapFull)} className="absolute top-6 right-6 z-[2001] bg-gold p-4 rounded-full text-black shadow-2xl">
            {isMapFull ? <X size={28} /> : <MapIcon size={28} />}
          </button>
        </div>

        {/* 5 سروسز بٹنز */}
        <div className="grid grid-cols-5 gap-4 mb-12">
          {['Ride', 'Food', 'Pay', 'Shop', 'More'].map((name, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 royal-shiny-panel rounded-2xl flex items-center justify-center shadow-xl transform active:scale-90 transition-all border-b-4 border-[#b8860b]">
                <span className="text-[10px] font-black text-black uppercase">{name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* اصلی سوئپ کارڈز (Stack) */}
        <div className="relative h-80 w-full flex justify-center items-center">
          <AnimatePresence>
            {cards.map((card) => (
              <SwipeCard key={card.id} card={card} removeCard={removeCard} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* شاہانہ سنگل فوٹر */}
      <footer className="fixed bottom-0 w-full h-24 royal-shiny-panel rounded-t-[50px] flex justify-between items-center px-10 z-[1000] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <Home size={32} className="text-[#8B4513]" />
        <CreditCard size={32} className="text-[#8B4513]/40" />
        <div className="w-20 h-20 bg-white rounded-full -translate-y-10 border-[10px] border-[#000d08] p-2 shadow-2xl">
           <img src="/assets/logo.png" className="w-full h-full object-contain" />
        </div>
        <History size={32} className="text-[#8B4513]/40" />
        <User size={32} className="text-[#8B4513]/40" />
      </footer>

      {/* سائیڈ بار */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[3000]" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-80 royal-shiny-panel z-[3001] rounded-r-[50px] p-8">
                <h2 className="text-2xl font-black text-[#8B4513] mb-6 border-b border-[#8B4513]/20 pb-4">Menu</h2>
                <div className="space-y-4">
                  {['Profile', 'Wallet', 'Doctor', 'Plumber', 'Electrician', 'Settings'].map(item => (
                    <div key={item} className="p-4 bg-black/5 rounded-2xl text-[#8B4513] font-bold flex justify-between">
                      {item} <ChevronRight size={20} />
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
