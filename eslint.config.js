import eslintPluginAstro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    // `._*`: AppleDouble-Dateien, die macOS auf exFAT-Datenträgern neben jeder Datei anlegt.
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '.claude/worktrees/**',
      '.preview/**',
      // design-sync: gestaffelte Skripte und Build-Ausgabe, beide erzeugt
      '.ds-sync/**',
      'ds-bundle/**',
      '.design-sync/.cache/**',
      '**/._*',
    ],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  {
    files: ['scripts/**/*.mjs', '.design-sync/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  prettier,
]
