import withAuth from "@/lib/auth/withAuth";
import { NextResponse } from "next/server";
import withRateLimit from "@/lib/security/withRateLimit";
import { prisma } from "@/lib/database/prisma";

const limit = withRateLimit(10, 60);

export const GET = withAuth(async (req, session) => {
  if (!session.user.discordId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimitResponse = await limit(session.user.id);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const userPartner = await prisma.partnerLink.findFirst({
      where: {
        OR: [{ userAId: session.user.id }, { userBId: session.user.id }],
      },
      include: {
        userA: true,
        userB: true,
      },
    });
    return NextResponse.json({ userPartner, ok: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
});

export const POST = withAuth(async (req, session) => {
  if (!session.user.discordId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rateLimitResponse = await limit(session.user.id);
  if (rateLimitResponse) return rateLimitResponse;

  return NextResponse.json({ ok: true }, { status: 200 });
});
