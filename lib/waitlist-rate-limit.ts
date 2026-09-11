import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const IN_MEMORY_WINDOW_MS = 15 * 60 * 1000;
const IN_MEMORY_MAX_REQUESTS = 5;
const IN_MEMORY_EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000;
const IN_MEMORY_EMAIL_MAX_REQUESTS = 3;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const ipStore = new Map<string, RateLimitEntry>();
const emailStore = new Map<string, RateLimitEntry>();

let ipLimiter: Ratelimit | null = null;
let emailLimiter: Ratelimit | null = null;
let warnedAboutFallback = false;

function cleanupExpired(store: Map<string, RateLimitEntry>, now: number) {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

function isInMemoryRateLimited(
  store: Map<string, RateLimitEntry>,
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();

  if (store.size > 500) {
    cleanupExpired(store, now);
  }

  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

function getUpstashLimiters(): {
  ipLimiter: Ratelimit;
  emailLimiter: Ratelimit;
} | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  if (!ipLimiter || !emailLimiter) {
    const redis = new Redis({ url, token });

    ipLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "waitlist:ip",
    });

    emailLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "24 h"),
      prefix: "waitlist:email",
    });
  }

  return { ipLimiter, emailLimiter };
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

export async function isWaitlistRateLimited(
  clientIp: string,
  email: string,
): Promise<boolean> {
  const limiters = getUpstashLimiters();

  if (limiters) {
    const [ipResult, emailResult] = await Promise.all([
      limiters.ipLimiter.limit(clientIp),
      limiters.emailLimiter.limit(email),
    ]);

    return !ipResult.success || !emailResult.success;
  }

  if (!warnedAboutFallback) {
    warnedAboutFallback = true;
    console.warn(
      "Waitlist: UPSTASH_REDIS_REST_URL/TOKEN not set — using in-memory rate limits",
    );
  }

  return (
    isInMemoryRateLimited(
      ipStore,
      clientIp,
      IN_MEMORY_MAX_REQUESTS,
      IN_MEMORY_WINDOW_MS,
    ) ||
    isInMemoryRateLimited(
      emailStore,
      email,
      IN_MEMORY_EMAIL_MAX_REQUESTS,
      IN_MEMORY_EMAIL_WINDOW_MS,
    )
  );
}
