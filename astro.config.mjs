// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Kanonische Adresse der veröffentlichten Seite. Bei Umzug auf eine eigene
// Domain hier und in `base` anpassen (siehe README, Abschnitt "Base-Pfad").
export default defineConfig({
  site: 'https://user420-bit.github.io',
  base: '/Website/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
