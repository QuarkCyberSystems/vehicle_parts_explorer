import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy all calls starting with /api/v1 to your remote server
      '/api/v1': {
        target: 'https://parts.quarkcs.com',
        changeOrigin: true
        // If your server only supports HTTP, use 'http://', but typically you need https
      }
    }
  }
})
