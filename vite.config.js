import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '404': resolve(__dirname, '404.html'),
        'avis-legal': resolve(__dirname, 'avis-legal.html'),
        'privacitat': resolve(__dirname, 'privacitat.html'),
        'cookies': resolve(__dirname, 'cookies.html')
      }
    },
    copyPublicDir: true
  },
  publicDir: 'src/img/favicon',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  }
});