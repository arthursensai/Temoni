import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import LogoutButton from "@/components/Buttons/LogoutButton";
import SyncWithDiscordButton from "@/components/Buttons/SyncWithDiscordButton";

const ProfileButton = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <Dialog>
      <DialogTrigger className="relative">
        <div
          className="flex gap-2 items-center justify-between p-2 rounded-2xl [&:hover]:bg-(--hover-color) transition-all ease-out hover:cursor-pointer hover:ring-2 ring-black"
          style={
            {
              ["--hover-color" as string]: user?.bannerColor ?? "black",
            } as React.CSSProperties
          }
        >
          <h3 className="font-bold">{user?.name}</h3>
          <Image
            src={user?.image as string}
            alt={user?.name as string}
            width={32}
            height={32}
            loading="eager"
            unoptimized
            className="rounded-full ring-2 ring-black"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 text-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Image
              src={user.image as string}
              alt={user.name!}
              width={64}
              height={64}
              className="rounded-full ring-2 ring-black"
              unoptimized
            />
            Your Account
          </DialogTitle>
          <DialogDescription className="text-start">
            You can find your account details here.
          </DialogDescription>
          <div className="flex flex-col items-start justify-center gap-2 text-xl">
            <p>username: {user.username}</p>
            <p>email: {user.email}</p>
            <p className="flex gap-2 items-center justify-center">
              Profile banner:
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: user.bannerColor! }}
              ></span>
            </p>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <SyncWithDiscordButton />
            <LogoutButton />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileButton;
