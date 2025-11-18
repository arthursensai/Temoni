import { NextRequest, NextResponse } from "next/server";
import { getServerSession, DiscordUser } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import fetchDiscordUserData from "@/scripts/fetchDiscordUserData";
import validateUserTokens from "@/scripts/validateUserTokens";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

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

    const accessToken = await validateUserTokens(
      session.user.discordId,
      userAccount
    );

    if (!accessToken)
      return NextResponse.json({
        error: "Internal Server Error",
        status: 500,
      });

    try {
      const userDiscordData: DiscordUser = await fetchDiscordUserData(
        accessToken!
      );

      if (!userDiscordData)
        return NextResponse.json({
          error: "Internal Server Error",
          status: 500,
        });

      try {
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

        return NextResponse.json({ data: updated, status: 200, ok: true });
      } catch (err) {
        console.log(err);
        return NextResponse.json({
          error: "Internal Server Error",
          status: 500,
        });
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: "Internal Server Error", status: 500 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
