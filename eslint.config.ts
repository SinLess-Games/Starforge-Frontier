import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '.vite/**',
      '.turbo/**',
      '.rundot/**',
      '.rundot-docs/**',
      'src-tauri/target/**',
      'src-tauri/gen/**',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  },

  {
    files: ['vite.config.ts', 'prettier.config.ts', 'eslint.config.ts'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);