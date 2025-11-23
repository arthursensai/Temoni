import withAuth from "@/lib/auth/withAuth";
import { NextResponse } from "next/server";
import withRateLimit from "@/lib/security/withRateLimit";

const limit = withRateLimit(10, 60);

export const GET = withAuth(async (req, session) => {
  if (!session.user.discordId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimitResponse = await limit(session.user.id);
  if (rateLimitResponse) return rateLimitResponse;

  return NextResponse.json({ ok: true }, { status: 200 });
});

export const POST = withAuth(async (req, session) => {
  if (!session.user.discordId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimitResponse = await limit(session.user.id);
  if (rateLimitResponse) return rateLimitResponse;

  return NextResponse.json({ ok: true }, { status: 200 });
});
