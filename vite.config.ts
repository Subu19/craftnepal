import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Fix for libraries that still use global or process
    global: "window",
    "process.env": {},
  },
  server: {
    port: 3000,
    host: true, // Allow external access
  },
  build: {
    outDir: "build", // Keep CRA consistency
    assetsDir: "static",
    sourcemap: false, // Production usually doesn't need sourcemaps unless requested
    minify: "esbuild",
  },
});
