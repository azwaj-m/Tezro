import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/screens/Login.html'),
        profile: resolve(__dirname, 'src/screens/Profile.html'),
        selectRide: resolve(__dirname, 'src/screens/SelectRide.html'),
        rideTracking: resolve(__dirname, 'src/screens/RideTracking.html'),
        sportsLive: resolve(__dirname, 'src/screens/SportsLive.html'),
       },
    },
  },
});

