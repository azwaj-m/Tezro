import React, { useState, useEffect } from 'react';
import { QuantumSecurity } from '../security/QuantumSecurity';
import { motion } from 'framer-motion';

const TezroVirtualCard = ({ cardData }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [dynamicCVV, setDynamicCVV] = useState('***');
    const [isLocked, setIsLocked] = useState(false);

    // 🛡️ Dynamic CVV Logic (ہر 60 سیکنڈ بعد تبدیلی)
    useEffect(() => {
        const interval = setInterval(() => {
            const newCVV = Math.floor(100 + Math.random() * 900);
            setDynamicCVV(newCVV);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 max-w-md mx-auto">
            {/* 3D Card Animation */}
            <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full h-56 rounded-[30px] cursor-pointer preserve-3d transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
            >
                {/* Front Side: Branding & Number */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-[#D4AF37]/30 p-8 rounded-[30px] backface-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    <div className="flex justify-between items-start">
                        <h2 className="text-[#D4AF37] font-black italic tracking-widest">TEZRO PLATINUM</h2>
                        <img src="/visa_logo_gold.png" className="h-6 opacity-80" alt="Visa" />
                    </div>
                    <div className="mt-12">
                        <p className="text-2xl font-black tracking-[4px] text-white">
                            {isLocked ? "**** **** **** ****" : "4532 •••• •••• 8890"}
                        </p>
                    </div>
                    <div className="mt-8 flex justify-between items-end">
                        <div>
                            <p className="text-[8px] text-gray-500 uppercase font-bold">Card Holder</p>
                            <p className="text-xs font-bold text-[#F3E5AB]">ABDUL REHMAN</p>
                        </div>
                        <div>
                            <p className="text-[8px] text-gray-500 uppercase font-bold">Expiry</p>
                            <p className="text-xs font-bold text-white">08/29</p>
                        </div>
                    </div>
                </div>

                {/* Back Side: Magnetic Strip & Dynamic CVV */}
                <div className="absolute inset-0 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[30px] rotate-y-180 backface-hidden p-8">
                    <div className="w-full h-12 bg-black mt-4"></div>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="bg-white/10 w-32 h-10 rounded flex items-center justify-end px-4">
                            <span className="text-black bg-[#D4AF37] px-2 py-1 rounded font-black text-sm italic">
                                CVV: {dynamicCVV}
                            </span>
                        </div>
                        <p className="text-[7px] text-gray-600 uppercase">This code changes every 60 seconds for your protection.</p>
                    </div>
                </div>
            </motion.div>

            {/* ⚙️ Programmable Controls (Standard Quality) */}
            <div className="mt-10 space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                        <p className="text-sm font-bold text-white">Card Kill-Switch</p>
                        <p className="text-[10px] text-gray-500 italic">Instantly freeze all transactions</p>
                    </div>
                    <input type="checkbox" checked={isLocked} onChange={() => setIsLocked(!isLocked)} className="toggle-gold" />
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                        <p className="text-sm font-bold text-white">E-Commerce Limit</p>
                        <p className="text-[10px] text-gray-500">Max Rs. 50,000 per transaction</p>
                    </div>
                    <span className="text-[#D4AF37] font-black text-xs">ADJUST</span>
                </div>
            </div>
        </div>
    );
};

export default TezroVirtualCard;
