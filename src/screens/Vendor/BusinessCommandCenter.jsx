import React, { useState } from 'react';
import { db, storage } from '@/firebase';

const BusinessCommandCenter = () => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    // امیج اپلوڈ اور فائر بیس انٹری کی منطق
    alert("ڈیٹا محفوظ ہو گیا!");
    setLoading(false);
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-gold text-2xl font-bold mb-6">بزنس ڈیش بورڈ</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-black" />
        <input type="text" placeholder="پروڈکٹ کا نام" className="w-full p-3 bg-slate-800 rounded" />
        <input type="number" placeholder="قیمت (روپے میں)" className="w-full p-3 bg-slate-800 rounded" />
        <textarea placeholder="مختصر تفصیلات" className="w-full p-3 bg-slate-800 rounded h-24"></textarea>
        
        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-green-600 p-4 rounded-xl font-bold">محفوظ کریں</button>
          <button type="button" onClick={() => window.location.reload()} className="flex-1 bg-blue-600 p-4 rounded-xl font-bold">مزید اندراج</button>
        </div>
        <button type="button" onClick={() => window.history.back()} className="w-full mt-4 text-gray-400">ایپ پر واپسی</button>
      </form>
    </div>
  );
};

export default BusinessCommandCenter;
