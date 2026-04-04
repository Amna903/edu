import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();
// Use the project root directory
const ROOT_DIR = process.cwd();

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

  app.get(/^(?!\/api).*/, async (req, res, next) => {
    const urlPath = req.originalUrl;
    try {
      const isDev = process.env.NODE_ENV !== "production";

      // Use absolute paths resolved from the project root
      const clientRoot = isDev
        ? path.resolve(ROOT_DIR, "client") 
        : path.resolve(ROOT_DIR, "dist", "public");

      const clientTemplate = path.join(clientRoot, "index.html"); 

      const template = await fs.promises.readFile(clientTemplate, "utf-8");

      const finalTemplate = isDev
        ? template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`)
        : template;

      const page = await vite.transformIndexHtml(urlPath, finalTemplate);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (err) {
      if (err instanceof Error) {
        vite.ssrFixStacktrace(err);
      }
      next(err);
    }
  });
}