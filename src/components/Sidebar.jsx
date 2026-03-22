import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import TransactionsList from './TransactionsList'; 

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
    const { balance } = useWallet();
    const navigate = useNavigate();
    const [showBizOptions, setShowBizOptions] = useState(false);
    const [showHistoryOverlay, setShowHistoryOverlay] = useState(false);

    // بزنس رولز (ان ڈرائیو اور فوڈ پانڈا اسٹائل)
    const bizRoles = [
        { id: 'vendor', label: 'Tezro Mall (Dazaz Style)', icon: '🛍️', desc: 'اپنا اسٹور کھولیں' },
        { id: 'food', label: 'Tezro Food (Panda Style)', icon: '🍱', desc: 'ہوٹل مینو اپلوڈ کریں' },
        { id: 'driver', label: 'Tezro Ride (InDrive Style)', icon: '🚗', desc: 'اپنی بولی لگائیں' }
    ];

    const handleRoleSelection = (roleId) => {
        // سیکیورٹی فیس اور رجسٹریشن پر بھیجنا
        if(window.confirm("Security Fee: PKR 5000 (Refundable)\nکیا آپ رجسٹریشن شروع کرنا چاہتے ہیں؟")) {
            navigate('/register-business');
        }
    };

    return (
        <>
            {/* 1. Backdrop Overlay */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1050] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>

            {/* 2. Vault History Overlay */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-[#050505] z-[1100] transition-transform duration-300 border-l border-[#D4AF37]/30 ${showHistoryOverlay ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <button onClick={() => setShowHistoryOverlay(false)} className="text-[#D4AF37] mb-6 flex items-center gap-2 font-bold">
                        ← Back to Menu
                    </button>
                    <h2 className="text-2xl font-black text-white mb-6 text-right">والٹ ہسٹری</h2>
                    <TransactionsList currentUser={user} />
                </div>
            </div>

            <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
                
                {/* User Profile */}
                <div className="p-8 border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/10 to-transparent text-right">
                    <div className="w-20 h-20 rounded-2xl border-2 border-[#D4AF37] p-1 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)] ml-auto">
                        <img src={user?.photoURL || 'https://via.placeholder.com/80'} className="w-full h-full rounded-xl object-cover" alt="Profile" />
                    </div>
                    <h3 className="text-xl font-black text-white">{user?.displayName || 'Tezro Member'}</h3>
                    <span className="text-[10px] bg-[#D4AF37] text-black px-3 py-1 rounded-full font-black uppercase tracking-widest mt-2 inline-block">
                        Elite Gold Member
                    </span>
                </div>

                {/* Vault Balance */}
                <div className="mx-6 my-6 p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[#39FF14] text-[10px]">● SECURE</span>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Tezro Vault Balance</span>
                    </div>
                    <h2 className="text-2xl font-black text-[#F3E5AB] text-right">Rs. {balance?.toLocaleString()}</h2>
                </div>

                <nav className="flex flex-col gap-1 px-4 overflow-y-auto max-h-[60vh] text-right">
                    
                    {/* Tezro Main Features */}
                    <div className="sidebar-item" onClick={() => navigate('/TezroUniverse')}><span>🛍️</span> Tezro Mall (Draz Style)</div>
                    <div className="sidebar-item" onClick={() => navigate('/FoodHome')}><span>🥡</span> Tezro Food (Panda Style)</div>
                    <div className="sidebar-item" onClick={() => navigate('/RideHome')}><span>🚗</span> Tezro Ride (InDrive Style)</div>
                    
                    <button onClick={() => setShowHistoryOverlay(true)} className="sidebar-item w-full text-right">
                        <span>💳</span> ٹرانزیکشن ہسٹری دیکھیں
                    </button>
                    
                    {/* Business Logic: Registration vs Dashboard */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        {/* اگر یوزر بزنس یوزر نہیں ہے تو اسے صرف رجسٹریشن کے آپشن دکھاؤ */}
                        {!user?.isVendor ? (
                            <div className="px-4">
                                <button 
                                    onClick={() => setShowBizOptions(!showBizOptions)}
                                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-black rounded-xl text-xs uppercase tracking-tighter"
                                >
                                    {showBizOptions ? "بند کریں" : "Tezro بزنس میں شامل ہوں"}
                                </button>
                                
                                {showBizOptions && (
                                    <div className="mt-3 space-y-2 animate-fadeIn">
                                        {bizRoles.map(role => (
                                            <div 
                                                key={role.id} 
                                                onClick={() => handleRoleSelection(role.id)}
                                                className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#D4AF37] cursor-pointer text-xs flex justify-between items-center transition-all text-white"
                                            >
                                                <span className="text-gray-400 text-[10px]">{role.desc}</span>
                                                <div className="flex items-center gap-3">
                                                    {role.label} <span>{role.icon}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* اگر یوزر پہلے سے بزنس یوزر ہے تو اسے ڈائریکٹ ڈیش بورڈ دکھاؤ */
                            <div 
                                onClick={() => navigate('/vendor-dashboard')}
                                className="sidebar-item text-[#D4AF37] font-bold border border-[#D4AF37]/50 rounded-xl bg-[#D4AF37]/10"
                            >
                                <span>🏢</span> بزنس کمانڈ سینٹر (Dashboard)
                            </div>
                        )}
                    </div>

                    {/* Security & SOS */}
                    <div className="mt-auto pt-6 px-4 space-y-4 pb-8">
                        <div className="sidebar-item text-gray-400 text-sm"><span>🛡️</span> سیکیورٹی آڈٹ لاگز</div>
                        <button className="w-full py-4 bg-red-600/20 border border-red-600/40 text-red-500 rounded-2xl font-black text-sm shadow-[0_0_20px_rgba(220,38,38,0.2)] animate-pulse">
                            EMERGENCY SOS
                        </button>
                    </div>
                </nav>

            </aside>
        </>
    );
};

export default Sidebar;
