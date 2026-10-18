import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/slick-image-compare/',
  build: {
    target: 'es2015', // esnext
    outDir: resolve(import.meta.dirname, '../../docs'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, './docs.html'),
      },
    },
  },

  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(import.meta.dirname, 'src'),
      },
    ],
  },
});
