/* global __dirname */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/slick-image-compare/',
  build: {
    target: 'es2015', // esnext
    outDir: resolve(__dirname, '../../docs'),
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
});
