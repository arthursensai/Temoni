import { NextRequest, NextResponse } from "next/server";
import { DiscordTokenResponse, DiscordUser, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import refreshDiscordToken from "@/scripts/refreshDiscordToken";
import fetchDiscordUserData from "@/scripts/fetchDiscordUserData";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

    if (!session.user.discordId)
      return NextResponse.json({ error: "Forbidden", status: 403 });

    const userAccount = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: session.user.discordId,
        },
      },
    });

    if (!userAccount?.refresh_token) {
      return NextResponse.json({
        error: "Forbidden",
        status: 403,
      });
    }

    const newTokens: DiscordTokenResponse = await refreshDiscordToken(
      userAccount?.refresh_token
    );

    if (!newTokens)
      return NextResponse.json({ error: "Internal Server Error", status: 500 });

    await prisma.account.update({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: session.user.discordId,
        },
      },
      data: {
        access_token: newTokens.access_token,
        ...(newTokens.refresh_token && {
          refresh_token: newTokens.refresh_token,
        }),
      },
    });

    try {
      const userDiscordData = await fetchDiscordUserData(
        newTokens.access_token
      );

      if (!userDiscordData)
        return NextResponse.json({
          error: "Internal Server Error",
          status: 500,
        });

      const updated = await prisma.user.update({
        where: {
          discordId: userDiscordData.id,
        },
        data: {
          name: userDiscordData.username,
          username: userDiscordData.global_name,
          bannerColor: userDiscordData.banner,
          email: userDiscordData.email,
          emailVerified: userDiscordData.verified,
        },
      });

      if (!updated)
        return NextResponse.json({
          error: "Your data is not updated",
          status: 500,
        });

      return NextResponse.json({ data: updated, status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: "Internal Server Error", status: 500 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
