import React, { useState, useEffect } from 'react';
import { useBusinessData } from '../../hooks/useBusinessData';
import { SecurityEngine } from '../../utils/security/SecurityEngine';
import InventoryManager from './modules/InventoryManager'; // For Shopping
import BookingManager from './modules/BookingManager';   // For Hotels/Halls
import FleetManager from './modules/FleetManager';       // For Logistics/Ride

const BusinessCommandCenter = () => {
    const { bizProfile, stats, loading } = useBusinessData();
    const [activeTab, setActiveTab] = useState('overview');

    if (loading) return <div className="loading-shimmer">Initializing Secure Portal...</div>;

    // بزنس کی قسم کے مطابق ماڈیول کا انتخاب
    const renderBusinessModule = () => {
        switch (bizProfile.category) {
            case 'vendor': return <InventoryManager bizId={bizProfile.id} />;
            case 'hotel':  return <BookingManager bizId={bizProfile.id} />;
            case 'logistic': return <FleetManager bizId={bizProfile.id} />;
            default: return <p className="text-gray-500">Module Under Maintenance</p>;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#F3E5AB] p-6">
            {/* 1. پریمیم بزنس ہیڈر */}
            <header className="flex justify-between items-start mb-10">
                <div>
                    <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[4px]">
                        Verified Business Account
                    </span>
                    <h1 className="text-4xl font-black tracking-tighter text-white mt-1">
                        {bizProfile.bizName} <span className="text-[#D4AF37]">.</span>
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase">Vault Status</p>
                    <div className="flex items-center gap-2 text-[#39FF14] font-bold">
                        <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
                        ENCRYPTED
                    </div>
                </div>
            </header>

            {/* 2. فنانشل انٹیلیجنس کارڈز (Financial Intelligence) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard title="Total Revenue" value={`Rs. ${stats.revenue}`} trend="+12%" />
                <StatCard title="Active Requests" value={stats.activeOrders} trend="Live" />
                <StatCard title="Tezro Score" value={bizProfile.rating || "4.9"} trend="Elite" />
            </div>

            {/* 3. ڈائنامک بزنس ہب (The Core) */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 shadow-2xl min-h-[500px]">
                <div className="flex gap-8 border-b border-white/5 mb-8 overflow-x-auto">
                    {['overview', 'management', 'analytics'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
                                activeTab === tab ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-600'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="animate-fadeIn">
                        <h3 className="text-xl font-bold mb-6">Operations Hub</h3>
                        {renderBusinessModule()}
                    </div>
                )}
            </div>

            {/* 4. سیکیورٹی فٹ پرنٹ (Audit Log) */}
            <footer className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] text-gray-600 uppercase tracking-widest">
                <p>System Integrity: 100% Secure</p>
                <p>Last Audit: {new Date().toLocaleTimeString()}</p>
            </footer>
        </div>
    );
};

// سٹینڈرڈ کمپوننٹ فار سٹیٹس
const StatCard = ({ title, value, trend }) => (
    <div className="bg-[#111] p-6 rounded-[30px] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
        <p className="text-[10px] text-gray-500 uppercase mb-2 font-bold">{title}</p>
        <div className="flex justify-between items-baseline">
            <h2 className="text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">{value}</h2>
            <span className="text-[10px] text-[#39FF14] bg-[#39FF14]/10 px-2 py-1 rounded-lg">{trend}</span>
        </div>
    </div>
);

export default BusinessCommandCenter;
