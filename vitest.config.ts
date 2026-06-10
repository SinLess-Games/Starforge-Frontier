import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    passWithNoTests: true,
    clearMocks: true,
    restoreMocks: true,

    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    exclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.vite/**',
      'src-tauri/**',
    ],
  },
});