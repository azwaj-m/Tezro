import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useTheme } from '../context/ThemeContext';
import { SecurityEngine } from '../../Tezro_Vault/SecurityEngine';

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
    const { balance } = useWallet();
    const [showBizOptions, setShowBizOptions] = useState(false);

    // بزنس رجسٹریشن کے اختیارات
    const bizRoles = [
        { id: 'vendor', label: 'Shopkeeper / Vendor', icon: '🏪' },
        { id: 'rider', label: 'Delivery Boy', icon: '🛵' },
        { id: 'driver', label: 'Tezro Captain', icon: '🚗' }
    ];

    const handleRoleSelection = (role) => {
        alert(`Opening Registration for: ${role.toUpperCase()}\nSecurity Fee: PKR 5000 (Refundable)`);
        // یہاں رجسٹریشن فارم کا پاپ اپ لاجک آئے گا
    };

    return (
        <>
            {/* Backdrop Overlay */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1050] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>

            <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
                
                {/* 1. User Profile Header */}
                <div className="p-8 border-b border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/10 to-transparent">
                    <div className="w-20 h-20 rounded-2xl border-2 border-[#D4AF37] p-1 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <img src={user?.photoURL || 'https://via.placeholder.com/80'} className="w-full h-full rounded-xl object-cover" alt="Profile" />
                    </div>
                    <h3 className="text-xl font-black text-white">{user?.displayName || 'Tezro Member'}</h3>
                    <span className="text-[10px] bg-[#D4AF37] text-black px-3 py-1 rounded-full font-black uppercase tracking-widest mt-2 inline-block">
                        Elite Gold Member
                    </span>
                </div>

                {/* 2. The Vault (Wallet Section) */}
                <div className="mx-6 my-6 p-4 rounded-2xl bg-white/5 border border-[#D4AF37]/30 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Tezro Vault Balance</span>
                        <span className="text-[#39FF14] text-[10px]">● SECURE</span>
                    </div>
                    <h2 className="text-2xl font-black text-[#F3E5AB]">Rs. {balance?.toLocaleString()}</h2>
                </div>

                <nav className="flex flex-col gap-1 px-4 overflow-y-auto max-h-[50vh]">
                    <div className="sidebar-item"><span>🚗</span> Ride History</div>
                    <div className="sidebar-item"><span>🥡</span> Food Orders</div>
                    <div className="sidebar-item"><span>💳</span> Transactions</div>
                    
                    {/* 3. Business Portal Logic */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                        {!user?.isVendor ? (
                            <div className="px-4">
                                <button 
                                    onClick={() => setShowBizOptions(!showBizOptions)}
                                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-black rounded-xl text-xs uppercase tracking-tighter"
                                >
                                    {showBizOptions ? "Close Selection" : "Join Tezro Business"}
                                </button>
                                
                                {showBizOptions && (
                                    <div className="mt-3 space-y-2 animate-fadeIn">
                                        {bizRoles.map(role => (
                                            <div 
                                                key={role.id} 
                                                onClick={() => handleRoleSelection(role.id)}
                                                className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#D4AF37] cursor-pointer text-xs flex items-center gap-3 transition-all"
                                            >
                                                <span>{role.icon}</span> {role.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="sidebar-item text-[#D4AF37] font-bold"><span>🏢</span> Business Dashboard</div>
                        )}
                    </div>

                    {/* 4. Security & SOS */}
                    <div className="mt-auto pt-6 px-4 space-y-4 pb-8">
                        <div className="sidebar-item text-gray-400 text-sm"><span>🛡️</span> Security & Audit Logs</div>
                        
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
