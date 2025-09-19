import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["lib"],
      outDir: "dist",
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "lib/index.ts"),
      },
      formats: ["es"],
      cssFileName: "lib/index.css",
    },
    copyPublicDir: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@/src": resolve(__dirname, "src"),
      "@/lib": resolve(__dirname, "lib"),
    },
  },
});
