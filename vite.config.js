import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  define: {

  },
  server: {
    port: 8500
  },
  envPrefix: 'SWITCHBLADE_',
  build: {
    outDir: 'build',
    target: 'es2017',
    assetsDir: 'public'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'constants': path.resolve(__dirname, './src/constants'),
      'icons': path.resolve(__dirname, './src/icons'),
      'lib': path.resolve(__dirname, './src/lib'),
      'pages': path.resolve(__dirname, './src/pages'),
      'router': path.resolve(__dirname, './src/router'),
      'state': path.resolve(__dirname, './src/state'),
      'styles': path.resolve(__dirname, './src/styles')
    },
  },
  plugins: [react(), svgr()],
  optimizeDeps: {
    exclude: ['switchblade-sdk']
  }
})