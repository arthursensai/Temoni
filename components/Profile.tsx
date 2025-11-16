import { User } from "lucide-react";
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
        <div className="group absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 bg-white rounded-3xl overflow-hidden cursor-pointer hover:w-32 transition-all duration-300 ease-in-out z-10 ring-black hover:ring-2 shadow-2xl">
          <div
            className="absolute inset-0 flex items-center justify-center
                      opacity-100 group-hover:opacity-0
                      transition-opacity duration-300 ease-in-out"
          >
            <div className="bg-white rounded-full p-1">
              <User size={24} color="#35353E" />
            </div>
          </div>

          <h3
            className="absolute inset-0 flex items-center justify-center
                 text-xl font-semibold text-gray-800 whitespace-nowrap
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-300 ease-in-out"
          >
            profile
          </h3>
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
