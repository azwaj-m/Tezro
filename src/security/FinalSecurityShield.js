import { db } from '@/firebase';

// 1. Device Fingerprinting Logic
const getDeviceID = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const txt = 'Tezro-Security-Shield-v1';
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125,1,62,20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText(txt, 4, 17);
  return btoa(canvas.toDataURL()); // Unique Device ID
};

// 2. Strict Path Guardian
const PROTECTED_ROUTES = ['/admin', '/vendor', '/finance'];

export const validateSecurity = (path, user) => {
  const currentDevice = getDeviceID();
  
  // اگر پاتھ حساس ہے اور یوزر ایڈمن نہیں ہے
  if (PROTECTED_ROUTES.some(r => path.startsWith(r))) {
    if (!user || user.role !== 'SUPER_ADMIN') {
      console.error("🚨 SECURITY BREACH: Unauthorized Route Access Attempt!");
      return false;
    }
  }

  // سیشن سیکیورٹی چیک
  if (user && user.lastDeviceId && user.lastDeviceId !== currentDevice) {
    console.warn("⚠️ SECURITY ALERT: Account accessed from a new device.");
    // یہاں آپ الرٹ سسٹم کو کال کر سکتے ہیں
  }

  return true;
};
