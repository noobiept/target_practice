import { defineConfig } from 'vite';
import { name, version } from './package.json';

export default defineConfig(({ mode }) => ({
    base: './',
    build: {
        outDir: mode === 'release' ? `release/${name} ${version}` : 'dist',
    },
    define: {
        __APP_VERSION__: JSON.stringify(version),
    },
    plugins: [
        {
            name: 'inject-version-meta',
            transformIndexHtml() {
                return [
                    {
                        tag: 'meta',
                        attrs: { name: 'version', content: version },
                        injectTo: 'head',
                    },
                ];
            },
        },
    ],
}));
