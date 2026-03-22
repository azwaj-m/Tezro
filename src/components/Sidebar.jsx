import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import TransactionsList from './TransactionsList'; 

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
    const { balance } = useWallet();
    const navigate = useNavigate();
    const [showBizOptions, setShowBizOptions] = useState(false);
    const [showHistoryOverlay, setShowHistoryOverlay] = useState(false);

    // وائرنگ فنکشن: پیج پر بھیجنا اور سائیڈ بار بند کرنا
    const goTo = (path) => {
        navigate(path);
        toggleSidebar();
    };

    const bizRoles = [
        { id: 'vendor', label: 'Tezro Mall (Store)', icon: '🛍️', path: '/register-business' },
        { id: 'food', label: 'Tezro Food (Menu)', icon: '🍱', path: '/register-business' },
        { id: 'driver', label: 'Tezro Captain (Ride)', icon: '🚗', path: '/register-business' }
    ];

    return (
        <>
            {/* Backdrop */}
            <div className={`fixed inset-0 bg-black/70 backdrop-blur-md z-[1050] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>

            {/* History Overlay */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-[#050505] z-[1100] transition-transform duration-300 border-l border-[#D4AF37]/30 ${showHistoryOverlay ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <button onClick={() => setShowHistoryOverlay(false)} className="text-[#D4AF37] mb-6 flex items-center gap-2 font-bold uppercase tracking-tighter">
                        ← واپس مینو
                    </button>
                    <h2 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-4">والٹ ٹرانزیکشنز</h2>
                    <TransactionsList currentUser={user} />
                </div>
            </div>

            <aside className={`sidebar ${isOpen ? 'active' : ''} shadow-[10px_0_30px_rgba(0,0,0,0.9)]`}>
                
                {/* Profile Header */}
                <div className="p-8 border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/10 to-transparent">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#D4AF37] p-1 mb-4">
                        <img src={user?.photoURL || 'https://via.placeholder.com/80'} className="w-full h-full rounded-xl object-cover" alt="Profile" />
                    </div>
                    <h3 className="text-lg font-black text-white">{user?.displayName || 'Tezro Member'}</h3>
                    <div className="flex gap-2 mt-2">
                        <span className="text-[8px] bg-[#D4AF37] text-black px-2 py-0.5 rounded font-black">GOLD</span>
                        <span className="text-[8px] bg-white/10 text-white px-2 py-0.5 rounded">VERIFIED</span>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="mx-4 my-6 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-[#D4AF37]/20">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Available Balance</p>
                    <h2 className="text-xl font-black text-[#F3E5AB]">Rs. {balance?.toLocaleString() || '0.00'}</h2>
                </div>

                <nav className="flex flex-col gap-1 px-4 overflow-y-auto max-h-[55vh]">
                    
                    {/* Wired Features */}
                    <div className="sidebar-item" onClick={() => goTo('/TezroUniverse')}>
                        <span className="text-xl">🛍️</span> Tezro Mall
                    </div>
                    
                    <div className="sidebar-item" onClick={() => goTo('/FoodHome')}>
                        <span className="text-xl">🍱</span> Tezro Food
                    </div>
                    
                    <div className="sidebar-item" onClick={() => goTo('/RideHome')}>
                        <span className="text-xl">🚗</span> Tezro Ride
                    </div>

                    <div className="sidebar-item" onClick={() => setShowHistoryOverlay(true)}>
                        <span className="text-xl">💳</span> Vault History
                    </div>

                    {/* Business Portal Logic */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        {!user?.isVendor ? (
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setShowBizOptions(!showBizOptions)}
                                    className="w-full py-3 bg-[#D4AF37] text-black font-black rounded-lg text-[10px] uppercase shadow-[0_5px_15px_rgba(212,175,55,0.2)]"
                                >
                                    {showBizOptions ? "بند کریں" : "Join Tezro Business"}
                                </button>
                                
                                {showBizOptions && (
                                    <div className="space-y-1 mt-2 animate-slideDown">
                                        {bizRoles.map(role => (
                                            <div 
                                                key={role.id} 
                                                onClick={() => goTo(role.path)}
                                                className="p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-[#D4AF37]/10 transition-colors flex items-center justify-between group"
                                            >
                                                <span className="text-[10px] text-white/60 group-hover:text-white">رجسٹر کریں</span>
                                                <div className="flex items-center gap-3 text-xs text-white">
                                                    {role.label} <span>{role.icon}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div 
                                onClick={() => goTo('/vendor-dashboard')}
                                className="sidebar-item text-[#D4AF37] font-bold border border-[#D4AF37]/30 bg-[#D4AF37]/5"
                            >
                                <span>🏢</span> Business Command Center
                            </div>
                        )}
                    </div>
                </nav>

                {/* Bottom Security */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black/80 backdrop-blur-md">
                    <button className="w-full py-3 bg-red-600/10 border border-red-600/30 text-red-500 rounded-lg text-[10px] font-black tracking-widest animate-pulse">
                        EMERGENCY SOS
                    </button>
                </div>

            </aside>
        </>
    );
};

export default Sidebar;
