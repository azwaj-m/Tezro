import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'; // لیف لیٹ میپ
import { VoiceGuardianEngine } from '../../security/VoiceGuardianEngine';

const TezroMainLayout = () => {
    const [activeService, setActiveService] = useState('all');

    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col">
            
            {/* 🔝 پریمیم ہیڈر */}
            <header className="p-5 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-[1000] border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center font-black text-black">T</div>
                    <h1 className="text-xl font-black italic tracking-tighter">TEZRO <span className="text-[#D4AF37]">.</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-[8px] font-bold text-[#39FF14] border border-[#39FF14]/30 px-2 py-1 rounded">VOICE SECURE</div>
                    <button className="text-2xl">👤</button>
                </div>
            </header>

            {/* 🔍 سمارٹ سرچ اور سروس بٹنز */}
            <section className="p-6 bg-gradient-to-b from-[#050505] to-black">
                <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder={`Search in ${activeService}...`} 
                        className="w-full bg-[#111] border border-white/10 p-5 rounded-3xl text-sm focus:border-[#D4AF37] outline-none transition-all pl-12"
                    />
                    <span className="absolute left-4 top-5 opacity-40">🔍</span>
                </div>

                {/* سروس فلٹرز (Buttons) */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {['Banking', 'Food', 'Ride', 'Parcel', 'Govt', 'Tickets'].map(service => (
                        <button 
                            key={service}
                            onClick={() => setActiveService(service)}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeService === service ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-gray-400 border border-white/5'
                            }`}
                        >
                            {service}
                        </button>
                    ))}
                </div>
            </section>

            {/* 📍 لیف لیٹ لائیو میپ (The Heart) */}
            <section className="flex-1 relative">
                <div className="absolute inset-0 z-0">
                    <MapContainer center={[31.4504, 73.1350]} zoom={13} style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </MapContainer>
                </div>

                {/* 🛡️ میپ پر لائیو سیکیورٹی اوورلے */}
                <div className="absolute bottom-10 left-6 z-10 space-y-3">
                    <div className="bg-black/80 backdrop-blur-xl p-4 rounded-[30px] border border-[#D4AF37]/20 shadow-2xl">
                        <p className="text-[8px] text-[#D4AF37] font-black mb-1">LIVE THREAT MONITOR</p>
                        <p className="text-[10px] text-[#39FF14]">● No Anomalies Detected</p>
                    </div>
                </div>
            </section>

            {/* 📱 نیوی گیشن اور فوٹر بٹنز */}
            <footer className="bg-black/90 backdrop-blur-2xl border-t border-white/5 p-6 flex justify-around items-center sticky bottom-0">
                <button className="flex flex-col items-center gap-1 opacity-100">
                    <span className="text-xl">🏠</span>
                    <span className="text-[8px] font-bold text-[#D4AF37]">HOME</span>
                </button>
                <button className="flex flex-col items-center gap-1 opacity-40">
                    <span className="text-xl">🏦</span>
                    <span className="text-[8px] font-bold">BANK</span>
                </button>
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full -mt-16 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] border-4 border-[#020202]">
                    <span className="text-2xl">🎤</span> {/* وائس کمانڈ بٹن */}
                </div>
                <button className="flex flex-col items-center gap-1 opacity-40">
                    <span className="text-xl">📦</span>
                    <span className="text-[8px] font-bold">ORDERS</span>
                </button>
                <button className="flex flex-col items-center gap-1 opacity-40">
                    <span className="text-xl">⚙️</span>
                    <span className="text-[8px] font-bold">VAULT</span>
                </button>
            </footer>
        </div>
    );
};

export default TezroMainLayout;
