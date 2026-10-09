import { z } from "zod";

export const poemSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  lines: z.array(z.string()),
  linecount: z.string().optional(),
});

export const poemListSchema = z.array(poemSchema);

export const randomPoemsInputSchema = z.object({
  count: z.number().int().min(1).max(20).default(6),
});

export const poemTitleInputSchema = z.object({
  title: z.string().min(1),
});

export type Poem = z.infer<typeof poemSchema>;
export type RandomPoemsInput = z.infer<typeof randomPoemsInputSchema>;
export type PoemTitleInput = z.infer<typeof poemTitleInputSchema>;
