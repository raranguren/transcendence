import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    hmr: true, // Hot Module Replacement
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
