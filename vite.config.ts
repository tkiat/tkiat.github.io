import reactRefresh     from '@vitejs/plugin-react-refresh'
import path             from 'path'
import { defineConfig } from 'vite'

import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    reactRefresh(),
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
