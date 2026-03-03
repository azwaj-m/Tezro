import React, { useState } from 'react';
import { db, auth } from '../../firebase-config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { SecurityEngine } from '../../../Tezro_Vault/SecurityEngine';

const BusinessRegistration = ({ role, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: '',
        cnic: '',
        address: '',
        // کیٹیگری مخصوص ڈیٹا
        vehicleType: '', // For Logistics/Ride
        roomCount: '',   // For Hotels
        deliveryRadius: '', // For Food/Shop
        securityDeposit: 5000 // فکسڈ سیکیورٹی فیس
    });

    // 1. فارم کی فیلڈز کا انتخاب (Dynamic Logic)
    const renderExtraFields = () => {
        switch (role) {
            case 'driver':
            case 'logistic':
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <input name="vehicleNo" placeholder="Vehicle Registration Number" className="reg-input" required />
                        <select name="vehicleType" className="reg-input">
                            <option>Bike</option><option>Car</option><option>Truck (Logistics)</option>
                        </select>
                    </div>
                );
            case 'hotel':
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <input name="totalRooms" type="number" placeholder="Total Rooms / Hall Capacity" className="reg-input" />
                        <input name="license" placeholder="Tourism License Number" className="reg-input" />
                    </div>
                );
            case 'vendor': // Daraz/Amazon Type
                return (
                    <div className="space-y-4 animate-fadeIn">
                        <input name="storeCategory" placeholder="Store Type (Electronics, Fashion, etc.)" className="reg-input" />
                        <input name="ntn" placeholder="NTN Number (Optional)" className="reg-input" />
                    </div>
                );
            default: return null;
        }
    };

    // 2. ڈیٹا کو قلیل کر کے جمع کرنا (Data Normalization)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        // سیکیورٹی آڈٹ
        const securePayload = SecurityEngine.encryptVault({
            uid: user.uid,
            role: role,
            timestamp: Date.now()
        });

        // قلیل ڈیٹا اسٹرکچر (Universal Schema)
        const businessProfile = {
            ownerId: user.uid,
            bizName: formData.businessName,
            category: role, // 'ride', 'food', 'hotel', etc.
            status: 'PENDING_VERIFICATION',
            vaultKey: securePayload, // انکرپٹڈ ہیش
            meta: formData, // تمام اضافی معلومات ایک ہی جگہ
            joinedAt: serverTimestamp()
        };

        try {
            await setDoc(doc(db, "businesses", user.uid), businessProfile);
            // یوزر کے مین پروفائل کو اپ ڈیٹ کریں کہ وہ اب ایک بزنس ہولڈر ہے
            await setDoc(doc(db, "users", user.uid), { isVendor: true, activeRole: role }, { merge: true });
            alert("Application Submitted! Pay Security Fee to Activate.");
            onClose();
        } catch (err) {
            console.error("Vault Error:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div className="w-full max-w-lg bg-[#121212] border border-[#D4AF37]/30 rounded-[40px] p-8 shadow-[0_0_60px_rgba(212,175,55,0.15)] overflow-y-auto max-h-[90vh]">
                
                <div className="text-center mb-8">
                    <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[5px]">Tezro Ecosystem</span>
                    <h2 className="text-2xl font-black text-white mt-2 italic">{role.toUpperCase()} ONBOARDING</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info (Common for All) */}
                    <div className="space-y-4">
                        <input 
                            placeholder="Business / Professional Name" 
                            className="reg-input"
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            required 
                        />
                        <input placeholder="CNIC Number (13 Digits)" className="reg-input" required />
                    </div>

                    {/* Dynamic Section (Specific for Role) */}
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[9px] text-gray-500 mb-4 uppercase tracking-widest">Required Information for {role}</p>
                        {renderExtraFields()}
                    </div>

                    {/* Security Fee Section */}
                    <div className="p-4 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Security Deposit (Refundable)</span>
                            <span className="text-[#D4AF37] font-bold">Rs. 5,000</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl hover:scale-95 transition-transform shadow-lg shadow-[#D4AF37]/20">
                        PAY & INITIALIZE BUSINESS
                    </button>
                    
                    <button onClick={onClose} type="button" className="w-full text-xs text-gray-600 uppercase tracking-widest mt-2">
                        Cancel Registration
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BusinessRegistration;
