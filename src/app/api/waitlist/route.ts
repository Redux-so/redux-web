import { NextRequest, NextResponse } from "next/server";

import { addToWaitlist } from "@/lib/loops";
import {
  getWaitlistClientIp,
  isWaitlistRateLimited,
} from "@/lib/waitlist-rate-limit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, website } = (await req.json()) as {
    email?: string;
    website?: string;
  };

  if (website?.trim()) {
    return NextResponse.json({ success: true });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const clientIp = getWaitlistClientIp(req);
  if (isWaitlistRateLimited(clientIp)) {
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
      console.error("Waitlist: Loops API error", loopsData.message);
      return NextResponse.json(
        { error: "Unable to join waitlist. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist: failed to add contact to Loops", error);
    return NextResponse.json(
      { error: "Unable to join waitlist. Please try again." },
      { status: 500 },
    );
  }
}
