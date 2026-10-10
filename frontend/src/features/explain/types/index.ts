import { z } from "zod";

export const deviceSchema = z.object({
  name: z.string().min(1),
  quote: z.string().optional(),
  effect: z.string().min(1),
});

export const wholePoemExplanationSchema = z.object({
  summary: z.string().min(1),
  themes: z.array(z.string().min(1)).min(1).max(6),
  form: z.string().min(1),
  devices: z.array(deviceSchema).min(1).max(5),
  closing: z.string().min(1),
});

export const lineExplanationSchema = z.object({
  paraphrase: z.string().min(1),
  meaning: z.string().min(1),
  devices: z.array(deviceSchema).max(3),
});

export const geminiKeySchema = z
  .string()
  .trim()
  .min(
    20,
    "That key looks too short — paste the full key from Google AI Studio.",
  )
  .max(200);

export type DeviceNote = z.infer<typeof deviceSchema>;
export type WholePoemExplanation = z.infer<typeof wholePoemExplanationSchema>;
export type LineExplanation = z.infer<typeof lineExplanationSchema>;
