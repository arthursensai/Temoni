import { Account } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/database/prisma";
import { DiscordTokenResponse } from "next-auth";

const discordClientID = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

const validateUserTokens = async (discordId: string, account: Account) => {
  if (!account || !discordClientID || !discordClientSecret) {
    console.log("Missing data");
    return false;
  }

  let accessToken: string;
  const today = Math.floor(Date.now() / 1000);

  if (today > account.expires_at!) {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: account.refresh_token!,
      client_id: discordClientID,
      client_secret: discordClientSecret,
    });

    try {
      const res = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const newTokens: DiscordTokenResponse = await res.json();

      await prisma.account.update({
        where: {
          provider_providerAccountId: {
            provider: "discord",
            providerAccountId: discordId,
          },
        },
        data: {
          access_token: newTokens.access_token,
          ...(newTokens.refresh_token && {
            refresh_token: newTokens.refresh_token,
          }),
          expires_at: Math.floor(Date.now() / 1000) + newTokens.expires_in,
        },
      });

      accessToken = newTokens.access_token;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    accessToken = account.access_token!;
  }
  return accessToken;
};

export default validateUserTokens;
