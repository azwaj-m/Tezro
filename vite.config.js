import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // ری ایکٹ کو ایکٹیو کرنے کے لیے
import { resolve } from 'path';

export default defineConfig({
  // React پلگ ان کا اضافہ
  plugins: [react()],
  
  base: './', 
  
  build: {
    rollupOptions: {
      input: {
        // 1. مین اینٹری (یہاں سے HomeScreen.jsx چلے گی)
        main: resolve(__dirname, 'index.html'),
        
        // 2. آپ کی تمام موجودہ اسکرینز (HTML Files)
        login: resolve(__dirname, 'src/screens/Login.html'),
        adminLogin: resolve(__dirname, 'src/screens/AdminLogin.html'),
        adminPanel: resolve(__dirname, 'src/screens/AdminPanel.html'),
        profile: resolve(__dirname, 'src/screens/Profile.html'),
        profileSetup: resolve(__dirname, 'src/screens/ProfileSetup.html'),
        selectRide: resolve(__dirname, 'src/screens/SelectRide.html'),
        rideTracking: resolve(__dirname, 'src/screens/RideTracking.html'),
        myRides: resolve(__dirname, 'src/screens/MyRides.html'),
        safety: resolve(__dirname, 'src/screens/Safety.html'),
        wallet: resolve(__dirname, 'src/screens/Wallet.html'),
        transactions: resolve(__dirname, 'src/screens/Transactions.html'),
        communityTerms: resolve(__dirname, 'CommunityTerms.html'),
        
        // اگر سروسز کے ہوم پیجز بن چکے ہیں تو انہیں بھی شامل کریں
        foodHome: resolve(__dirname, 'src/screens/FoodHome.html'),
        shopHome: resolve(__dirname, 'src/screens/ShopHome.html'),
        parcelHome: resolve(__dirname, 'src/screens/ParcelHome.html'),
        bookingHome: resolve(__dirname, 'src/screens/BookingHome.html'),
      },
    },
    // بڑی ایپ کے لیے صفائی ضروری ہے
    emptyOutDir: true,
  },
  
  // سرور سیٹ اپ تاکہ لوکل ہوسٹ پر رزلٹ نظر آئے
  server: {
    port: 5173,
    open: true, // خود بخود براؤزر کھول دے گا
  }
});
