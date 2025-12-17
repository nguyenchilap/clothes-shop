import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import devtoolsJson from 'vite-plugin-devtools-json'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` from the environments directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, path.resolve(__dirname, 'environments'), '')

  return {
    css: {
      devSourcemap: true
    },
    optimizeDeps: {
      include: ['lodash-es'], // force Vite to bundle lodash-es
      exclude: ['pptx-preview'] // ensure pptx-preview is not pre-bundled with wrong lodash
    },
    server: {
      port: 3000
    },
    preview: {
      port: 3000
    },
    ssr: {
      noExternal: ['pptx-preview']
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        lodash: 'lodash-es'
      }
    },
    // Environment-specific configuration from env files
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE || 'OKA User Frontend'),
      __ENABLE_DEBUG__: env.VITE_ENABLE_DEBUG === 'true',
      __ENABLE_ANALYTICS__: env.VITE_ENABLE_ANALYTICS === 'true',
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL || 'https://oka.dev.vcyber.vn/api')
    }
  }
})
