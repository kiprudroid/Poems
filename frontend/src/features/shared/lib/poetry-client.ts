import { env } from "@/features/shared/env/index";

export class PoetryApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "PoetryApiError";
    this.code = status === 404 ? "NOT_FOUND" : "POETRY_API_ERROR";
    this.status = status;
  }
}

export const fetchPoetry = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${env.VITE_POETRY_API_URL}${path}`);
  if (response.status === 404) {
    throw new PoetryApiError("Nothing found at this address.", 404);
  }
  if (!response.ok) {
    throw new PoetryApiError(
      "The poetry library is unreachable.",
      response.status,
    );
  }
  return (await response.json()) as T;
};

export const toSlug = (value: string): string => encodeURIComponent(value);
