import eslintPluginAstro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    // `._*`: AppleDouble-Dateien, die macOS auf exFAT-Laufwerken neben jede Datei legt.
    ignores: ['dist/**', 'node_modules/**', '.astro/**', '.claude/**', '.preview/**', '**/._*'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  prettier,
]
