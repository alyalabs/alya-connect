import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
      }),
    ],
    
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('src', import.meta.url)) },
      ],
    },

    build: {
      minify: true,

      lib: {
        entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
    },
  }
})
