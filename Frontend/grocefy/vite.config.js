import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy all requests starting with /api
      // to your backend server on port 5002
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
})