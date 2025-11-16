"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const LogoutButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleSignOut = async () => {
    setClicked(true);
    await signOut();
  };

  return (
    <motion.button
      onClick={handleSignOut}
      disabled={clicked}
      aria-busy={clicked}
      className="text-white top-0 right-0 bg-red-400 py-2 transition-all ease-in-out duration-200 hover:bg-red-500 font-bold rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 w-full flex items-center justify-center gap-3"
    >
      {clicked ? (
        <>
          <Spinner /> <p>Logging you out....</p>
        </>
      ) : (
        <>
          <LogOut size={24} />
          <p>Logout</p>
        </>
      )}
    </motion.button>
  );
};

export default LogoutButton;
