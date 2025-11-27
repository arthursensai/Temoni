"use server";

import { utapi } from "@/lib/uploadThing/uploadthing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const uploadImageToServer = async (file: File | undefined) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) throw new Error("Unauthorized");
  if (file === undefined) throw new Error("No valid Image to upload!");
  if (file.size > 16777216) throw new Error("Image is too big");

  try {
    const response = await utapi.uploadFiles(file);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Error saving image to the server!");
  }
};

export default uploadImageToServer;
