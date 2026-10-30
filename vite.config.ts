import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Absolute asset URLs, so the page loads at any depth (/mehta-chambers). GitHub Pages serves the
  // site under its repo path, so the deploy workflow sets BASE_PATH to that.
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
