import { createClient, type RedisClientType } from "redis";
import { env } from "../config/config.js";

export let redisClient: RedisClientType | undefined;

/**
 * Redis is optional locally. In production, setting REDIS_URL enables distributed
 * response/rate-limit/session caching without adding a request-time connection delay.
 */
export function getRedisClient(): RedisClientType | undefined {
  if (!env.redisUrl) return undefined;
  if (redisClient) return redisClient;

  redisClient = createClient({ url: env.redisUrl });
  redisClient.on("error", (error) => console.warn("[redis] unavailable:", error.message));
  void redisClient.connect().then(
    () => console.log("[redis] connected."),
    () => undefined,
  );
  return redisClient;
}

export async function getCachedJson<T>(key: string): Promise<T | null> {
  const client = getRedisClient();
  if (!client?.isReady) return null;
  try {
    const value = await client.get(`cache:${key}`);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

export async function setCachedJson(key: string, value: unknown, ttlSeconds = env.cacheDefaultTtlSeconds): Promise<void> {
  const client = getRedisClient();
  if (!client?.isReady) return;
  try {
    await client.set(`cache:${key}`, JSON.stringify(value), { EX: ttlSeconds });
  } catch {
    // Caching must never delay or fail a user request.
  }
}
