"use client";

import { signIn } from "next-auth/react";
 
const DiscordLoginButton = (props: { as: string }) => {
  const user = props.as;

  return (
    <button
      className="ring-2 shadow-2xl hover:ring-3 hover:ring-black px-4 py-2 hover:px-6 transition-all rounded-2xl bg-white text-black hover:cursor-pointer font-black"
      onClick={() => {
        
        signIn("discord");
      }}
    >
      Login
    </button>
  );
};

export default DiscordLoginButton;
