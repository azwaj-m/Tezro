import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { SecurityEngine } from '../finance/SecurityEngine';

const UniversalAssetManager = ({ bizId, category }) => {
    const [assets, setAssets] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ 
        title: '', price: '', stock: '', status: 'Available', type: category 
    });

    // 1. لائیو ڈیٹا سنکنگ (یہ سسٹم کو 'زندہ' رکھتا ہے)
    useEffect(() => {
        if (!bizId) return;
        const q = query(collection(db, "assets"), where("ownerId", "==", bizId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [bizId]);

    // 2. محفوظ اندراج (Tezro Vault Audit کے ساتھ)
    const handleAddAsset = async (e) => {
        e.preventDefault();
        const audit = SecurityEngine.generateAuditTrail(bizId, "ASSET_ADDITION", newItem.price);
        
        try {
            await addDoc(collection(db, "assets"), {
                ...newItem,
                ownerId: bizId,
                createdAt: new Date(),
                vaultRef: audit.logId
            });
            setIsAdding(false);
            setNewItem({ title: '', price: '', stock: '', status: 'Available', type: category });
        } catch (err) {
            console.error("Vault Rejection:", err);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* ٹاپ ایکشن بار */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-black tracking-widest uppercase text-white/80">
                    {category === 'hotel' ? 'Room & Hall Inventory' : 'Product Catalog'}
                </h3>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl font-black text-xs uppercase hover:scale-105 transition-all"
                >
                    {isAdding ? 'Close Panel' : `Add New ${category === 'hotel' ? 'Unit' : 'Product'}`}
                </button>
            </div>

            {/* نیا آئٹم شامل کرنے کا پریمیم فارم */}
            {isAdding && (
                <form onSubmit={handleAddAsset} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-white/5 border border-[#D4AF37]/20 rounded-[25px] animate-slideDown">
                    <input 
                        className="asset-input" placeholder="Title (e.g. Deluxe Room / iPhone 15)" 
                        onChange={e => setNewItem({...newItem, title: e.target.value})} required 
                    />
                    <input 
                        type="number" className="asset-input" placeholder="Price (PKR)" 
                        onChange={e => setNewItem({...newItem, price: e.target.value})} required 
                    />
                    <input 
                        type="number" className="asset-input" placeholder={category === 'hotel' ? 'No. of Units' : 'Stock Qty'} 
                        onChange={e => setNewItem({...newItem, stock: e.target.value})} required 
                    />
                    <button type="submit" className="bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30 rounded-xl font-bold text-xs uppercase">
                        Authorize & List
                    </button>
                </form>
            )}

            {/* انوینٹری لسٹ (Grid System) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map(item => (
                    <div key={item.id} className="bg-[#111] p-5 rounded-[30px] border border-white/5 hover:border-[#D4AF37]/40 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[9px] px-2 py-1 rounded-md font-black ${item.status === 'Available' ? 'bg-[#39FF14]/10 text-[#39FF14]' : 'bg-red-500/10 text-red-500'}`}>
                                ● {item.status.toUpperCase()}
                            </span>
                            <span className="text-gray-600 text-[10px]">ID: {item.id.slice(-6)}</span>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-[#D4AF37] font-black text-xl">Rs. {Number(item.price).toLocaleString()}</p>
                        
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <p className="text-[10px] text-gray-500">Inventory: <span className="text-white">{item.stock} Units</span></p>
                            <button className="text-[10px] uppercase font-bold text-[#D4AF37] hover:underline">Edit Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniversalAssetManager;
