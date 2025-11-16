import { DiscordUser } from "next-auth";

export const fetchDiscordUserData = async (accessToken: string) => {
  try {
    const response = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const json: DiscordUser = await response.json();

    return json;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default fetchDiscordUserData