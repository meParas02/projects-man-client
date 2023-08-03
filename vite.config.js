import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      REACT_APP_API: JSON.stringify(env.REACT_APP_LOCAL),
    },
  }
})
