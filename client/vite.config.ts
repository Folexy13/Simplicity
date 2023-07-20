import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copy from "rollup-plugin-copy";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: "node_modules/pdfjs-dist/build/pdf.worker.js", dest: "dist" },
      ],
    }),
  ],
});
