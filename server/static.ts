import express, { type Express } from "express";
import fs from "fs";
import path from "path";

// Use the project root to ensure path consistency across environments
const ROOT_DIR = process.cwd();

export function serveStatic(app: Express) {
  // Based on your build logs, the assets are in /dist/public
  const distPath = path.resolve(ROOT_DIR, "dist", "public");

  if (!fs.existsSync(distPath)) {
    // Fallback: check if 'public' is at the root (some environments vary)
    const fallbackPath = path.resolve(ROOT_DIR, "public");
    
    if (fs.existsSync(fallbackPath)) {
      app.use(express.static(fallbackPath));
      setupFallback(app, fallbackPath);
      return;
    }

    throw new Error(
      `Could not find the build directory at ${distPath}. Make sure to run 'npm run build' first.`,
    );
  }

  app.use(express.static(distPath));
  setupFallback(app, distPath);
}

// Helper to handle client-side routing (SPA fallback)
function setupFallback(app: Express, distPath: string) {
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}