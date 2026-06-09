import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration required for the Airbnb guide (old format) to work in the new ESLint.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'webpack.*.js', 'eslint.config.js'],
  },

  // ESLint's default recommended rules.
  js.configs.recommended,

  // Apply Airbnb's strict Style Guide.
  ...compat.extends('eslint-config-airbnb-base'),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // Allows 'window', 'document', etc.
        ...globals.node, // Allows 'process', 'require', etc.
      },
    },
    rules: {
      'no-console': 'warn', // Change the console.log error to just a warning.
    },
  },

  // Disable rules that conflict with Prettier.
  eslintConfigPrettier,
];
