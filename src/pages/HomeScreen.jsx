import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Mic, X, Map as MapIcon, Home, CreditCard, Gift, History, User, ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const services = [
  { name: 'Food', icon: '🍔', color: 'bg-orange-500' },
  { name: 'Ride', icon: '🚗', color: 'bg-blue-500' },
  { name: 'Payment', icon: '💳', color: 'bg-green-500' },
  { name: 'Shopping', icon: '🛍️', color: 'bg-purple-500' },
  { name: 'Services', icon: '🛠️', color: 'bg-yellow-600' }
];

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, title: 'Ride Master', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400', desc: 'Book your luxury ride' },
    { id: 2, title: 'Food Delivery', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', desc: 'Taste the best flavors' },
    { id: 3, title: 'Tezro Mall', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', desc: 'Shop premium products' },
  ]);

  const handleSwipe = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]); // کارڈز کو پیچھے سے آگے لاتا ہے
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-gold select-none relative overflow-hidden">
      
      {/* 1. سنگل شاہانہ ہیڈر */}
      <header className="fixed top-0 w-full z-[1000] px-5 py-4 royal-shiny-panel flex justify-between items-center rounded-b-[40px] raised-element">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={32} className="text-[#8B4513]" strokeWidth={2.5} />
        </button>
        
        <img src="/assets/logo.png" alt="Tezro" className="h-12 w-12 object-contain" onClick={() => window.location.reload()} />
        
        <div className="relative">
          <Bell size={32} className="text-[#8B4513]" strokeWidth={2.5} />
          <span className="absolute top-0 right-0 bg-red-600 w-3 h-3 rounded-full border-2 border-white"></span>
        </div>
      </header>

      {/* 2. سرچ بار (وائس اور ٹیکسٹ) */}
      <div className="pt-28 px-5">
        <div className="flex items-center bg-white/10 backdrop-blur-md border-2 border-gold/40 rounded-3xl p-2 shadow-inner">
          <Search className="ml-3 text-gold" size={24} />
          <input type="text" placeholder="Search anything..." className="w-full bg-transparent p-3 text-white outline-none" />
          <button className="bg-gold p-3 rounded-2xl text-black raised-element">
            <Mic size={24} />
          </button>
        </div>
      </div>

      {/* 3. ایڈوانسڈ میپ بٹن اور میپ */}
      <div className={`mt-6 px-5 transition-all duration-500 ${isMapFull ? 'fixed inset-0 z-[2000] px-0 mt-0' : 'h-60'}`}>
        <div className="relative h-full w-full rounded-[40px] overflow-hidden border-4 border-gold/30 shadow-2xl">
          <MapContainer center={[30.3753, 69.3451]} zoom={5} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          <button onClick={() => setIsMapFull(!isMapFull)} className="absolute top-4 right-4 z-[2001] bg-gold p-4 rounded-full text-black raised-element">
            {isMapFull ? <X size={24} /> : <MapIcon size={24} />}
          </button>
        </div>
      </div>

      {/* 4. سروسز بٹنز (5 بٹنز) */}
      <div className="grid grid-cols-5 gap-3 px-5 mt-8">
        {services.map((s, i) => (
          <motion.div key={i} whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-2xl royal-shiny-panel flex items-center justify-center text-2xl shadow-lg raised-element`}>
              {s.icon}
            </div>
            <span className="text-[10px] mt-2 font-black text-white/80">{s.name}</span>
          </motion.div>
        ))}
      </div>

      {/* 5. بڑے سوئپ کارڈز (Stack Effect) */}
      <div className="mt-10 px-5 relative h-64 mb-40">
        <h2 className="text-xl font-black mb-4 italic">PREMIUM DEALS</h2>
        <div className="relative w-full h-full flex justify-center items-center" onClick={handleSwipe}>
          {cards.map((card, index) => (
            <motion.div 
              key={card.id}
              animate={{
                scale: 1 - index * 0.05,
                y: index * -20,
                zIndex: cards.length - index,
                opacity: 1 - index * 0.2
              }}
              className="absolute w-full h-full rounded-[40px] overflow-hidden border-2 border-gold/30 shadow-2xl"
            >
              <img src={card.img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-gold">{card.title}</h3>
                <p className="text-sm text-white">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. شاہانہ فوٹر */}
      <footer className="fixed bottom-0 w-full h-24 royal-shiny-panel rounded-t-[50px] flex justify-between items-center px-8 z-[1000] raised-element border-t-2 border-gold/50">
        <Home size={30} className="text-[#8B4513]" />
        <CreditCard size={30} className="text-[#8B4513]/50" />
        <div className="w-20 h-20 bg-white rounded-full -translate-y-8 border-8 border-[#000d08] shadow-2xl p-2 raised-element">
           <img src="/assets/logo.png" className="w-full h-full object-contain" />
        </div>
        <History size={30} className="text-[#8B4513]/50" />
        <User size={30} className="text-[#8B4513]/50" />
      </footer>

      {/* 7. اسمارٹ سائیڈ بار (بند ہونے والی خصوصیت کے ساتھ) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[3000]"
              onClick={() => setIsSidebarOpen(false)} // کہیں بھی ٹچ کرنے پر بند ہو جائے گا
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 royal-shiny-panel z-[3001] rounded-r-[50px] p-8 overflow-y-auto"
            >
              <div className="flex flex-col items-center mb-10">
                <div className="w-28 h-28 rounded-full border-4 border-[#8B4513] p-1 mb-4 shadow-xl overflow-hidden bg-white">
                  <img src="/assets/logo.png" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-black text-[#8B4513]">Account Balance</h2>
                <div className="mt-2 bg-black/10 px-6 py-3 rounded-2xl border border-[#8B4513]/30">
                  <p className="text-2xl font-mono font-bold text-[#8B4513]">PKR 25,000</p>
                </div>
              </div>

              <div className="space-y-4">
                {['Ride', 'Food', 'Payments', 'Shopping', 'Doctor', 'Plumber', 'Electrician', 'Carpenter'].map((item) => (
                  <div key={item} className="flex justify-between items-center p-4 bg-white/20 rounded-2xl border border-[#8B4513]/10 text-[#8B4513] font-bold">
                    <span>{item}</span>
                    <ChevronRight size={20} />
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
