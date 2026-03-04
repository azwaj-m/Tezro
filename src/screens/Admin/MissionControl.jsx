import React, { useState, useEffect } from 'react';
import { SecurityEngine } from '../../../Tezro_Vault/SecurityEngine';
import { NetworkShield } from '../../../Tezro_Vault/NetworkShield';

const MissionControl = () => {
    const [systemStatus, setSystemStatus] = useState('SECURE');
    const [activeThreats, setActiveThreats] = useState(0);

    // 🕵️ خودکار خطرے کی گھنٹی (Auto-Threat Detection)
    useEffect(() => {
        const shield = NetworkShield.startSurveillance();
        shield.on('ANOMALY', (data) => {
            setActiveThreats(prev => prev + 1);
            setSystemStatus('CRITICAL_ALERT');
            // فوراً مشکوک آئی پی (IP) کو بلاک کرنا
            SecurityEngine.firewall.blockIP(data.origin);
        });
        return () => NetworkShield.stop();
    }, []);

    return (
        <div className="min-h-screen bg-[#020202] text-[#F3E5AB] p-10 font-mono">
            
            {/* 1. نظام کی مجموعی صحت (System Health Matrix) */}
            <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        Mission Control <span className="text-[#D4AF37]">v1.0</span>
                    </h1>
                    <p className="text-[10px] text-gray-500 mt-2 tracking-[5px]">INTEGRITY LEVEL: QUANTUM-SECURE</p>
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-black ${systemStatus === 'SECURE' ? 'text-[#39FF14]' : 'text-red-600'}`}>
                        {systemStatus}
                    </div>
                    <p className="text-[8px] text-gray-600 uppercase">Gateway Surveillance Active</p>
                </div>
            </div>

            {/* 2. لائیو سیکیورٹی ڈیش بورڈ (Security Widgets) */}
            <div className="grid grid-cols-4 gap-8 mb-12">
                <SecurityWidget label="Active Encryptions" value="12,402" color="#D4AF37" />
                <SecurityWidget label="Blocked Intrusions" value={activeThreats} color="#FF0000" />
                <SecurityWidget label="Bank Vault Integrity" value="100.00%" color="#39FF14" />
                <SecurityWidget label="Global Latency" value="14ms" color="#F3E5AB" />
            </div>

            {/* 3. ماسٹر کنٹرول سوئچز (Master Kill-Switches) */}
            <div className="grid grid-cols-2 gap-10">
                <div className="bg-[#0A0A0A] p-8 rounded-[40px] border border-white/5">
                    <h3 className="text-sm font-black mb-6 text-white uppercase tracking-widest">Global Access Control</h3>
                    <div className="space-y-6">
                        <ControlSwitch label="Bank Withdrawals" status="ACTIVE" />
                        <ControlSwitch label="International Cards" status="ACTIVE" />
                        <ControlSwitch label="Vendor Registrations" status="PAUSED" />
                        <ControlSwitch label="Live Logistics Map" status="ACTIVE" />
                    </div>
                </div>

                {/* لائیو آڈٹ لاگ (The Black Box) */}
                <div className="bg-[#050505] p-8 rounded-[40px] border border-[#D4AF37]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-[#D4AF37]/10 text-[#D4AF37] text-[8px] font-black uppercase">Live Logs</div>
                    <div className="h-64 overflow-y-auto space-y-2 text-[10px] no-scrollbar">
                        <p className="text-gray-500 italic">[08:42:10] - Banking Node 4 Authorized Transaction #772</p>
                        <p className="text-red-500 font-bold">[08:42:12] - Security Block: IP 192.168.1.5 Attempted Gambling MCC Access</p>
                        <p className="text-[#39FF14]">[08:42:15] - System Snapshot Saved to Blockchain Ledger</p>
                        <p className="text-gray-500 italic">[08:42:18] - Driver ID #901 Completed Delivery - Commision Split 10%</p>
                    </div>
                </div>
            </div>

            {/* 4. سیکیورٹی فٹ پرنٹ (Blockchain Verification) */}
            <footer className="mt-12 text-center border-t border-white/5 pt-8">
                <p className="text-[9px] text-gray-600 tracking-[10px] uppercase font-bold">
                    This session is being recorded and encrypted with AES-256
                </p>
            </footer>
        </div>
    );
};

// معاون کمپوننٹس
const SecurityWidget = ({ label, value, color }) => (
    <div className="bg-[#111] p-6 rounded-[30px] border border-white/5 hover:border-white/20 transition-all">
        <p className="text-[8px] text-gray-500 uppercase font-black mb-2">{label}</p>
        <h2 className="text-2xl font-black" style={{ color: color }}>{value}</h2>
    </div>
);

const ControlSwitch = ({ label, status }) => (
    <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <span className="text-xs font-bold text-gray-300 uppercase">{label}</span>
        <span className={`px-4 py-1 rounded-full text-[9px] font-black ${status === 'ACTIVE' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-red-500/10 text-red-500'}`}>
            {status}
        </span>
    </div>
);

export default MissionControl;
