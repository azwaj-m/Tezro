import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, Mic, Map as MapIcon, Home, User, CreditCard, History, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // کارڈز کا ڈیٹا - آپ کے اثاثوں (Assets) کے ناموں کے مطابق
  const [services, setServices] = useState([
    { id: 1, title: 'Luxury Rides', img: '/assets/V-vip.JPG', path: '/ride', desc: 'Premium Transport Service' },
    { id: 2, title: 'Professional Doctor', img: '/assets/Doctor.jpg', path: '/health', desc: 'Expert Medical Consultation' },
    { id: 3, title: 'Expert Mechanic', img: '/assets/Mechanic.jpg', path: '/pro-help', desc: 'Vehicle Repair & Maintenance' },
    { id: 4, title: 'Home Plumber', img: '/assets/Plumber.jpeg', path: '/pro-help', desc: 'Quick Plumbing Solutions' },
    { id: 5, title: 'Electrician', img: '/assets/Electric.jpeg', path: '/pro-help', desc: 'Electrical Wiring & Repairs' },
  ]);

  const handleSwipe = () => {
    setServices((prev) => {
      const newArr = [...prev];
      const movedCard = newArr.shift(); // پہلا کارڈ نکالا
      newArr.push(movedCard); // اسے سب سے پیچھے لگا دیا
      return newArr;
    });
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white overflow-x-hidden">
      
      {/* 1. شاہانہ گولڈن ہیڈر */}
      <header className="fixed top-0 w-full z-[1000] px-6 py-5 royal-gold-shiny rounded-b-[40px] flex justify-between items-center shadow-2xl">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={30} className="text-[#4b3c00]" />
        </button>
        <img src="/assets/logo.png" className="h-12 w-12 object-contain" alt="Logo" />
        <Bell size={30} className="text-[#4b3c00]" />
      </header>

      <main className="pt-28 px-5">
        
        {/* 2. سرچ انجن */}
        <div className="relative mb-6">
          <div className="flex items-center bg-white/10 border-2 border-gold/30 rounded-full px-4 py-2 backdrop-blur-md">
            <Search className="text-gold" size={20} />
            <input 
              type="text" 
              placeholder="Search for services or locations..." 
              className="flex-1 bg-transparent px-3 py-2 outline-none text-white placeholder:text-gray-400"
            />
            <Mic className="text-gold" size={20} />
          </div>
        </div>

        {/* 3. میپ (Map) */}
        <div className="h-56 w-full rounded-[40px] overflow-hidden border-4 border-gold/20 shadow-xl mb-8">
          <MapContainer center={[30.3753, 69.3451]} zoom={5} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>

        {/* 4. اسٹیکڈ سوئپ کارڈز (ایک دوسرے کے پیچھے) */}
        <div className="relative h-96 w-full mt-10" onClick={handleSwipe}>
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1 - index * 0.05, 
                  y: index * -15, 
                  zIndex: services.length - index,
                  opacity: index > 2 ? 0 : 1 
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-x-0 h-80 rounded-[45px] overflow-hidden raised-card bg-zinc-900 border border-gold/40 shadow-2xl"
              >
                <img src={service.img} className="w-full h-1/2 object-cover opacity-80" alt={service.title} />
                <div className="p-6 flex flex-col justify-between h-1/2 bg-gradient-to-b from-transparent to-black">
                  <div>
                    <h3 className="text-2xl font-black text-gold italic">{service.title}</h3>
                    <p className="text-xs text-gray-300">{service.desc}</p>
                  </div>
                  
                  {/* براہ راست سروس حاصل کرنے کا بٹن */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // سوئپ کو روکنے کے لیے
                      navigate(service.path);
                    }}
                    className="w-full py-4 royal-gold-shiny rounded-2xl text-black font-black text-sm uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    براہ راست سروس حاصل کریں
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* 5. شاہانہ فوٹر */}
      <footer className="fixed bottom-0 w-full h-24 royal-gold-shiny rounded-t-[50px] flex justify-between items-center px-10 z-[1000]">
        <Home size={32} className="text-[#4b3c00]" />
        <CreditCard size={32} className="text-[#4b3c00]/40" />
        <div className="w-20 h-20 bg-white rounded-full -translate-y-10 border-[8px] border-[#000d08] p-2 shadow-2xl">
          <img src="/assets/logo.png" className="w-full h-full object-contain" alt="Center Logo" />
        </div>
        <History size={32} className="text-[#4b3c00]/40" />
        <User size={32} className="text-[#4b3c00]/40" />
      </footer>

      {/* سائیڈ بار (جب مینیو پر کلک ہو) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[2000] backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 royal-gold-shiny z-[2001] rounded-r-[40px] p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-black text-[#4b3c00] mb-8 border-b border-[#4b3c00]/20 pb-4">Our Services</h2>
              <div className="space-y-4 h-[70vh] overflow-y-auto no-scrollbar">
                {['Doctor', 'Electrician', 'Plumber', 'Ride', 'Mechanic', 'Painter', 'Tutor', 'AC Technician'].map((item) => (
                  <div key={item} className="flex justify-between items-center p-4 bg-black/10 rounded-2xl border border-white/10 text-[#4b3c00] font-bold">
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
