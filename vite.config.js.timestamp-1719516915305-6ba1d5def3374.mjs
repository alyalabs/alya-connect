// vite.config.js
import { fileURLToPath, URL } from "url";
import { defineConfig } from "file:///Users/carlosedba/Projects/alya/alya-connect/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/carlosedba/Projects/alya/alya-connect/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/carlosedba/Projects/alya/alya-connect/vite.config.js";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      dts({
        insertTypesEntry: true,
        rollupTypes: true
      })
    ],
    resolve: {
      alias: [
        { find: "@", replacement: fileURLToPath(new URL("src", __vite_injected_original_import_meta_url)) }
      ]
    },
    build: {
      minify: true,
      lib: {
        entry: fileURLToPath(new URL("src/index.ts", __vite_injected_original_import_meta_url)),
        name: "index",
        fileName: "index",
        formats: ["es", "cjs"]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2FybG9zZWRiYS9Qcm9qZWN0cy9hbHlhL2FseWEtY29ubmVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2Nhcmxvc2VkYmEvUHJvamVjdHMvYWx5YS9hbHlhLWNvbm5lY3Qvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2Nhcmxvc2VkYmEvUHJvamVjdHMvYWx5YS9hbHlhLWNvbm5lY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgZHRzKHtcbiAgICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgICAgcm9sbHVwVHlwZXM6IHRydWUsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHsgZmluZDogJ0AnLCByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCdzcmMnLCBpbXBvcnQubWV0YS51cmwpKSB9LFxuICAgICAgXSxcbiAgICB9LFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIG1pbmlmeTogdHJ1ZSxcblxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJ3NyYy9pbmRleC50cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgICBuYW1lOiAnaW5kZXgnLFxuICAgICAgICBmaWxlTmFtZTogJ2luZGV4JyxcbiAgICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsU0FBUyxlQUFlLFdBQVc7QUFDelYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBRmdMLElBQU0sMkNBQTJDO0FBS2pQLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxRQUNGLGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxNQUNmLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sS0FBSyxhQUFhLGNBQWMsSUFBSSxJQUFJLE9BQU8sd0NBQWUsQ0FBQyxFQUFFO0FBQUEsTUFDM0U7QUFBQSxJQUNGO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFFUixLQUFLO0FBQUEsUUFDSCxPQUFPLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQUEsUUFDN0QsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
