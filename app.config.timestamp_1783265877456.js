// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import viteReact from "@vitejs/plugin-react";
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "src"
  },
  vite: {
    plugins: [viteReact()],
    resolve: {
      alias: {
        "@": "/src"
      }
    }
  }
});
export {
  app_config_default as default
};
