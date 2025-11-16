const discordClientID = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

const refreshDiscordToken = async (refreshToken: string) => {
  if (!discordClientID || !discordClientSecret) {
    throw new Error("Missing .env variables!");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: discordClientID,
    client_secret: discordClientSecret,
  });

  const res = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const text = await res.text();
  console.log(`Discord refresh response: ${(res.status, text)}`);

  if (!res.ok) {
    console.log(`Failed to refresh token: ${res.status} — ${text}`);
    return false;
  }

  return JSON.parse(text);
};

export default refreshDiscordToken;
