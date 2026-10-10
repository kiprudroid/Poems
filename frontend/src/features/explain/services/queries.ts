import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { explainQueryKeys } from "@/features/explain/keys/index";
import {
  generateJson,
  listTextModels,
} from "@/features/explain/services/gemini-client";
import {
  buildLinePrompt,
  buildWholePoemPrompt,
} from "@/features/explain/services/prompts";
import {
  lineExplanationSchema,
  wholePoemExplanationSchema,
} from "@/features/explain/types/index";
import type { Poem } from "@/features/poem/types/index";
import { env } from "@/features/shared/env/index";

const KEY_STORAGE = "poets-corner.gemini-key";
const MODEL_STORAGE = "poets-corner.gemini-model-v2";

export interface GeminiSettings {
  apiKey: string | null;
  model: string;
  hasKey: boolean;
}

export const useGeminiSettings = () => {
  const [apiKey, setApiKey] = useState<string | null>(() =>
    sessionStorage.getItem(KEY_STORAGE),
  );
  const [model, setModel] = useState<string>(
    () => sessionStorage.getItem(MODEL_STORAGE) ?? env.VITE_GEMINI_MODEL,
  );
  const saveSettings = (key: string, nextModel: string): void => {
    sessionStorage.setItem(KEY_STORAGE, key.trim());
    sessionStorage.setItem(MODEL_STORAGE, nextModel.trim());
    setApiKey(key.trim());
    setModel(nextModel.trim());
  };
  const clearSettings = (): void => {
    sessionStorage.removeItem(KEY_STORAGE);
    sessionStorage.removeItem(MODEL_STORAGE);
    setApiKey(null);
    setModel(env.VITE_GEMINI_MODEL);
  };
  const settings: GeminiSettings = { apiKey, model, hasKey: apiKey !== null };
  return { ...settings, saveSettings, clearSettings };
};

export const useWholePoemExplanation = (
  poem: Poem | null,
  settings: GeminiSettings,
) => {
  const query = useQuery({
    queryKey: explainQueryKeys.whole(poem?.title ?? "", settings.model),
    queryFn: () => {
      if (poem === null || settings.apiKey === null)
        throw new Error("Missing poem or key");
      return generateJson({
        apiKey: settings.apiKey,
        model: settings.model,
        prompt: buildWholePoemPrompt(poem),
        schema: wholePoemExplanationSchema,
      });
    },
    enabled: false,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60,
    retry: false,
  });
  return { ...query, explanation: query.data ?? null };
};

export const useLineExplanation = (
  poem: Poem | null,
  lineIndex: number | null,
  settings: GeminiSettings,
) => {
  const query = useQuery({
    queryKey: explainQueryKeys.line(
      poem?.title ?? "",
      lineIndex ?? -1,
      settings.model,
    ),
    queryFn: () => {
      if (poem === null || lineIndex === null || settings.apiKey === null) {
        throw new Error("Missing poem, line, or key");
      }
      return generateJson({
        apiKey: settings.apiKey,
        model: settings.model,
        prompt: buildLinePrompt(poem, lineIndex),
        schema: lineExplanationSchema,
      });
    },
    enabled: false,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60,
    retry: false,
  });
  return { ...query, explanation: query.data ?? null };
};

export const useAvailableModels = (apiKey: string) => {
  const query = useQuery({
    queryKey: [...explainQueryKeys.all, "models"] as const,
    queryFn: () => listTextModels(apiKey),
    enabled: false,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
  return { ...query, models: query.data ?? [] };
};
