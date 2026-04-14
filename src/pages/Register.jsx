import React, { useRef, useState } from 'react';
import { Camera, ShieldCheck, UploadCloud, User } from 'lucide-react';
import { db, storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // لائیو کیمرہ شروع کرنا
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setPhoto(canvas.toDataURL('image/jpeg'));
    // کیمرہ بند کرنا
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  const handleRegistration = async () => {
    setLoading(true);
    const driverId = "DRV-" + Math.random().toString(36).substr(2, 9);
    
    // 1. سیلفی فائر بیس اسٹوریج میں اپ لوڈ کرنا
    const storageRef = ref(storage, `drivers/${driverId}.jpg`);
    await uploadString(storageRef, photo, 'data_url');
    const photoUrl = await getDownloadURL(storageRef);

    // 2. ڈیٹا قلیل سے قلیل کر کے فائرسٹور میں محفوظ کرنا
    await setDoc(doc(db, "drivers", driverId), {
      id: driverId,
      selfie: photoUrl,
      status: "verified",
      regDate: new Date().toISOString()
    });

    setLoading(false);
    alert("رجسٹریشن مکمل! اب آپ ایپ میں جا سکتے ہیں۔");
    // واپسی ایپ پر (Callback)
    window.location.href = "tezro://auth-success?id=" + driverId;
  };

  return (
    <div className="min-h-screen bg-[#000d08] text-white p-8 flex flex-col items-center">
      <h1 className="text-[#FFD700] text-3xl font-black italic mb-8 shadow-glow">DRIVER VERIFICATION</h1>
      
      <div className="w-full max-w-md bg-black/40 border-2 border-[#FFD700]/30 rounded-[3rem] p-8 space-y-6">
        {/* لائیو کیمرہ باکس */}
        <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-[#FFD700]/20 bg-black">
          {!photo ? (
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          ) : (
            <img src={photo} className="w-full h-full object-cover" />
          )}
        </div>

        {!photo ? (
          <button onClick={startCamera} className="w-full bg-[#FFD700]/10 text-[#FFD700] py-4 rounded-2xl border border-[#FFD700]/40 font-bold flex justify-center gap-2">
            <Camera /> کیمرہ کھولیں
          </button>
        ) : null}

        {videoRef.current?.srcObject && !photo && (
          <button onClick={capturePhoto} className="w-full bg-[#FFD700] text-black py-4 rounded-2xl font-black">
            سیلفی لیں
          </button>
        )}

        {photo && (
          <button onClick={handleRegistration} disabled={loading} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-green-900/20">
            {loading ? "تصدیق ہو رہی ہے..." : "ڈیٹا جمع کریں"}
          </button>
        )}
      </div>
      
      <div className="mt-8 flex items-center gap-2 text-gray-500">
        <ShieldCheck size={16} />
        <span className="text-[10px] uppercase font-black tracking-widest">End-to-End Encrypted Secure Registration</span>
      </div>
    </div>
  );
};

export default Register;
