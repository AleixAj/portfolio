import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', '.wrangler']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Components copied from React Bits (reactbits.dev). They're kept as
    // close to the original as possible so they're easy to diff against it
    // (each file's header lists what was changed), so the two rules they trip
    // are relaxed here instead of us rewriting their code:
    // `catch {}` to ignore a failed pointer capture, and writing to a ref
    // during render to keep the latest props without re-running the effect.
    files: ['src/components/ElectricBorder.jsx', 'src/components/LogoLoop.jsx'],
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      'react-hooks/refs': 'off',
    },
  },
])
