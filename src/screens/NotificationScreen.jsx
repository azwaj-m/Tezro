import React from 'react';
import { Bell, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#000d08] p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 text-[#FFD700] bg-white/5 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-white italic">اطلاعات</h1>
      </div>
      
      <div className="space-y-4">
        <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 p-5 rounded-[2rem] flex items-start gap-4">
          <div className="p-2 bg-[#FFD700] rounded-full text-black"><CheckCircle2 size={20} /></div>
          <div>
            <h4 className="text-[#FFD700] font-bold text-sm">سیکیورٹی اپ ڈیٹ</h4>
            <p className="text-gray-400 text-xs mt-1">آپ کا اکاؤنٹ اب بائیومیٹرک پروٹیکشن کے ساتھ محفوظ ہے۔</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationScreen;
