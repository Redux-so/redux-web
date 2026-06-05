import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email?: string };

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  console.log("Waitlist signup:", email);

  // await prisma.waitlistEntry.upsert({
  //   where: { email },
  //   update: {},
  //   create: { email },
  // });

  return NextResponse.json({ success: true });
}
