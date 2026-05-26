import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/niche/beauty/',
  plugins: [react()],
  build: {
    outDir: '../../public/niche/beauty',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react';
          }

          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }

          return undefined;
        },
      },
    },
  },
});
