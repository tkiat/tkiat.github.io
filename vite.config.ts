import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const pathSrc = path.resolve(__dirname, './src')

export default defineConfig({
  // build: {
  // minify: false,
  //     rollupOptions: {
  //     }
  // },
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: `$w-max-mobile: 768px; $noob: 768px;`,
  //       },
  //     },
  //   },
  plugins: [reactRefresh(), svgr()],
  resolve: {
    alias: {
      src: pathSrc,
    },
  },
})
