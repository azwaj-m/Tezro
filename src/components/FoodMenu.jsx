import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Star } from 'lucide-react';

const foodItems = [
  { id: 1, name: 'شاہی مٹن کڑاہی', price: 1200, rating: 4.9, img: 'https://images.unsplash.com/photo-1603894584114-7033d0f9439f?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'گولڈن چکن بریانی', price: 650, rating: 4.8, img: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'پریمیم کباب پلیٹر', price: 850, rating: 4.7, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80' },
];

const FoodMenu = () => {
  const [cart, setCart] = useState({});

  const updateCart = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-black min-h-screen p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-yellow-500 tracking-tight">Tezro <span className="text-white">Cuisine</span></h2>
        <div className="relative">
          <ShoppingCart className="text-yellow-500" size={28} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-black animate-bounce">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-gray-900/50 border border-yellow-600/20 rounded-3xl overflow-hidden flex gap-4 p-3 shadow-xl">
            <img src={item.img} alt={item.name} className="w-28 h-28 object-cover rounded-2xl border border-yellow-600/10" />
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                <div className="flex items-center text-yellow-500 gap-1 text-xs">
                  <Star size={12} fill="currentColor" />
                  <span>{item.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-500 font-black">Rs. {item.price}</span>
                <div className="flex items-center bg-black border border-yellow-600/30 rounded-xl px-2 py-1 gap-3">
                  <button onClick={() => updateCart(item.id, -1)} className="text-yellow-500"><Minus size={16} /></button>
                  <span className="text-white font-bold min-w-[20px] text-center">{cart[item.id] || 0}</span>
                  <button onClick={() => updateCart(item.id, 1)} className="text-yellow-500"><Plus size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Checkout Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 animate-in fade-in slide-in-from-bottom-4">
          <button className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] flex justify-between px-8">
            <span>آرڈر مکمل کریں</span>
            <span>Rs. {foodItems.reduce((acc, item) => acc + (cart[item.id] || 0) * item.price, 0)}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;
