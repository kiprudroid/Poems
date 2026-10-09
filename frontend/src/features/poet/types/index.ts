import { z } from "zod";

export const authorListSchema = z.object({
  authors: z.array(z.string().min(1)),
});

export const authorPoemsInputSchema = z.object({
  author: z.string().min(1),
});

export type AuthorList = z.infer<typeof authorListSchema>;
export type AuthorPoemsInput = z.infer<typeof authorPoemsInputSchema>;
