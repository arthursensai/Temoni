import withAuth from "@/lib/auth/withAuth";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import fetchDiscordUserData from "@/scripts/fetchDiscordUserData";
import validateUserTokens from "@/scripts/validateUserTokens";

export const GET = withAuth(async (req, session) => {
  if (!session.user.discordId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const userAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "discord",
        providerAccountId: session.user.discordId,
      },
    },
  });

  if (!userAccount?.refresh_token)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const accessToken = await validateUserTokens(
    session.user.discordId,
    userAccount
  );

  if (!accessToken)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );

  const userDiscordData = await fetchDiscordUserData(accessToken);
  if (!userDiscordData)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );

  const updated = await prisma.user.update({
    where: {
      discordId: userDiscordData.id,
    },
    data: {
      name: userDiscordData.username,
      username: userDiscordData.global_name,
      bannerColor: userDiscordData.banner_color,
      email: userDiscordData.email,
      emailVerified: userDiscordData.verified,
    },
  });

  return NextResponse.json({ data: updated, ok: true }, { status: 200 });
});
