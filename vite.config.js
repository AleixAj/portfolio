import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Three.js (and R3F/Drei), React and EmailJS each go in their own chunk.
// That way the first load is just React + the UI, and the 3D part comes later.
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
