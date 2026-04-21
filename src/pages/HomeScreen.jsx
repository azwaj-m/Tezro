import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Bell, Mic, Search, X, Maximize2, 
  Car, Utensils, Wallet, ShoppingBag, 
  LayoutGrid, Home, Gift, History, User,
  ChevronRight, Camera, CreditCard, Star
} from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapFull, setIsMapFull] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState('home');

  // سروسز کا ڈیٹا
  const mainServices = [
    { name: 'Food', path: '/food', icon: <Utensils size={24} /> },
    { name: 'Ride', path: '/ride', icon: <Car size={24} /> },
    { name: 'Payment', path: '/finance', icon: <Wallet size={24} /> },
    { name: 'Shopping', path: '/mall', icon: <ShoppingBag size={24} /> }
  ];

  const swipeCards = [
    { id: 1, title: 'V-VIP Ride', img: '/assets/V-vip.JPG', path: '/ride', desc: 'Premium luxury travel' },
    { id: 2, title: 'Health Care', img: '/assets/Doctor.jpg', path: '/health', desc: 'Expert doctors at home' },
    { id: 3, title: 'Home Repair', img: '/assets/Mechanic.jpg', path: '/pro-help', desc: 'Plumber & Carpenter' },
  ];

  const [cardIdx, setCardIdx] = useState(0);

  // وائس سرچ انجن
  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setSearchText(text);
        setIsListening(false);
        console.log("Searching for:", text);
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white overflow-hidden font-sans">
      
      {/* --- 1. ہیڈر (Light Golden Shiny & Embossed) --- */}
      <header className="fixed top-0 left-0 w-full z-[4000] px-6 py-3 light-gold-shiny shadow-[0_8px_20px_rgba(212,175,55,0.4)] flex justify-between items-center rounded-b-[35px] border-b border-gold/30">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 active:scale-90 transition-transform">
          <Menu size={30} className="text-[#4b3c00]" />
        </button>
        
        <div onClick={() => navigate('/')} className="flex flex-col items-center cursor-pointer active:scale-95 transition-all">
          <img src="/assets/logo.png" className="h-12 w-12 object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]" alt="Tezro" />
        </div>

        <button onClick={() => navigate('/NotificationScreen')} className="p-2 relative active:scale-90">
          <Bell size={30} className="text-[#4b3c00]" />
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full border-2 border-[#f9f295]"></span>
        </button>
      </header>

      {/* --- مین کنٹینٹ --- */}
      <main className="pt-24 pb-24 h-screen overflow-y-auto no-scrollbar px-4 space-y-6">
        
        {/* --- 2. خوبصورت سرچ بار --- */}
        <div className="relative mt-2">
          <div className="flex items-center bg-gradient-to-r from-white/10 to-white/5 border-2 border-gold/20 rounded-[25px] px-4 py-1 backdrop-blur-md shadow-inner">
            <Search className="text-gold/60" size={20} />
            <input 
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search services, products..." 
              className="flex-1 bg-transparent px-3 py-3 outline-none text-sm placeholder:text-gray-500" 
            />
            <button 
              onClick={startVoiceSearch}
              className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'text-gold'}`}
            >
              <Mic size={22} />
            </button>
          </div>
        </div>

        {/* --- 3. ایڈوانسڈ میپ سیکشن --- */}
        <div className={`relative transition-all duration-700 ease-in-out ${isMapFull ? 'fixed inset-0 z-[5000] m-0 rounded-none' : 'h-60 rounded-[45px] overflow-hidden border-2 border-gold/30 shadow-2xl'}`}>
          <MapContainer center={[30.1575, 71.5249]} zoom={13} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          
          <button 
            onClick={() => setIsMapFull(!isMapFull)} 
            className="absolute top-6 right-6 z-[5001] bg-gold p-4 rounded-full text-black shadow-2xl hover:scale-110 active:scale-90"
          >
            {isMapFull ? <X size={28} /> : <Search size={28} />}
          </button>

          {isMapFull && (
             <div className="absolute bottom-10 left-6 right-6 z-[5001] bg-black/60 backdrop-blur-md p-4 rounded-3xl border border-gold/30">
                <p className="text-gold text-xs font-bold uppercase">Destination Info</p>
                <p className="text-white text-sm">Searching for nearest local land records...</p>
             </div>
          )}
        </div>

        {/* --- 4. سروس بٹنز (5 بٹنز) --- */}
        <div className="flex gap-3 h-32">
          <div className="grid grid-cols-2 gap-2 flex-1">
            {mainServices.map((s, i) => (
              <button key={i} onClick={() => navigate(s.path)} className="light-gold-shiny rounded-2xl flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all">
                <span className="text-[#4b3c00]">{s.icon}</span>
                <span className="text-[10px] font-black text-[#4b3c00] mt-1 uppercase">{s.name}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="w-1/3 light-gold-shiny rounded-[40px] flex flex-col items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,0,0,0.4)] border-b-4 border-gold/40 active:translate-y-1 transition-all">
            <LayoutGrid size={40} className="text-[#4b3c00] mb-1" />
            <span className="text-[11px] font-black text-[#4b3c00] uppercase tracking-tighter">Services</span>
          </button>
        </div>

        {/* --- 5. سوئپ کارڈز --- */}
        <div className="relative h-80 w-full flex justify-center items-center overflow-hidden" onClick={() => setCardIdx((prev) => (prev + 1) % swipeCards.length)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cardIdx}
              initial={{ x: 300, opacity: 0, rotate: 10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -300, opacity: 0, rotate: -10 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="absolute w-full h-full rounded-[50px] overflow-hidden border-2 border-gold/20 shadow-2xl"
            >
              <img src={swipeCards[cardIdx].img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent">
                <div className="absolute bottom-10 left-8">
                  <h3 className="text-3xl font-black text-gold italic uppercase drop-shadow-lg">{swipeCards[cardIdx].title}</h3>
                  <p className="text-white/80 text-xs font-bold">{swipeCards[cardIdx].desc}</p>
                  <button onClick={(e) => { e.stopPropagation(); navigate(swipeCards[cardIdx].path); }} className="mt-4 px-6 py-2 light-gold-shiny text-[#4b3c00] font-black rounded-full text-xs uppercase shadow-lg">Open Service</button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* --- 6. فوٹر (Green Shiny & Embossed) --- */}
      <footer className="fixed bottom-0 left-0 w-full z-[4000] h-20 green-shiny rounded-t-[45px] shadow-[0_-10px_30px_rgba(0,100,50,0.4)] flex justify-between items-center px-8 border-t border-white/10">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center transition-all ${activeTab === 'home' ? 'scale-110 opacity-100' : 'opacity-50'}`}>
          <Home size={26} className="text-white" /><span className="text-[8px] font-bold mt-1">HOME</span>
        </button>
        <button onClick={() => navigate('/mall')} className="flex flex-col items-center opacity-50">
          <Star size={26} className="text-white" /><span className="text-[8px] font-bold mt-1">OFFERS</span>
        </button>

        {/* سنٹرل لوگو بٹن (ہوم بٹن) */}
        <div onClick={() => navigate('/')} className="w-20 h-20 bg-[#000d08] rounded-full -translate-y-8 border-[6px] border-[#000d08] p-3 shadow-2xl active:scale-90 transition-all cursor-pointer flex items-center justify-center overflow-hidden">
          <img src="/assets/logo.png" className="w-full h-full object-contain drop-shadow-2xl" alt="H" />
        </div>

        <button onClick={() => navigate('/NotificationScreen')} className="flex flex-col items-center opacity-50">
          <History size={26} className="text-white" /><span className="text-[8px] font-bold mt-1">HISTORY</span>
        </button>
        <button onClick={() => navigate('/VaultScreen')} className="flex flex-col items-center opacity-50">
          <User size={26} className="text-white" /><span className="text-[8px] font-bold mt-1">PROFILE</span>
        </button>
      </footer>

      {/* --- 7. سائیڈ بار --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-[#000d08]/90 z-[5002] backdrop-blur-md" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 w-80 light-gold-shiny z-[5003] rounded-r-[50px] shadow-2xl flex flex-col">
              
              <div className="p-8 border-b border-[#4b3c00]/10 flex flex-col items-center">
                <div className="relative group cursor-pointer active:scale-95 transition-all">
                  <div className="w-28 h-28 bg-[#000d08] rounded-full border-4 border-[#4b3c00] overflow-hidden flex items-center justify-center shadow-xl">
                    <User size={50} className="text-gold/20" />
                  </div>
                  <div className="absolute bottom-0 right-0 p-2 bg-gold rounded-full text-[#4b3c00] shadow-lg border-2 border-[#f9f295]"><Camera size={18} /></div>
                </div>
                <h2 className="mt-4 text-xl font-black text-[#4b3c00] uppercase tracking-tighter">Tezro User</h2>
                <div onClick={() => { navigate('/FinanceHub'); setIsSidebarOpen(false); }} className="mt-2 bg-[#000d08]/10 px-6 py-2 rounded-2xl border border-[#4b3c00]/20 flex flex-col items-center cursor-pointer active:bg-gold/30">
                  <span className="text-[10px] font-bold text-[#4b3c00]/60 uppercase">Wallet Balance</span>
                  <span className="text-lg font-black text-black">{balance} PKR</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar">
                {/* پروفیشنل سروسز بٹنز */}
                {['Doctor', 'Carpenter', 'Painter', 'Plumber', 'Mason', 'Electrician'].map((service) => (
                  <div key={service} onClick={() => { navigate('/pro-help'); setIsSidebarOpen(false); }} className="flex justify-between items-center p-4 bg-[#000d08]/5 rounded-2xl border border-white/20 active:bg-white/20 transition-all cursor-pointer shadow-sm">
                    <span className="text-sm font-black text-[#4b3c00] uppercase">{service}</span>
                    <ChevronRight size={18} className="text-[#4b3c00]" />
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-[#4b3c00]/10">
                <button onClick={() => window.location.reload()} className="w-full flex items-center justify-center gap-3 py-3 bg-[#000d08] text-gold rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                   Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- کسٹم CSS --- */}
      <style jsx>{`
        .light-gold-shiny {
          background: linear-gradient(135deg, #d4af37 0%, #f9f295 45%, #e6be8a 100%);
        }
        .green-shiny {
          background: linear-gradient(135deg, #004d26 0%, #00cc66 50%, #004d26 100%);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default HomeScreen;
