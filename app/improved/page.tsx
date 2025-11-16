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
    }
  });
  console.log(allowedUsers);

  return (
    <section className="w-full min-h-screen flex items-center justify-center gap-12 main-bg">
      {allowedUsers.map((user) => (
        <div
          key={user.name}
          className={`flex flex-col items-center gap-6 justify-between transition-all hover:scale-110  hover:bg-indigo-500 hover:p-4 group`}
        ></div>
      ))}
    </section>
  );
};

export default Page;
