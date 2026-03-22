import React, { useState } from 'react';
import { SecurityEngine } from '../../finance/SecurityEngine';
import { useLogistics } from '../../hooks/useLogistics';
import { QrScanner } from '@yudiel/react-qr-scanner'; // سٹینڈرڈ QR اسکینر

const SecureDeliveryManager = () => {
    const { activeDeliveries, updateStatus } = useLogistics();
    const [scanning, setScanning] = useState(false);
    const [otpMode, setOtpMode] = useState(null); // آرڈر آئی ڈی جس کا او ٹی پی چاہیے

    // 1. اسکیننگ اور ویریفیکیشن
    const handleScan = async (data) => {
        if (data) {
            setScanning(false);
            // Tezro Vault سے چیک کرنا کہ کیا یہ پارسل اسی رائڈر کے نام ہے
            const isAuthorized = SecurityEngine.verifyParcelAuth(data);
            if (isAuthorized) {
                await updateStatus(data, 'PICKED_UP');
                alert("Parcel Securely Picked Up!");
            } else {
                alert("Security Alert: Unauthorized Parcel Access!");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] p-6 text-[#F3E5AB]">
            <header className="mb-10 pt-8">
                <span className="text-[10px] text-[#39FF14] font-black uppercase tracking-[5px]">Logistics Protocol v2.0</span>
                <h1 className="text-3xl font-black text-white mt-2">DELIVERY COMMAND</h1>
            </header>

            {/* 📸 QR Scanner Overlay (صرف جب ضرورت ہو) */}
            {scanning && (
                <div className="fixed inset-0 z-[3000] bg-black p-10 flex flex-col items-center justify-center">
                    <div className="w-full max-w-sm border-4 border-[#D4AF37] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.5)]">
                        <QrScanner onDecode={handleScan} onError={(error) => console.log(error?.message)} />
                    </div>
                    <button onClick={() => setScanning(false)} className="mt-10 text-white font-bold underline">Cancel Scan</button>
                </div>
            )}

            {/* 📦 لائیو ڈیلیوری کارڈز */}
            <div className="space-y-6">
                {activeDeliveries.map(parcel => (
                    <div key={parcel.id} className="bg-[#111] border border-white/5 rounded-[35px] p-6 shadow-xl relative overflow-hidden">
                        {/* سٹیٹس بیج */}
                        <div className="absolute top-0 right-0 bg-[#D4AF37] text-black px-6 py-1 rounded-bl-2xl font-black text-[9px] uppercase">
                            {parcel.status}
                        </div>

                        <div className="flex gap-4 items-center mb-6">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">
                                {parcel.type === 'food' ? '🍔' : '📦'}
                            </div>
                            <div>
                                <h3 className="font-black text-white">{parcel.userName}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{parcel.address.substring(0, 30)}...</p>
                            </div>
                        </div>

                        {/* ایکشن بٹنز - پریمیم ڈیزائن */}
                        <div className="grid grid-cols-2 gap-4">
                            {parcel.status === 'PENDING' && (
                                <button 
                                    onClick={() => setScanning(true)}
                                    className="col-span-2 py-4 bg-[#D4AF37] text-black font-black rounded-2xl shadow-lg active:scale-95 transition-all"
                                >
                                    SCAN TO PICKUP
                                </button>
                            )}

                            {parcel.status === 'PICKED_UP' && (
                                <button 
                                    onClick={() => setOtpMode(parcel.id)}
                                    className="col-span-2 py-4 bg-[#39FF14] text-black font-black rounded-2xl shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                                >
                                    VERIFY & DELIVER (OTP)
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔐 OTP Verification Modal */}
            {otpMode && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[4000] flex items-center justify-center p-6">
                    <div className="bg-[#121212] border border-[#D4AF37]/30 p-8 rounded-[40px] w-full max-w-sm text-center">
                        <h2 className="text-xl font-black mb-2">FINAL VERIFICATION</h2>
                        <p className="text-xs text-gray-500 mb-6">Enter the 4-digit security code from the customer's phone.</p>
                        <input 
                            type="text" 
                            maxLength="4" 
                            className="w-full bg-white/5 border border-white/10 py-5 rounded-2xl text-3xl text-center font-black tracking-[15px] outline-none focus:border-[#D4AF37]" 
                            placeholder="0000"
                        />
                        <button className="w-full mt-6 py-4 bg-[#D4AF37] text-black font-black rounded-2xl">CONFIRM DELIVERY</button>
                        <button onClick={() => setOtpMode(null)} className="mt-4 text-xs text-gray-600 uppercase">Go Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecureDeliveryManager;
