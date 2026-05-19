import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite config.
 * - manualChunks splits Three.js + R3F + Drei into their own bundle so the
 *   initial JS payload only contains React + UI code. The 3D chunk loads
 *   asynchronously when the Hero scene mounts.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'three-vendor'
            }
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-vendor'
            }
            if (id.includes('@emailjs/browser')) {
              return 'emailjs-vendor'
            }
          }
        },
      },
    },
  },
})
