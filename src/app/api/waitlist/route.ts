import { NextRequest, NextResponse } from "next/server";

import { addToWaitlist } from "@/lib/loops";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import {
  getWaitlistClientIp,
  isWaitlistRateLimited,
} from "@/lib/waitlist-rate-limit";
import {
  isValidWaitlistEmail,
  isWaitlistOriginAllowed,
  isWaitlistSubmitTooFast,
  normalizeWaitlistEmail,
  redactEmailForLogs,
  WAITLIST_MAX_BODY_BYTES,
} from "@/lib/waitlist-validation";

type WaitlistRequestBody = {
  email?: string;
  website?: string;
  turnstileToken?: string;
  formLoadedAt?: number;
};

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > WAITLIST_MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!isWaitlistOriginAllowed(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: WaitlistRequestBody;

  try {
    const rawBody = await req.text();
    if (rawBody.length > WAITLIST_MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    body = JSON.parse(rawBody) as WaitlistRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email: rawEmail, website, turnstileToken, formLoadedAt } = body;

  if (website?.trim()) {
    return NextResponse.json({ success: true });
  }

  if (isWaitlistSubmitTooFast(formLoadedAt)) {
    return NextResponse.json(
      { error: "Unable to join waitlist. Please try again." },
      { status: 400 },
    );
  }

  const email = normalizeWaitlistEmail(rawEmail ?? "");

  if (!isValidWaitlistEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const clientIp = getWaitlistClientIp(req);

  if (isTurnstileConfigured()) {
    const tokenValid = await verifyTurnstileToken(turnstileToken ?? "", clientIp);
    if (!tokenValid) {
      return NextResponse.json(
        { error: "Unable to join waitlist. Please try again." },
        { status: 400 },
      );
    }
  }

  if (await isWaitlistRateLimited(clientIp, email)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  if (!process.env.LOOPS_API_KEY || !process.env.LOOPS_WAITLIST_MAILING_LIST_ID) {
    console.error("Waitlist: missing LOOPS_API_KEY or LOOPS_WAITLIST_MAILING_LIST_ID");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const loopsData = await addToWaitlist(email);

    if (!loopsData.success) {
      return NextResponse.json(
        { error: "Unable to join waitlist. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Waitlist: failed to add contact to Loops for",
      redactEmailForLogs(email),
      error,
    );
    return NextResponse.json(
      { error: "Unable to join waitlist. Please try again." },
      { status: 500 },
    );
  }
}
