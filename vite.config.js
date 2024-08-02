import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173, // Default port for Vite
  },
  base: "/",
  build: {
    outDir: "dist",
  },
});
