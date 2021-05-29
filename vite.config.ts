import reactRefresh     from '@vitejs/plugin-react-refresh'
import path             from 'path'
import { defineConfig } from 'vite'

import svgr from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    // minify: false,
  },
  plugins: [
    reactRefresh(),
    svgr()
  ],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '/src'),
      // '@': path.resolve(__dirname, './src'),
    },
  },
})
