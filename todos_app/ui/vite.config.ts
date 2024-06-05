import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ProxyOptions } from 'vite';

// Define the proxy options
const proxy: Record<string, string | ProxyOptions> = {
  // Proxying API requests to your backend server
  '/api': {
    target: 'http://localhost:3080', // URL of your backend server
    changeOrigin: true
  }
  // Add more proxies if neededss
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    proxy
  }
})
