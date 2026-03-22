import React, { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const LiveTracking = ({ orderId, type = 'ride' }) => {
    const [trackingData, setData] = useState({
        coords: { lat: 0, lng: 0 },
        eta: 'Initializing...',
        status: 'Connecting...',
        providerName: 'Tezro Partner'
    });

    // آرڈر کی قسم کے لحاظ سے انٹرفیس کنفگریشن
    const config = {
        ride: { icon: '🚗', label: 'Captain', color: '#D4AF37' },
        food: { icon: '🥡', label: 'Rider', color: '#FF4500' },
        shop: { icon: '🛍️', label: 'Delivery Pro', color: '#00C853' },
        parcel: { icon: '📦', label: 'Courier', color: '#2979FF' }
    };

    const currentTheme = config[type] || config.ride;

    useEffect(() => {
        if (!orderId) return;

        // یونیورسل ڈیٹا اسٹریمنگ
        const unsubscribe = onSnapshot(doc(db, "active_orders", orderId), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setData({
                    coords: data.location || { lat: 0, lng: 0 },
                    eta: data.estimatedArrival || 'Calculating...',
                    status: data.status || 'On the way',
                    providerName: data.partnerName || 'Tezro Expert'
                });
            }
        });

        return () => unsubscribe();
    }, [orderId]);

    return (
        <div className="fixed bottom-24 left-4 right-4 z-[999]">
            <div className="bg-black/95 border border-white/10 p-4 rounded-[24px] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 border-b-4" 
                 style={{ borderBottomColor: currentTheme.color }}>
                
                {/* متحرک آئیکن اور اسٹیٹس ہالر */}
                <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg animate-bounce"
                         style={{ background: `${currentTheme.color}22`, border: `1px solid ${currentTheme.color}44` }}>
                        {currentTheme.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black animate-ping" 
                         style={{ background: currentTheme.color }}></div>
                </div>

                {/* انفارمیشن سیکشن */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[2px] opacity-50" style={{ color: currentTheme.color }}>
                            {currentTheme.label} : {trackingData.providerName}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black text-white tracking-tighter">{trackingData.eta}</p>
                        <span className="text-[10px] text-white/40 font-medium italic">Away</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                        <div className="h-full animate-progress-stripes" 
                             style={{ background: currentTheme.color, width: '60%' }}></div>
                    </div>
                </div>

                {/* ایکشن کنٹرولز */}
                <div className="flex flex-col gap-2">
                    <button className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all active:scale-90">
                        📞
                    </button>
                    <button className="bg-red-600/20 hover:bg-red-600/40 p-3 rounded-xl border border-red-600/30 text-red-500 text-[10px] font-bold transition-all">
                        SOS
                    </button>
                </div>
            </div>
            
            {/* نچلی پٹی پر ٹریننگ میسج (صارف کی رہنمائی کے لیے) */}
            <div className="mt-2 text-center">
                <p className="text-[9px] text-white/30 uppercase tracking-[3px] font-bold">
                    Tezro Real-time {type} Tracking Active
                </p>
            </div>
        </div>
    );
};

export default LiveTracking;
