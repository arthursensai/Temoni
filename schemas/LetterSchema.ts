import * as z from "zod";

export const letterSchema = z.object({
  title: z.string().min(3, "too short").max(20, "too long"),
  receiveDate: z.iso.date("invalid date"),
  receiveTime: z.iso.time("invalid time"),
  content: z.string().min(12, "too short").max(3000, "too long"),
  cover: z.url().optional(),
});

export type LetterSchema = z.infer<typeof letterSchema>;
