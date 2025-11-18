export const fetchDiscordUserData = async (accessToken: string) => {
  console.log(`Access Token in fetchUserData: ${accessToken}`);

  try {
    const response = await fetch("https://discord.com/api/v10/users/@me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default fetchDiscordUserData;
