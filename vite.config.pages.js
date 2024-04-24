/* global __dirname */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/slick-image-compare/',
  build: {
    target: 'es2015', // esnext
    outDir: 'docs',
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
