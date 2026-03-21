import React, { useState } from 'react';
import { Smartphone, Globe, Wifi, ArrowLeft } from 'lucide-react';

const MobileRecharge = () => {
  const [category, setCategory] = useState('mobile'); // mobile or internet
  const [selectedId, setSelectedId] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');

  // موبائل نیٹ ورکس کا ڈیٹا
  const mobileOperators = [
    { id: 'jazz', name: 'Jazz', color: '#ed1c24', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Jazz_logo.svg/1200px-Jazz_logo.svg.png' },
    { id: 'telenor', name: 'Telenor', color: '#00a1e1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Telenor_Logo.svg/1200px-Telenor_Logo.svg.png' },
    { id: 'zong', name: 'Zong', color: '#8cc63f', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Zong_Logo.svg/1200px-Zong_Logo.svg.png' },
    { id: 'ufone', name: 'Ufone', color: '#f58220', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Ufone_Logo.svg/1200px-Ufone_Logo.svg.png' }
  ];

  // انٹرنیٹ ڈیوائسز کا ڈیٹا
  const internetProviders = [
    { id: 'ptcl', name: 'PTCL', color: '#006a33', logo: 'https://upload.wikimedia.org/wikipedia/en/d/db/PTCL_logo.png' },
    { id: 'stormfiber', name: 'StormFiber', color: '#000000', logo: 'https://www.stormfiber.com/wp-content/uploads/2021/08/SF-Logo.png' },
    { id: 'nayatel', name: 'Nayatel', color: '#ed1b24', logo: 'https://nayatel.com/wp-content/uploads/2020/02/nayatel-logo.png' },
    { id: 'wi-tribe', name: 'Wi-Tribe', color: '#bf1e2e', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Wi-tribe_logo.png' }
  ];

  const currentList = category === 'mobile' ? mobileOperators : internetProviders;

  return (
    <div className="p-6 bg-[#070707] rounded-[32px] border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-md mx-auto">
      
      {/* 1. Header & Tabs */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white italic tracking-tighter">Tezro <span className="text-[#D4AF37]">Recharge</span></h2>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setCategory('mobile')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${category === 'mobile' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500'}`}
          >
            MOBILE
          </button>
          <button 
            onClick={() => setCategory('internet')}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${category === 'internet' ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500'}`}
          >
            DEVICES
          </button>
        </div>
      </div>

      {/* 2. Brand Grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {currentList.map((op) => (
          <div 
            key={op.id}
            onClick={() => setSelectedId(op.id)}
            className={`group relative p-2 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${selectedId === op.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-105' : 'border-white/5 bg-white/5 opacity-60'}`}
          >
            <div className="w-12 h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center p-1 shadow-inner">
               <img src={op.logo} alt={op.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[9px] font-black text-white uppercase tracking-wider">{op.name}</span>
            {selectedId === op.id && <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39FF14] rounded-full border-2 border-black animate-pulse"></div>}
          </div>
        ))}
      </div>

      {/* 3. Input Section */}
      <div className="space-y-5">
        <div className="relative group">
          <label className="text-[10px] text-[#D4AF37] font-bold uppercase ml-2 mb-1 block">Recipient Number / Account ID</label>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-[#D4AF37] transition-all">
            {category === 'mobile' ? <Smartphone size={20} className="text-gray-500 mr-3" /> : <Wifi size={20} className="text-gray-500 mr-3" />}
            <input 
              type="text" 
              placeholder={category === 'mobile' ? "03xx xxxxxxx" : "Account Number"} 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent w-full text-white outline-none font-bold placeholder:text-gray-700"
            />
          </div>
        </div>
        
        <div className="relative group">
          <label className="text-[10px] text-[#39FF14] font-bold uppercase ml-2 mb-1 block">Recharge Amount</label>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-[#39FF14] transition-all">
            <span className="text-[#39FF14] font-black mr-2">PKR</span>
            <input 
              type="number" 
              placeholder="Min 100" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent w-full text-white text-2xl font-black outline-none italic placeholder:text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* 4. Action Button */}
      <button 
        disabled={!selectedId || !amount || !phone}
        className={`w-full mt-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${(!selectedId || !amount || !phone) ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] active:scale-95'}`}
      >
        <span>Confirm Payment</span>
        <div className="h-4 w-[1px] bg-black/20"></div>
        <span>Rs. {amount || '0'}</span>
      </button>

      <p className="text-center text-[8px] text-gray-600 mt-6 uppercase tracking-[3px]">Powered by Tezro Vault Secure API</p>
    </div>
  );
};

export default MobileRecharge;
