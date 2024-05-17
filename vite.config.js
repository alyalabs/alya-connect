import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const BUNDLE_NAME = 'alya-connect'

  let plugins = []

  if (mode === 'production') {
    plugins = [
      ...plugins,
    ]
  }

  return {
    plugins: plugins,
    
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      ],
    },
  
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
  
    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
        name: BUNDLE_NAME,
        fileName: BUNDLE_NAME
      }
    }
  }
})
