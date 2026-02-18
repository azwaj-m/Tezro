import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // اگر آپ کی فائلیں 'public' فولڈر سے باہر ہیں تو یہ بیس پاتھ ضروری ہے
  base: './', 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/screens/Login.html'),
        profile: resolve(__dirname, 'src/screens/Profile.html'),
        selectRide: resolve(__dirname, 'src/screens/SelectRide.html'),
        rideTracking: resolve(__dirname, 'src/screens/RideTracking.html'),
        // صرف وہی فائلیں یہاں رکھیں جو آپ بنا چکے ہیں
        rides: resolve(__dirname, 'src/screens/MyRides.html'),
        safety: resolve(__dirname, 'src/screens/Safety.html'),
        wallet: resolve(__dirname, 'src/screens/Wallet.html'),
      },
    },
    // آؤٹ پٹ فولڈر کی صفائی
    emptyOutDir: true,
  },
});
