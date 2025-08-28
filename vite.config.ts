import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you publish to GitHub Pages under /<repo>/, change base to '/<repo>/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
