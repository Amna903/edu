import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import url from "url";

const viteLogger = createLogger();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Catch-all route to serve index.html
  app.get(/^(?!\/api).*/, async (req, res, next) => {
    const urlPath = req.originalUrl;
    try {
      const isDev = process.env.NODE_ENV !== "production";

      // Absolute path to client folder
      const clientRoot = isDev
        ? path.resolve(__dirname, "..", "client") 
        : path.resolve(__dirname, "..", "dist", "public");

      const clientTemplate = path.join(clientRoot, "index.html"); 

      // Read index.html
      const template = await fs.promises.readFile(clientTemplate, "utf-8");

      // Cache-busting for dev
      const finalTemplate = isDev
        ? template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`)
        : template;

      const page = await vite.transformIndexHtml(urlPath, finalTemplate);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (err) {
      vite.ssrFixStacktrace(err as Error);
      next(err);
    }
  });
}
