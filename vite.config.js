import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // صرف وہی فائلیں جو حقیقت میں موجود ہیں
        rides: resolve(__dirname, 'src/screens/MyRides.html'),
        safety: resolve(__dirname, 'src/screens/Safety.html'),
        wallet: resolve(__dirname, 'src/screens/Wallet.html'),
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/screens/Login.html'),
        profile: resolve(__dirname, 'src/screens/Profile.html'),
        selectRide: resolve(__dirname, 'src/screens/SelectRide.html'),
        rideTracking: resolve(__dirname, 'src/screens/RideTracking.html'),
      },
    },
  },
});
