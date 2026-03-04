import React, { useState, useEffect } from 'react';
import { useAdminData } from '../../hooks/useAdminData';
import { SecurityEngine } from '../../../Tezro_Vault/SecurityEngine';
import GlobalLiveMap from './components/GlobalLiveMap'; // ہائی-ٹیک ہیٹ میپ کے لیے
import RevenueVault from './components/RevenueVault'; // فنانشل ٹریژری

const MasterCommandCenter = () => {
    const { liveStats, alerts, registrations } = useAdminData();
    const [systemHealth, setSystemHealth] = useState(100);

    // 🚨 EMERGENCY SOS & TAMPER ALERT SYSTEM
    useEffect(() => {
        const unsubscribe = SecurityEngine.monitorSystemIntegrity((alert) => {
            if (alert.type === 'SOS' || alert.type === 'GPS_TAMPER') {
                playEmergencySiren(); // آڈیو الرٹ
                triggerEmergencyProtocol(alert); // کسٹمر اور ایمرجنسی نمبرز کو الرٹ
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-[#020202] text-[#F3E5AB] flex">
            
            {/* 1. Side Control Bar (The Navigation) */}
            <aside className="w-64 border-r border-white/5 bg-black p-6 flex flex-col">
                <div className="mb-10">
                    <h2 className="text-2xl font-black tracking-tighter text-white">TEZRO <span className="text-[#D4AF37]">ADM</span></h2>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-ping"></span>
                        <span className="text-[9px] font-bold text-[#39FF14] uppercase">Vault Secure</span>
                    </div>
                </div>
                {/* لنکس: مانیٹر، ٹریژری، وینڈرز، انٹیلیجنس */}
            </aside>

            {/* 2. Main Dashboard Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                
                {/* TOP ROW: System Health & Quick Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <HealthCard label="SYSTEM INTEGRITY" value={`${systemHealth}%`} color="#39FF14" />
                    <StatCard label="LIVE RIDES/ORDERS" value={liveStats.activeUnits} />
                    <StatCard label="VAULT REVENUE" value={`Rs. ${liveStats.totalComm}`} />
                    <AlertCard label="PENDING SOS" count={alerts.length} />
                </div>

                {/* MIDDLE ROW: The Global Live Map & Heatmap */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                    <div className="col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[40px] p-6 h-[500px] relative overflow-hidden">
                        <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                            <h3 className="text-xs font-black uppercase">Live Logistics Matrix</h3>
                        </div>
                        <GlobalLiveMap units={liveStats.units} />
                    </div>

                    {/* Registration Queue (The Gatekeeper) */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-6 overflow-hidden">
                        <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-[#D4AF37]">Approval Queue</h3>
                        <div className="space-y-4 h-[400px] overflow-y-auto no-scrollbar">
                            {registrations.map(reg => (
                                <div key={reg.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#D4AF37]/40 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-xs font-black text-white">{reg.bizName}</p>
                                        <span className="text-[8px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded">{reg.category}</span>
                                    </div>
                                    <button className="w-full mt-2 py-2 bg-[#D4AF37] text-black text-[10px] font-black rounded-lg">VERIFY & APPROVE</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM ROW: Financial Treasury & Growth Brain */}
                <div className="grid grid-cols-2 gap-8">
                    <RevenueVault auditLogs={liveStats.auditLogs} />
                    <div className="bg-[#111] rounded-[40px] p-8 border border-white/5">
                        <h3 className="text-sm font-black mb-6 uppercase tracking-widest">Business Intelligence</h3>
                        {/* گراف اور اینالٹکس یہاں آئیں گے */}
                        <div className="h-40 flex items-end gap-2 px-4">
                            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37] to-transparent rounded-t-lg" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-4 text-center">Projected Growth: +24% for next 30 days</p>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default MasterCommandCenter;
