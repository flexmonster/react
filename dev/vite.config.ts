import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const wrapperRoot = resolve(__dirname, '..')
const wrapperDist = resolve(wrapperRoot, 'dist')

export default defineConfig({
  plugins: [
    react(),
    {
      // ../dist is outside the Vite root, so it needs to be watched explicitly
      name: 'watch-wrapper-dist',
      configureServer(server) {
        server.watcher.add(wrapperDist)
        server.watcher.on('change', (file) => {
          if (file.startsWith(wrapperDist)) {
            server.ws.send({ type: 'full-reload' })
          }
        })
      },
    },
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['@flexmonster/react', '@flexmonster/js'],
  },
  server: {
    fs: {
      allow: [__dirname, wrapperRoot, resolve(__dirname, '../../../triple')],
    },
  },
})
