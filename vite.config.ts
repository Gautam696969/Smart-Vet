/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// 🔥 Final Working Config with Proxy
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Adjust to your backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
