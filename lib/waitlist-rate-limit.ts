// Best-effort in-memory rate limit per serverless instance.
// Not globally shared across Vercel isolates — upgrade to Redis/KV if stricter limits are needed.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

function cleanupExpired(now: number) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function isWaitlistRateLimited(clientIp: string): boolean {
  const now = Date.now();

  if (store.size > 500) {
    cleanupExpired(now);
  }

  const entry = store.get(clientIp);

  if (!entry || entry.resetAt <= now) {
    store.set(clientIp, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

export function getWaitlistClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}
