import { NextResponse } from "next/server";
import rateLimit from "@/lib/security/rateLimit";

const withRateLimit = (limit: number, windowSec: number) => {
  const limiter = rateLimit(limit, windowSec);

  return async (key: string) => {
    const exceeded = await limiter(key);

    if (exceeded) return new NextResponse("Too Many Requests", { status: 429 });

    return null;
  };
};

export default withRateLimit;
