import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useFood } from '../context/FoodContext';
import { ShoppingCart, Plus, Minus, Star, Loader2 } from 'lucide-react';

const foodItems = [
  { id: 1, name: 'Shah Mutton Karahi', price: 1200, rating: 4.9, img: 'https://images.unsplash.com/photo-1603894584114-7033d0f9439f?w=400' },
  { id: 2, name: 'Golden Chicken Biryani', price: 650, rating: 4.8, img: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400' },
  { id: 3, name: 'Premium Kabab Platter', price: 850, rating: 4.7, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
];

const FoodMenu = () => {
  const [cart, setCart] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { balance, executePayment } = useWallet();
  const { placeFoodOrder = () => console.error('Food Provider missing') } = useFood() || {};

  const updateCart = (id, delta) => {
    setCart(prev => {
      const newQty = Math.max(0, (prev[id] || 0) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const totalAmount = foodItems.reduce((acc, item) => acc + (cart[item.id] || 0) * item.price, 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCheckout = async () => {
    if (totalAmount > balance) {
      alert("بیلنس ناکافی ہے۔");
      return;
    }
    setIsProcessing(true);
    try {
      const payment = await executePayment(totalAmount, 'food', 'Food Order Payment');
      if (payment.success) {
        const selectedItems = foodItems.filter(i => cart[i.id] > 0).map(i => ({...i, qty: cart[i.id]}));
        const order = await placeFoodOrder(selectedItems, totalAmount, { address: "Current Location", lat: 24.86, lng: 67.00 });
        if (order.success) {
          alert("آرڈر بک ہو گیا!");
          setCart({});
        }
      }
    } catch (error) {
      alert("غلطی: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-black min-h-screen p-5 pb-32 text-white font-sans">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-[#D4AF37] italic tracking-tighter">TEZRO <span className="text-white">FOOD</span></h2>
          <div className="h-1 w-12 bg-[#D4AF37] rounded-full mt-1"></div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-2xl text-right">
          <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Balance</p>
          <p className="text-[#D4AF37] font-black italic">Rs. {balance}</p>
        </div>
      </div>

      <div className="space-y-6">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-[2.5rem] flex gap-5 items-center transition-all hover:border-[#D4AF37]/30 group">
            <div className="relative">
              <img src={item.img} className="w-24 h-24 rounded-[2rem] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all" />
              <div className="absolute -top-2 -right-2 bg-black/80 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
                <Star size={10} fill="#D4AF37" /> {item.rating}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg tracking-tight">{item.name}</h3>
              <p className="text-[#D4AF37] font-black text-xl italic mt-1">Rs. {item.price}</p>
              <div className="flex justify-end gap-5 mt-3">
                <button onClick={() => updateCart(item.id, -1)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors">-</button>
                <span className="font-bold text-xl w-4 text-center">{cart[item.id] || 0}</span>
                <button onClick={() => updateCart(item.id, 1)} className="w-10 h-10 rounded-xl bg-[#D4AF37] text-tezro-gold flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 transition-transform active:scale-90">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-10 left-6 right-6">
          <button
            disabled={isProcessing}
            onClick={handleCheckout}
            className="w-full bg-[#D4AF37] text-tezro-gold font-black py-5 rounded-[2rem] shadow-2xl shadow-[#D4AF37]/20 flex justify-center items-center gap-3 active:scale-95 transition-all disabled:bg-zinc-700 uppercase tracking-widest text-xs"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : `Complete Order (Rs. ${totalAmount})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;
