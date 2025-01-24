// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  
  // If you have any other Vite config (server proxy, build options, etc.), include them here
  // e.g., server: { proxy: { ... } }, build: { ... }, etc.
  
  define: {
    // The key is the placeholder to replace, and the value is what you want inserted at build time.
    // This example simply defines MY_FLAG = true.
    __DEFINES__: JSON.stringify({ MY_FLAG: true }),
  },
})
