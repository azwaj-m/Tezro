import React from 'react';
import { Search, ShoppingCart, PlusCircle } from 'lucide-react';

const TezroMall = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="p-5 flex items-center justify-between sticky top-0 bg-black/90 z-10">
        <h1 className="text-2xl font-black text-[#D4AF37]">TEZRO <span className="text-white">MALL</span></h1>
        
        {/* وینڈر کے لیے اپ لوڈ بٹن جو TezroWeb پر لے جائے گا */}
        <a 
          href="https://alingosuper.github.io/TezroWeb/upload-product" 
          className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-[10px] font-bold"
        >
          <PlusCircle size={14} /> ADD PRODUCT
        </a>
      </div>

      {/* باقی مارکیٹ پلیس کا کوڈ یہاں رہے گا... */}
      <div className="p-5 text-center text-zinc-500 italic text-xs">
        Data synced from Tezro Cloud
      </div>
    </div>
  );
};

export default TezroMall;
