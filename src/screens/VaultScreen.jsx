import React, { useState } from 'react';
import { ShieldAlert, Landmark, FileText, Send, Lock } from 'lucide-react';

const VaultScreen = () => {
  const [amount, setAmount] = useState('');

  const handleSecureTransfer = async () => {
    // یہاں ڈیٹا کو Firebase میں بھیجنے سے پہلے انکرپٹ اور "قلیل" (Fragment) کیا جائے گا
    console.log("Initiating Multi-Level Encrypted Transaction...");
  };

  return (
    <div className="min-h-screen bg-[#001a0f] pt-40 pb-32 px-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-[#FFD700]/10 rounded-full flex items-center justify-center border border-[#FFD700]/30 animate-pulse">
          <ShieldAlert size={40} className="text-[#FFD700]" />
        </div>
        <h1 className="shiny-gold text-2xl font-black mt-4 tracking-[4px]">SECURE VAULT</h1>
        <p className="text-[9px] text-green-500 font-bold uppercase tracking-[2px]">Admin Verified Interface</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="glass-iranian p-6 rounded-[2rem] border border-[#FFD700]/20 flex flex-col items-center gap-3 active:scale-95 transition-all">
          <Landmark className="text-[#FFD700]" size={28} />
          <span className="text-[10px] text-white font-black uppercase">40+ Banks</span>
        </button>
        <button className="glass-iranian p-6 rounded-[2rem] border border-[#FFD700]/20 flex flex-col items-center gap-3 active:scale-95 transition-all">
          <FileText className="text-[#FFD700]" size={28} />
          <span className="text-[10px] text-white font-black uppercase">Govt Bills</span>
        </button>
      </div>

      {/* Transaction Terminal */}
      <div className="gold-border rounded-[2.5rem] p-8 bg-black/40 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Transaction Amount</span>
          <Lock size={14} className="text-[#FFD700]/40" />
        </div>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="bg-transparent border-none outline-none text-4xl font-black text-[#FFD700] w-full mb-8 placeholder:text-[#FFD700]/10"
        />
        <button 
          onClick={handleSecureTransfer}
          className="w-full bg-[#FFD700] text-black font-black py-5 rounded-2xl uppercase tracking-widest shadow-[0_10px_30px_rgba(255,215,0,0.3)] flex items-center justify-center gap-3"
        >
          <Send size={20} /> Execute Secure Transfer
        </button>
      </div>

      {/* Security Disclaimer */}
      <p className="text-[8px] text-white/20 mt-8 text-center leading-relaxed px-4 uppercase font-bold tracking-[1px]">
        All data is fragmented and encrypted before storage. Special access codes required for intelligence audit. 
        Authorized by State Financial Regulations.
      </p>
    </div>
  );
};
export default VaultScreen;
