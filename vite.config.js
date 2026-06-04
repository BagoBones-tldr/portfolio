import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The /api/* serverless functions don't run under `vite dev` (they need
    // Vercel's runtime). Proxy them to the deployed site so the live KRONOS
    // status badge works locally and Vite never tries to bundle server code.
    proxy: {
      '/api': {
        target: 'https://portfolio-topaz-three-2he7p52rjp.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
