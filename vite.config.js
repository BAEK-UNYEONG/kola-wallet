import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:50000',
    }
  },
  plugins: [vue()],
  define: {
    'process.env': {}
  },
})
