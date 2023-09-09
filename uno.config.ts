import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerAttributifyJsx,
  transformerDirectives,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  theme: {
    colors: {
      primary: '#0d9488',
    },
  },
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'btn': 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
  },
  rules: [
    [
      /^ellipsis-(\d+)$/,
      ([, n]) => ({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': ' -webkit-box',
        '-webkit-line-clamp': `${n}`,
        '-webkit-box-orient': 'vertical',
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        cus: FileSystemIconLoader('./public/svg'),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerAttributifyJsx(),
  ],
})
