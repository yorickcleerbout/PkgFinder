import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import { resolve } from 'path';
import manifest from './src/manifest.json';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                background: resolve(__dirname, 'src/background.ts'),
                // Add popup or options pages here if needed
            },
            output: {
                entryFileNames: 'background.js',
            },
        },
        emptyOutDir: true,
        sourcemap: false,
        target: 'esnext',
    },
    plugins: [
        crx({ manifest })
    ],
});
