import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { pages } from "./src/data/pages.ts";

const input = pages.reduce<Record<string, string>>((acc, page) => {
  const name = page.html.replace(/\.html$/, "").replace(/\//g, "_");
  acc[name] = path.resolve(__dirname, page.html);
  return acc;
}, {});

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    rollupOptions: {
      input,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
