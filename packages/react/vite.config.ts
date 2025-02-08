/// <reference types="vite/client" />
/// <reference types="vitest" />

import { resolve } from 'node:path';
// import { fileURLToPath } from 'node:url'
// import { globSync } from 'glob'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'es2015', // esnext
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SlickImageCompare',
      fileName: (format) => {
        const formatName = 'es' === format ? '' : `.${format}`;
        return `index${formatName}.js`;
      },
      // formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'slick-image-compare',
        'react',
        'react-dom',
        'react/jsx-runtime',
        /node_modules/,
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },

  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },

  plugins: [react(), libInjectCss(), dts()],
});
