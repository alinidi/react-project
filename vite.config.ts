import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      API: path.resolve(__dirname, './src/API'),
      common: path.resolve(__dirname, './src/common'),
      helper: path.resolve(__dirname, './src/helper'),
      components: path.resolve(__dirname, './src/components'),
      types: path.resolve(__dirname, './src/types'),
    },
  },
});
