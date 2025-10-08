import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'avis-legal': resolve(__dirname, 'avis-legal.html'),
        'privacitat': resolve(__dirname, 'privacitat.html'),
        'cookies': resolve(__dirname, 'cookies.html'),
        '404': resolve(__dirname, '404.html')
      },
      output: {
        manualChunks: {
          vendor: ['gsap']
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    },
    devSourcemap: true
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 4173,
    open: true
  }
});