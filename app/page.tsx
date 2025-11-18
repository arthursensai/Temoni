import DiscordLoginButton from "@/components/Buttons/DiscordLoginButton";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center gap-12 main-bg">
      <div className="flex flex-col items-center gap-6 justify-between transition-all hover:scale-110 hover:bg-indigo-500 hover:p-4 group">
        <Image
          src="/arthur.jpg"
          alt="pfp"
          width={200}
          height={200}
          className="rounded-[72px] "
        />
        <h1 className="text-3xl font-black group-hover:text-white/95">
          ARTHUR
        </h1>

        <DiscordLoginButton as="arthur" />
      </div>
      <div className="flex flex-col items-center gap-6 justify-between transition-all hover:scale-110 hover:bg-pink-500 hover:p-4 group">
        <Image
          src="/raven.jpg"
          alt="pfp"
          width={200}
          height={200}
          className="rounded-[72px]"
        />
        <h1 className="text-3xl font-black group-hover:text-white/95">RAVEN</h1>
        <DiscordLoginButton as="raven" />
      </div>
    </section>
  );
};

export default Page;
