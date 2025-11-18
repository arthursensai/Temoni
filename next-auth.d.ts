import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username?: string | null;
      bannerColor?: string | null;
      discordId?: string;
    };
  }

  interface User extends DefaultUser {
    username?: string | null;
    bannerColor?: string | null;
    discordId?: string;
  }

  interface Profile {
    id: string;
    image_url: string | null;
    global_name?: string | null;
    banner_color?: string | null;
    verified: boolean;
  }
  export interface DiscordUser {
    id: string;
    username: string;
    global_name?: string | null;
    discriminator: string;
    avatar?: string | null;
    banner_color?: string | null;
    accent_color?: number | null;
    locale?: string | null;
    mfa_enabled?: boolean;
    email?: string | null;
    verified?: boolean;
  }
  export interface DiscordTokenResponse {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    refresh_token?: string;
    scope: string;
  }
}
