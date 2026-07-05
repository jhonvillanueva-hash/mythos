// vite.config.ts
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    viteReact(),
    tanstackStart({
      router: {
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts"
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
