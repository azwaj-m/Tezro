import React, { useState } from 'react';
import { Zap, Droplets, Flame, Wifi, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { billProviders } from '../../../utils/bankData';
import { useWallet } from '../../../context/WalletContext';

const UtilityBills = () => {
  const [category, setCategory] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [consumerId, setConsumerId] = useState('');
  const { executePayment } = useWallet();

  const categories = [
    { id: 'بجلی', icon: <Zap size={20}/>, color: 'text-yellow-500' },
    { id: 'گیس', icon: <Flame size={20}/>, color: 'text-orange-500' },
    { id: 'پانی', icon: <Droplets size={20}/>, color: 'text-blue-500' },
    { id: 'انٹرنیٹ', icon: <Wifi size={20}/>, color: 'text-purple-500' }
  ];

  const handleBillPay = async () => {
    if (!consumerId || !selectedProvider) return alert("معلومات مکمل کریں");
    const res = await executePayment(2500, `${selectedProvider.shortName} Bill`);
    if (res?.success) {
      alert(`بل کامیابی سے جمع ہو گیا! ID: ${res.txnId}`);
      setConsumerId('');
      setSelectedProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28 pb-32">
      <h1 className="text-2xl font-black italic text-[#D4AF37] mb-2">BILL <span className="text-white">PAYMENTS</span></h1>
      <p className="text-[10px] text-zinc-500 font-bold uppercase mb-8">Official Payment Gateway</p>

      {!category ? (
        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition-all">
              <div className={`${cat.color}`}>{cat.icon}</div>
              <span className="text-[10px] font-black uppercase tracking-widest">{cat.id}</span>
            </button>
          ))}
        </div>
      ) : !selectedProvider ? (
        <div className="space-y-3">
          <button onClick={() => setCategory(null)} className="text-zinc-500 text-[10px] font-black mb-4 uppercase">← واپس جائیں</button>
          {billProviders[category].map(provider => (
            <div key={provider.id} onClick={() => setSelectedProvider(provider)} className="bg-zinc-900/60 border border-white/5 p-5 rounded-3xl flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <img src={provider.logo} className="w-10 h-10 rounded-xl bg-white p-1" alt={provider.shortName} />
                <span className="font-bold text-sm">{provider.name}</span>
              </div>
              <ArrowRight size={16} className="text-zinc-700" />
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4">
           <button onClick={() => setSelectedProvider(null)} className="text-zinc-500 text-[10px] font-black mb-6 uppercase">← پرووائیڈر تبدیل کریں</button>
           <div className="bg-zinc-900 border border-[#D4AF37]/20 p-8 rounded-[3rem] text-center mb-6">
              <img src={selectedProvider.logo} className="w-16 h-16 mx-auto mb-4 rounded-2xl p-2 bg-white" alt="" />
              <h3 className="font-black">{selectedProvider.name}</h3>
              <div className="mt-8 space-y-4 text-left">
                <label className="text-[9px] font-black text-zinc-500 uppercase ml-2">Consumer ID</label>
                <input
                  type="number"
                  value={consumerId}
                  onChange={(e) => setConsumerId(e.target.value)}
                  placeholder="Enter 14-digit ID"
                  className="w-full bg-black/50 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37]"
                />
                <button onClick={handleBillPay} className="w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck size={18}/> Pay Now
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default UtilityBills;
