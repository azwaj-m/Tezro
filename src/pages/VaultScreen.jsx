import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ShieldCheck, Wallet, MapPin, Settings, 
  LogOut, ChevronRight, Camera, Star, Award, 
  Globe, BellRing, Fingerprint, Save, X, CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VaultScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null); // کنٹرول کرتا ہے کہ کون سا مینیو کھلا ہے

  // یوزر ڈیٹا کی اسٹیٹ
  const [userData, setUserData] = useState({
    name: 'Tezro User',
    email: 'user@tezro.app',
    phone: '+92 300 1234567',
    address: 'Gulshan-e-Iqbal, Karachi',
    language: 'Urdu',
    voiceActive: true
  });

  const menuItems = [
    { id: 'personal', title: 'Personal Info', icon: <User size={20}/>, desc: 'Name, Email, Phone' },
    { id: 'wallet', title: 'My Wallet', icon: <Wallet size={20}/>, desc: 'Manage payments & cards' },
    { id: 'security', title: 'Security & Vault', icon: <ShieldCheck size={20}/>, desc: 'Fingerprint & Password' },
    { id: 'address', title: 'Saved Addresses', icon: <MapPin size={20}/>, desc: 'Home, Office, Other' },
    { id: 'notifications', title: 'Notifications', icon: <BellRing size={20}/>, desc: 'Alerts & Messages' },
    { id: 'settings', title: 'App Settings', icon: <Settings size={20}/>, desc: 'Theme, Language, Voice' },
  ];

  // سیٹنگز موڈل (Settings Modal)
  const renderModal = () => (
    <AnimatePresence>
      {activeTab && (
        <motion.div 
          initial={{ y: '100%' }} 
          animate={{ y: 0 }} 
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[4000] bg-[#000d08] p-8 flex flex-col"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-gold uppercase italic">{activeTab.replace(/^\w/, c => c.toUpperCase())}</h2>
            <button onClick={() => setActiveTab(null)} className="p-2 bg-white/5 rounded-full"><X size={24} /></button>
          </div>

          <div className="flex-1 space-y-6">
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <div><label className="text-[10px] text-gold font-bold ml-2">FULL NAME</label>
                <input type="text" value={userData.name} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-gold" /></div>
                <div><label className="text-[10px] text-gold font-bold ml-2">EMAIL ADDRESS</label>
                <input type="email" value={userData.email} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-gold" /></div>
                <div><label className="text-[10px] text-gold font-bold ml-2">PHONE</label>
                <input type="text" value={userData.phone} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-gold" /></div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-zinc-800 to-black p-6 rounded-[30px] border border-gold/20 shadow-2xl">
                  <div className="flex justify-between items-start mb-8"><CreditCard className="text-gold" size={32} /><h3 className="font-bold italic">TEZRO PAY</h3></div>
                  <p className="text-xl font-mono tracking-widest mb-2">**** **** **** 8890</p>
                  <div className="flex justify-between"><span className="text-xs opacity-50 uppercase">Balance</span><span className="text-gold font-black">PKR 24,500</span></div>
                </div>
                <button className="w-full py-4 royal-gold-shiny rounded-2xl text-black font-black text-xs uppercase">+ Add New Card</button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <span className="font-bold">Voice Assistance</span>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${userData.voiceActive ? 'bg-green-600' : 'bg-zinc-700'}`} onClick={() => setUserData({...userData, voiceActive: !userData.voiceActive})}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${userData.voiceActive ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl flex justify-between"><span>App Language</span><span className="text-gold font-bold">{userData.language}</span></div>
              </div>
            )}
          </div>

          <button onClick={() => setActiveTab(null)} className="w-full py-5 royal-gold-shiny rounded-[25px] text-black font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <Save size={20} /> Save Changes
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-[#000d08] text-white pb-32 overflow-x-hidden">
      
      {/* پروفائل ہیڈر */}
      <div className="relative h-80 royal-gold-shiny rounded-b-[60px] flex flex-col items-center justify-center shadow-2xl">
        <button onClick={() => navigate(-1)} className="absolute top-12 left-6 bg-black/20 p-2 rounded-full text-[#4b3c00]"><ChevronRight className="rotate-180" size={28} /></button>
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-[#4b3c00] p-1 overflow-hidden bg-black flex items-center justify-center">
            <User size={60} className="text-gold/20" />
          </div>
          <button className="absolute bottom-0 right-0 bg-[#4b3c00] p-2 rounded-full border-2 border-gold shadow-lg"><Camera size={18} className="text-white" /></button>
        </div>
        <h1 className="mt-4 text-2xl font-black text-[#4b3c00] uppercase tracking-tighter">{userData.name}</h1>
        <div className="flex items-center gap-2 mt-1 bg-black/10 px-4 py-1 rounded-full border border-[#4b3c00]/20">
          <Award size={14} className="text-[#4b3c00]" /><span className="text-[10px] font-bold text-[#4b3c00] uppercase">Elite Member</span>
        </div>
      </div>

      {/* اسٹیٹس کارڈز */}
      <div className="px-6 -mt-10 grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-gold/30 p-4 rounded-3xl shadow-xl flex items-center justify-between">
          <div><p className="text-[8px] text-gray-500 font-black uppercase">Trust Score</p><h2 className="text-xl font-black italic">98%</h2></div>
          <Star size={24} className="text-gold fill-gold" />
        </div>
        <div className="bg-zinc-900 border border-gold/30 p-4 rounded-3xl shadow-xl flex items-center justify-between">
          <div><p className="text-[8px] text-gray-500 font-black uppercase">Status</p><h2 className="text-xl font-black text-green-500 italic">Active</h2></div>
          <Fingerprint size={24} className="text-gold" />
        </div>
      </div>

      {/* مینیو لسٹ */}
      <div className="mt-8 px-6 space-y-4">
        {menuItems.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab(item.id)}
            className="flex items-center justify-between p-5 bg-zinc-900/40 border border-white/5 rounded-[30px] active:border-gold transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gold/10 rounded-2xl text-gold">{item.icon}</div>
              <div><h3 className="text-sm font-bold text-gray-200">{item.title}</h3><p className="text-[9px] text-gray-500 uppercase font-medium">{item.desc}</p></div>
            </div>
            <ChevronRight size={18} className="text-gray-600" />
          </motion.div>
        ))}
      </div>

      {/* سیشن کنٹرول */}
      <div className="mt-10 px-10 mb-20">
        <button onClick={() => window.location.reload()} className="w-full py-4 rounded-2xl bg-red-900/10 border border-red-900/30 text-red-500 font-black text-xs uppercase tracking-[3px] flex items-center justify-center gap-3">
          <LogOut size={18} /> End Session
        </button>
      </div>

      {renderModal()}
    </div>
  );
};

export default VaultScreen;
