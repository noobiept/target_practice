// @ts-check

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    globalIgnores(['dist/**', 'release/**', '.vite/**']),
    {
        files: ['**/*.{js,mjs,ts}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            eslintConfigPrettier,
        ],
    },
);
