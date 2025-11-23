import DiscordLoginButton from "@/components/Buttons/DiscordLoginButton";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const allowedUsers = await prisma.allowedUser.findMany({
    include: {
      user: true,
    },
  });

  return (
    <section className="w-full min-h-screen flex items-center justify-center gap-12 main-bg">
      {allowedUsers.map((allowedUser) => (
        <div
          key={allowedUser.name}
          style={
            {
              ["--hover-color" as string]:
                allowedUser.user?.bannerColor ?? "#5865F2",
            } as React.CSSProperties
          }
          className={
            `flex flex-col items-center gap-6 justify-between transition-all ` +
            `hover:scale-110 hover:p-4 group [&:hover]:bg-(--hover-color)`
          }
        >
          <Image
            src={`${allowedUser.user?.image}?size=2048`}
            quality={95}
            alt={`${allowedUser.user?.name} profile picture`}
            width={200}
            height={200}
            className="rounded-[72px]"
            unoptimized
            loading="eager"
          />
          <h1 className="text-3xl font-black group-hover:text-white/95">
            {allowedUser.user?.username}
          </h1>
          <DiscordLoginButton as={allowedUser.user?.name as string} />
        </div>
      ))}
    </section>
  );
};

export default Page;