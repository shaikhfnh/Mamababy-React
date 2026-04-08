// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import { resolve } from 'path';

// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   base: '/wp-content/themes/twentytwentyfive-child/react-build/', 

//   build: {
//     outDir: 'react-build',
//     emptyOutDir: true,
//     manifest: true,
//     chunkSizeWarningLimit: 1200,

//     rollupOptions: {
//       input: resolve(__dirname, 'src/main.jsx'),

//       output: {
//         manualChunks: {
//           // Split React into its own chunk (highly cacheable)
//           react: ['react', 'react-dom'],
//           // Other vendor libraries
//           vendor: ['framer-motion'] // add any other heavy libs you use
//         }
//       }
//     },
//   },

//   resolve: {
//     alias: {
//       '@assets': resolve(__dirname, 'src/assets'),
//     },
//   },
// });














import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
    // base: "/",
     base: '/wp-content/themes/twentytwentyfive-child/react-build/', 
  build: {
    outDir: 'react-build',
    emptyOutDir: true,
    manifest: true, // required for PHP enqueue
    rollupOptions: {
      input: resolve(__dirname, 'src/main.jsx'),
    },
    chunkSizeWarningLimit:2000,
  },
  resolve: {
    alias: {
      '@assets': resolve(__dirname, 'src/assets'), // use for images: import img from '@assets/...'
    },
  },
});

