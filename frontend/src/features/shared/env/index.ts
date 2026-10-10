import { z } from "zod";

const envSchema = z.object({
  VITE_APP_URL: z.string().url().default("http://localhost:5173"),
  VITE_POETRY_API_URL: z.string().url().default("https://poetrydb.org"),
  VITE_GEMINI_MODEL: z.string().min(1).default("gemini-3.8-flash"),
  MODE: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(import.meta.env);
export type AppEnv = z.infer<typeof envSchema>;
