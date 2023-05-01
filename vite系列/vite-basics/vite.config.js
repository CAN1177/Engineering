import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 设置打包路径
  optimizeDeps: {  // 预购建中强制排出某项依赖
    exclude: ['lodash-es']  // 排除lodash-es依赖,然后会长时间加载(65s左右)
  }
})
