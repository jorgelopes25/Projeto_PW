import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate', 
      devOptions: { enabled: true },
      manifest: {
        name: 'GoEverywhere - Moda', 
        short_name: 'GoFashion',     
        description: 'Aplicação de Estafetas e Loja de Moda Urbana',
        theme_color: '#1A1A1A',      
        background_color: '#ffffff', 
        display: 'standalone',       
        icons: [
          { src: 'logo_192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo_512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  server: { host: true },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  }
})