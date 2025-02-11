import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: './index.html',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@aws-sdk/client-sts'],
  },
  resolve: {
    alias: {
      '@': '/src', // Match the "paths" in tsconfig
    },
  },
})
