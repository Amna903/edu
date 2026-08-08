import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes/index.js";
import { serveStatic } from "./core/static.js";
import { createServer } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { RedisStore } from "connect-redis";
import { env, isProduction, logEnvPresence } from "./config/config.js";
import { decryptAtRest, encryptAtRest } from "./services/encryption.js";
import { getRedisClient } from "./services/redis.js";
import { inputSafety, rateLimit, securityHeaders } from "./middleware/security.js";

const app = express();
const httpServer = createServer(app);
logEnvPresence();

const isVercelServerless = process.env.VERCEL === "1";

if (isProduction()) {
  app.set("trust proxy", 1);
}

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

declare module "express-session" {
  interface SessionData {
    moodleToken?: string;
    moodlePrivateToken?: string;
    notificationReadIds?: number[];
    user?: {
      id: number;
      username: string;
      fullname: string;
      firstname: string | null;
      lastname: string | null;
      email: string | null;
      role: string;
      profileImageUrl: string | null;
    };
  }
}

app.use(securityHeaders);
app.use(
  express.json({
    limit: "1mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(inputSafety);

let sessionStore: session.Store | undefined;
const dbUrl = process.env.DATABASE_URL || process.env.DIRECT_URL;
const redisClient = getRedisClient();

if (redisClient) {
  sessionStore = new RedisStore({
    client: redisClient,
    prefix: "edu:sess:",
    ttl: 60 * 60 * 24 * 7,
    // Moodle tokens and user session data are encrypted before Redis persistence.
    serializer: {
      stringify: (value) => encryptAtRest(JSON.stringify(value)),
      parse: (value) => {
        try {
          return JSON.parse(decryptAtRest(value));
        } catch {
          // Supports existing pre-encryption sessions during a zero-downtime deployment.
          return JSON.parse(value);
        }
      },
    },
  });
  console.log("[session] Redis session cache configured.");
}

if (!sessionStore && dbUrl) {
  try {
    const PgSession = connectPgSimple(session);
    sessionStore = new PgSession({
      conString: dbUrl,
      createTableIfMissing: true,
      tableName: "session",
    });
    console.log("[session] Persistent PostgreSQL session store active.");
  } catch (err) {
    console.warn("[session] Failed to initialize PostgreSQL session store, falling back to memory store:", err);
  }
}

app.use(
  session({
    store: sessionStore,
    secret: env.sessionSecret,
    name: isProduction() ? "__Host-edu.sid" : "edu.sid",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction(),
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

app.use(rateLimit);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      log(logLine);
    }

    // Audit only state changes; write asynchronously so it never adds user-visible latency.
    if (path.startsWith("/api") && !["GET", "HEAD", "OPTIONS"].includes(req.method) && !path.startsWith("/api/payment")) {
      import("./services/logger.js").then(({ logAuditEvent }) =>
        logAuditEvent({
          action: `API_${req.method}_${path.replace(/[^a-zA-Z0-9]+/g, "_").toUpperCase()}`,
          userId: req.session.user?.id,
          ipAddress: req.ip,
          statusCode: res.statusCode,
        }),
      ).catch(() => undefined);
    }
  });

  next();
});

export const ready = (async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    const message = typeof err === "string" ? err : err?.message || "Internal Server Error";

    try {
      console.error("Express Error:", message);
    } catch {
      // Safe fallback
    }

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (isProduction()) {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./core/vite.js");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  if (!isVercelServerless) {
    const port = env.port;
    const listenOptions: {
      port: number;
      host: string;
      reusePort?: boolean;
    } = {
      port,
      host: process.env.HOST || "0.0.0.0",
    };

    if (process.platform === "linux") {
      listenOptions.reusePort = true;
    }

    // §4.21 — Start background job worker + sync scheduler
    const { startJobWorker } = await import("./services/job-worker.js");
    const { startSyncScheduler } = await import("./services/moodle-sync-scheduler.js");
    const { attachGlobalErrorHandlers } = await import("./services/logger.js");
    startJobWorker();
    startSyncScheduler();
    attachGlobalErrorHandlers();

    httpServer.listen(
      listenOptions,
      () => {
        log(`serving on port ${port}`);
      },
    );
  }
})();

export { app };
