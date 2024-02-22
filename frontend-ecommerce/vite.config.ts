import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/vite-website/',
  plugins: [react()],
  server:{
    port: 3000,
    open: true,
  }
})
