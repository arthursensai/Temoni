import DiscordLoginButton from "@/components/Buttons/DiscordLoginButton";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/database/prisma";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const allowedUsers = await prisma.allowedUser.findMany({
    include: {
      user: true,
    },
  });

  if (session?.user) redirect("/dashboard");

  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 lg:flex lg:items-center lg:justify-center lg:gap-8">
      {allowedUsers.map((allowedUser) => (
        <div
          key={allowedUser.name}
          style={{
            ["--hover-color" as string]:
              allowedUser.user?.bannerColor ?? "#5865F2",
          }}
          className="md:min-h-screen lg:min-h-0 lg:w-auto lg:max-w-md transition-all duration-300 flex flex-col gap-6 md:gap-8 lg:gap-12 items-center justify-center p-8 lg:p-12 lg:rounded-3xl lg:backdrop-blur-xl lg:ring-2 lg:hover:ring-(--hover-color) group"
        >
          <Image
            src={`${allowedUser.user?.image}?size=2048`}
            quality={95}
            alt={`${allowedUser.user?.name} profile picture`}
            width={256}
            height={256}
            className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 transition-transform duration-300 group-hover:scale-110"
            unoptimized
            loading="eager"
          />
          <h1 className="text-3xl md:text-4xl w-full text-center font-black transition-colors duration-300 group-hover:text-white/95">
            {allowedUser.user?.username}
          </h1>
          <DiscordLoginButton as={allowedUser.user?.name as string} />
        </div>
      ))}
    </section>
  );
};

export default Page;
