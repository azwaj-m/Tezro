import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useWallet } from '../../hooks/useWallet';
import { useRide } from '../../hooks/useRide';
import { useTezroSettings } from '../../hooks/useTezroSettings';
import { useLiveDrivers } from '../../hooks/useLiveDrivers';
import { SecurityEngine } from '../../../Tezro_Vault/SecurityEngine';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// کسٹم مارکر برائے Tezro Cars
const carIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
    iconSize: [30, 30],
});

const BookingScreen = ({ serviceType = 'ride' }) => {
    const navigate = useNavigate();
    const { balance } = useWallet();
    const { fares } = useTezroSettings();
    const drivers = useLiveDrivers(); // لائیو ڈرائیورز کا ڈیٹا
    const { requestRide, loading } = useRide();

    const [locations, setLocations] = useState({ pickup: [31.5204, 74.3587], destination: '' });
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [fare, setFare] = useState(0);

    // سمارٹ کرایہ کیلکولیشن (Surge Pricing کے ساتھ)
    useEffect(() => {
        const base = serviceType === 'ride' ? fares.base : 80;
        const total = (base * fares.surge) + (5 * 45); // فرض کیا 5 کلومیٹر
        setFare(total);
    }, [fares, serviceType]);

    const handleConfirmBooking = async () => {
        if (balance < fare) {
            alert("Tezro Vault: Insufficient Balance. Please recharge.");
            return;
        }

        const audit = SecurityEngine.generateAuditTrail("USER_ID", "RIDE_BOOKED", fare);
        const result = await requestRide(locations.pickup, locations.destination, fare);

        if (result.success) {
            // بکنگ کے بعد ڈرائیور کی تفصیلات کے ساتھ ٹریکنگ پر جائیں
            navigate(`/track/${result.rideId}`);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-black overflow-hidden">
            {/* 1. Leaflet Map Section */}
            <div className="flex-1 relative">
                <MapContainer center={locations.pickup} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    
                    {/* لائیو ڈرائیورز میپ پر شو کرنا */}
                    {drivers.map(driver => (
                        <Marker 
                            key={driver.id} 
                            position={[driver.lat, driver.lng]} 
                            icon={carIcon}
                            eventHandlers={{ click: () => setSelectedDriver(driver) }}
                        />
                    ))}
                </MapContainer>

                {/* ٹاپ بیج: نیڑے ترین ڈرائیورز */}
                <div className="absolute top-12 left-6 z-[1000] bg-[#D4AF37] text-black px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-tighter shadow-xl">
                    {drivers.length > 0 ? `${drivers.length} Tezro Captains Nearby` : 'Searching for Captains...'}
                </div>
            </div>

            {/* 2. Driver Details & Booking Card */}
            <div className="bg-[#0f0f0f] border-t-2 border-[#D4AF37] p-6 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-[1001]">
                
                {/* اگر ڈرائیور سلیکٹ ہو یا قریب ہو تو اس کی تفصیلات */}
                {drivers.length > 0 && (
                    <div className="flex items-center justify-between mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-xl border border-[#D4AF37]/40">
                                👤
                            </div>
                            <div>
                                <h3 className="text-[#F3E5AB] font-bold text-sm">
                                    {drivers[0].nickname || "Tezro Captain"} 
                                    <span className="ml-2 text-[#D4AF37] text-xs">★ {drivers[0].rating || '5.0'}</span>
                                </h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                    {drivers[0].carType || 'Premium'} • {drivers[0].plateNo || 'TX-000'}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] text-[#D4AF37] uppercase">Est. Pickup</p>
                            <p className="text-white font-black">3 MINS</p>
                        </div>
                    </div>
                )}

                {/* کرایہ کی تفصیل */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Total Estimated Fare</p>
                        <h2 className="text-3xl font-black text-white">PKR {fare.toFixed(0)}</h2>
                    </div>
                    {fares.surge > 1 && (
                        <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-lg text-[10px] font-bold border border-red-500/20 animate-pulse">
                            ⚡ SURGE ACTIVE
                        </div>
                    )}
                </div>

                {/* بکنگ بٹن */}
                <button 
                    disabled={drivers.length === 0 || loading}
                    onClick={handleConfirmBooking}
                    className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black text-lg shadow-[0_15px_40px_rgba(212,175,55,0.3)] active:scale-95 transition-all"
                >
                    {loading ? "VERIFYING SECURE SESSION..." : "BOOK TEZRO CAPTAIN"}
                </button>
                
                <p className="text-center text-[8px] text-white/20 mt-4 uppercase tracking-[4px]">
                    End-to-End Encrypted Booking • Tezro Vault v2
                </p>
            </div>
        </div>
    );
};

export default BookingScreen;
