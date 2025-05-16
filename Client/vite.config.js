import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: ['@mediapipe/pose', '@mediapipe/camera_utils']
  },
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: [
      'html2canvas',
      '@mediapipe/pose',
      '@mediapipe/camera_utils'
    ]
  },
  build: {
    commonjsOptions: {
      include: [/mediapipe/, /node_modules/]
    }
  }
});
