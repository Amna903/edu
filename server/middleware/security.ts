import type { NextFunction, Request, Response } from "express";
import { isProduction } from "../config/config.js";
import { getRedisClient } from "../services/redis.js";

const WINDOW_MS = 60_000;
const DEFAULT_LIMIT = 120;
const AUTH_LIMIT = 10;
const memoryWindows = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function isAuthenticationRoute(path: string) {
  return /\/api\/auth\/(login|register|forgot|reset)/.test(path);
}

function removeUnsafeKeys(value: unknown): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach(removeUnsafeKeys);
    return;
  }
  for (const key of Object.keys(value)) {
    if (key === "__proto__" || key === "prototype" || key === "constructor") {
      delete (value as Record<string, unknown>)[key];
    } else {
      removeUnsafeKeys((value as Record<string, unknown>)[key]);
    }
  }
}

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  if (isProduction()) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    // The site uses Google Fonts; all application connections remain same-origin.
    res.setHeader("Content-Security-Policy", "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; upgrade-insecure-requests");
  }
  next();
}

export function inputSafety(req: Request, res: Response, next: NextFunction) {
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method) && req.is("application/json") && !req.body) {
    return res.status(400).json({ message: "A valid JSON request body is required." });
  }
  removeUnsafeKeys(req.body);
  removeUnsafeKeys(req.query);
  next();
}

export async function rateLimit(req: Request, res: Response, next: NextFunction) {
  if (!req.path.startsWith("/api/") || req.path.startsWith("/api/payment")) return next();
  const limit = isAuthenticationRoute(req.path) ? AUTH_LIMIT : DEFAULT_LIMIT;
  const bucket = `${isAuthenticationRoute(req.path) ? "auth" : "api"}:${clientIp(req)}`;
  const redis = getRedisClient();
  let count: number | undefined;

  if (redis?.isReady) {
    try {
      count = await redis.incr(`ratelimit:${bucket}`);
      if (count === 1) await redis.pExpire(`ratelimit:${bucket}`, WINDOW_MS);
    } catch {
      count = undefined;
    }
  }
  if (count === undefined) {
    const now = Date.now();
    const item = memoryWindows.get(bucket);
    const entry = !item || item.resetAt <= now ? { count: 0, resetAt: now + WINDOW_MS } : item;
    entry.count += 1;
    memoryWindows.set(bucket, entry);
    count = entry.count;
    res.setHeader("X-RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));
  }

  res.setHeader("X-RateLimit-Limit", String(limit));
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, limit - count)));
  if (count > limit) return res.status(429).json({ message: "Too many requests. Please try again shortly." });
  next();
}
