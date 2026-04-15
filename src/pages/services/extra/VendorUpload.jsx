import React, { useState } from 'react';
import { Package, Tag, AlignLeft, DollarSign, CheckCircle } from 'lucide-react';

const VendorUpload = () => {
  const [status, setStatus] = useState('');

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#D4AF37] uppercase">Vendor <span className="text-white">Portal</span></h1>
        <p className="text-zinc-500 text-xs mt-1">Upload your products to Tezro Marketplace</p>
      </div>

      <div className="space-y-6">
        {/* Product Image Placeholder */}
        <div className="h-44 w-full border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-600 hover:border-[#D4AF37] transition-all cursor-pointer">
          <Package size={40} />
          <span className="text-[10px] mt-2 font-bold uppercase">Click to upload photo</span>
        </div>

        {/* Form Fields */}
        <div className="relative">
          <Tag className="absolute left-4 top-4 text-[#D4AF37]" size={18} />
          <input type="text" placeholder="Product Name" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37]" />
        </div>

        <div className="relative">
          <AlignLeft className="absolute left-4 top-4 text-[#D4AF37]" size={18} />
          <textarea placeholder="Brief Description" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 h-24 focus:outline-none focus:border-[#D4AF37]"></textarea>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-4 top-4 text-[#D4AF37]" size={18} />
          <input type="number" placeholder="Price (PKR)" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37]" />
        </div>

        <button 
          onClick={() => setStatus('Uploaded Successfully!')}
          className="w-full bg-[#D4AF37] text-black font-extrabold py-4 rounded-2xl shadow-lg shadow-yellow-900/20 active:scale-95 transition-all"
        >
          POST PRODUCT
        </button>

        {status && (
          <div className="flex items-center gap-2 text-green-500 justify-center font-bold animate-bounce">
            <CheckCircle size={18} /> {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorUpload;
