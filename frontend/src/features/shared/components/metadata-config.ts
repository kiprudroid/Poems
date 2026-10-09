import { env } from "@/features/shared/env/index";

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export const metadataConfig = {
  siteName: "Poet's Corner",
  defaultDescription:
    "A quiet library of classical poetry. Browse poets, discover verses, and read timeless poems.",
  baseUrl: env.VITE_APP_URL,
};

export const buildTitle = (page?: string): string =>
  page ? `${page} | ${metadataConfig.siteName}` : metadataConfig.siteName;
