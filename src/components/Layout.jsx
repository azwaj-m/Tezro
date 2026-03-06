import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { verifyAndExecute } from '../firebase/voiceAuth';
import { CommandResolver } from '../utils/CommandResolver';
import SuperSearchBar from './SuperSearchBar';

// لوگو فائل (assists فولڈر سے)
import TezroLogo from '../assets/logo.png'; 

const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [adminClicks, setAdminClicks] = useState(0);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState("");
    
    const { user, logout, verifyAdminKeys } = useAuth();
    const { theme } = useTheme(); // گولڈ اور بلیک تھیم
    const navigate = useNavigate();
    const location = useLocation();

    // 🎤 یونیورسل وائس کمانڈ (Re-engineered for 2026)
    const startUniversalVoice = async () => {
        setIsVoiceActive(true);
        setVoiceStatus("TEZRO IS LISTENING...");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            let chunks = [];

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                
                // سیکیورٹی چیک (صرف مالک کی آواز)
                const auth = await verifyAndExecute(audioBlob, user?.voiceSignature);

                if (auth.authorized) {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();
                    recognition.lang = user?.preferredLang || 'ur-PK';

                    recognition.onresult = async (event) => {
                        const transcript = event.results[0][0].transcript;
                        setVoiceStatus(`EXECUTING: ${transcript}`);
                        const result = await CommandResolver.execute(audioBlob, transcript, user?.voiceSignature);
                        handleVoiceAction(result);
                    };
                    recognition.start();
                } else {
                    setVoiceStatus("❌ VOICE MISMATCH!");
                    setTimeout(() => setIsVoiceActive(false), 2000);
                }
            };

            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 3000); 
        } catch (err) {
            setVoiceStatus("MIC ERROR!");
            setIsVoiceActive(false);
        }
    };

    const handleVoiceAction = (res) => {
        if (res.success) {
            if (res.action === 'BOOK_RIDE') navigate('/ride');
            if (res.action === 'CHECK_BALANCE') navigate('/banking');
            if (res.action === 'EMERGENCY') alert("🚨 PANIC SIGNAL SENT TO HEADQUARTERS!");
        }
        setTimeout(() => setIsVoiceActive(false), 2000);
    };

    // 🔒 خفیہ ایڈمن ایکسیس (برقرار رکھا گیا ہے)
    const handleSecretClick = async () => {
        const newCount = adminClicks + 1;
        setAdminClicks(newCount);
        if (newCount === 15) {
            setAdminClicks(0);
            const secretKey = prompt("🔒 ENTER QUANTUM ADMIN KEY:");
            if (secretKey) {
                const isAuthorized = await verifyAdminKeys(secretKey);
                if (isAuthorized) navigate('/admin');
                else alert("ACCESS DENIED: SYSTEM LOGGED");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
            
            {/* ☰ Side Sidebar Drawer */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed inset-y-0 left-0 w-[300px] bg-[#0a0a0a] border-r border-[#D4AF37]/20 z-[3000] p-8"
                        >
                            <div className="mb-10 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] p-1 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                    <img src={user?.photo || "https://via.placeholder.com/80"} className="w-full h-full rounded-full object-cover" alt="user" />
                                </div>
                                <h4 className="font-black text-[#D4AF37] tracking-wider">{user?.name || "REHMAN"}</h4>
                                <span className="text-[8px] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full mt-2 font-bold uppercase">Pro Verified</span>
                            </div>

                            <nav className="space-y-4">
                                {[
                                    { id: 'home', label: 'Dashboard', icon: '🏠', path: '/' },
                                    { id: 'wallet', label: 'Tezro Vault', icon: '💳', path: '/banking' },
                                    { id: 'history', label: 'Ride History', icon: '🕒', path: '/history' },
                                    { id: 'settings', label: 'Security Settings', icon: '⚙️', path: '/settings' },
                                ].map(item => (
                                    <button 
                                        key={item.id} 
                                        onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20' : 'hover:bg-white/5'}`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <button onClick={logout} className="absolute bottom-10 left-8 right-8 py-4 border border-red-500/30 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[3px] hover:bg-red-500/10 transition-all">
                                Terminate Session
                            </button>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2500]" 
                        />
                    </>
                )}
            </AnimatePresence>

            {/* 🎙️ Voice Overlay UI */}
            <AnimatePresence>
                {isVoiceActive && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[4000] flex flex-col items-center justify-center p-10 text-center"
                    >
                        <div className="relative">
                            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl" />
                            <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-4xl shadow-[0_0_50px_rgba(212,175,55,0.5)] relative z-10">🎤</div>
                        </div>
                        <h2 className="mt-12 text-[#D4AF37] font-black tracking-widest text-lg">{voiceStatus}</h2>
                        <p className="mt-4 text-gray-500 text-[10px] uppercase font-bold tracking-[2px]">Voice Biometrics Active</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MAIN INTERFACE --- */}
            <div className="flex flex-col h-screen">
                
                {/* Header */}
                <header className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-[1000]">
                    <button onClick={() => setSidebarOpen(true)} className="text-2xl opacity-70 hover:opacity-100">☰</button>
                    
                    <div className="relative flex flex-col items-center">
                        <img src={TezroLogo} className="h-8 mb-1" alt="Tezro" />
                        <span onClick={handleSecretClick} className="absolute -top-1 -right-3 text-[8px] opacity-10 cursor-default select-none">®</span>
                    </div>

                    <div onClick={() => navigate('/profile')} className="w-9 h-9 rounded-xl border border-[#D4AF37]/30 overflow-hidden cursor-pointer active:scale-90 transition-transform">
                        <img src={user?.photo || "https://via.placeholder.com/40"} className="w-full h-full object-cover" alt="p" />
                    </div>
                </header>

                {/* Search Bar (Only on Home) */}
                {location.pathname === '/' && (
                    <div className="px-6 pt-4">
                        <SuperSearchBar />
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {children}
                </main>

                {/* Footer Navigation */}
                <footer className="px-8 py-5 bg-[#0a0a0a] border-t border-white/5 flex justify-between items-center relative z-[1000]">
                    <button onClick={() => navigate('/')} className={`text-xl ${location.pathname === '/' ? 'text-[#D4AF37]' : 'opacity-30'}`}>🏠</button>
                    <button onClick={() => navigate('/banking')} className={`text-xl ${location.pathname === '/banking' ? 'text-[#D4AF37]' : 'opacity-30'}`}>💳</button>
                    
                    {/* Floating Voice Button */}
                    <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={startUniversalVoice}
                        className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-2xl -mt-12 shadow-[0_10px_30px_rgba(212,175,55,0.4)] border-[6px] border-[#050505]"
                    >
                        🎤
                    </motion.button>
                    
                    <button onClick={() => navigate('/history')} className={`text-xl ${location.pathname === '/history' ? 'text-[#D4AF37]' : 'opacity-30'}`}>🕒</button>
                    <button onClick={() => setSidebarOpen(true)} className="text-xl opacity-30">👤</button>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
