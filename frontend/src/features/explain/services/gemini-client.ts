import { z } from "zod";

export class GeminiError extends Error {
  code: string;

  constructor(message: string, code = "GEMINI_ERROR") {
    super(message);
    this.name = "GeminiError";
    this.code = code;
  }
}

const textPartSchema = z.object({ text: z.string().optional() });
const geminiResponseSchema = z.object({
  candidates: z
    .array(z.object({ content: z.object({ parts: z.array(textPartSchema) }) }))
    .optional(),
});

const stripFences = (raw: string): string =>
  raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

interface GenerateJsonInput<T> {
  apiKey: string;
  model: string;
  prompt: string;
  schema: z.ZodType<T>;
}

export const generateJson = async <T>({
  apiKey,
  model,
  prompt,
  schema,
}: GenerateJsonInput<T>): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.4,
          },
        }),
      },
    );
  } catch {
    throw new GeminiError(
      "Could not reach Google AI. Check your connection.",
      "NETWORK",
    );
  }
  if (response.status === 400 || response.status === 403) {
    throw new GeminiError(
      "Google rejected the key. Check it in settings.",
      "INVALID_KEY",
    );
  }
  if (response.status === 404) {
    throw new GeminiError(
      "That model is retired or unavailable to your key. Open settings, refresh the model list, and pick a current Flash model.",
      "INVALID_MODEL",
    );
  }
  if (response.status === 429) {
    throw new GeminiError(
      "Quota spent for now. Wait a little and retry.",
      "QUOTA",
    );
  }
  if (!response.ok) {
    throw new GeminiError(
      "Google AI answered with an error. Try again.",
      "API_ERROR",
    );
  }
  const parsed = geminiResponseSchema.safeParse(await response.json());
  if (!parsed.success || parsed.data.candidates === undefined) {
    throw new GeminiError(
      "Google AI returned an empty answer. Try again.",
      "EMPTY",
    );
  }
  const raw = parsed.data.candidates
    .flatMap((candidate) => candidate.content.parts)
    .map((part) => part.text ?? "")
    .join("");
  let json: unknown;
  try {
    json = JSON.parse(stripFences(raw)) as unknown;
  } catch {
    throw new GeminiError("The answer arrived garbled. Try again.", "PARSE");
  }
  const validated = schema.safeParse(json);
  if (!validated.success) {
    throw new GeminiError("The answer arrived garbled. Try again.", "PARSE");
  }
  return validated.data;
};

const modelEntrySchema = z.object({
  name: z.string(),
  displayName: z.string().optional(),
  supportedGenerationMethods: z.array(z.string()).optional(),
});

const modelListSchema = z.object({
  models: z.array(modelEntrySchema).optional(),
});

const TEXT_MODEL_BLOCKLIST =
  /image|tts|live|transcribe|embed|robotics|veo|lyria|banana|deep-research|computer|omni/i;

export const listTextModels = async (apiKey: string): Promise<string[]> => {
  let response: Response;
  try {
    response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: { "x-goog-api-key": apiKey },
      },
    );
  } catch {
    throw new GeminiError(
      "Could not reach Google AI. Check your connection.",
      "NETWORK",
    );
  }
  if (response.status === 400 || response.status === 403) {
    throw new GeminiError(
      "Google rejected the key. Check it in settings.",
      "INVALID_KEY",
    );
  }
  if (!response.ok) {
    throw new GeminiError("Could not list models. Try again.", "API_ERROR");
  }
  const parsed = modelListSchema.safeParse(await response.json());
  if (!parsed.success || parsed.data.models === undefined) {
    throw new GeminiError("Could not list models. Try again.", "PARSE");
  }
  return parsed.data.models
    .filter(
      (entry) =>
        entry.supportedGenerationMethods?.includes("generateContent") ?? false,
    )
    .map((entry) => entry.name.replace(/^models\//, ""))
    .filter((name) => !TEXT_MODEL_BLOCKLIST.test(name));
};
