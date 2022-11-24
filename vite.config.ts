import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import getProxy from './config/proxy';
import { version } from './package.json';

export default defineConfig(({ mode, command }) => {
  const envDir = join(__dirname, 'env');
  const env = <ImportMetaEnv>loadEnv(mode, envDir, '');
  const proxy = getProxy(env);
  const outDir = `./dist-workshop${env.VITE_WORKSHOP}-${mode}`;

  // 如果是航民打包，需要打补丁：
  const polyfillPlugins: any[] = [];
  if (command === 'build' && mode.includes('hm')) {
    polyfillPlugins.push(
      legacy({
        targets: ['defaults', 'chrome 45', '> 1%, last 1 version, ie >= 11']
      })
    );
  }
  return {
    plugins: [
      ...polyfillPlugins,
      react(),
      svgr(),
      createHtmlPlugin({
        inject: {
          data: {
            smFontSrc: 'http://192.168.32.120:9043/hmgfbackend/fonts/SiYuan/index.css',
            hmFontSrc: 'http://192.168.3.20:3075'
          }
        }
      })
    ],
    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true }
      }
    },
    optimizeDeps: {
      esbuildOptions: { target: 'es2015' }
    },
    resolve: {
      alias: { '@': join(__dirname, 'src') }
    },
    build: {
      outDir,
      target: command === 'serve' ? 'modules' : 'es2015'
    },
    base: './',
    envDir,
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __WORKSHOP__: env.VITE_WORKSHOP,
      __ISDEV__: command === 'serve'
    },
    server: { proxy, port: env.VITE_PORT }
  };
});
