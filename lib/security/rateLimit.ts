import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const rateLimit = (limit: number, windowSec: number) => {
  return async (key: string) => {
    const now = Math.floor(Date.now() / 1000);
    const window = Math.floor(now / windowSec);
    const redisKey = `rateLimit:${key}:${window}`;

    const count = await redis.incr(redisKey);

    if (count === 1) {
      await redis.expire(redisKey, windowSec);
    }

    return null;
  };
};

export default rateLimit;
