import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use the current working directory as the anchor point
const ROOT = process.cwd();

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(ROOT, "client", "src"),
      "@shared": path.resolve(ROOT, "shared"),
      "@assets": path.resolve(ROOT, "attached_assets"),
    },
  },
  root: path.resolve(ROOT, "client"),
  build: {
    // This ensures the frontend build lands in the folder your server expects
    outDir: path.resolve(ROOT, "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false,
    },
  },
});