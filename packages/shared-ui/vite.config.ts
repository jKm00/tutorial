import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["lib"],
      outDir: "dist",
      tsconfigPath: "./tsconfig.lib.json",
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      "@/src": resolve(__dirname, "src"),
      "@/lib": resolve(__dirname, "lib"),
    },
  },
});
