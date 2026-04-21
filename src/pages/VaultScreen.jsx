import { useWallet } from '../context/WalletContext';
import { useWallet } from "../context/WalletContext";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Wallet, MapPin, Settings, LogOut, ChevronRight, Camera, Star, Award, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VaultScreen = () => { const { balance } = useWallet();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false); // یہ خاموشی سے تبدیل ہوگا

  // پسِ منظر میں خفیہ شناخت (Invisible Verification)
  useEffect(() => {
    const timer = setTimeout(() => {
      // یہاں کیمرہ خاموشی سے مالک کی شناخت کرے گا
      // ہم فرض کر رہے ہیں کہ مالک کی شناخت ہوگئی
      setIsOwner(true); 
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { title: 'Personal Info', icon: <User size={20}/>, desc: 'Name, Email, Phone', hideInGuest: false },
    { title: 'My Wallet', icon: <Wallet size={20}/>, desc: `Current Balance: ${balance} PKR`, hideInGuest: true },
    { title: 'Security & Vault', icon: <ShieldCheck size={20}/>, desc: 'Fingerprint & Password', hideInGuest: true },
    { title: 'Saved Addresses', icon: <MapPin size={20}/>, desc: 'Home, Office, Other', hideInGuest: false },
    { title: 'App Settings', icon: <Settings size={20}/>, desc: 'Theme, Language, Voice', hideInGuest: false },
  ];

  return (
    <div className="min-h-screen bg-[#000d08] text-white pt-28 pb-24">
      
      {/* ہیڈر - ہمیشہ نظر آئے گا */}
      <div className="mx-6 dark-gold-shiny rounded-[40px] p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
        <div className="w-24 h-24 rounded-full border-4 border-black/20 p-1 bg-black flex items-center justify-center">
          <User size={40} className="text-white/20" />
        </div>
        <h1 className="mt-4 text-xl font-black text-black uppercase tracking-tighter">Tezro User</h1>
        <div className="mt-1 bg-black/20 px-4 py-1 rounded-full border border-black/10">
          <span className="text-[10px] font-bold text-black uppercase">Standard Profile</span>
        </div>
      </div>

      {/* ٹرسٹ کارڈ - صرف مالک کو اصل ویلیو دکھائے گا */}
      <div className="px-6 mt-6 grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-4 rounded-3xl border border-white/5">
          <p className="text-[8px] text-gray-500 font-black uppercase">Activity Level</p>
          <h2 className="text-lg font-black italic">{isOwner ? '98%' : 'High'}</h2>
        </div>
        <div className="bg-zinc-900/50 p-4 rounded-3xl border border-white/5">
          <p className="text-[8px] text-gray-500 font-black uppercase">System Status</p>
          <h2 className="text-lg font-black text-green-500 italic">Secure</h2>
        </div>
      </div>

      {/* مینیو لسٹ - انکولی (Adaptive) */}
      <div className="mt-8 px-6 space-y-3">
        {menuItems.map((item, index) => {
          // اگر گیسٹ ہے اور آئٹم حساس ہے تو اسے ڈیزائن میں شامل نہ کریں یا متبادل دکھائیں
          if (!isOwner && item.hideInGuest) return null;

          return (
            <motion.div 
              key={index}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-5 bg-zinc-900/30 border border-white/5 rounded-[30px] hover:border-gold/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-2xl text-gold">{item.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-gray-200">{item.title}</h3>
                  <p className="text-[9px] text-gray-500 uppercase">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-700" />
            </motion.div>
          );
        })}
      </div>

      {/* اگر گیسٹ ہے تو اسے "بیزار" کرنے کے لیے کچھ ڈمی بٹنز */}
      {!isOwner && (
        <div className="mt-4 px-6 opacity-40">
           <div className="p-5 bg-zinc-900/10 border border-dashed border-white/10 rounded-[30px] flex items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-gray-600 italic">Syncing more features...</span>
           </div>
        </div>
      )}

      {/* سیشن بٹن */}
      <div className="mt-10 px-10">
        <button onClick={() => window.location.reload()} className="w-full py-4 rounded-2xl bg-red-900/5 border border-red-900/10 text-red-900 font-black text-[10px] uppercase tracking-widest">
          Close Profile
        </button>
      </div>

    </div>
  );
};

export default VaultScreen;
