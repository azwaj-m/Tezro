import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, ShieldCheck, Wallet, MapPin, Settings, 
  LogOut, ChevronRight, Camera, Star, Award, 
  Globe, BellRing, PhoneCall, Fingerprint 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VaultScreen = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Personal Info', icon: <User size={20}/>, desc: 'Name, Email, Phone' },
    { title: 'My Wallet', icon: <Wallet size={20}/>, desc: 'Manage payments & cards' },
    { title: 'Security & Vault', icon: <ShieldCheck size={20}/>, desc: 'Fingerprint & Password' },
    { title: 'Saved Addresses', icon: <MapPin size={20}/>, desc: 'Home, Office, Other' },
    { title: 'Notifications', icon: <BellRing size={20}/>, desc: 'Alerts & Messages' },
    { title: 'App Settings', icon: <Settings size={20}/>, desc: 'Theme, Language, Voice' },
  ];

  return (
    <div className="min-h-screen bg-[#000d08] text-white pb-10">
      
      {/* 1. پروفائل ہیڈر مع تصویر */}
      <div className="relative h-80 royal-gold-shiny rounded-b-[60px] flex flex-col items-center justify-center shadow-2xl">
        <button onClick={() => navigate(-1)} className="absolute top-12 left-6 bg-black/20 p-2 rounded-full text-[#4b3c00]">
          <ChevronRight className="rotate-180" size={28} />
        </button>

        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-[#4b3c00] p-1 overflow-hidden bg-black">
            <img src="/assets/logo.png" className="w-full h-full object-contain opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
               <User size={60} className="text-gold/20" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-[#4b3c00] p-2 rounded-full border-2 border-gold shadow-lg">
            <Camera size={18} className="text-white" />
          </button>
        </div>

        <h1 className="mt-4 text-2xl font-black text-[#4b3c00] uppercase tracking-tighter">Tezro User</h1>
        <div className="flex items-center gap-2 mt-1 bg-black/10 px-4 py-1 rounded-full border border-[#4b3c00]/20">
          <Award size={14} className="text-[#4b3c00]" />
          <span className="text-[10px] font-bold text-[#4b3c00] uppercase">Elite Member</span>
        </div>
      </div>

      {/* 2. ٹرسٹ سکور اور سٹیٹس کارڈز */}
      <div className="px-6 -mt-10 grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-gold/30 p-4 rounded-3xl shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <Star size={16} className="text-gold" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">Trust Score</span>
          </div>
          <h2 className="text-xl font-black text-white italic">98%</h2>
        </div>
        <div className="bg-zinc-900 border border-gold/30 p-4 rounded-3xl shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <Fingerprint size={16} className="text-gold" />
            <span className="text-[10px] text-gray-500 font-bold uppercase">Security</span>
          </div>
          <h2 className="text-xl font-black text-green-500 italic">Active</h2>
        </div>
      </div>

      {/* 3. مینیو لسٹ */}
      <div className="mt-8 px-6 space-y-4">
        {menuItems.map((item, index) => (
          <motion.div 
            key={index}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-5 bg-zinc-900/50 border border-white/5 rounded-[30px] hover:border-gold/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-200">{item.title}</h3>
                <p className="text-[9px] text-gray-500 uppercase font-medium">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-600" />
          </motion.div>
        ))}
      </div>

      {/* 4. لاگ آؤٹ بٹن */}
      <div className="mt-10 px-10">
        <button 
          onClick={() => window.location.reload()}
          className="w-full py-4 rounded-2xl bg-red-900/20 border border-red-900/40 text-red-500 font-black text-xs uppercase tracking-[3px] flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <LogOut size={18} /> End Session
        </button>
        <p className="text-center text-[9px] text-gray-600 mt-6 uppercase font-bold tracking-widest">
          Tezro Super App v1.0.4
        </p>
      </div>

    </div>
  );
};

export default VaultScreen;
