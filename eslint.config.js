import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      indent: ['error', 2, {
        SwitchCase: 1
      }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
    ignores: [
      '!.*',
      'dist',
      'docs',
      '_notes',
      'node_modules',
      'coverage/**/*.*',
      '*.config.js',
      '.github',
    ],
  },
];
