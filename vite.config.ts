import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Unocss from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Unocss({
      include: ['**/*.vue', '**/*.ts'],
    }),
    VueMacros(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue/macros'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src/apis/**/*'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dirs: ['src/components/**'],
      extensions: ['vue', 'tsx'],
      dts: 'src/components.d.ts',
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader('/public/svg'),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 1888,
  },
})
