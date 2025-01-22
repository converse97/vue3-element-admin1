import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import path from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";

const pathSrc = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      vue(),
      // 自动导入
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true,
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"),
      }),
      // 自动注册组件
      Components({
        // 自动导入 Element Plus 组件
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            enabledCollections: ["ep"], // 自动导入element plus图标组件
          }),
        ],
        dts: path.resolve(pathSrc, "types", "components.d.ts"),
      }),
      // 自动注册图标组件
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      // 自动导入svg
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      // UnoCSS 是一个具有高性能且极具灵活性的即时原子化 CSS 引擎 。
      UnoCSS({
        configFile: "uno.config.ts",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT) || 3000, // 使用环境变量并提供默认值
      open: true,
      allowedHosts: ["m92y9k-3000.csb.app"],
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "https://api.youlai.tech",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
  };
});
