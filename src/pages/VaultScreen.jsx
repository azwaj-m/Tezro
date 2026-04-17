
import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { User, ShieldCheck, Camera, Save, X, Truck, Stethoscope, Wrench, Shop, Lock } from 'lucide-react';



const VaultScreen = () => {

  const [isVerified, setIsVerified] = useState(false);

  const [userRole, setUserRole] = useState(""); // ڈرائیور، ڈاکٹر، پلمبر وغیرہ

  const [showForm, setShowForm] = useState(false);



  // سیکیورٹی چیک: کیمرہ ایکٹیویشن (سمولیشن)

  const handleSecurityCheck = () => {

    // یہاں اصل میں کیمرہ لاجک آئے گا

    alert("Security Verification: Scanning Face...");

    setTimeout(() => {

      setIsVerified(true);

      setShowForm(true);

    }, 2000);

  };



  const renderRoleSpecificFields = () => {

    switch (userRole) {

      case "driver":

        return (

          <div className="space-y-4 animate-in fade-in">

            <input type="text" placeholder="گاڑی کا نمبر اور ماڈل" className="w-full bg-white/10 p-4 rounded-xl" />

            <select className="w-full bg-white/10 p-4 rounded-xl">

              <option>ذاتی گاڑی</option>

              <option>رینٹل (مالک کی تفصیل درج کریں)</option>

            </select>

            <input type="file" className="text-xs" /> <span className="text-[10px]">لائسنس اپ لوڈ کریں</span>

          </div>

        );

      case "doctor":

        return (

          <div className="space-y-4">

            <input type="text" placeholder="تعلیمی اسناد (MBBS etc)" className="w-full bg-white/10 p-4 rounded-xl" />

            <input type="text" placeholder="PMDC رجسٹریشن نمبر" className="w-full bg-white/10 p-4 rounded-xl" />

          </div>

        );

      case "technician":

        return (

          <div className="space-y-4">

            <textarea placeholder="اپنے اوزاروں کی تفصیل لکھیں (مثلاً ڈرل، کٹر، میٹر)" className="w-full bg-white/10 p-4 rounded-xl h-24" />

            <input type="text" placeholder="ایمرجنسی نمبر 1" className="w-full bg-white/10 p-4 rounded-xl" />

            <input type="text" placeholder="ایمرجنسی نمبر 2" className="w-full bg-white/10 p-4 rounded-xl" />

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">

              <p className="text-[10px] text-yellow-500">سیکیورٹی نوٹ: آپ کی وائس ریکارڈنگ اور سیلفی ریکارڈ کا حصہ بنائی جائے گی۔</p>

            </div>

          </div>

        );

      default:

        return null;

    }

  };



  return (

    <div className="min-h-screen bg-[#000d08] text-white p-6 pb-32">

      <h1 className="text-2xl font-black text-gold uppercase mb-8 italic">Tezro Secure Profile</h1>



      {!showForm ? (

        <div className="flex flex-col items-center justify-center h-96 space-y-6">

          <div className="w-32 h-32 bg-gold/10 rounded-full flex items-center justify-center border-2 border-dashed border-gold">

            <Lock size={48} className="text-gold" />

          </div>

          <button 

            onClick={handleSecurityCheck}

            className="royal-gold-shiny px-10 py-4 rounded-2xl text-black font-black uppercase"

          >

            تصدیق کریں اور سیٹنگز کھولیں

          </button>

        </div>

      ) : (

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* بنیادی معلومات - سب کیلئے لازمی */}

          <div className="space-y-4">

            <input type="text" placeholder="پورا نام" className="w-full bg-white/10 p-4 rounded-xl border border-white/5" />

            

            <label className="text-xs text-gold font-bold">آپ کی حیثیت منتخب کریں:</label>

            <div className="grid grid-cols-2 gap-2">

              <button onClick={() => setUserRole("driver")} className={`p-3 rounded-xl border ${userRole === 'driver' ? 'border-gold bg-gold/20' : 'border-white/10'}`}>ڈرائیور</button>

              <button onClick={() => setUserRole("doctor")} className={`p-3 rounded-xl border ${userRole === 'doctor' ? 'border-gold bg-gold/20' : 'border-white/10'}`}>ڈاکٹر</button>

              <button onClick={() => setUserRole("technician")} className={`p-3 rounded-xl border ${userRole === 'technician' ? 'border-gold bg-gold/20' : 'border-white/10'}`}>ٹیکنیشن / مزدور</button>

              <button onClick={() => setUserRole("other")} className={`p-3 rounded-xl border ${userRole === 'other' ? 'border-gold bg-gold/20' : 'border-white/10'}`}>دیگر</button>

            </div>

          </div>



          {/* رول کے حساب سے فارم */}

          {renderRoleSpecificFields()}



          {/* سیکیورٹی اپ لوڈز */}

          <div className="space-y-4 mt-10">

            <p className="text-[10px] uppercase font-bold text-gray-500 italic">Security Documents (Record Only)</p>

            <div className="grid grid-cols-2 gap-4">

              <div className="h-24 bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center">

                <Camera size={20} /> <span className="text-[8px] mt-2">تازہ سیلفی</span>

              </div>

              <div className="h-24 bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center">

                <ShieldCheck size={20} /> <span className="text-[8px] mt-2">شناختی کارڈ</span>

              </div>

            </div>

          </div>



          <button className="w-full py-5 royal-gold-shiny rounded-[30px] text-black font-black uppercase tracking-widest mt-10">

            معلومات محفوظ کریں

          </button>

        </motion.div>

      )}

    </div>

  );

};



export default VaultScreen;

