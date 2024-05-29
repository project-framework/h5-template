import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        base: './',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: [
            vue(),
            AutoImport({
                dts: path.resolve(__dirname, 'types', 'auto-imports.d.ts'),
                resolvers: [VantResolver()],
            }),
            Components({
                dts: path.resolve(__dirname, 'types', 'components.d.ts'),
                resolvers: [VantResolver()],
            }),
        ],
    };
});
