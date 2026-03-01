import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import apiPlugin from './vite-plugin-api'

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
  },
})
