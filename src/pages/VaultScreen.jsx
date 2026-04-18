import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Lock, ShieldCheck, User, Truck, Stethoscope, Wrench, HardHat, LogOut, Save } from 'lucide-react';

const VaultScreen = () => {
  const [step, setStep] = useState('security'); // security -> role -> form -> success
  const [role, setRole] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // سیکیورٹی تصدیق (خفیہ کیمرہ آن ہونا)
  const startSecurityCheck = () => {
    setIsVerifying(true);
    // یہاں اصل ایپ میں کیمرہ تصویر لے کر بیک اینڈ پر بھیجے گا
    setTimeout(() => {
      setIsVerifying(false);
      setStep('role');
    }, 2500);
  };

  const renderRegistrationForm = () => {
    switch (role) {
      case 'driver':
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom">
            <h3 className="text-gold font-bold">گاڑی اور لائسنس کی تفصیل</h3>
            <input type="text" placeholder="گاڑی کا نمبر (مثلاً LEC-1234)" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10" />
            <select className="w-full bg-white/5 p-4 rounded-2xl border border-white/10 text-gray-400">
              <option>گاڑی کی ملکیت: اپنی ہے</option>
              <option>رینٹ پر ہے (مالک کا نام اور نمبر دیں)</option>
            </select>
            <textarea placeholder="مالک کا پتہ اور رینٹ ایگریمنٹ کی تفصیل" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10 h-24" />
            <div className="p-4 border border-dashed border-gold/30 rounded-2xl text-[10px] text-center">ڈرائیونگ لائسنس اور گاڑی کے کاغذات کی تصویر اپ لوڈ کریں</div>
          </div>
        );
      case 'doctor':
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom">
            <h3 className="text-gold font-bold">طبی اسناد اور رجسٹریشن</h3>
            <input type="text" placeholder="تعلیمی اسناد (MBBS / MD)" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10" />
            <input type="text" placeholder="PMDC / ہاؤس جاب نمبر" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10" />
            <input type="text" placeholder="کلینک یا ہسپتال کا پتہ" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10" />
            <div className="p-4 border border-dashed border-gold/30 rounded-2xl text-[10px] text-center">ڈگری اور سرٹیفکیٹس کا اسکین اپ لوڈ کریں</div>
          </div>
        );
      case 'service_provider': // پلمبر، میسن، مکینک
        return (
          <div className="space-y-4 animate-in slide-in-from-bottom">
            <h3 className="text-gold font-bold">پیشہ ورانہ مہارت اور اوزار</h3>
            <textarea placeholder="اپنے پاس موجود اوزاروں (Tools) کی مکمل لسٹ لکھیں" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10 h-32" />
            <input type="text" placeholder="ایمرجنسی رابطہ نمبر (والد/بھائی/قریبی عزیز)" className="w-full bg-white/5 p-4 rounded-2xl border border-white/10" />
            <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
              <p className="text-[10px] text-red-400 font-bold">نوٹ: آپ کی آواز کا نمونہ اور تازہ سیلفی سیکیورٹی ریکارڈ کے لیے محفوظ کی جائے گی۔</p>
            </div>
            <button className="w-full py-3 bg-white/10 rounded-xl text-xs flex items-center justify-center gap-2">🎤 آواز ریکارڈ کریں</button>
          </div>
        );
      default:
        return <p className="text-center text-gray-500">براہ کرم اپنی کیٹیگری منتخب کریں</p>;
    }
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-24">
      
      {/* 1. سیکیورٹی اسٹیج */}
      {step === 'security' && (
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
          <div className="relative">
            <div className={`w-40 h-40 rounded-full border-2 border-gold flex items-center justify-center ${isVerifying ? 'animate-pulse' : ''}`}>
              <Lock size={60} className="text-gold" />
            </div>
            {isVerifying && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 border-t-4 border-gold rounded-full" />}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-black text-gold italic uppercase">Security Verification</h2>
            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Identifying current user via camera...</p>
          </div>
          {!isVerifying && (
            <button onClick={startSecurityCheck} className="dark-gold-shiny px-12 py-5 rounded-full text-black font-black uppercase text-xs">پروفائل سیٹنگز کھولیں</button>
          )}
        </div>
      )}

      {/* 2. رول سلیکشن اور فارم اسٹیج */}
      {step === 'role' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-gold/20 pb-4">
            <h1 className="text-2xl font-black text-gold italic uppercase">Complete Profile</h1>
            <X onClick={() => setStep('security')} className="text-gray-600" />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">صارف کی نوعیت منتخب کریں</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'driver', label: 'ڈرائیور / گاڑی', icon: <Truck size={18}/> },
                { id: 'doctor', label: 'ڈاکٹر / ماہرِ طب', icon: <Stethoscope size={18}/> },
                { id: 'service_provider', label: 'پلمبر/میسن/مکینک', icon: <Wrench size={18}/> },
                { id: 'business', label: 'دکاندار/ہال مینیجر', icon: <HardHat size={18}/> },
              ].map((r) => (
                <button 
                  key={r.id} 
                  onClick={() => setRole(r.id)}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${role === r.id ? 'border-gold bg-gold text-black font-black' : 'border-white/10 bg-white/5 text-gray-400'}`}
                >
                  {r.icon} <span className="text-[10px]">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {renderRegistrationForm()}

          <div className="pt-10">
            <p className="text-[9px] text-gray-600 text-center mb-4 italic uppercase">جمع کرائی گئی معلومات سیکیورٹی ریکارڈ کے لیے محفوظ ہوں گی اور آپ کو نظر نہیں آئیں گی۔</p>
            <button onClick={() => setStep('success')} className="w-full py-5 dark-gold-shiny rounded-[30px] text-black font-black uppercase tracking-widest">ڈیٹا جمع کرائیں</button>
          </div>
        </div>
      )}

      {/* 3. کامیابی کا پیغام */}
      {step === 'success' && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
          <ShieldCheck size={100} className="text-green-500" />
          <h2 className="text-2xl font-black text-white italic uppercase">Record Verified</h2>
          <p className="text-sm text-gray-400 px-10">آپ کی تمام معلومات اور دستاویزات سیکیورٹی ریکارڈ میں محفوظ کر لی گئی ہیں۔ آپ کی پروفائل اب ایکٹیو ہے۔</p>
          <button onClick={() => setStep('security')} className="dark-gold-shiny px-10 py-4 rounded-2xl text-black font-black uppercase text-xs">ہوم پیج پر جائیں</button>
        </div>
      )}
    </div>
  );
};

export default VaultScreen;
