import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TezroVirtualCard = ({ cardData }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [dynamicCVV, setDynamicCVV] = useState('***');
    const [isLocked, setIsLocked] = useState(false);

    // 🛡️ Dynamic CVV (60 سیکنڈز بعد تبدیلی - محفوظ فیچر)
    useEffect(() => {
        const updateCVV = () => {
            setDynamicCVV(Math.floor(100 + Math.random() * 900));
        };
        updateCVV();
        const interval = setInterval(updateCVV, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 sm:p-8 max-w-md mx-auto perspective-1000">
            <motion.div 
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative w-full h-56 rounded-[30px] cursor-pointer preserve-3d shadow-2xl"
            >
                {/* Front Side */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-[#D4AF37]/30 p-8 rounded-[30px] backface-hidden flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <h2 className="text-[#D4AF37] font-black italic tracking-widest text-sm">TEZRO PLATINUM</h2>
                        <div className="h-6 w-10 bg-yellow-500/20 rounded-md border border-yellow-500/40" /> 
                    </div>
                    <p className="text-xl sm:text-2xl font-black tracking-[4px] text-white">
                        {isLocked ? "**** **** **** ****" : "4532 •••• •••• 8890"}
                    </p>
                    <div className="flex justify-between items-end">
                        <div className="text-[10px] uppercase font-bold text-gray-400">
                            <p className="opacity-50">Card Holder</p>
                            <p className="text-[#F3E5AB]">ABDUL REHMAN</p>
                        </div>
                        <div className="text-[10px] uppercase font-bold text-white text-right">
                            <p className="opacity-50">Expiry</p>
                            <p>08/29</p>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[30px] rotate-y-180 backface-hidden overflow-hidden">
                    <div className="w-full h-10 bg-black mt-6" />
                    <div className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 w-24 h-8 rounded flex items-center justify-center">
                                <span className="text-black bg-[#D4AF37] px-2 py-0.5 rounded font-black text-xs italic">
                                    CVV: {dynamicCVV}
                                </span>
                            </div>
                            <p className="text-[7px] text-gray-500 uppercase leading-tight">This code rotates every 60s for quantum security.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Controls */}
            <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-xs font-bold text-white">Card Kill-Switch</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsLocked(!isLocked); }}
                        className={`w-10 h-5 rounded-full transition-colors ${isLocked ? 'bg-red-600' : 'bg-green-600'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isLocked ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};
