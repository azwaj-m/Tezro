import React, { useState } from 'react';
import { ShoppingBag, Star, Search, Filter, ShoppingCart, CheckCircle } from 'lucide-react';
import { useWallet } from '../../../context/WalletContext';

const products = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 450000, category: 'Electronics', image: '/assets/logo.png', rating: 4.9 },
  { id: 2, name: 'Rolex Submariner', price: 2500000, category: 'Luxury', image: '/assets/V-vip.JPG', rating: 5.0 },
  { id: 3, name: 'Tezro Elite Sneakers', price: 15000, category: 'Fashion', image: '/assets/bick1.JPG', rating: 4.5 },
  { id: 4, name: 'MacBook Air M2', price: 320000, category: 'Electronics', image: '/assets/logo.png', rating: 4.8 }
];

const TezroMall = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const { executePayment } = useWallet();

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} کارٹ میں شامل کر دیا گیا ہے`);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const res = await executePayment(totalPrice, `Mall Purchase: ${cart.length} items`);
    if (res?.success) {
      alert("خریداری کامیاب! آپ کا آرڈر پروسیس کر دیا گیا ہے۔");
      setCart([]);
      setShowCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pt-28 pb-32">
      {/* ہیڈر اور سرچ */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black italic text-[#D4AF37]">TEZRO <span className="text-white">MALL</span></h1>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Premium Marketplace</p>
        </div>
        <button onClick={() => setShowCart(!showCart)} className="relative p-3 bg-zinc-900 rounded-2xl border border-white/5">
          <ShoppingCart size={20} className="text-[#D4AF37]" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Electronics', 'Luxury', 'Fashion'].map(cat => (
          <button key={cat} className="px-6 py-2 bg-zinc-900/50 border border-white/5 rounded-full text-[10px] font-black uppercase whitespace-nowrap active:bg-[#D4AF37] active:text-black transition-colors">
            {cat}
          </button>
        ))}
      </div>

      {/* پروڈکٹ گرڈ */}
      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-4 flex flex-col">
            <div className="h-32 bg-black/40 rounded-2xl mb-4 overflow-hidden p-2">
              <img src={product.image} className="w-full h-full object-contain" alt={product.name} />
            </div>
            <h3 className="text-[11px] font-bold mb-1 truncate">{product.name}</h3>
            <div className="flex items-center gap-1 mb-3">
              <Star size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
              <span className="text-[9px] text-zinc-400 font-bold">{product.rating}</span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-[10px] font-black text-[#D4AF37]">Rs. {product.price.toLocaleString()}</span>
              <button onClick={() => addToCart(product)} className="p-2 bg-[#D4AF37] text-black rounded-xl">
                <ShoppingBag size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* کارٹ ماڈل */}
      {showCart && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] p-6 animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center mb-8 pt-10">
            <h2 className="text-xl font-black uppercase">Your Bag</h2>
            <button onClick={() => setShowCart(false)} className="text-zinc-500 font-bold uppercase text-xs">Close</button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <img src={item.image} className="w-10 h-10 object-contain bg-white rounded-lg p-1" />
                  <div>
                    <p className="text-[10px] font-black uppercase">{item.name}</p>
                    <p className="text-[10px] text-[#D4AF37] font-bold">Rs. {item.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-6 right-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-500 font-bold uppercase text-xs">Total Amount</span>
              <span className="text-xl font-black text-[#D4AF37]">Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} className="w-full py-5 royal-gold-shiny text-black font-black rounded-3xl uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle size={20} /> Checkout with Tezro
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TezroMall;
