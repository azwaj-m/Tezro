import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        selectRide: resolve(__dirname, 'src/screens/SelectRide.html'),
        rideTracking: resolve(__dirname, 'src/screens/RideTracking.html'),
        profile: resolve(__dirname, 'src/screens/Profile.html'),
        sportsLive: resolve(__dirname, 'src/screens/SportsLive.html'),
        // یہاں سے Weather.html والی لائن کو مکمل طور پر حذف کر دیں
      },
    },
  },
});
