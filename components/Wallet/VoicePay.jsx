import React, { useState } from 'react';
import { verifyAndExecute } from '../../firebase/voiceAuth';
import { TezroPay } from '../../utils/TezroPayService';
import { useAuth } from '../../context/AuthContext';

const VoicePay = ({ receiver, amount }) => {
  const { user } = useAuth(); // مالک کا ڈیٹا (بشمول محفوظ شدہ وائس سگنیچر)
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");

  const handleVoicePayment = async () => {
    setStatus("آواز ریکارڈ ہو رہی ہے، بولیں: 'ادائیگی کی تصدیق کریں'");
    setIsProcessing(true);

    try {
      // 1. آواز ریکارڈ کرنا (MediaRecorder API)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });

        // 2. سیکیورٹی چیک (صرف مالک کی آواز اور اسٹوریج بچانے والا لاجک)
        const auth = await verifyAndExecute(audioBlob, user.voiceSignature);

        if (auth.authorized) {
          setStatus("✅ آواز کی تصدیق کامیاب! پیسے بھیجے جا رہے ہیں...");
          
          // 3. ٹرانزیکشن مکمل کرنا
          const result = await TezroPay.processTransfer(user.uid, receiver.id, amount);
          if (result.success) {
            setStatus(`🎉 کامیابی! ${amount} روپے ${receiver.name} کو بھیج دیے گئے۔`);
          }
        } else {
          setStatus("❌ غیر متعلقہ آواز! ادائیگی روک دی گئی۔");
        }
      };

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000); // 3 سیکنڈ ریکارڈنگ

    } catch (err) {
      setStatus("Error: مائیکروفون تک رسائی حاصل نہیں ہو سکی۔");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={{ color: '#D4AF37' }}>TezroPay وائس کنفرمیشن</h3>
      <p>رقم: <b>{amount} PKR</b> بنام: <b>{receiver.name}</b></p>
      
      <button 
        onClick={handleVoicePayment} 
        disabled={isProcessing}
        style={styles.payBtn}
      >
        🎤 {isProcessing ? "تصدیق ہو رہی ہے..." : "بول کر پیسے بھیجیں"}
      </button>
      
      <p style={styles.status}>{status}</p>
    </div>
  );
};

const styles = {
  card: { background: '#1A0F0A', padding: '20px', borderRadius: '15px', border: '1px solid #D4AF37', textAlign: 'center' },
  payBtn: { background: '#D4AF37', color: '#000', padding: '12px 25px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px' },
  status: { fontSize: '12px', marginTop: '15px', color: '#F3E5AB' }
};

export default VoicePay;
