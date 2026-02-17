import { defineConfig } from 'vite';
import { resolve } from 'path';

// AlinGo Super App - Production Config
export default defineConfig({
  // بیس پاتھ اگر آپ اسے سب-ڈائریکٹری میں ہوسٹ نہیں کر رہے تو اسے ڈیفالٹ رہنے دیں
  base: './', 
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // مین ہوم پیج (جہاں رائیڈ اور فوڈ کے بٹنز ہیں)
        main: resolve(__dirname, 'index.html'),
        
        // لاگ ان سسٹم (OTP اور گوگل میل کیلئے)
        login: resolve(__dirname, 'src/screens/Login.html'),
        
        // آپ کی اپگریڈڈ پروفیشنل پروفائل اور والیٹ سسٹم
        profile: resolve(__dirname, 'src/screens/Profile.html'),
        
        // رائیڈ سلیکشن (بائیک، رکشہ، کار)
        selectRide: resolve(__dirname, 'src/screens/SelectRide.html'),
        
        // رائیڈ ٹریکنگ میپ اور ڈرائیور کنیکٹیویٹی
        rideTracking: resolve(__dirname, 'src/screens/RideTracking.html'),
      },
      
      // لاجک: بلڈ کے دوران غیر ضروری فائلوں کے وارننگز کو ہینڈل کرنا
      output: {
        manualChunks: undefined,
      },
    },
  },

  // سرور سیٹنگز تاکہ لوکل ٹیسٹنگ میں آسانی ہو
  server: {
    port: 3000,
    open: true
  }
});
