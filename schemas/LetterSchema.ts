import * as z from "zod";

export const letterSchema = z.object({
    title: z.string().min(3).max(20),
    receiveDate: z.iso.date(),
    receiveTime: z.iso.time(),
    content: z.string().min(12).max(3000),
    cover: z.url().optional(),
});

export type LetterSchema = z.infer<typeof letterSchema>