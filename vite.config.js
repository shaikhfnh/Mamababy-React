import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  //  base: "/",
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

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   base: "/",
//   build: {
//     chunkSizeWarningLimit: 2000, // increase from 500kb to 1000kb
//   },
// });
