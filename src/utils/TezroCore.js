import { GlobalVoiceEngine } from './GlobalVoiceEngine';
import { VoiceLockEngine } from './VoiceLockEngine';

export const TezroCore = {
  init: () => {
    console.log("Tezro Guardian AI Initializing (Offline Mode Ready)...");
    
    // 24 گھنٹے مانیٹرنگ شروع کریں
    GlobalVoiceEngine.startMonitoring((text) => {
      if (text.includes("tezro command")) {
        // یہاں سے ڈیوائس کنٹرول شروع ہوگا
        console.log("Listening for Device Commands...");
      }
    });

    // ہر 15 منٹ بعد چیک کریں کہ مالک کی آواز سنی یا نہیں
    setInterval(() => {
      if (GlobalVoiceEngine.checkOwnerPresence() === "LOCK_TRIGGERED") {
        window.location.href = "/lock-screen"; // سیلفی لاک پر بھیجیں
      }
    }, 15 * 60 * 1000);
  }
};
