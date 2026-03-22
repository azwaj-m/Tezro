import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { SecurityEngine } from '../../../finance/SecurityEngine';

const UniversalCheckout = ({ cartItems, onClose }) => {
    const { balance, deductBalance } = useWallet();
    const [isProcessing, setIsProcessing] = useState(false);

    // ہر وینڈر کے لیے الگ سے ٹوٹل نکالنا (بیک اینڈ ڈسٹری بیوشن کے لیے)
    const subTotals = cartItems.reduce((acc, item) => {
        acc[item.ownerId] = (acc[item.ownerId] || 0) + (item.price * item.quantity);
        return acc;
    }, {});

    const totalBill = Object.values(subTotals).reduce((a, b) => a + b, 0);

    const handleVaultPayment = async () => {
        if (balance < totalBill) {
            alert("Vault Balance Insufficient");
            return;
        }

        setIsProcessing(true);
        
        // سیکیورٹی آڈٹ لاگ بنانا
        const transactionRef = SecurityEngine.generateAuditTrail("MULTI_PURCHASE", "VAULT_OUT", totalBill);

        try {
            // سمارٹ پیمنٹ ڈسٹری بیوشن: ہر دکاندار کو اس کا حصہ خودکار طور پر منتقل کرنا
            await deductBalance(totalBill, {
                ref: transactionRef.logId,
                distribution: subTotals
            });
            
            alert("Payment Authorized by Tezro Vault!");
            onClose();
        } catch (err) {
            console.error("Payment Failed", err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={`cart-drawer active`}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black italic">SECURE CHECKOUT</h2>
                <button onClick={onClose} className="text-gray-500">✕</button>
            </div>

            <div className="space-y-4 max-h-[40vh] overflow-y-auto mb-6 no-scrollbar">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{item.icon || '📦'}</span>
                            <div>
                                <p className="text-sm font-bold text-white">{item.title}</p>
                                <p className="text-[10px] text-gray-500 uppercase">{item.bizName}</p>
                            </div>
                        </div>
                        <p className="price-tag">Rs. {item.price}</p>
                    </div>
                ))}
            </div>

            <div className="border-t border-white/10 pt-6">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500 text-xs uppercase font-bold">Total Vault Deduction</span>
                    <span className="text-white font-black text-xl">PKR {totalBill.toLocaleString()}</span>
                </div>
                
                <button 
                    disabled={isProcessing}
                    onClick={handleVaultPayment}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
                        isProcessing ? 'processing-shimmer text-black' : 'bg-[#D4AF37] text-black shadow-[0_15px_40px_rgba(212,175,55,0.3)]'
                    }`}
                >
                    {isProcessing ? "ENCRYPTING TRANSACTION..." : "AUTHORIZE PAYMENT"}
                </button>
                
                <p className="text-center text-[8px] text-[#39FF14] mt-4 uppercase tracking-[3px] font-bold">
                    🛡️ End-to-End Encrypted via Tezro Protocol
                </p>
            </div>
        </div>
    );
};

export default UniversalCheckout;
