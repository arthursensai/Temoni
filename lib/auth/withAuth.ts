import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const withAuth = (
  handler: (req: Request, session: Session) => Promise<Response>
) => {
  return async (req: Request) => {
    try {
      const session = await getServerSession(authOptions);

      if (!session)
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });

      return handler(req, session);
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({ error: "Server Error" }), {
        status: 500,
      });
    }
  };
};

export default withAuth;
