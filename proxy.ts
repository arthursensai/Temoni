import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const proxy = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};

export const config = {
  matcher: "/dashboard",
};
