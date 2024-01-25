import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), checker({ vueTsc: true })],
  base: '/test-vue/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      assets: resolve(__dirname, './src/assets/'),
      components: resolve(__dirname, './src/components/'),
      router: resolve(__dirname, './src/router/'),
      services: resolve(__dirname, './src/services/'),
      stores: resolve(__dirname, './src/stores/'),
      views: resolve(__dirname, './src/views/')
    }
  }
})
