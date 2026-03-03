import React, { useState, useEffect } from 'react';
import { useAssets } from '../../hooks/useAssets';
import AssetCard from '../../components/Marketplace/AssetCard';
import CategorySlider from '../../components/Marketplace/CategorySlider';

const TezroUniverse = () => {
    const { allAssets, loading } = useAssets();
    const [activeTab, setActiveTab] = useState('all');

    // 1. ڈیٹا کو الگ الگ خانوں میں تقسیم کرنا (The Isolation Logic)
    const categories = {
        food: allAssets.filter(item => item.type === 'food'),
        lifestyle: allAssets.filter(item => item.type === 'vendor' && item.subType === 'fashion'),
        electronics: allAssets.filter(item => item.type === 'vendor' && item.subType === 'tech'),
        rooms: allAssets.filter(item => item.type === 'hotel'),
    };

    const renderSection = (title, data, icon) => {
        if (data.length === 0) return null;
        return (
            <section className="mb-10 animate-fadeIn">
                <div className="flex items-center justify-between px-6 mb-4">
                    <h2 className="text-xl font-black tracking-tighter text-white flex items-center gap-2">
                        <span className="text-[#D4AF37]">{icon}</span> {title}
                    </h2>
                    <button className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">View All</button>
                </div>
                
                <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
                    {data.map(item => (
                        <AssetCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        );
    };

    if (loading) return <div className="h-screen bg-black flex items-center justify-center text-[#D4AF37] animate-pulse">Tezro Universe is Loading...</div>;

    return (
        <div className="min-h-screen bg-[#050505] pb-24">
            {/* پریمیم سرچ اور فلٹر بار */}
            <header className="p-6 sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/5">
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <span className="opacity-50">🔍</span>
                    <input className="bg-transparent outline-none text-sm w-full" placeholder="Search Food, Fashion or Hotels..." />
                </div>
                <CategorySlider active={activeTab} setActive={setActiveTab} />
            </header>

            {/* متحرک سیکشنز - یہاں نفاست سے ہر چیز الگ ہوگی */}
            <main className="mt-6">
                {activeTab === 'all' || activeTab === 'food' ? 
                    renderSection("Tezro Cuisines", categories.food, "🍕") : null}
                
                {activeTab === 'all' || activeTab === 'lifestyle' ? 
                    renderSection("Luxury & Fashion", categories.lifestyle, "👟") : null}

                {activeTab === 'all' || activeTab === 'electronics' ? 
                    renderSection("Tech & Gadgets", categories.electronics, "📱") : null}

                {activeTab === 'all' || activeTab === 'rooms' ? 
                    renderSection("Stay & Experience", categories.rooms, "🏨") : null}
            </main>

            {/* سمارٹ فلوٹنگ کارٹ بٹن */}
            <div className="fixed bottom-28 right-6">
                <button className="w-16 h-16 bg-[#D4AF37] rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center text-2xl group active:scale-90 transition-all">
                    🛒
                    <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                        3
                    </span>
                </button>
            </div>
        </div>
    );
};

export default TezroUniverse;
