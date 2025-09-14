import type { NextFunction, Request, Response } from "express"
import rateLimit from "../config/upstash.ts";

async function rateLimiter(_: Request, res: Response, next: NextFunction) {
    try {
        const { success } = await rateLimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ message: "Too many request, please try again later" });
        }
        next();
    } catch (err) {
        console.error("Rate limit error", err);
        next(err);
    }
}

export default rateLimiter;