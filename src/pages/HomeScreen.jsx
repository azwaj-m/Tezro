import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Mic, X, Map as MapIcon, ChevronRight, Home, CreditCard, Gift, History, User } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchText, setSearchText] = useState("");

  // وائس انجن
  const startVoiceSearch = () => {
    setIsListening(true);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
      setIsListening(false);
    };
    recognition.onspeechend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-gold font-sans overflow-x-hidden" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
      
      {/* 1. پریمیم گولڈن ہیڈر */}
      <header className="fixed top-0 w-full z-[1000] px-4 py-3 shiny-gold-panel flex justify-between items-center rounded-b-3xl">
        <button onClick={(e) => {e.stopPropagation(); setIsSidebarOpen(true)}}>
          <Menu size={28} className="text-black" />
        </button>
        
        {/* لوگو جو ہوم بٹن بھی ہے */}
        <motion.img 
          src="/assets/logo.png" 
          alt="Tezro" 
          className="h-10 w-10 object-contain cursor-pointer" 
          whileTap={{ scale: 0.9 }}
          onClick={() => window.location.reload()}
        />
        
        <div className="relative">
          <Bell size={28} className="text-black" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full border border-white">3</span>
        </div>
      </header>

      <main className="pt-24 pb-32 px-4">
        {/* 2. اسمارٹ سرچ بار */}
        <div className="relative mb-6">
          <div className={`flex items-center bg-zinc-900 border-2 ${isListening ? 'border-red-500 animate-pulse' : 'border-gold/30'} rounded-2xl p-1 shadow-2xl`}>
            <Search className="ml-3 text-gold/50" size={20} />
            <input 
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search services, products, locations..." 
              className="w-full bg-transparent p-3 text-white outline-none placeholder:text-zinc-600"
            />
            <button 
              onClick={startVoiceSearch}
              className={`p-3 rounded-xl ${isListening ? 'bg-red-500 text-white' : 'bg-gold text-black'}`}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>

        {/* 3. ایڈوانسڈ لیف لیٹ میپ */}
        <div className={`relative transition-all duration-500 ${isMapFull ? 'fixed inset-0 z-[2000] h-screen' : 'h-64 rounded-[2.5rem] overflow-hidden border-2 border-gold/20'}`}>
          <MapContainer center={[30.1575, 71.5249]} zoom={13} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* یہاں سیٹلائٹ لیئر بھی شامل کی جا سکتی ہے */}
          </MapContainer>
          
          <button 
            onClick={() => setIsMapFull(!isMapFull)}
            className="absolute top-4 right-4 z-[2001] bg-black/80 p-3 rounded-full border border-gold shadow-lg"
          >
            {isMapFull ? <X size={24} /> : <MapIcon size={24} />}
          </button>
        </div>

        {/* 4. ٹاپ 5 سروسز بٹنز */}
        <div className="grid grid-cols-5 gap-2 mt-8">
          {['Food', 'Ride', 'Pay', 'Shop', 'More'].map((item) => (
            <motion.div key={item} whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
              <div className="w-14 h-14 shiny-gold-panel flex items-center justify-center mb-1 extra-raised">
                 <div className="text-black font-black text-[10px] uppercase">{item}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. سوئپ کارڈز (Premium Services) */}
        <div className="mt-10 overflow-hidden">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-shiny-green rounded-full shadow-[0_0_10px_#00ff88]"></div>
            PREMIUM SERVICES
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                drag="x" 
                dragConstraints={{ left: 0, right: 0 }}
                className="min-w-[85%] h-48 rounded-3xl bg-gradient-to-br from-zinc-800 to-black border border-gold/20 p-4 snap-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 bg-gold text-black font-bold rounded-bl-3xl">NEW</div>
                <div className="mt-20">
                  <h3 className="text-xl font-bold">Exclusive Service {i}</h3>
                  <p className="text-xs opacity-60">Tap to explore details</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* 6. شائنی گرین فوٹر */}
      <footer className="fixed bottom-0 w-full h-20 bg-gradient-to-t from-[#00331a] to-[#000d08] border-t border-shiny-green/30 px-6 flex justify-between items-center z-[1000]">
        <Home className="text-shiny-green shadow-sm" size={28} />
        <CreditCard className="text-gold/50" size={24} />
        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center -translate-y-6 border-4 border-[#000d08] shadow-2xl">
           <img src="/assets/logo.png" className="w-10" />
        </div>
        <History className="text-gold/50" size={24} />
        <User className="text-gold/50" size={24} />
      </footer>

      {/* 7. سائیڈ بار (Drawer) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            className="fixed inset-y-0 left-0 w-80 bg-black border-r border-gold/20 z-[3000] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full border-2 border-gold p-1 mb-2 relative">
                <img src="/assets/logo.png" className="w-full h-full rounded-full object-cover" />
                <button className="absolute bottom-0 right-0 bg-gold p-1 rounded-full"><Settings size={14} className="text-black" /></button>
              </div>
              <h2 className="text-lg font-bold">Tezro User</h2>
              <div className="bg-gold/10 px-4 py-2 rounded-xl mt-2 border border-gold/20 cursor-pointer">
                <p className="text-[10px] text-white/50 uppercase">Balance</p>
                <p className="text-xl font-mono text-gold font-bold">Rs. 15,250.00</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {['Ride Booking', 'Food Delivery', 'Bill Payments', 'Vault'].map(item => (
                <div key={item} className="flex justify-between items-center p-3 hover:bg-gold/5 rounded-xl cursor-pointer border-b border-white/5">
                  <span>{item}</span>
                  <ChevronRight size={18} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
