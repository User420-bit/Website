// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
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
  // Eine Schrift, aus dem eigenen Repo ausgeliefert: kein Drittanbieter, keine
  // Anfrage nach aussen (siehe Datenschutzerklaerung). Astro erzeugt @font-face,
  // Preload und einen metrisch angepassten Fallback gegen Layout-Spruenge.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Instrument Sans',
      cssVariable: '--font-klartext',
      fallbacks: ['ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/InstrumentSans-Variable.woff2'],
            weight: '400 700',
            style: 'normal',
          },
        ],
      },
    },
  ],
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
