import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import postcsspxtoviewport from 'postcss-px-to-viewport';

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
        css: {
            postcss: {
                plugins: [
                    // 配置参数：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md#%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0
                    postcsspxtoviewport({
                        unitToConvert: 'px', // 要转化的单位
                        viewportWidth: 750, // UI设计稿的宽度，如果你的设计稿是 375 就改成 375
                        exclude: [/node_modules\/vant/], // 设置忽略文件，用正则做目录名匹配（如果设计稿是 375，那就不用忽略vant）
                        unitPrecision: 6, // 转换后的精度，即小数点位数
                        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                        selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
                        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                        replace: true, // 是否转换后直接更换属性值
                        landscape: false, // 是否处理横屏情况
                    }),
                ],
            },
        },
    };
});
