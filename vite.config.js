import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // ڈپلائیمنٹ ٹیسٹنگ کے وقت خودکار براؤزر اوپننگ
  },
  build: {
    outDir: 'dist', // ڈپلائیمنٹ فولڈر کا نام
    sourcemap: false, // پروڈکشن میں کوڈ چھپانے کے لیے (Security)
    rollupOptions: {
      output: {
        // سیکیورٹی اور بینکنگ لاجک کو الگ چنک میں رکھنا (Performance)
        manualChunks: {
          security: ['./src/utils/SecurityEngine'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // اگر آپ سب ڈومین (e.g. tezro.com/app) استعمال کر رہے ہیں تو یہاں پیتھ دیں
  base: '/', 
})
