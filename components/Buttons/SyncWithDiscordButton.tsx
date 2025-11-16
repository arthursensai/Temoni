"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setClicked(true);
    try {
      const response = await fetch("/api/sync", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.ok) {
        setClicked(false);
        toast.success("Updated");
        router.refresh();
      } else {
        setClicked(false);
        toast.error("Error syncing accounts!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error syncing accounts!");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={clicked}
      aria-busy={clicked}
      className="text-white top-0 right-0 bg-purple-500 py-2 transition-all ease-in-out duration-200 hover:bg-purple-600 font-bold rounded-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 w-full flex items-center justify-center gap-3"
    >
      {clicked ? (
        <>
          <Spinner color="white" /> <p>Syncing ....</p>
        </>
      ) : (
        <>
          <RefreshCcw size={24} />
          <p>Sync with Discord</p>
        </>
      )}
    </motion.button>
  );
};

export default LogoutButton;
