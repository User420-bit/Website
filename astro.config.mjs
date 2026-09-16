// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Kanonische Adresse der veröffentlichten Seite. Eigene Domain über
// `public/CNAME`, daher kein Unterpfad (siehe README, Abschnitt "Domain").
export default defineConfig({
  site: 'https://web-klartext.de',
  base: '/',
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
