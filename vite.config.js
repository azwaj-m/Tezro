import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // یہاں سے تمام پران .html فائلوں کے لنکس نکال دیں
    rollupOptions: {
      input: {
        main: 'index.html', // صرف مین انڈیکس فائل ہونی چاہیے
      },
    },
  },
})
