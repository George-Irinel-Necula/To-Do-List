import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/To-Do-List/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js', 
        chunkFileNames: 'assets/[name]-[hash].js', 
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) return 'assets/index.css';
          return 'assets/[name]-[hash][extname]'; 
        },
      },
    },
    cssCodeSplit: true, // ensures CSS is separate
  },
})