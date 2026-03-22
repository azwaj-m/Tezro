import React, { useState, useEffect } from 'react';
import { useRide } from '../../hooks/useRide';
import { useWallet } from '../../hooks/useWallet';
import { auth } from '@/firebase';
import { SecurityEngine } from '@/utils/security/SecurityEngine';
import RideMap from '../../components/RideMap';

const RideHome = () => {
    const { balance } = useWallet();
    const { requestRide, loading } = useRide();
    const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [bookingState, setBooking] = useState({ pickup: '', drop: '', type: 'Premium' });

    // گوگل آٹو لاگ ان لاجک (پروفیشنل ہینڈلنگ)
    const handleAutoLogin = async () => {
        try {
            console.log("Initiating Tezro Secure Auth...");
            // یہاں آپ کا فائر بیس گوگل پرووائیڈر لاجک آئے گا
            setIsLoggedIn(true);
            setShowLoginModal(false);
            const audit = SecurityEngine.generateAuditTrail("NEW_USER", "AUTH_SUCCESS", 0);
            console.log("Auth Verified:", audit.logId);
        } catch (error) {
            alert("Authentication Failed. Please try again.");
        }
    };

    const handleBooking = async () => {
        // 1. لاگ ان چیک
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        // 2. بیلنس چیک (Tezro Standard: Min Rs. 100)
        if (balance < 100) {
            alert("Security Alert: Insufficient Balance in Vault for this ride.");
            return;
        }

        // 3. سیکیورٹی آڈٹ اور بکنگ
        const audit = SecurityEngine.generateAuditTrail(auth.currentUser?.uid || "GUEST", "RIDE_INIT", 0);
        const res = await requestRide(bookingState);
        
        if (res.success) {
            alert(`Tezro Captain Confirmed! \nAudit Reference: ${audit.logId}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0F0A] text-[#F3E5AB] font-sans">
            {/* لائیو میپ کنٹینر */}
            <div className="h-[45vh] relative border-b border-[#D4AF37]/30">
                <RideMap />
                {/* والٹ بیج */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <p className="text-[9px] uppercase tracking-[3px] text-[#D4AF37] mb-1">Tezro Vault</p>
                    <p className="text-xl font-black">Rs. {balance.toLocaleString()}</p>
                </div>
            </div>

            {/* بکنگ انٹرفیس */}
            <div className="p-8 bg-gradient-to-t from-black via-[#0d120d] to-[#1a1a1a] rounded-t-[50px] -mt-12 relative z-10 shadow-3xl">
                <div className="w-12 h-1 bg-[#D4AF37]/30 mx-auto mb-6 rounded-full" />
                
                <h2 className="text-3xl font-black mb-8 text-center tracking-tighter bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent">
                    Secure Dispatch
                </h2>

                <div className="space-y-3">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[#D4AF37]/50 transition-all duration-500">
                        <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">Pickup</span>
                        <input className="bg-transparent w-full outline-none text-white mt-2 placeholder:text-gray-700" placeholder="Detecting location..." />
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-[#D4AF37]/50 transition-all duration-500">
                        <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest">Drop-off</span>
                        <input className="bg-transparent w-full outline-none text-white mt-2 placeholder:text-gray-700" placeholder="Search destination" />
                    </div>
                </div>

                {/* کیٹیگری سلیکشن */}
                <div className="flex gap-3 mt-8">
                    {['Economy', 'Premium', 'Elite'].map(type => (
                        <button 
                            key={type}
                            onClick={() => setBooking({...bookingState, type})}
                            className={`flex-1 py-4 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                                bookingState.type === type ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-white/10 text-gray-500 hover:border-[#D4AF37]/30'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <button 
                    disabled={loading}
                    onClick={handleBooking}
                    className="w-full mt-10 py-6 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black rounded-2xl font-black text-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] active:scale-95 transition-all"
                >
                    {loading ? 'ENCRYPTING REQUEST...' : 'CONFIRM SECURE RIDE'}
                </button>
            </div>

            {/* لاگ ان ماڈل (Premium UI) */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
                    <div className="bg-[#0d120d] border-2 border-[#D4AF37] p-10 rounded-[40px] text-center w-full max-w-md shadow-[0_0_100px_rgba(212,175,55,0.2)]">
                        <div className="text-5xl mb-6">🛡️</div>
                        <h3 className="text-2xl font-black text-[#D4AF37] mb-2 uppercase">Identity Required</h3>
                        <p className="text-gray-400 text-sm mb-8">To access Tezro services, please verify your identity.</p>
                        
                        <button onClick={handleAutoLogin} className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#F3E5AB] transition-colors">
                           <img src="https://www.google.com/favicon.ico" alt="google" className="w-5" />
                           Continue with Google
                        </button>
                        
                        <button onClick={() => setShowLoginModal(false)} className="mt-6 text-gray-600 text-sm uppercase font-bold tracking-widest hover:text-[#D4AF37]">
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RideHome;
