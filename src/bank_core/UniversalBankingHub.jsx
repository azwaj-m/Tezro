import React, { useState } from 'react';
import { SilentAuthenticator } from '../security/SilentAuthenticator';
import { TezroVaultLedger } from './TezroVaultLedger';

const UniversalBankingHub = () => {
    const [activeService, setActiveService] = useState('home');

    // 📱 سروسز کی کیٹیگریز (The Organized Matrix)
    const services = {
        payments: [
            { id: 'utility', label: 'Utility Bills', icon: '💡', providers: ['LESCO', 'SNGPL', 'PTCL'] },
            { id: 'gov', label: 'Govt Payments', icon: '🏛️', providers: ['FBR Tax', 'Challan', 'Passport'] },
            { id: 'mobile', label: 'Mobile Load', icon: '📲', providers: ['Jazz', 'Zong', 'Telenor', 'Ufone'] }
        ],
        lifestyle: [
            { id: 'tickets', label: 'Ticketing', icon: '🎫', options: ['Bus', 'Cinema', 'Flights'] },
            { id: 'education', label: 'Education', icon: '🎓', options: ['School Fee', 'Uni Fund'] }
        ]
    };

    // 🔒 سیکیور ادائیگی کا فنکشن (With Behavioral Lock)
    const handleUniversalPay = async (amount, type) => {
        // خاموش تصدیق (Behavioral Check)
        const isSecure = SilentAuthenticator.analyzePattern(); 
        
        if (!isSecure) {
            alert("Security Handshake Required: Biometric Lock Engaged.");
            return;
        }

        try {
            await TezroVaultLedger.executeSecureTransfer('USER_ID', type, amount, 'BILL_PAYMENT');
            alert("Transaction Authorized & Ledger Updated.");
        } catch (err) {
            console.error("Vault Error:", err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#F3E5AB] pb-20 font-sans">
            
            {/* 1. پریمیم والٹ کارڈ (The Bank Header) */}
            <header className="p-8 bg-gradient-to-br from-[#111] to-black border-b border-[#D4AF37]/20 rounded-b-[40px] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black tracking-[4px] text-[#D4AF37]">TEZRO MICROFINANCE</span>
                    <span className="text-[#39FF14] text-[10px] bg-[#39FF14]/10 px-3 py-1 rounded-full font-bold">● LIVE SCORE: 850</span>
                </div>
                <h1 className="text-4xl font-black text-white mb-1">Rs. 1,250,500</h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Available Credit Limit: Rs. 50,000</p>
            </header>

            {/* 2. کوئیک ایکشنز (Payments & Load) */}
            <main className="p-6">
                <div className="mb-8">
                    <h3 className="text-xs font-black text-gray-600 uppercase mb-4 tracking-widest">Financial Services</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {services.payments.map(s => (
                            <button key={s.id} onClick={() => setActiveService(s.id)} className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 bg-[#111] border border-white/5 rounded-2xl flex items-center justify-center text-2xl group-hover:border-[#D4AF37] transition-all">
                                    {s.icon}
                                </div>
                                <span className="text-[9px] font-bold uppercase text-gray-400 group-hover:text-white">{s.label}</span>
                            </button>
                        ))}
                        <button className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-2xl">➕</div>
                            <span className="text-[9px] font-bold uppercase text-[#D4AF37]">More</span>
                        </button>
                    </div>
                </div>

                {/* 3. ٹکٹنگ اور لائف سٹائل (Tickets & Travel) */}
                <div className="mb-8">
                    <h3 className="text-xs font-black text-gray-600 uppercase mb-4 tracking-widest">Travel & Booking</h3>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                        {services.lifestyle[0].options.map(opt => (
                            <div key={opt} className="min-w-[140px] bg-[#111] p-5 rounded-[25px] border border-white/5 hover:border-[#D4AF37]/40 transition-all cursor-pointer">
                                <span className="text-2xl mb-3 block">🎫</span>
                                <p className="text-xs font-black text-white mb-1">{opt} Booking</p>
                                <p className="text-[9px] text-[#39FF14]">Instant Cashback</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. انویسٹمنٹ اور سیونگ (Auto-Investment) */}
                <div className="bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-6 rounded-[30px] border border-[#D4AF37]/30">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-sm font-black text-white uppercase">Smart Investment</h4>
                            <p className="text-[10px] text-gray-400 mt-1">Earn 12.5% daily profit on your idle balance.</p>
                        </div>
                        <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase">Activate</button>
                    </div>
                </div>
            </main>

            {/* 5. سمارٹ نیوی گیشن (The Vault Navigation) */}
            <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/5 px-8 py-4 flex justify-between items-center z-50">
                <span className="text-xl opacity-100 text-[#D4AF37]">🏠</span>
                <span className="text-xl opacity-40">📊</span>
                <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] -mt-10 border-4 border-black">
                    QR
                </div>
                <span className="text-xl opacity-40">💳</span>
                <span className="text-xl opacity-40">⚙️</span>
            </nav>
        </div>
    );
};

export default UniversalBankingHub;
