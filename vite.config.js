import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  
  // If you have any other Vite config (server proxy, build options, etc.), include them here
  // e.g., server: { proxy: { ... } }, build: { ... }, etc.
  
  define: {
    // The key is the placeholder to replace, and the value is what you want inserted at build time.
    // This example simply defines MY_FLAG = true.

  },
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



