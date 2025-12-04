import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/database/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      httpOptions: {
        timeout: process.env.NODE_ENV === "production" ? 3000 : 15000,
      },
      authorization: {
        params: { scope: "identify email" },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, profile, account }) {
      if (!profile?.id) return false;

      const allowed = await prisma.allowedUser.findUnique({
        where: { discordId: profile.id },
      });
      if (!allowed) return false;

      let userRecord = await prisma.user.findUnique({
        where: { discordId: profile.id },
      });

      if (!userRecord) {
        userRecord = await prisma.user.create({
          data: {
            discordId: profile.id,
            name: profile.name,
            username: profile.global_name ?? null,
            bannerColor: profile.banner_color ?? null,
            email: profile.email ?? null,
            emailVerified: profile.verified ?? false,
            image: profile.image_url ?? null,
            allowedUserId: allowed.id,
          },
        });
      }

      const existingAccount = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "discord",
            providerAccountId: profile.id,
          },
        },
      });

      if (!existingAccount) {
        await prisma.account.create({
          data: {
            userId: userRecord.id,
            provider: "discord",
            providerAccountId: profile.id,
            type: account?.type ?? "oauth",
            access_token: account?.access_token ?? "",
            refresh_token: account?.refresh_token ?? "",
            expires_at: account?.expires_at ?? undefined,
            token_type: account?.token_type ?? undefined,
            scope: account?.scope ?? undefined,
          },
        });
      }

      return true;
    },
    async session({ session, user }) {
      session.user.username = user.username ?? null;
      session.user.bannerColor = user.bannerColor ?? null;
      session.user.discordId = user.discordId;

      return session;
    },
  },

  pages: {
    error: "/auth/error"
  },

  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
