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

  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.setHeader("CDN-Cache-Control", "public, max-age=31536000, immutable");
      } else if (path.basename(filePath) === "index.html") {
        res.setHeader("Cache-Control", "no-cache");
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
        res.setHeader("CDN-Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
      }
    },
  }));
  setupFallback(app, distPath);
}

// Helper to handle client-side routing (SPA fallback)
function setupFallback(app: Express, distPath: string) {
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
