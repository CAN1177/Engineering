import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./", // 设置打包路径
  optimizeDeps: {
    // 预购建中强制排出某项依赖
    exclude: ["lodash-es"], // 排除lodash-es依赖,然后会长时间加载(65s左右)
  },
  server: {
    open: false,
    host: "127.0.0.1",
    port: 3456,
    proxy: {
      "^/api/": {
        // target: config.VITE_TARGET
        target: "https://www.bilibili.com/", // 后台服务器地址
        changeOrigin: true /* 允许跨域 */,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
