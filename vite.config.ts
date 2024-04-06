import { fileURLToPath, URL } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const needSSL: boolean = false;
  return {
    build: {
      // sourcemap: true,
      rollupOptions: {
        output: {
          entryFileNames: "assets/[hash].js",
          chunkFileNames: "assets/[hash].js",
          assetFileNames: "assets/[hash][extname]",
        },
      },
    },
    server: {
      host: "0.0.0.0",
    },
    envPrefix: ["VITE_"],
    plugins: [
      vue(),
      visualizer(),
      {
        ...basicSsl(),
        apply: needSSL ? "serve" : command === "serve" ? "build" : "serve",
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
