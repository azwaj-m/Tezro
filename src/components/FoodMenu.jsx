import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useFood } from '../context/FoodContext';
import { ShoppingCart, Plus, Minus, Star, Loader2 } from 'lucide-react';

const foodItems = [
  { id: 1, name: 'شاہی مٹن کڑاہی', price: 1200, rating: 4.9, img: 'https://images.unsplash.com/photo-1603894584114-7033d0f9439f?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'گولڈن چکن بریانی', price: 650, rating: 4.8, img: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'پریمیم کباب پلیٹر', price: 850, rating: 4.7, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80' },
];

const FoodMenu = () => {
  const [cart, setCart] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { balance, makePayment } = useWallet();
  const { placeFoodOrder } = useFood();

  const updateCart = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const totalAmount = foodItems.reduce((acc, item) => acc + (cart[item.id] || 0) * item.price, 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleCheckout = async () => {
    if (totalAmount > balance) {
      alert("آپ کا بیلنس کافی نہیں ہے۔ براہ کرم والٹ ری چارج کریں۔");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. والٹ سے رقم کٹوتی
      const payment = await makePayment(totalAmount, 'food', 'Food Order Payment');
      
      if (payment.success) {
        // 2. فائر بیس میں آرڈر رجسٹر کرنا
        const selectedItems = foodItems.filter(i => cart[i.id] > 0).map(i => ({...i, qty: cart[i.id]}));
        const order = await placeFoodOrder(selectedItems, totalAmount, { address: "Current Location", lat: 24.86, lng: 67.00 });
        
        if (order.success) {
          alert("مبارک ہو! آرڈر بک ہو گیا اور رقم منتقل کر دی گئی۔");
          setCart({});
        }
      }
    } catch (error) {
      alert("سسٹم میں غلطی: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-black min-h-screen p-4 pb-24 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-yellow-500 italic">TEZRO <span className="text-white">FOOD</span></h2>
        <div className="text-right">
          <p className="text-[10px] text-gray-500">دستیاب بیلنس</p>
          <p className="text-yellow-500 font-bold">Rs. {balance}</p>
        </div>
      </div>

      <div className="space-y-4">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-gray-900 border border-yellow-600/20 p-3 rounded-2xl flex gap-4">
            <img src={item.img} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-yellow-500 font-black">Rs. {item.price}</p>
              <div className="flex justify-end gap-4 mt-1">
                <button onClick={() => updateCart(item.id, -1)} className="w-8 h-8 rounded-full border border-yellow-600/50 flex items-center justify-center">-</button>
                <span className="font-bold">{cart[item.id] || 0}</span>
                <button onClick={() => updateCart(item.id, 1)} className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4">
          <button 
            disabled={isProcessing}
            onClick={handleCheckout}
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl shadow-2xl flex justify-center items-center gap-3 disabled:bg-gray-600"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : `آرڈر کنفرم کریں (Rs. ${totalAmount})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;
