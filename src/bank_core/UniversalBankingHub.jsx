import React, { useState } from 'react';
import TezroVirtualCard from '../components/TezroVirtualCard';

const services = {
    payments: [
        { id: 'utility', label: 'Utility', icon: '💡' },
        { id: 'gov', label: 'Govt', icon: '🏛️' },
        { id: 'mobile', label: 'Load', icon: '📲' }
    ],
    lifestyle: [
        { id: 'tickets', label: 'Tickets', icon: '🎫', options: ['Bus', 'Cinema', 'Flights'] }
    ]
};

const UniversalBankingHub = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#F3E5AB] pb-24">
            <header className="p-8 bg-black border-b border-[#D4AF37]/20 rounded-b-[40px] shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black tracking-[3px] text-[#D4AF37]">TEZRO VAULT</span>
                    <span className="text-[#39FF14] text-[9px] bg-[#39FF14]/10 px-2 py-1 rounded-full font-bold">SCORE: 850</span>
                </div>
                <h1 className="text-3xl font-black text-white">Rs. 1,250,500</h1>
            </header>

            <main className="p-6">
                <TezroVirtualCard />

                <div className="mt-8">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Financial Matrix</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {services.payments.map(s => (
                            <button key={s.id} className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 bg-[#111] border border-white/5 rounded-2xl flex items-center justify-center text-xl group-active:scale-90 transition-all">
                                    {s.icon}
                                </div>
                                <span className="text-[9px] font-bold text-gray-400">{s.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
