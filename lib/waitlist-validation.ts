export const WAITLIST_EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WAITLIST_MAX_EMAIL_LENGTH = 254;
export const WAITLIST_MIN_SUBMIT_MS = 2000;
export const WAITLIST_MAX_BODY_BYTES = 1024;

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "guerrillamail.com",
  "mailinator.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
]);

const PRODUCTION_ALLOWED_ORIGINS = [
  "https://redux.so",
  "https://www.redux.so",
];

export function normalizeWaitlistEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidWaitlistEmail(email: string): boolean {
  if (!email || email.length > WAITLIST_MAX_EMAIL_LENGTH) {
    return false;
  }

  if (!WAITLIST_EMAIL_REGEX.test(email)) {
    return false;
  }

  const domain = email.split("@")[1];
  if (!domain || DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return false;
  }

  return true;
}

export function isWaitlistOriginAllowed(req: Request): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const origin = req.headers.get("origin");
  if (origin && PRODUCTION_ALLOWED_ORIGINS.includes(origin)) {
    return true;
  }

  const referer = req.headers.get("referer");
  if (referer) {
    return PRODUCTION_ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }

  return false;
}

export function isWaitlistSubmitTooFast(formLoadedAt: unknown): boolean {
  if (typeof formLoadedAt !== "number" || !Number.isFinite(formLoadedAt)) {
    return true;
  }

  return Date.now() - formLoadedAt < WAITLIST_MIN_SUBMIT_MS;
}

export function redactEmailForLogs(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex <= 0) {
    return "[redacted]";
  }

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  const visible = local.slice(0, Math.min(2, local.length));

  return `${visible}***@${domain}`;
}
