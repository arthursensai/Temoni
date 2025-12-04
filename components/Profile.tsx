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
import getUserPartner from "@/scripts/getUserPartner";

import { Activity } from "react";

const ProfileButton = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <Activity>
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
              quality={95}
              className="rounded-full ring-2 ring-black"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-4 text-black">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <Image
                src={`${user?.image}?size=2048`}
                alt={user.name!}
                width={64}
                height={64}
                className="rounded-full ring-4 ring-black"
                unoptimized
                quality={95}
              />
            </DialogTitle>
            <DialogDescription className="text-center">
              {user.username}
            </DialogDescription>
            <div className="flex items-center gap-2">
              <h3>Profile banner:</h3>
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: user.bannerColor as string }}
              ></span>
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
    </Activity>
  );
};

export default ProfileButton;
