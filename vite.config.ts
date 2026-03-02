import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { pages } from "./data/pages.js";

const input = pages.reduce<Record<string, string>>((acc, page) => {
  const name = page.html.replace(/\.html$/, "").replace(/\//g, "_");
  acc[name] = path.resolve(__dirname, "client", page.html);
  console.log(name, acc[name]);
  return acc;
}, {});

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input,
    },
  },
});
