// vite.config.js
import { defineConfig } from "vite";
import domJsx from "vite-plugin-dom-jsx";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react({
      include: ["**/*.tsx", "**/*.ts"],
    }),
    domJsx(),
    createHtmlPlugin({
      minify: true,
      entry: "/src/index.ts",
    }),
  ],
  define: {
    "process.env.npm_package_version": JSON.stringify(process.env.npm_package_version || "dev"),
  },
  build: {
    // Do not inline images and assets to avoid the phaser error
    // "Local data URIs are not supported"
    assetsInlineLimit: 0,
  },
  server: {
    port: 8080,
    watch: {
      usePolling: true,
    },
  },
});
